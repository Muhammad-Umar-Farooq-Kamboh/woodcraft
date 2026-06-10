import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
export default function SupplierTopSkeleton() {
  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex flex-col gap-2 w-full">
        <Skeleton className="h-[30px] w-[250px] rounded-sm bg-gray-300" />
        <Skeleton className="h-[15px] w-[450px] rounded-sm bg-gray-300" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {[1, 2, 3].map((e, n) => (
          <Card className="mx-auto w-full max-w-sm h-fit py-3" key={n}>
            <CardContent className="flex flex-col gap-2">
              <CardTitle>
                <Skeleton className="h-[15px] w-[50px] rounded-sm bg-gray-300" />
              </CardTitle>
              <Skeleton className="h-[15px] w-[20px] rounded-sm bg-gray-300" />
              <CardDescription>
                <Skeleton className="h-[15px] w-[50px] rounded-sm bg-gray-300" />
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
