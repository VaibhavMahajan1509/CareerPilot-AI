import { FileText, Mail, MessageSquare, Code2, Sparkles } from "lucide-react";

const tools = [
  {
    icon: <FileText size={26} />,
    title: "Resume Review",
    text: "Get AI feedback on skills, projects, summary, and improvements.",
  },
  {
    icon: <Mail size={26} />,
    title: "Cover Letter",
    text: "Generate personalized cover letters for each company and role.",
  },
  {
    icon: <MessageSquare size={26} />,
    title: "Interview Questions",
    text: "Prepare role-based questions with clear practice direction.",
  },
  {
    icon: <Code2 size={26} />,
    title: "Project Explanation",
    text: "Turn your project into an interview-ready explanation.",
  },
];

const AITools = () => {
  return (
    <section id="ai-tools" className="bg-dark py-24 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
            <Sparkles className="text-indigo-300" />
          </div>

          <p className="mt-5 font-semibold uppercase tracking-wider text-indigo-300">
            AI Tools
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            Built To Help You Prepare Faster
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-slate-300">
            CareerPilot AI gives job seekers practical AI tools for resumes,
            cover letters, interviews, and project explanations.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool) => (
            <div
              key={tool.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-7 transition hover:-translate-y-2 hover:bg-white/10"
            >
              <div className="inline-flex rounded-2xl bg-indigo-500/20 p-3 text-indigo-300">
                {tool.icon}
              </div>

              <h3 className="mt-6 text-xl font-bold">{tool.title}</h3>

              <p className="mt-3 leading-7 text-slate-300">{tool.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AITools;