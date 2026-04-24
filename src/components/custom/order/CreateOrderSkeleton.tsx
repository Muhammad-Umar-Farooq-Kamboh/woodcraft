import { Skeleton } from "@/components/ui/skeleton";

export default function CreateOrderSkeleton() {
  return (
    <div className="border-1 rounded-2xl p-5 flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <Skeleton className="h-[30px] w-[100px] rounded-full bg-gray-300" />
        <Skeleton className="h-[20px] w-[200px] rounded-full bg-gray-300" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((e) => (
          <div key={e} className="flex flex-col gap-x-2 gap-y-4">
            <Skeleton className="h-[30px] w-[200px] rounded-sm bg-gray-300" />
            <Skeleton className="h-[40px] w-full rounded-sm bg-gray-300" />
          </div>
        ))}
      </div>
      <div className="flex gap-4">
        <Skeleton className="h-[40px] w-[100px] rounded-sm bg-gray-300" />
        <Skeleton className="h-[40px] w-[100px] rounded-sm bg-gray-300" />
      </div>
    </div>
  );
}
