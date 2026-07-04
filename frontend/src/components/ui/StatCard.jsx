const StatCard = ({ title, value, icon, change }) => {
  return (
    <div className="rounded-3xl border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-primary">
          {icon}
        </div>

        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
          Active
        </span>
      </div>

      <h3 className="mt-5 text-sm font-medium text-muted">{title}</h3>
      <p className="mt-2 text-3xl font-bold text-dark">{value}</p>

      {change && <p className="mt-2 text-sm text-muted">{change}</p>}
    </div>
  );
};

export default StatCard;