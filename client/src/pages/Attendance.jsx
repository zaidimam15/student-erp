import { CalendarCheck } from "lucide-react";
import CrudPage from "../components/CrudPage";
import Badge from "../components/Badge";

const columns = [
  { key: "studentName", label: "Student" },
  { key: "className", label: "Class" },
  { key: "date", label: "Date", render: (row) => new Date(row.date).toLocaleDateString("en-IN") },
  { key: "status", label: "Status", render: (row) => <Badge>{row.status}</Badge> },
  { key: "remarks", label: "Remarks" },
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
  { name: "date", label: "Date", type: "date", required: true },
  { name: "status", label: "Status", type: "select", options: ["Present", "Absent", "Late", "Leave"], required: true },
  { name: "remarks", label: "Remarks", type: "textarea", fullWidth: true },
];

const Attendance = () => (
  <CrudPage
    title="Attendance"
    subtitle="Mark and manage daily student attendance"
    icon={CalendarCheck}
    endpoint="/attendance"
    columns={columns}
    fields={fields}
    emptyDefaults={{ date: new Date().toISOString().slice(0, 10), status: "Present" }}
    searchPlaceholder="Search by student or class…"
  />
);

export default Attendance;
