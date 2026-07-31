const buildRouter = require("./genericRoutes");

const Student = require("../models/Student");
const Attendance = require("../models/Attendance");
const Timetable = require("../models/Timetable");
const ClassFee = require("../models/ClassFee");
const SessionalMark = require("../models/SessionalMark");
const Notice = require("../models/Notice");
const Assignment = require("../models/Assignment");
const Staff = require("../models/Staff");
const StaffAttendance = require("../models/StaffAttendance");
const Finance = require("../models/Finance");
const ExamSchedule = require("../models/ExamSchedule");
const AcademicResult = require("../models/AcademicResult");

module.exports = {
  students: buildRouter(Student, { searchFields: ["name", "admissionNo", "rollNo", "className"] }),
  attendance: buildRouter(Attendance, { searchFields: ["studentName", "className"] }),
  timetable: buildRouter(Timetable, { searchFields: ["className", "subject", "teacher"] }),
  classFees: buildRouter(ClassFee, { searchFields: ["studentName", "className", "feeType"] }),
  sessionalMarks: buildRouter(SessionalMark, { searchFields: ["studentName", "subject", "examName"] }),
  notices: buildRouter(Notice, { searchFields: ["title", "description"] }),
  assignments: buildRouter(Assignment, { searchFields: ["title", "subject", "className"] }),
  staff: buildRouter(Staff, { searchFields: ["name", "staffId", "designation", "department"] }),
  staffAttendance: buildRouter(StaffAttendance, { searchFields: ["staffName", "designation"] }),
  finance: buildRouter(Finance, { searchFields: ["category", "description"] }),
  examSchedule: buildRouter(ExamSchedule, { searchFields: ["examName", "className", "subject"] }),
  academicResults: buildRouter(AcademicResult, { searchFields: ["studentName", "className", "subject", "examName"] }),
};
