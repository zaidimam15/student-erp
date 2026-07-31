import { useEffect, useState } from "react";
import {
  GraduationCap,
  Users,
  CalendarCheck,
  Wallet,
  Megaphone,
  CalendarDays,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import api from "../api/axios";
import StatCard from "../components/StatCard";
import Badge from "../components/Badge";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    api
      .get("/dashboard/stats")
      .then((res) => setStats(res.data.data))
      .finally(() => setLoading(false));
  }, []);

  const fmtMoney = (n) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n || 0);

  const fmtDate = (d) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short" });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-[3px] border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-7">
        <h1 className="font-display text-2xl font-bold text-ink-900">Welcome back, {user?.name?.split(" ")[0]}</h1>
        <p className="text-ink-500 text-[13.5px] mt-1">Here's what's happening across the school today.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Students" value={stats.totalStudents} icon={GraduationCap} accent="accent" />
        <StatCard label="Active Staff" value={stats.totalStaff} icon={Users} accent="blue" />
        <StatCard
          label="Present Today"
          value={stats.presentToday}
          suffix={`/ ${stats.attendanceMarkedToday}`}
          icon={CalendarCheck}
          accent="accent"
        />
        <StatCard label="Pending Fees" value={stats.pendingFees} icon={Wallet} accent="gold" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-ink-900/[0.06] shadow-card p-6">
          <h2 className="font-display font-bold text-[15px] text-ink-900 mb-5">Finance Overview</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
              <div className="flex items-center gap-1.5 text-emerald-700 mb-1.5">
                <TrendingUp size={15} />
                <span className="text-[11.5px] font-bold uppercase tracking-wide">Income</span>
              </div>
              <p className="font-display font-bold text-lg text-ink-900">{fmtMoney(stats.income)}</p>
            </div>
            <div className="p-4 rounded-xl bg-red-50 border border-red-100">
              <div className="flex items-center gap-1.5 text-red-600 mb-1.5">
                <TrendingDown size={15} />
                <span className="text-[11.5px] font-bold uppercase tracking-wide">Expense</span>
              </div>
              <p className="font-display font-bold text-lg text-ink-900">{fmtMoney(stats.expense)}</p>
            </div>
            <div className="p-4 rounded-xl bg-accent-light border border-accent/20">
              <div className="flex items-center gap-1.5 text-accent-dark mb-1.5">
                <Wallet size={15} />
                <span className="text-[11.5px] font-bold uppercase tracking-wide">Balance</span>
              </div>
              <p className="font-display font-bold text-lg text-ink-900">{fmtMoney(stats.balance)}</p>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-ink-900/[0.06] grid grid-cols-2 gap-4">
            <div>
              <p className="text-[12px] text-ink-500 mb-1">Open Assignments</p>
              <p className="font-display font-bold text-xl text-ink-900">{stats.openAssignments}</p>
            </div>
            <div>
              <p className="text-[12px] text-ink-500 mb-1">Absent Today</p>
              <p className="font-display font-bold text-xl text-ink-900">{stats.absentToday}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-ink-900/[0.06] shadow-card p-6">
          <div className="flex items-center gap-2 mb-5">
            <Megaphone size={16} className="text-accent-dark" />
            <h2 className="font-display font-bold text-[15px] text-ink-900">Recent Notices</h2>
          </div>
          {stats.recentNotices?.length ? (
            <div className="space-y-3.5">
              {stats.recentNotices.map((n) => (
                <div key={n._id} className="pb-3.5 border-b border-ink-900/[0.05] last:border-0 last:pb-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="text-[13px] font-semibold text-ink-900 leading-snug">{n.title}</p>
                    <Badge>{n.priority}</Badge>
                  </div>
                  <p className="text-[11.5px] text-ink-500">{fmtDate(n.publishDate)}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[13px] text-ink-500">No notices yet.</p>
          )}
        </div>
      </div>

      <div className="mt-5 bg-white rounded-2xl border border-ink-900/[0.06] shadow-card p-6">
        <div className="flex items-center gap-2 mb-5">
          <CalendarDays size={16} className="text-accent-dark" />
          <h2 className="font-display font-bold text-[15px] text-ink-900">Upcoming Exams</h2>
        </div>
        {stats.upcomingExams?.length ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-ink-900/[0.07]">
                  <th className="pb-2.5 text-[11px] font-bold uppercase tracking-wide text-ink-500">Exam</th>
                  <th className="pb-2.5 text-[11px] font-bold uppercase tracking-wide text-ink-500">Class</th>
                  <th className="pb-2.5 text-[11px] font-bold uppercase tracking-wide text-ink-500">Subject</th>
                  <th className="pb-2.5 text-[11px] font-bold uppercase tracking-wide text-ink-500">Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.upcomingExams.map((ex) => (
                  <tr key={ex._id} className="border-b border-ink-900/[0.05] last:border-0">
                    <td className="py-2.5 text-[13px] text-ink-800">{ex.examName}</td>
                    <td className="py-2.5 text-[13px] text-ink-800">{ex.className}</td>
                    <td className="py-2.5 text-[13px] text-ink-800">{ex.subject}</td>
                    <td className="py-2.5 text-[13px] text-ink-800">{fmtDate(ex.examDate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-[13px] text-ink-500">No upcoming exams scheduled.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
