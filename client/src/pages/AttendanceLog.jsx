import { useEffect, useState, useCallback } from "react";
import { ClipboardList, Search } from "lucide-react";
import api from "../api/axios";
import DataTable from "../components/DataTable";
import Badge from "../components/Badge";

const columns = [
  { key: "studentName", label: "Student" },
  { key: "className", label: "Class" },
  { key: "date", label: "Date", render: (row) => new Date(row.date).toLocaleDateString("en-IN") },
  { key: "status", label: "Status", render: (row) => <Badge>{row.status}</Badge> },
  { key: "remarks", label: "Remarks" },
];

const AttendanceLog = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchRows = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/attendance-log", {
        params: { search, sort: "-date", limit: 500 },
      });
      setRows(res.data.data || []);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    const timer = setTimeout(fetchRows, 300);
    return () => clearTimeout(timer);
  }, [fetchRows]);

  const presentCount = rows.filter((r) => r.status === "Present").length;
  const absentCount = rows.filter((r) => r.status === "Absent").length;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-accent/10 text-accent-dark flex items-center justify-center shrink-0">
            <ClipboardList size={20} />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold text-ink-900">Attendance Log</h1>
            <p className="text-[13px] text-ink-500 mt-0.5">
              Full history of attendance records · {presentCount} present · {absentCount} absent shown
            </p>
          </div>
        </div>
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by student or class…"
            className="pl-9 pr-3.5 py-2.5 rounded-lg border border-ink-900/[0.12] text-[13px] w-full sm:w-64 focus:border-accent focus:ring-1 focus:ring-accent outline-none bg-white"
          />
        </div>
      </div>

      <DataTable columns={columns} rows={rows} loading={loading} emptyLabel="No attendance records yet" />
    </div>
  );
};

export default AttendanceLog;
