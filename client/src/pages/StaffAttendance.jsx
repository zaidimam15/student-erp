import { UserCheck } from "lucide-react";
import CrudPage from "../components/CrudPage";
import Badge from "../components/Badge";

const columns = [
  { key: "staffName", label: "Staff" },
  { key: "designation", label: "Designation" },
  { key: "date", label: "Date", render: (row) => new Date(row.date).toLocaleDateString("en-IN") },
  { key: "status", label: "Status", render: (row) => <Badge>{row.status}</Badge> },
  { key: "checkIn", label: "Check In" },
  { key: "checkOut", label: "Check Out" },
];

const fields = [
  {
    name: "staff",
    label: "Staff Member",
    type: "relation",
    endpoint: "/staff",
    required: true,
    labelFn: (s) => `${s.name} — ${s.designation} (${s.staffId})`,
    extraFields: (s) => ({ staffName: s.name, designation: s.designation }),
  },
  { name: "date", label: "Date", type: "date", required: true },
  { name: "status", label: "Status", type: "select", options: ["Present", "Absent", "Late", "Leave"], required: true },
  { name: "checkIn", label: "Check In", type: "time" },
  { name: "checkOut", label: "Check Out", type: "time" },
  { name: "remarks", label: "Remarks", type: "textarea", fullWidth: true },
];

const StaffAttendance = () => (
  <CrudPage
    title="Staff Attendance"
    subtitle="Track daily attendance for teaching and support staff"
    icon={UserCheck}
    endpoint="/staff-attendance"
    columns={columns}
    fields={fields}
    emptyDefaults={{ date: new Date().toISOString().slice(0, 10), status: "Present" }}
    searchPlaceholder="Search by staff name…"
  />
);

export default StaffAttendance;
