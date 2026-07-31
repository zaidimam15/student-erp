import { Users } from "lucide-react";
import CrudPage from "../components/CrudPage";
import Badge from "../components/Badge";

const columns = [
  { key: "staffId", label: "Staff ID" },
  { key: "name", label: "Name" },
  { key: "designation", label: "Designation" },
  { key: "department", label: "Department" },
  { key: "phone", label: "Phone" },
  { key: "status", label: "Status", render: (row) => <Badge>{row.status}</Badge> },
];

const fields = [
  { name: "staffId", label: "Staff ID", type: "text", required: true },
  { name: "name", label: "Full Name", type: "text", required: true },
  { name: "designation", label: "Designation", type: "text", required: true, placeholder: "e.g. Teacher, Clerk" },
  { name: "department", label: "Department", type: "text" },
  { name: "email", label: "Email", type: "text" },
  { name: "phone", label: "Phone", type: "text" },
  { name: "joiningDate", label: "Joining Date", type: "date" },
  { name: "salary", label: "Salary", type: "number" },
  { name: "status", label: "Status", type: "select", options: ["Active", "Inactive", "On Leave"] },
  { name: "address", label: "Address", type: "textarea", fullWidth: true },
];

const StaffManagement = () => (
  <CrudPage
    title="Staff Management"
    subtitle="Manage teaching and non-teaching staff records"
    icon={Users}
    endpoint="/staff"
    columns={columns}
    fields={fields}
    emptyDefaults={{ status: "Active" }}
    searchPlaceholder="Search staff…"
  />
);

export default StaffManagement;
