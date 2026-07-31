import { Wallet } from "lucide-react";
import CrudPage from "../components/CrudPage";
import Badge from "../components/Badge";

const columns = [
  { key: "studentName", label: "Student" },
  { key: "className", label: "Class" },
  { key: "feeType", label: "Fee Type" },
  { key: "amount", label: "Amount", render: (row) => `₹${row.amount}` },
  { key: "amountPaid", label: "Paid", render: (row) => `₹${row.amountPaid || 0}` },
  { key: "dueDate", label: "Due Date", render: (row) => new Date(row.dueDate).toLocaleDateString("en-IN") },
  { key: "status", label: "Status", render: (row) => <Badge>{row.status}</Badge> },
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
  { name: "feeType", label: "Fee Type", type: "text", required: true, placeholder: "e.g. Tuition Fee, Term 1" },
  { name: "amount", label: "Amount", type: "number", required: true },
  { name: "amountPaid", label: "Amount Paid", type: "number" },
  { name: "dueDate", label: "Due Date", type: "date", required: true },
  { name: "paidDate", label: "Paid Date", type: "date" },
  { name: "status", label: "Status", type: "select", options: ["Paid", "Unpaid", "Partial", "Overdue"], required: true },
  { name: "remarks", label: "Remarks", type: "textarea", fullWidth: true },
];

const ClassFees = () => (
  <CrudPage
    title="Class Fees"
    subtitle="Track fee structure and payment status per student"
    icon={Wallet}
    endpoint="/class-fees"
    columns={columns}
    fields={fields}
    emptyDefaults={{ status: "Unpaid", amountPaid: 0 }}
    searchPlaceholder="Search by student or fee type…"
  />
);

export default ClassFees;
