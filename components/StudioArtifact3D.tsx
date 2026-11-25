"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface StudioArtifact3DProps {
  activeServiceIndex: number;
}

export function StudioArtifact3D({
  activeServiceIndex,
}: StudioArtifact3DProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const serviceIndexRef = useRef(activeServiceIndex);

  useEffect(() => {
    serviceIndexRef.current = activeServiceIndex;
  }, [activeServiceIndex]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.1, 7.0);

    // Clean Studio Lighting so the 3 colored bars show rich 3D depth
    const hemiLight = new THREE.HemisphereLight(0xfff4e6, 0x181513, 1.35);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffedd7, 2.8);
    keyLight.position.set(4.5, 5.5, 5.5);
    scene.add(keyLight);

    const frontFill = new THREE.DirectionalLight(0xffffff, 1.2);
    frontFill.position.set(-3, 1.5, 5);
    scene.add(frontFill);

    const rimLight = new THREE.PointLight(0xffedd7, 16, 18, 1.5);
    rimLight.position.set(-3.5, -2.0, 3.2);
    scene.add(rimLight);

    // Sculpted 3-Stripe DiforNet Monoliths (Green, Gold, Red — zero rings)
    const artifactGroup = new THREE.Group();
    scene.add(artifactGroup);

    const barShape = new THREE.Shape();
    const skew = 0.44;
    const bw = 0.5;
    const bh = 2.15;
    barShape.moveTo(-bw / 2 - skew / 2, -bh / 2);
    barShape.lineTo(bw / 2 - skew / 2, -bh / 2);
    barShape.lineTo(bw / 2 + skew / 2, bh / 2);
    barShape.lineTo(-bw / 2 + skew / 2, bh / 2);
    barShape.closePath();

    const barGeo = new THREE.ExtrudeGeometry(barShape, {
      depth: 0.42,
      bevelEnabled: true,
      bevelThickness: 0.065,
      bevelSize: 0.045,
      bevelSegments: 5,
    });
    barGeo.center();

    const stripePalette = [
      { color: 0x168a47, emissive: 0x062614 }, // Forest Green
      { color: 0xe6a817, emissive: 0x2e1f03 }, // Saffron Gold
      { color: 0xd9381e, emissive: 0x2b0a05 }, // Crimson Red
    ];

    const barOffsets = [-0.88, 0, 0.88];
    const bars: THREE.Mesh[] = [];
    const barMaterials: THREE.MeshPhysicalMaterial[] = [];

    barOffsets.forEach((xOffset, idx) => {
      const mat = new THREE.MeshPhysicalMaterial({
        color: stripePalette[idx].color,
        emissive: stripePalette[idx].emissive,
        emissiveIntensity: 0.35,
        metalness: 0.32,
        roughness: 0.24,
        clearcoat: 0.9,
        clearcoatRoughness: 0.14,
        reflectivity: 0.9,
      });
      barMaterials.push(mat);

      const bar = new THREE.Mesh(barGeo, mat);
      bar.position.x = xOffset;
      artifactGroup.add(bar);
      bars.push(bar);
    });

    // Subtle Darkroom Dust Motes
    const particleCount = 110;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1.5;
    }
    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    const particlesMat = new THREE.PointsMaterial({
      color: 0xffedd7,
      size: 0.022,
      transparent: true,
      opacity: 0.3,
    });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);

    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;
    let scrollRatio = 0;

    function handleMouseMove(event: MouseEvent) {
      targetMouseX = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    function handleScroll() {
      const doc = document.documentElement;
      const maxScroll = doc.scrollHeight - doc.clientHeight;
      scrollRatio = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    }

    function handleResize() {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }

    handleScroll();
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    const clock = new THREE.Clock();
    let rafId = 0;

    function animate() {
      rafId = requestAnimationFrame(animate);
      const t = prefersReducedMotion ? 0 : clock.getElapsedTime();

      currentMouseX += (targetMouseX - currentMouseX) * 0.055;
      currentMouseY += (targetMouseY - currentMouseY) * 0.055;

      // Keep the front faces facing the viewer with gentle sculptural rotation
      const targetRotY =
        Math.sin(t * 0.45) * 0.28 +
        scrollRatio * Math.PI * 1.6 +
        currentMouseX * 0.48;
      const targetRotX =
        Math.sin(scrollRatio * Math.PI * 2) * 0.22 - currentMouseY * 0.3;

      artifactGroup.rotation.y += (targetRotY - artifactGroup.rotation.y) * 0.06;
      artifactGroup.rotation.x += (targetRotX - artifactGroup.rotation.x) * 0.06;

      // Slight right shift in Hero on desktop, centered in Void-Mode below
      const heroOffset = Math.max(0, 1 - scrollRatio * 4.5) * 1.45;
      const targetPosX = window.innerWidth >= 1024 ? heroOffset : 0;
      artifactGroup.position.x += (targetPosX - artifactGroup.position.x) * 0.05;
      artifactGroup.position.y = Math.sin(t * 0.85) * 0.1;

      const activeIdx = serviceIndexRef.current;
      bars.forEach((bar, i) => {
        const spread = 0.88 + scrollRatio * 0.14;
        const targetX = (i - 1) * spread;
        const targetZ =
          i === activeIdx % 3 ? 0.26 : Math.sin(t * 1.1 + i * 1.1) * 0.07;
        bar.position.x += (targetX - bar.position.x) * 0.07;
        bar.position.z += (targetZ - bar.position.z) * 0.07;
      });

      rimLight.position.x = -3 + currentMouseX * 2.5;
      rimLight.position.y = -1.5 + currentMouseY * 2.2;

      particles.rotation.y = t * 0.015 + scrollRatio * 0.3;

      renderer.render(scene, camera);
    }

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      barGeo.dispose();
      barMaterials.forEach((m) => m.dispose());
      particlesGeo.dispose();
      particlesMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 opacity-95"
    />
  );
}