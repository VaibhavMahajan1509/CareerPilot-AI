const Input = ({ className = "", ...props }) => {
  return (
    <input
      className={`w-full rounded-xl border border-border px-4 py-3 outline-none transition focus:border-primary focus:ring-4 focus:ring-indigo-100 ${className}`}
      {...props}
    />
  );
};

export default Input;