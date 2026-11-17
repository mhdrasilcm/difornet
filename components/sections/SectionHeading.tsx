interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: string;
}

export function SectionHeading({ index, eyebrow, title }: SectionHeadingProps) {
  return (
    <div className="mb-12">
      <div className="mb-3 flex items-center gap-4">
        <span className="section-eyebrow">
          {index} — {eyebrow}
        </span>
        <span className="section-rule" aria-hidden />
      </div>
      <h2 className="font-display text-4xl font-medium tracking-tight lg:text-5xl">
        {title}
      </h2>
    </div>
  );
}