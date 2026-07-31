import { Megaphone } from "lucide-react";
import CrudPage from "../components/CrudPage";
import Badge from "../components/Badge";

const columns = [
  { key: "title", label: "Title" },
  { key: "audience", label: "Audience", render: (row) => <Badge color="blue">{row.audience}</Badge> },
  { key: "priority", label: "Priority", render: (row) => <Badge>{row.priority}</Badge> },
  { key: "publishDate", label: "Published", render: (row) => new Date(row.publishDate).toLocaleDateString("en-IN") },
  { key: "postedBy", label: "Posted By" },
];

const fields = [
  { name: "title", label: "Title", type: "text", required: true, fullWidth: true },
  { name: "description", label: "Description", type: "textarea", required: true, fullWidth: true },
  { name: "audience", label: "Audience", type: "select", options: ["All", "Students", "Staff", "Parents"], required: true },
  { name: "priority", label: "Priority", type: "select", options: ["Low", "Normal", "High", "Urgent"], required: true },
  { name: "publishDate", label: "Publish Date", type: "date" },
  { name: "expiryDate", label: "Expiry Date", type: "date" },
  { name: "postedBy", label: "Posted By", type: "text" },
];

const Notices = () => (
  <CrudPage
    title="Notices"
    subtitle="Publish announcements to students, staff, or parents"
    icon={Megaphone}
    endpoint="/notices"
    columns={columns}
    fields={fields}
    emptyDefaults={{ audience: "All", priority: "Normal", postedBy: "Admin" }}
    searchPlaceholder="Search notices…"
  />
);

export default Notices;
