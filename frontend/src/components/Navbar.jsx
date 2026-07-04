import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "AI Tools", href: "#ai-tools" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "About", href: "#about" },
  ];

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6">
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-2 text-xl font-bold text-slate-900"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <Sparkles size={20} />
          </div>
          CareerPilot AI
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="font-medium text-slate-500 transition hover:text-slate-900"
            >
              {item.name}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Link
            to="/login"
            className="font-medium text-slate-600 transition hover:text-slate-900"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            Get Started
          </Link>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="flex flex-col gap-5 px-6 py-5">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={closeMenu}
                className="font-medium text-slate-600"
              >
                {item.name}
              </a>
            ))}

            <Link
              to="/login"
              onClick={closeMenu}
              className="font-medium text-slate-600"
            >
              Login
            </Link>

            <Link
              to="/signup"
              onClick={closeMenu}
              className="rounded-xl bg-indigo-600 py-3 text-center font-semibold text-white"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;