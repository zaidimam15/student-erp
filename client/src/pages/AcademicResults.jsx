import { Award } from "lucide-react";
import CrudPage from "../components/CrudPage";
import Badge from "../components/Badge";

const columns = [
  { key: "studentName", label: "Student" },
  { key: "className", label: "Class" },
  { key: "examName", label: "Exam" },
  { key: "subject", label: "Subject" },
  { key: "marksObtained", label: "Marks", render: (row) => `${row.marksObtained} / ${row.maxMarks}` },
  { key: "grade", label: "Grade" },
  { key: "result", label: "Result", render: (row) => <Badge>{row.result}</Badge> },
];

const fields = [
  {
    name: "student",
    label: "Student",
    type: "relation",
    endpoint: "/students",
    required: true,
    labelFn: (s) => `${s.name} — ${s.className} (${s.admissionNo})`,
    extraFields: (s) => ({ studentName: s.name, className: s.className }),
  },
  { name: "examName", label: "Exam Name", type: "text", required: true, placeholder: "e.g. Annual Exam" },
  { name: "subject", label: "Subject", type: "text", required: true },
  { name: "marksObtained", label: "Marks Obtained", type: "number", required: true },
  { name: "maxMarks", label: "Max Marks", type: "number", required: true },
  { name: "grade", label: "Grade", type: "text" },
  { name: "result", label: "Result", type: "select", options: ["Pass", "Fail"], required: true },
  { name: "remarks", label: "Remarks", type: "textarea", fullWidth: true },
];

const AcademicResults = () => (
  <CrudPage
    title="Academic Results"
    subtitle="Final results and grades by exam and subject"
    icon={Award}
    endpoint="/academic-results"
    columns={columns}
    fields={fields}
    emptyDefaults={{ maxMarks: 100, result: "Pass" }}
    searchPlaceholder="Search by student, class, or subject…"
  />
);

export default AcademicResults;
