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
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.15, 7.2);

    // Warm Darkroom Lighting
    const ambient = new THREE.AmbientLight(0x382416, 1.8);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffedd7, 3.2);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const emberRim = new THREE.PointLight(0xdc5000, 18, 18, 1.6);
    emberRim.position.set(-3.2, -1.8, 2.5);
    scene.add(emberRim);

    const warmRim = new THREE.PointLight(0xffedd7, 10, 16, 1.8);
    warmRim.position.set(3.2, 2.4, -2.5);
    scene.add(warmRim);

    // Sculpted 3-Stripe DiforNet Monolith Rig
    const artifactGroup = new THREE.Group();
    scene.add(artifactGroup);

    const barShape = new THREE.Shape();
    const skew = 0.42;
    const bw = 0.48;
    const bh = 2.05;
    barShape.moveTo(-bw / 2 - skew / 2, -bh / 2);
    barShape.lineTo(bw / 2 - skew / 2, -bh / 2);
    barShape.lineTo(bw / 2 + skew / 2, bh / 2);
    barShape.lineTo(-bw / 2 + skew / 2, bh / 2);
    barShape.closePath();

    const barGeo = new THREE.ExtrudeGeometry(barShape, {
      depth: 0.44,
      bevelEnabled: true,
      bevelThickness: 0.06,
      bevelSize: 0.045,
      bevelSegments: 5,
    });
    barGeo.center();

    const stripeColors = [0x2f6e49, 0xc98a2c, 0xdc5000];
    const barOffsets = [-0.88, 0, 0.88];
    const bars: THREE.Mesh[] = [];

    const darkBodyMat = new THREE.MeshPhysicalMaterial({
      color: 0x1c1008,
      metalness: 0.68,
      roughness: 0.26,
      clearcoat: 0.9,
      clearcoatRoughness: 0.16,
      reflectivity: 0.9,
    });

    barOffsets.forEach((xOffset, idx) => {
      const bar = new THREE.Mesh(barGeo, darkBodyMat);
      bar.position.x = xOffset;

      // Subtle glowing inner-edge accent strip matching brand color
      const edgeGeo = new THREE.EdgesGeometry(barGeo, 28);
      const edgeMat = new THREE.LineBasicMaterial({
        color: stripeColors[idx],
        transparent: true,
        opacity: 0.72,
      });
      const edges = new THREE.LineSegments(edgeGeo, edgeMat);
      bar.add(edges);

      artifactGroup.add(bar);
      bars.push(bar);
    });

    // Precision Orbital Hairline Ring (Cork Border #40372e / Warm Cream #ffedd7)
    const ringGeo = new THREE.TorusGeometry(2.35, 0.008, 12, 128);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x6c5f51,
      transparent: true,
      opacity: 0.45,
    });
    const orbitRing = new THREE.Mesh(ringGeo, ringMat);
    orbitRing.rotation.x = Math.PI * 0.42;
    orbitRing.rotation.y = -0.25;
    artifactGroup.add(orbitRing);

    const outerRingGeo = new THREE.TorusGeometry(2.75, 0.005, 8, 128);
    const outerRingMat = new THREE.MeshBasicMaterial({
      color: 0xdc5000,
      transparent: true,
      opacity: 0.28,
    });
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
    outerRing.rotation.x = Math.PI * 0.56;
    outerRing.rotation.y = 0.32;
    artifactGroup.add(outerRing);

    // Darkroom Dust Motes
    const particleCount = 140;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1;
    }
    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    const particlesMat = new THREE.PointsMaterial({
      color: 0xffedd7,
      size: 0.025,
      transparent: true,
      opacity: 0.4,
    });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);

    // Interactive Pointer + Scroll Targets
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

      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      // Scroll-choreographed artifact rotation & lateral stage shift
      const targetRotY =
        scrollRatio * Math.PI * 2.2 + currentMouseX * 0.45 + t * 0.18;
      const targetRotX =
        Math.sin(scrollRatio * Math.PI * 2) * 0.35 - currentMouseY * 0.3;

      artifactGroup.rotation.y += (targetRotY - artifactGroup.rotation.y) * 0.06;
      artifactGroup.rotation.x += (targetRotX - artifactGroup.rotation.x) * 0.06;

      // Keep centered in void-mode sections, subtly right in Hero
      const heroOffset = Math.max(0, 1 - scrollRatio * 4.5) * 1.1;
      const targetPosX =
        window.innerWidth >= 1024 ? heroOffset : 0;
      artifactGroup.position.x += (targetPosX - artifactGroup.position.x) * 0.05;
      artifactGroup.position.y = Math.sin(t * 0.9) * 0.12;

      // Subtle bar spread/wave reacting to active service index (0..3)
      const activeIdx = serviceIndexRef.current;
      bars.forEach((bar, i) => {
        const spread = 0.88 + scrollRatio * 0.18;
        const targetX = (i - 1) * spread;
        const targetZ =
          i === activeIdx % 3 ? 0.28 : Math.sin(t * 1.2 + i * 1.1) * 0.08;
        bar.position.x += (targetX - bar.position.x) * 0.07;
        bar.position.z += (targetZ - bar.position.z) * 0.07;
      });

      orbitRing.rotation.z = t * 0.12 + scrollRatio * 2;
      outerRing.rotation.z = -t * 0.09 - scrollRatio * 1.5;

      emberRim.position.x = -3 + currentMouseX * 2.2;
      emberRim.position.y = -1.5 + currentMouseY * 2.2;

      particles.rotation.y = t * 0.02 + scrollRatio * 0.4;

      renderer.render(scene, camera);
    }

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      barGeo.dispose();
      darkBodyMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      outerRingGeo.dispose();
      outerRingMat.dispose();
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
      className="pointer-events-none fixed inset-0 z-0 opacity-85"
    />
  );
}