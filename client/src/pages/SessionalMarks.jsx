import { NotebookPen } from "lucide-react";
import CrudPage from "../components/CrudPage";

const columns = [
  { key: "studentName", label: "Student" },
  { key: "className", label: "Class" },
  { key: "subject", label: "Subject" },
  { key: "examName", label: "Exam" },
  { key: "marksObtained", label: "Marks", render: (row) => `${row.marksObtained} / ${row.maxMarks}` },
  { key: "grade", label: "Grade" },
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
  { name: "subject", label: "Subject", type: "text", required: true },
  { name: "examName", label: "Exam Name", type: "text", required: true, placeholder: "e.g. Mid-Term" },
  { name: "marksObtained", label: "Marks Obtained", type: "number", required: true },
  { name: "maxMarks", label: "Max Marks", type: "number", required: true },
  { name: "grade", label: "Grade", type: "text", placeholder: "e.g. A+" },
  { name: "remarks", label: "Remarks", type: "textarea", fullWidth: true },
];

const SessionalMarks = () => (
  <CrudPage
    title="Sessional Marks"
    subtitle="Record internal assessment marks by subject"
    icon={NotebookPen}
    endpoint="/sessional-marks"
    columns={columns}
    fields={fields}
    emptyDefaults={{ maxMarks: 100 }}
    searchPlaceholder="Search by student or subject…"
  />
);

export default SessionalMarks;
