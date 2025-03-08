'use client'
import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import useAxiosPrivate from "@/lib/useAxiosPrivate";

type PieChartData = {
  name: string;
  value: number;
};

const COLORS = ["hsl(210, 75%, 40%)", "hsl(165, 75%, 40%)", "hsl(20, 75%, 40%)"];

// Custom label for each slice
const renderCustomLabel = (entry: PieChartData) => `${entry.name}: ${entry.value}`;

export default function App() {
  const axiosPrivate = useAxiosPrivate();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [chart, setChart] = useState<PieChartData[]>([]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosPrivate.get("/api/ticket/userdashboard");
        const formattedData: PieChartData[] = Object.entries(response.data).map(([key, value]) => ({
          name: key,
          value: Number(value),
        }));
        console.log(formattedData);
        setChart(formattedData);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-1 md:p-6">
      <h2 className="text-2xl self-start font-semibold text-gray-700 mb-4">Dashboard</h2>

      <div className="bg-cyan-100/20 shadow-md w-full flex justify-center rounded-lg border-t-8 border-orange-500/75 p-1 md:p-4">
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={chart}
              cx={`${isMobile ? "50%" : "60%"}`}
              cy="50%"
              outerRadius={isMobile ? 80 : 120}
              fill="#8884d8"
              dataKey="value"
              label={renderCustomLabel}
              isAnimationActive={true}
            >
              {chart.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip />

            <Legend
              layout={isMobile ? "horizontal" : "vertical"}
              align={isMobile ? "center" : "right"}
              verticalAlign={isMobile ? "bottom" : "middle"}
              wrapperStyle={{
                fontSize: "16px",
                color: "blue",
                paddingRight: isMobile ? "0" : "20px",
              }}
              iconSize={14}
              iconType="circle"
              width={isMobile ? 300 : 260}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}