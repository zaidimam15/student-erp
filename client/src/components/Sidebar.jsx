import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  UserCircle,
  GraduationCap,
  CalendarCheck,
  ClipboardList,
  CalendarClock,
  Wallet,
  NotebookPen,
  Megaphone,
  FileStack,
  Users,
  UserCheck,
  PiggyBank,
  CalendarDays,
  Award,
  School,
  X,
} from "lucide-react";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/profile", label: "My Profile", icon: UserCircle },
  { to: "/students", label: "Students", icon: GraduationCap },
  { to: "/attendance", label: "Attendance", icon: CalendarCheck },
  { to: "/attendance-log", label: "Attendance Log", icon: ClipboardList },
  { to: "/timetable", label: "Manage Timetable", icon: CalendarClock },
  { to: "/class-fees", label: "Class Fees", icon: Wallet },
  { to: "/sessional-marks", label: "Sessional Marks", icon: NotebookPen },
  { to: "/notices", label: "Notices", icon: Megaphone },
  { to: "/assignments", label: "Assignments & Papers", icon: FileStack },
  { to: "/staff-management", label: "Staff Management", icon: Users },
  { to: "/staff-attendance", label: "Staff Attendance", icon: UserCheck },
  { to: "/finance-control", label: "Finance Control", icon: PiggyBank },
  { to: "/exam-schedule", label: "Exam Schedule", icon: CalendarDays },
  { to: "/academic-results", label: "Academic Results", icon: Award },
];

const Sidebar = ({ open, onClose }) => {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-ink-900 text-white flex flex-col z-40 transform transition-transform duration-200 ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between px-6 h-20 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center shrink-0">
              <School size={19} strokeWidth={2.25} className="text-white" />
            </div>
            <div className="leading-tight">
              <p className="font-display font-bold text-[15px] tracking-tight">Greenfield</p>
              <p className="text-[11px] text-white/50 tracking-wide">SCHOOL ERP</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-white/60 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-[13.5px] font-medium transition-colors ${
                  isActive
                    ? "bg-accent text-white shadow-card"
                    : "text-white/65 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <Icon size={17} strokeWidth={2} className="shrink-0" />
              <span className="truncate">{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="px-6 py-4 border-t border-white/10 text-[11px] text-white/35 shrink-0">
          Greenfield School ERP · v1.0
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
