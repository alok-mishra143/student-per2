/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { Trash, Edit, Plus as Add } from "lucide-react";
import { STUDENT_TABLECELL } from "@/lib/utils";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  addStudents,
  deleteStudents,
  updateStudents,
} from "@/redux/store/studentslice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTheme } from "next-themes";
const initialFormValues: StudentFormValues = {
  name: "",
  maths: 0,
  physics: 0,
  chemistry: 0,
};
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  maths: Yup.number()
    .required("Math score is required")
    .min(0, "Score must be at least 0")
    .max(100, "Score cannot exceed 100"),
  physics: Yup.number()
    .required("Physics score is required")
    .min(0, "Score must be at least 0")
    .max(100, "Score cannot exceed 100"),
  chemistry: Yup.number()
    .required("Chemistry score is required")
    .min(0, "Score must be at least 0")
    .max(100, "Score cannot exceed 100"),
});

const Students = () => {
  const dispatch = useDispatch();
  const students = useSelector((state: any) => state.students.students);
  const theme = useTheme();
  const customTheme = createTheme({
    palette: {
      mode: theme.theme === "dark" ? "dark" : "light",
    },
  });

  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentStudent, setCurrentStudent] = useState<StudentData | null>(
    null
  );
  const filteredStudents = students.filter((student: any) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleAddClick = () => {
    setCurrentStudent(null);
    setOpen(true);
  };

  const handleUpdateClick = (student: StudentData) => {
    setCurrentStudent(student);
    setOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    dispatch(deleteStudents(id));
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (values: StudentFormValues) => {
    const totalScore = values.maths + values.physics + values.chemistry;
    const newStudent = {
      id: currentStudent?.id ?? Date.now(),
      ...values,
      subjects: {
        maths: values.maths,
        physics: values.physics,
        chemistry: values.chemistry,
      },
      score: totalScore,
      grade:
        totalScore >= 270
          ? "A"
          : totalScore >= 240
          ? "B"
          : totalScore >= 210
          ? "C"
          : "D",
      performanceLevel:
        totalScore >= 250
          ? "Excellent"
          : totalScore >= 200
          ? "Good"
          : "Need Improvement",
    };
    if (currentStudent) {
      dispatch(updateStudents(newStudent));
    } else {
      dispatch(addStudents([newStudent]));
    }
    handleClose();
  };
  return (
    <ThemeProvider theme={customTheme}>
      <div>
        {/* Header Section */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-muted-foreground">
            Manage Students
          </h1>
          <Button
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2  shadow-md transition-all duration-200 hover:bg-primary/90 hover:shadow-lg"
            onClick={handleAddClick}
          >
            <Add size={18} className="stroke-[2]" />
            <span className="text-sm font-medium">Add Student</span>
          </Button>
        </div>

        {/* Search and Table */}
        <Input
          className="mb-4 w-full rounded-lg border border-muted-foreground bg-background px-4 py-2 text-sm shadow-sm transition-all placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Paper
          sx={{
            width: "100%",
            mb: 2,
            backgroundColor: theme.theme === "dark" ? "#000" : "#fff",
          }}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {STUDENT_TABLECELL.map((cell) => (
                    <TableCell key={cell}>{cell}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStudents.map((student: any) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.subjects.maths}</TableCell>
                    <TableCell>{student.subjects.physics}</TableCell>
                    <TableCell>{student.subjects.chemistry}</TableCell>
                    <TableCell>
                      {(student.subjects.maths ?? 0) +
                        (student.subjects.physics ?? 0) +
                        (student.subjects.chemistry ?? 0)}
                      /300
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleUpdateClick(student)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => handleDeleteClick(student.id)}
                      >
                        <Trash />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Add/Edit Dialog */}
        <Dialog open={open} onOpenChange={handleClose}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {currentStudent ? "Edit Student" : "Add Student"}
              </DialogTitle>
            </DialogHeader>

            <Formik
              initialValues={
                currentStudent
                  ? {
                      name: currentStudent.name,
                      maths: currentStudent.subjects.maths,
                      physics: currentStudent.subjects.physics,
                      chemistry: currentStudent.subjects.chemistry,
                    }
                  : initialFormValues
              }
              validationSchema={validationSchema}
              onSubmit={(values) => handleSubmit(values)}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                isSubmitting,
              }) => (
                <Form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter student name"
                      className={
                        errors.name && touched.name ? "border-red-500" : ""
                      }
                    />
                    {touched.name && errors.name && (
                      <p className="text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maths">Maths</Label>
                    <Input
                      id="maths"
                      name="maths"
                      type="number"
                      value={values.maths}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter maths score"
                      className={
                        errors.maths && touched.maths ? "border-red-500" : ""
                      }
                    />
                    {touched.maths && errors.maths && (
                      <p className="text-sm text-red-500">{errors.maths}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="physics">Physics</Label>
                    <Input
                      id="physics"
                      name="physics"
                      type="number"
                      value={values.physics}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter physics score"
                      className={
                        errors.physics && touched.physics
                          ? "border-red-500"
                          : ""
                      }
                    />
                    {touched.physics && errors.physics && (
                      <p className="text-sm text-red-500">{errors.physics}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="chemistry">Chemistry</Label>
                    <Input
                      id="chemistry"
                      name="chemistry"
                      type="number"
                      value={values.chemistry}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter chemistry score"
                      className={
                        errors.chemistry && touched.chemistry
                          ? "border-red-500"
                          : ""
                      }
                    />
                    {touched.chemistry && errors.chemistry && (
                      <p className="text-sm text-red-500">{errors.chemistry}</p>
                    )}
                  </div>

                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleClose}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                  </DialogFooter>
                </Form>
              )}
            </Formik>
          </DialogContent>
        </Dialog>
      </div>
    </ThemeProvider>
  );
};

export default Students;
