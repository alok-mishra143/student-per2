/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef } from "react";
import { useSelector } from "react-redux";
import { generateStudentReport } from "@/lib/PdfGenerator";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";

const StudentPerformanceDashboard = () => {
  const chartsRef = useRef<HTMLDivElement>(null!);
  const studentData = useSelector((state: any) => state.students.students);

  // Chart Labels
  const labels = ["maths", "physics", "chemistry"];

  // Marks Comparison Data (Student-wise)
  const marksComparisonData = studentData.map((student: any) => ({
    name: student.name,
    ...student.subjects,
  }));

  // Subject-wise Performance (Average Scores)
  const subjectPerformanceData = labels.map((subject) => ({
    subject,
    average:
      studentData.reduce(
        (total: number, student: any) =>
          total + (student.subjects[subject] || 0),
        0
      ) / studentData.length,
  }));

  const handleGeneratePDF = async () => {
    try {
      await generateStudentReport(studentData, chartsRef);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Student Performance Dashboard</h1>
        <Button className="mt-4" onClick={handleGeneratePDF}>
          Export Report PDF
        </Button>
      </div>

      <div ref={chartsRef} className="w-[80%] space-y-6 mt-8">
        {/* Marks Comparison Chart */}
        <div className="text-center p-4 bg-card rounded-lg shadow-md chart-container">
          <h2 className="text-xl font-medium mb-2">Marks Comparison</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={marksComparisonData}>
              <XAxis dataKey="name" className="text-sm" />
              <YAxis className="text-sm" />
              <Tooltip />
              <Legend />
              {labels.map((subject, index) => (
                <Bar
                  key={index}
                  dataKey={subject}
                  fill={`hsl(${index * 60}, 70%, 50%)`}
                  radius={[4, 4, 0, 0]}
                  barSize={30}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Subject-wise Performance Chart */}
        <div className="text-center p-4 bg-card rounded-lg shadow-md chart-container">
          <h2 className="text-xl font-medium mb-2">Subject-wise Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={subjectPerformanceData}>
              <XAxis dataKey="subject" className="text-sm" />
              <YAxis className="text-sm" />
              <Tooltip />
              <Bar
                dataKey="average"
                fill="hsl(210, 70%, 50%)"
                radius={[4, 4, 0, 0]}
                barSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StudentPerformanceDashboard;
