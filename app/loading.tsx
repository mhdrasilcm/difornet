export default function Loading() {
  return (
    <div className="mx-auto flex min-h-full max-w-6xl flex-col gap-6 px-6 py-24 lg:px-8">
      <div className="skeleton-block h-4 w-40" />
      <div className="skeleton-block h-12 w-full max-w-xl" />
      <div className="skeleton-block h-4 w-full max-w-md" />
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="skeleton-block h-32" />
        <div className="skeleton-block h-32" />
      </div>
    </div>
  );
}
