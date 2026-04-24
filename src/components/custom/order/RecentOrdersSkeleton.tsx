import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function RecentOrdersSkeleton() {
  return (
    <div className="w-full border-1 rounded-2xl p-4 flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex flex-col gap-4">
          <Skeleton className="h-[30px] w-[200px] rounded-full bg-gray-300" />
          <Skeleton className="h-[20px] w-[100px] rounded-full bg-gray-300" />
        </div>
        <Skeleton className="h-[30px] w-[100px] rounded-sm bg-gray-300" />
      </div>
      {[1, 2, 3].map((e) => (
        <div key={e}>
          <div className="w-full border-1 rounded-2xl p-4 flex flex-col gap-4">
            <div className="flex justify-between">
              <div className="flex flex-col gap-4">
                <Skeleton className="h-[30px] w-[200px] rounded-full bg-gray-300" />
                <Skeleton className="h-[20px] w-[100px] rounded-full bg-gray-300" />
              </div>
              <Skeleton className="h-[20px] w-[70px] rounded-sm bg-gray-300" />
            </div>
            <div className="flex gap-5">
              <div className="flex flex-col gap-1">
                <Skeleton className="h-[20px] w-[100px] rounded-full bg-gray-300" />
                <Skeleton className="h-[20px] w-[100px] rounded-full bg-gray-300" />
              </div>
              <div className="flex flex-col gap-1">
                <Skeleton className="h-[20px] w-[100px] rounded-full bg-gray-300" />
                <Skeleton className="h-[20px] w-[100px] rounded-full bg-gray-300" />
              </div>
              <div className="flex flex-col gap-1">
                <Skeleton className="h-[20px] w-[100px] rounded-full bg-gray-300" />
                <Skeleton className="h-[20px] w-[100px] rounded-full bg-gray-300" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
