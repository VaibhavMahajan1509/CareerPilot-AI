import {
  Briefcase,
  FileText,
  Sparkles,
  BarChart3,
  ClipboardCheck,
  Bot,
} from "lucide-react";

const features = [
  {
    icon: <Briefcase size={30} />,
    title: "Track Applications",
    description:
      "Manage every job application with status, deadlines, and notes.",
  },
  {
    icon: <FileText size={30} />,
    title: "Resume Manager",
    description:
      "Upload, organize, and review resumes from one dashboard.",
  },
  {
    icon: <Sparkles size={30} />,
    title: "AI Resume Review",
    description:
      "Receive instant AI-powered suggestions to improve your resume.",
  },
  {
    icon: <ClipboardCheck size={30} />,
    title: "Interview Preparation",
    description:
      "Generate interview questions based on your target role.",
  },
  {
    icon: <Bot size={30} />,
    title: "Cover Letter Generator",
    description:
      "Create personalized cover letters in seconds using AI.",
  },
  {
    icon: <BarChart3 size={30} />,
    title: "Analytics Dashboard",
    description:
      "Monitor applications, interviews, offers, and overall progress.",
  },
];

const Features = () => {
  return (
    <section id="features" className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <p className="font-semibold text-primary uppercase tracking-wider">
            Features
          </p>

          <h2 className="mt-3 text-4xl font-bold text-dark">
            Everything You Need To Land Your Next Job
          </h2>

          <p className="mt-5 max-w-2xl mx-auto text-muted">
            CareerPilot AI combines job tracking, AI tools, resume management,
            and analytics into one modern platform.
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-2xl border border-border bg-softBg p-8 transition hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="inline-flex rounded-xl bg-indigo-100 p-3 text-primary">
                {feature.icon}
              </div>

              <h3 className="mt-6 text-xl font-bold text-dark">
                {feature.title}
              </h3>

              <p className="mt-3 leading-7 text-muted">
                {feature.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Features;