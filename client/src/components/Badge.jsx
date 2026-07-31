const COLOR_MAP = {
  green: "bg-emerald-50 text-emerald-700 border-emerald-200",
  red: "bg-red-50 text-red-700 border-red-200",
  amber: "bg-amber-50 text-amber-700 border-amber-200",
  blue: "bg-blue-50 text-blue-700 border-blue-200",
  gray: "bg-ink-900/[0.05] text-ink-600 border-ink-900/10",
  gold: "bg-gold/10 text-[#8a6d1f] border-gold/30",
};

const STATUS_COLORS = {
  Active: "green",
  Present: "green",
  Paid: "green",
  Pass: "green",
  Open: "blue",
  Inactive: "gray",
  Absent: "red",
  Unpaid: "red",
  Overdue: "red",
  Fail: "red",
  Late: "amber",
  Partial: "amber",
  Leave: "amber",
  "On Leave": "amber",
  Closed: "gray",
  Graduated: "blue",
  Urgent: "red",
  High: "amber",
  Normal: "blue",
  Low: "gray",
  Income: "green",
  Expense: "red",
};

const Badge = ({ children, color }) => {
  const resolved = color || STATUS_COLORS[children] || "gray";
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11.5px] font-semibold border ${COLOR_MAP[resolved]}`}
    >
      {children}
    </span>
  );
};

export default Badge;
