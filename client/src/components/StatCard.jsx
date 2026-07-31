const StatCard = ({ label, value, icon: Icon, accent = "accent", suffix }) => {
  const accentClasses = {
    accent: "bg-accent/10 text-accent-dark",
    gold: "bg-gold/10 text-[#8a6d1f]",
    red: "bg-red-50 text-red-600",
    blue: "bg-blue-50 text-blue-600",
  };

  return (
    <div className="bg-white rounded-2xl border border-ink-900/[0.06] shadow-card p-5 flex items-start justify-between">
      <div>
        <p className="text-[12.5px] font-medium text-ink-500 mb-1.5">{label}</p>
        <p className="font-display text-2xl font-bold text-ink-900">
          {value}
          {suffix && <span className="text-sm font-semibold text-ink-500 ml-1">{suffix}</span>}
        </p>
      </div>
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${accentClasses[accent]}`}>
        <Icon size={20} strokeWidth={2} />
      </div>
    </div>
  );
};

export default StatCard;
