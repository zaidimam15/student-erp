import { CalendarClock } from "lucide-react";
import CrudPage from "../components/CrudPage";
import Badge from "../components/Badge";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const columns = [
  { key: "className", label: "Class" },
  { key: "section", label: "Section" },
  { key: "day", label: "Day", render: (row) => <Badge color="blue">{row.day}</Badge> },
  { key: "subject", label: "Subject" },
  { key: "teacher", label: "Teacher" },
  { key: "time", label: "Time", render: (row) => `${row.startTime} – ${row.endTime}` },
  { key: "room", label: "Room" },
];

const fields = [
  { name: "className", label: "Class", type: "text", required: true },
  { name: "section", label: "Section", type: "text" },
  { name: "day", label: "Day", type: "select", options: DAYS, required: true },
  { name: "subject", label: "Subject", type: "text", required: true },
  { name: "teacher", label: "Teacher", type: "text" },
  { name: "startTime", label: "Start Time", type: "time", required: true },
  { name: "endTime", label: "End Time", type: "time", required: true },
  { name: "room", label: "Room", type: "text" },
];

const Timetable = () => (
  <CrudPage
    title="Manage Timetable"
    subtitle="Set up class schedules by day and subject"
    icon={CalendarClock}
    endpoint="/timetable"
    columns={columns}
    fields={fields}
    emptyDefaults={{ day: "Monday", section: "A" }}
    searchPlaceholder="Search by class or subject…"
  />
);

export default Timetable;
