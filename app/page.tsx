'use client';
import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, ShieldCheck, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const defaultData = [
  { year: "Year 1", profit: 22200, retreats: 13, reserve: 2442 },
  { year: "Year 2", profit: 22850, retreats: 13, reserve: 4955.5 },
  { year: "Year 3", profit: 35000, retreats: 13, reserve: 9438 },
  { year: "Year 4", profit: 50200, retreats: 18, reserve: 14960 },
  { year: "Year 5", profit: 62600, retreats: 20, reserve: 21846 }
];

export default function InvestorDashboard() {
  const [data, setData] = useState(defaultData);

  const handleChange = (index: number, field: string, value: string) => {
    const updated = data.map((y, i) =>
      i === index ? { ...y, [field]: parseFloat(value) || 0 } : y
    );
    setData(updated);
  };

  const totalRetreats = data.reduce((sum, y) => sum + y.retreats, 0);
  const latestYear = data[data.length - 1];
  const minThreshold = 3225;

  // Status coloring based on KPIs
  const reserveStatus =
    latestYear.reserve >= minThreshold
      ? "success"
      : latestYear.reserve >= minThreshold * 0.8
      ? "warning"
      : "danger";

  return (
    <div className="space-y-6">
      {/* KPI cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div layout>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <Users className="text-yellow-500 w-8 h-8" />
              <div>
                <div className="text-xl font-semibold">Total Retreats</div>
                <div className="text-3xl">{totalRetreats}</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div layout>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <TrendingUp className="text-blue-500 w-8 h-8" />
              <div>
                <div className="text-xl font-semibold">Net Profit (Year 5)</div>
                <div className="text-3xl">£{latestYear.profit.toLocaleString()}</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div layout>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <ShieldCheck
                className={
                  reserveStatus === "success"
                    ? "text-green-500 w-8 h-8"
                    : reserveStatus === "warning"
                    ? "text-yellow-500 w-8 h-8"
                    : "text-red-500 w-8 h-8"
                }
              />
              <div>
                <div className="text-xl font-semibold">Cash Reserve</div>
                <div className="text-3xl">£{latestYear.reserve.toLocaleString()}</div>
                <Progress value={(latestYear.reserve / minThreshold) * 100} className="mt-2" />
                <span
                  className={
                    "inline-block mt-1 px-2 py-1 rounded text-xs " +
                    (reserveStatus === "success"
                      ? "bg-green-100 text-green-700"
                      : reserveStatus === "warning"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700")
                  }
                >
                  {reserveStatus === "success"
                    ? "Healthy"
                    : reserveStatus === "warning"
                    ? "Monitor"
                    : "Low"}
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Bar chart visualisation */}
      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-4">Annual Financial Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip formatter={(val: number) => `£${val.toLocaleString()}`} />
              <Bar dataKey="profit" fill="#2563eb" name="Net Profit" />
              <Bar dataKey="reserve" fill="#22c55e" name="Cash Reserve" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Editable table */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <h2 className="text-xl font-semibold">Admin Controls: Edit Data</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr>
                  <th className="py-2 px-4 font-bold">Year</th>
                  <th className="py-2 px-4 font-bold">Profit (£)</th>
                  <th className="py-2 px-4 font-bold">Retreats</th>
                  <th className="py-2 px-4 font-bold">Reserve (£)</th>
                </tr>
              </thead>
              <tbody>
                {data.map((y, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                    <td className="py-1 px-4">{y.year}</td>
                    <td className="py-1 px-4">
                      <input
                        type="number"
                        className="border rounded p-1 bg-white dark:bg-gray-900 w-24"
                        value={y.profit}
                        onChange={(e) => handleChange(idx, "profit", e.target.value)}
                        placeholder="Profit"
                      />
                    </td>
                    <td className="py-1 px-4">
                      <input
                        type="number"
                        className="border rounded p-1 bg-white dark:bg-gray-900 w-16"
                        value={y.retreats}
                        onChange={(e) => handleChange(idx, "retreats", e.target.value)}
                        placeholder="Retreats"
                      />
                    </td>
                    <td className="py-1 px-4">
                      <input
                        type="number"
                        className="border rounded p-1 bg-white dark:bg-gray-900 w-24"
                        value={y.reserve}
                        onChange={(e) => handleChange(idx, "reserve", e.target.value)}
                        placeholder="Reserve"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
