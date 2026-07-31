import { FileStack } from "lucide-react";
import CrudPage from "../components/CrudPage";
import Badge from "../components/Badge";

const columns = [
  { key: "title", label: "Title" },
  { key: "type", label: "Type", render: (row) => <Badge color="blue">{row.type}</Badge> },
  { key: "className", label: "Class" },
  { key: "subject", label: "Subject" },
  { key: "dueDate", label: "Due Date", render: (row) => new Date(row.dueDate).toLocaleDateString("en-IN") },
  { key: "status", label: "Status", render: (row) => <Badge>{row.status}</Badge> },
];

const fields = [
  { name: "title", label: "Title", type: "text", required: true, fullWidth: true },
  { name: "type", label: "Type", type: "select", options: ["Assignment", "Paper", "Homework", "Project"], required: true },
  { name: "className", label: "Class", type: "text", required: true },
  { name: "subject", label: "Subject", type: "text", required: true },
  { name: "assignedDate", label: "Assigned Date", type: "date" },
  { name: "dueDate", label: "Due Date", type: "date", required: true },
  { name: "status", label: "Status", type: "select", options: ["Open", "Closed"] },
  { name: "fileUrl", label: "File URL", type: "text", placeholder: "Link to file (optional)" },
  { name: "description", label: "Description", type: "textarea", fullWidth: true },
];

const Assignments = () => (
  <CrudPage
    title="Assignments & Papers"
    subtitle="Distribute and track assignments, homework, and papers"
    icon={FileStack}
    endpoint="/assignments"
    columns={columns}
    fields={fields}
    emptyDefaults={{ type: "Assignment", status: "Open" }}
    searchPlaceholder="Search by title or subject…"
  />
);

export default Assignments;
