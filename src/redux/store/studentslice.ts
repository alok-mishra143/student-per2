import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StudentState {
  students: StudentData[];
  filterStudents: [];
}
const initialState: StudentState = {
  students: [],
  filterStudents: [],
};

const calculateAverageScore = (subjects: Subjects): number => {
  const total = Object.values(subjects).reduce((sum, score) => sum + score, 0);
  return Math.ceil(total / Object.values(subjects).length);
};

const determinePerformanceLevel = (averageScore: number): string => {
  if (averageScore >= 90) {
    return "Excellent";
  } else if (averageScore >= 75) {
    return "Good";
  } else {
    return "Needs Improvement";
  }
};

const determineGrade = (averageScore: number): string => {
  if (averageScore >= 90) return "A";
  if (averageScore >= 80) return "B";
  if (averageScore >= 70) return "C";
  return "D";
};

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    addStudents: (state, action: PayloadAction<StudentData[]>) => {
      const uniqueStudents = action.payload.filter(
        (newStudent) =>
          !state.students.some(
            (existingStudent) => existingStudent.id === newStudent.id
          )
      );
      uniqueStudents.forEach((student) => {
        const averageScore = calculateAverageScore(student.subjects);
        const performanceLevel = determinePerformanceLevel(averageScore);
        const grade = determineGrade(averageScore);

        student.score = averageScore;
        student.performanceLevel = performanceLevel;
        student.grade = grade;
        state.students.push(student);
      });
    },
    updateStudents: (state, action: PayloadAction<StudentData>) => {
      const index = state.students.findIndex(
        (student) => student.id === action.payload.id
      );
      if (index !== -1) {
        const updatedStudent = action.payload;
        const averageScore = calculateAverageScore(updatedStudent.subjects);
        const performanceLevel = determinePerformanceLevel(averageScore);
        const grade = determineGrade(averageScore);

        updatedStudent.score = averageScore;
        updatedStudent.performanceLevel = performanceLevel;
        updatedStudent.grade = grade;

        state.students[index] = updatedStudent;
      }
    },
    deleteStudents: (state, action: PayloadAction<number>) => {
      state.students = state.students.filter(
        (student) => student.id !== action.payload
      );
    },
  },
});
export const { addStudents, updateStudents, deleteStudents } =
  studentSlice.actions;
export default studentSlice.reducer;
