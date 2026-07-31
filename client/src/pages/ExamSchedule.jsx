import { CalendarDays } from "lucide-react";
import CrudPage from "../components/CrudPage";

const columns = [
  { key: "examName", label: "Exam" },
  { key: "className", label: "Class" },
  { key: "subject", label: "Subject" },
  { key: "examDate", label: "Date", render: (row) => new Date(row.examDate).toLocaleDateString("en-IN") },
  { key: "time", label: "Time", render: (row) => `${row.startTime} – ${row.endTime}` },
  { key: "room", label: "Room" },
];

const fields = [
  { name: "examName", label: "Exam Name", type: "text", required: true, placeholder: "e.g. Final Term" },
  { name: "className", label: "Class", type: "text", required: true },
  { name: "subject", label: "Subject", type: "text", required: true },
  { name: "examDate", label: "Exam Date", type: "date", required: true },
  { name: "startTime", label: "Start Time", type: "time", required: true },
  { name: "endTime", label: "End Time", type: "time", required: true },
  { name: "room", label: "Room", type: "text" },
  { name: "maxMarks", label: "Max Marks", type: "number" },
  { name: "invigilator", label: "Invigilator", type: "text" },
];

const ExamSchedule = () => (
  <CrudPage
    title="Exam Schedule"
    subtitle="Plan and publish upcoming examination dates"
    icon={CalendarDays}
    endpoint="/exam-schedule"
    columns={columns}
    fields={fields}
    emptyDefaults={{ maxMarks: 100 }}
    searchPlaceholder="Search by exam, class or subject…"
  />
);

export default ExamSchedule;
