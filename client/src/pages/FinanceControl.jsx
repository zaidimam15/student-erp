import { PiggyBank } from "lucide-react";
import CrudPage from "../components/CrudPage";
import Badge from "../components/Badge";

const columns = [
  { key: "type", label: "Type", render: (row) => <Badge>{row.type}</Badge> },
  { key: "category", label: "Category" },
  { key: "amount", label: "Amount", render: (row) => `₹${row.amount}` },
  { key: "paymentMethod", label: "Method" },
  { key: "date", label: "Date", render: (row) => new Date(row.date).toLocaleDateString("en-IN") },
  { key: "recordedBy", label: "Recorded By" },
];

const fields = [
  { name: "type", label: "Type", type: "select", options: ["Income", "Expense"], required: true },
  { name: "category", label: "Category", type: "text", required: true, placeholder: "e.g. Tuition, Salaries, Utilities" },
  { name: "amount", label: "Amount", type: "number", required: true },
  { name: "date", label: "Date", type: "date", required: true },
  {
    name: "paymentMethod",
    label: "Payment Method",
    type: "select",
    options: ["Cash", "Bank Transfer", "Cheque", "Online", "Card"],
  },
  { name: "recordedBy", label: "Recorded By", type: "text" },
  { name: "description", label: "Description", type: "textarea", fullWidth: true },
];

const FinanceControl = () => (
  <CrudPage
    title="Finance Control"
    subtitle="Track school income and expenses"
    icon={PiggyBank}
    endpoint="/finance"
    columns={columns}
    fields={fields}
    emptyDefaults={{ type: "Income", paymentMethod: "Cash", recordedBy: "Admin", date: new Date().toISOString().slice(0, 10) }}
    searchPlaceholder="Search by category…"
  />
);

export default FinanceControl;
