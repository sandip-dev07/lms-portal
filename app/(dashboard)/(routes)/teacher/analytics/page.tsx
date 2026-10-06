import dynamic from "next/dynamic";
import { getAnalytics } from "@/actions/get-analytics";
import { redirect } from "next/navigation";
import { getUserId } from "@/lib/auth";
import React from "react";
import DataCard from "./_components/data-card";

const Chart = dynamic(() => import("./_components/chart"), {
  ssr: false,
});

const Analytics = async () => {
  const userId = getUserId();

  if (!userId) return redirect("/");

  const { data, totalRevenue, totalSales } = await getAnalytics(userId);
  return (
    <main className="h-full w-full p-4 sm:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <DataCard
          shouldFormat={true}
          label="Total Revenue"
          value={totalRevenue}
        />
        <DataCard label="Total Sales" value={totalSales} />
      </div>
      <Chart data={data} />
    </main>
  );
};

export default Analytics;
