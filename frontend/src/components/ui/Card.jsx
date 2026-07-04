const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`rounded-3xl border border-border bg-white p-6 shadow-sm transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;