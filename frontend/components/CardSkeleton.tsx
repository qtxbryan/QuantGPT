export function NewsCardSkeleton() {
  return (
    <div className="flex flex-col md:flex-row gap-6 bg-[#1a2040] rounded-lg overflow-hidden futuristic-border">
      <div className="w-full md:w-72 h-48 bg-[#232a4d] animate-pulse" />
      <div className="flex flex-col flex-1 p-6 pt-0 md:pt-6">
        <div className="h-6 w-20 bg-[#232a4d] rounded mb-2 animate-pulse" />
        <div className="h-8 w-3/4 bg-[#232a4d] rounded mb-2 animate-pulse" />
        <div className="h-4 w-full bg-[#232a4d] rounded mb-4 animate-pulse" />
        <div className="flex items-center justify-between">
          <div className="h-4 w-24 bg-[#232a4d] rounded animate-pulse" />
          <div className="h-4 w-16 bg-[#232a4d] rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
