import { useState } from "react";
import { UserCircle, KeyRound } from "lucide-react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    designation: user?.designation || "",
  });
  const [pwForm, setPwForm] = useState({ currentPassword: "", newPassword: "" });
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPw, setSavingPw] = useState(false);
  const [msg, setMsg] = useState("");
  const [pwMsg, setPwMsg] = useState("");

  const initials = (user?.name || "A").split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  const saveProfile = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    setMsg("");
    try {
      const res = await api.put("/auth/profile", form);
      updateUser(res.data.user);
      setMsg("Profile updated successfully.");
    } catch (err) {
      setMsg(err.response?.data?.message || "Could not update profile.");
    } finally {
      setSavingProfile(false);
    }
  };

  const savePassword = async (e) => {
    e.preventDefault();
    setSavingPw(true);
    setPwMsg("");
    try {
      await api.put("/auth/password", pwForm);
      setPwMsg("Password changed successfully.");
      setPwForm({ currentPassword: "", newPassword: "" });
    } catch (err) {
      setPwMsg(err.response?.data?.message || "Could not change password.");
    } finally {
      setSavingPw(false);
    }
  };

  const inputCls =
    "w-full px-3.5 py-2.5 rounded-lg border border-ink-900/[0.12] text-[13.5px] focus:border-accent focus:ring-1 focus:ring-accent outline-none bg-white";

  return (
    <div>
      <div className="flex items-center gap-3 mb-7">
        <div className="w-11 h-11 rounded-xl bg-accent/10 text-accent-dark flex items-center justify-center">
          <UserCircle size={20} />
        </div>
        <div>
          <h1 className="font-display text-xl font-bold text-ink-900">My Profile</h1>
          <p className="text-[13px] text-ink-500 mt-0.5">Manage your account details and password.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl border border-ink-900/[0.06] shadow-card p-6 flex flex-col items-center text-center h-fit">
          <div className="w-20 h-20 rounded-full bg-accent/15 text-accent-dark flex items-center justify-center font-display font-bold text-2xl mb-4">
            {initials}
          </div>
          <p className="font-display font-bold text-[16px] text-ink-900">{user?.name}</p>
          <p className="text-[12.5px] text-ink-500 mt-0.5">{user?.email}</p>
          <span className="mt-3 inline-flex px-3 py-1 rounded-full bg-ink-900/[0.05] text-[11.5px] font-semibold text-ink-700 capitalize">
            {user?.role}
          </span>
        </div>

        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-2xl border border-ink-900/[0.06] shadow-card p-6">
            <h2 className="font-display font-bold text-[15px] text-ink-900 mb-4">Personal Information</h2>
            {msg && (
              <div className="mb-4 px-3.5 py-2.5 rounded-lg bg-accent-light border border-accent/20 text-ink-700 text-[12.5px]">
                {msg}
              </div>
            )}
            <form onSubmit={saveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12.5px] font-semibold text-ink-700 mb-1.5">Full Name</label>
                  <input
                    className={inputCls}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-[12.5px] font-semibold text-ink-700 mb-1.5">Email</label>
                  <input className={inputCls} value={user?.email || ""} disabled />
                </div>
                <div>
                  <label className="block text-[12.5px] font-semibold text-ink-700 mb-1.5">Phone</label>
                  <input
                    className={inputCls}
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-[12.5px] font-semibold text-ink-700 mb-1.5">Designation</label>
                  <input
                    className={inputCls}
                    value={form.designation}
                    onChange={(e) => setForm({ ...form, designation: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={savingProfile}
                  className="px-5 py-2.5 rounded-lg text-[13px] font-semibold bg-accent text-white hover:bg-accent-dark transition-colors disabled:opacity-60"
                >
                  {savingProfile ? "Saving…" : "Save changes"}
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white rounded-2xl border border-ink-900/[0.06] shadow-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <KeyRound size={16} className="text-accent-dark" />
              <h2 className="font-display font-bold text-[15px] text-ink-900">Change Password</h2>
            </div>
            {pwMsg && (
              <div className="mb-4 px-3.5 py-2.5 rounded-lg bg-accent-light border border-accent/20 text-ink-700 text-[12.5px]">
                {pwMsg}
              </div>
            )}
            <form onSubmit={savePassword} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12.5px] font-semibold text-ink-700 mb-1.5">Current Password</label>
                  <input
                    type="password"
                    className={inputCls}
                    value={pwForm.currentPassword}
                    onChange={(e) => setPwForm({ ...pwForm, currentPassword: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-[12.5px] font-semibold text-ink-700 mb-1.5">New Password</label>
                  <input
                    type="password"
                    className={inputCls}
                    value={pwForm.newPassword}
                    onChange={(e) => setPwForm({ ...pwForm, newPassword: e.target.value })}
                    minLength={6}
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={savingPw}
                  className="px-5 py-2.5 rounded-lg text-[13px] font-semibold bg-ink-900 text-white hover:bg-ink-800 transition-colors disabled:opacity-60"
                >
                  {savingPw ? "Updating…" : "Update password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
