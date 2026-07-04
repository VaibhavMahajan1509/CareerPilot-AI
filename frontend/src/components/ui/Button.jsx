const Button = ({ children, variant = "primary", className = "", ...props }) => {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold transition-all duration-200 active:scale-[0.98]";

  const styles = {
    primary: "bg-primary text-white hover:bg-indigo-700 shadow-sm",
    secondary: "border border-border bg-white text-dark hover:bg-slate-50",
    dark: "bg-dark text-white hover:bg-slate-800",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;