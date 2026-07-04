const PageHeader = ({ title, subtitle, action }) => {
  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div>
        <h2 className="text-3xl font-bold text-dark">{title}</h2>
        {subtitle && <p className="mt-2 text-muted">{subtitle}</p>}
      </div>

      {action && <div>{action}</div>}
    </div>
  );
};

export default PageHeader;