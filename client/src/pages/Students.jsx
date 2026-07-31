import { GraduationCap } from "lucide-react";
import CrudPage from "../components/CrudPage";
import Badge from "../components/Badge";

const columns = [
  { key: "admissionNo", label: "Admission No" },
  { key: "name", label: "Name" },
  { key: "className", label: "Class" },
  { key: "section", label: "Section" },
  { key: "rollNo", label: "Roll No" },
  { key: "guardianPhone", label: "Guardian Phone" },
  { key: "status", label: "Status", render: (row) => <Badge>{row.status}</Badge> },
];

const fields = [
  { name: "admissionNo", label: "Admission No", type: "text", required: true },
  { name: "name", label: "Full Name", type: "text", required: true },
  { name: "className", label: "Class", type: "text", required: true, placeholder: "e.g. 8" },
  { name: "section", label: "Section", type: "text", placeholder: "e.g. A" },
  { name: "rollNo", label: "Roll No", type: "text" },
  { name: "gender", label: "Gender", type: "select", options: ["Male", "Female", "Other"] },
  { name: "dob", label: "Date of Birth", type: "date" },
  { name: "admissionDate", label: "Admission Date", type: "date" },
  { name: "guardianName", label: "Guardian Name", type: "text" },
  { name: "guardianPhone", label: "Guardian Phone", type: "text" },
  { name: "email", label: "Email", type: "text" },
  { name: "address", label: "Address", type: "textarea", fullWidth: true },
  { name: "status", label: "Status", type: "select", options: ["Active", "Inactive", "Graduated"] },
];

const Students = () => (
  <CrudPage
    title="Students"
    subtitle="Manage student records and enrollment"
    icon={GraduationCap}
    endpoint="/students"
    columns={columns}
    fields={fields}
    emptyDefaults={{ status: "Active", gender: "Male" }}
    searchPlaceholder="Search students…"
  />
);

export default Students;
