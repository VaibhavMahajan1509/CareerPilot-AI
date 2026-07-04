import {
  UserPlus,
  Briefcase,
  FileText,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  {
    icon: <UserPlus size={26} />,
    title: "1. Create Your Account",
    description:
      "Sign up securely and access your personal career dashboard from anywhere.",
  },
  {
    icon: <Briefcase size={26} />,
    title: "2. Track Applications",
    description:
      "Manage every application with company details, role, status, dates, and notes.",
  },
  {
    icon: <FileText size={26} />,
    title: "3. Build & Improve Resume",
    description:
      "Create your resume profile and receive AI-powered feedback to strengthen it.",
  },
  {
    icon: <Sparkles size={26} />,
    title: "4. Prepare With AI",
    description:
      "Generate cover letters, interview questions, project explanations, and quick AI responses—all in one place.",
  },
];

const stats = [
  {
    value: "10+",
    label: "Built-in Features",
  },
  {
    value: "AI",
    label: "Powered Career Tools",
  },
  {
    value: "100%",
    label: "Responsive Design",
  },
];

const Pricing = () => {
  return (
    <section
      id="how-it-works"
      className="bg-gradient-to-b from-white to-indigo-50 py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}

        <div className="text-center">
          <p className="font-semibold uppercase tracking-[0.2em] text-primary">
            How It Works
          </p>

          <h2 className="mt-4 text-4xl font-bold text-dark md:text-5xl">
            Everything You Need In One Platform
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-muted">
            CareerPilot AI combines job tracking, resume management,
            analytics, and AI career tools into one modern dashboard designed
            for students, freshers, and developers.
          </p>
        </div>

        {/* Steps */}

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.title}
              className="group rounded-3xl border border-border bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-primary transition group-hover:scale-110">
                {step.icon}
              </div>

              <h3 className="mt-6 text-xl font-bold text-dark">
                {step.title}
              </h3>

              <p className="mt-4 leading-7 text-muted">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats */}

        <div className="mt-20 rounded-[2rem] bg-dark px-8 py-12 text-white">
          <div className="grid gap-10 md:grid-cols-3">
            {stats.map((item) => (
              <div key={item.label} className="text-center">
                <h3 className="text-5xl font-extrabold text-indigo-300">
                  {item.value}
                </h3>

                <p className="mt-3 text-slate-300">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 border-t border-slate-700 pt-10 text-center">
            <h3 className="text-3xl font-bold">
              Ready to Organize Your Job Search?
            </h3>

            <p className="mx-auto mt-4 max-w-2xl text-slate-300">
              Build your resume, track every application, and prepare for
              interviews using AI-powered tools—all from one dashboard.
            </p>

            <Link
              to="/signup"
              className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-primary px-8 py-4 text-lg font-semibold text-white transition hover:bg-indigo-700"
            >
              Get Started Free
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;