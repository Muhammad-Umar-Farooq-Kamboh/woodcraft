"use client";

import ProfileLeft from "@/components/custom/profile/ProfileLeft";
import ProfileLeftSkeleton from "@/components/custom/profile/ProfileLeftSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { User } from "lucide-react";
import { useEffect, useState } from "react";

export default function Page() {
  const [user, setUser] = useState();
  const [pageLoading, setPageLoading] = useState(true);
  useEffect(() => {
    (async function () {
      setPageLoading(true);
      const res = await axios.get("/api/employee/get-user-with-profile");
      if (res.status === 200) {
        setUser(res.data.data);
      }
      setPageLoading(false);
    })();
  }, []);
  return (
    <div className="px-15 py-7 w-full flex flex-col-reverse gap-8 items-center">
      {pageLoading ? (
        <ProfileLeftSkeleton />
      ) : (
        <ProfileLeft user={user} setUser={setUser} />
      )}
      {pageLoading ? (
        <div>
          <Skeleton className="h-[150px] w-[150px] rounded-full bg-gray-300" />
        </div>
      ) : (
        <div className="p-5 bg-[#FBF3E3] rounded-full w-fit">
          <User color="#F29E0D" size={100} />
        </div>
      )}
    </div>
  );
}
