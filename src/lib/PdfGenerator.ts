/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import jsPDF from "jspdf";
import "jspdf-autotable";
import html2canvas from "html2canvas";

declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => void;
  }
}

export const generateStudentReport = async (
  students: StudentData[],
  chartsRef: React.RefObject<HTMLDivElement>
) => {
  const pdf = new jsPDF("p", "mm", "a4");
  let yPos = 20;

  // Title
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(18);
  pdf.text("Student Performance Report", 105, yPos, { align: "center" });
  yPos += 10;

  // Date
  pdf.setFontSize(12);
  pdf.setFont("helvetica", "normal");
  pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, yPos);
  yPos += 10;

  // Add Charts if available
  if (chartsRef.current) {
    try {
      const charts = chartsRef.current.querySelectorAll(".chart-container");
      for (const chart of charts) {
        const canvas = await html2canvas(chart as HTMLElement);
        const chartImage = canvas.toDataURL("image/png");

        if (yPos + 90 > 280) {
          pdf.addPage();
          yPos = 20;
        }

        pdf.addImage(chartImage, "PNG", 20, yPos, 170, 80);
        yPos += 90;
      }
    } catch (error) {
      console.error("Error converting charts to image:", error);
    }
  }

  // Table Headers & Data
  const tableHeaders = [["Name", "Mathematics", "Physics", "Chemistry"]];
  const tableData = students.map((student) => [
    student.name,
    student.subjects.maths,
    student.subjects.physics,
    student.subjects.chemistry,
  ]);

  pdf.autoTable({
    startY: yPos + 10,
    head: tableHeaders,
    body: tableData,
    theme: "grid",
    styles: {
      fontSize: 10,
      cellPadding: 3,
      halign: "center",
    },
    headStyles: {
      fillColor: [0, 122, 255], // Professional blue
      textColor: 255,
      fontStyle: "bold",
    },
    alternateRowStyles: { fillColor: [240, 240, 240] },
    margin: { top: 10, bottom: 20 },
    didDrawPage: function (data: any) {
      pdf.setFontSize(10);
      pdf.text("Student Performance Report", 105, 10, { align: "center" });
    },
  });

  // Save PDF
  pdf.save("student-report.pdf");
};
