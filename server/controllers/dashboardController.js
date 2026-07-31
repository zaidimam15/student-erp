const Student = require("../models/Student");
const Staff = require("../models/Staff");
const Attendance = require("../models/Attendance");
const Notice = require("../models/Notice");
const Finance = require("../models/Finance");
const ClassFee = require("../models/ClassFee");
const ExamSchedule = require("../models/ExamSchedule");
const Assignment = require("../models/Assignment");

const getStats = async (req, res) => {
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const [
      totalStudents,
      activeStudents,
      totalStaff,
      todayAttendance,
      recentNotices,
      pendingFees,
      upcomingExams,
      openAssignments,
      financeAgg,
    ] = await Promise.all([
      Student.countDocuments(),
      Student.countDocuments({ status: "Active" }),
      Staff.countDocuments({ status: "Active" }),
      Attendance.find({ date: { $gte: todayStart, $lte: todayEnd } }),
      Notice.find().sort("-createdAt").limit(5),
      ClassFee.countDocuments({ status: { $in: ["Unpaid", "Overdue", "Partial"] } }),
      ExamSchedule.find({ examDate: { $gte: todayStart } }).sort("examDate").limit(5),
      Assignment.countDocuments({ status: "Open" }),
      Finance.aggregate([
        { $group: { _id: "$type", total: { $sum: "$amount" } } },
      ]),
    ]);

    const presentToday = todayAttendance.filter((a) => a.status === "Present").length;
    const absentToday = todayAttendance.filter((a) => a.status === "Absent").length;

    const income = financeAgg.find((f) => f._id === "Income")?.total || 0;
    const expense = financeAgg.find((f) => f._id === "Expense")?.total || 0;

    res.json({
      success: true,
      data: {
        totalStudents,
        activeStudents,
        totalStaff,
        presentToday,
        absentToday,
        attendanceMarkedToday: todayAttendance.length,
        pendingFees,
        openAssignments,
        income,
        expense,
        balance: income - expense,
        recentNotices,
        upcomingExams,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getStats };
