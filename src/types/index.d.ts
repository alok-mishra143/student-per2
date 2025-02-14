interface StudentTable {
  id: number;
  name: string;
  score: number;
  grade: string;
  performanceLevel: string;
}
interface Subjects {
  maths: number;
  physics: number;
  chemistry: number;
}
interface StudentData {
  id: number;
  name: string;
  score: number;
  grade: string;
  performanceLevel: string;
  subjects: Subjects;
}

interface StudentFormValues {
  name: string;
  maths: number;
  physics: number;
  chemistry: number;
}
interface HeadCell {
  disablePadding: boolean;
  id: keyof StudentData;
  label: string;
  numeric: boolean;
}
