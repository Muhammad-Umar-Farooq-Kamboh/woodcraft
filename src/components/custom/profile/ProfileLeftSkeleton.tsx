import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileLeftSkeleton() {
  return (
    <div className="grid md:grid-cols-2 gap-5 w-full">
      {[1, 2, 3, 4].map((e) => (
        <div key={e} className="flex flex-col gap-3">
          <Skeleton className="h-[30px] w-[100px] rounded-sm bg-gray-300" />
          <Skeleton className="h-[35px] w-full rounded-sm bg-gray-300" />
        </div>
      ))}
    </div>
  );
}
