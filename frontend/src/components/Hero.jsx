import { ArrowRight, PlayCircle, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import landingpageimage from "../assets/Landing_page.png";

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-indigo-50 via-white to-softBg pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-4 py-2 shadow-sm">
            <Sparkles className="text-primary" size={16} />
            <span className="text-sm font-medium text-primary">
              AI-Powered Career Management Platform
            </span>
          </div>
        </div>

        <div className="mt-8 text-center">
          <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-dark md:text-7xl">
            Land Your Dream Job
            <br />
            <span className="text-primary">With AI</span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-muted">
            Track job applications, improve your resume, generate cover letters,
            prepare for interviews, and manage your entire career journey from
            one modern dashboard.
          </p>
        </div>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            to="/signup"
            className="flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-4 font-semibold text-white transition hover:bg-indigo-700"
          >
            Get Started Free
            <ArrowRight size={18} />
          </Link>

          <a
            href="#features"
            className="flex items-center justify-center gap-2 rounded-xl border border-border bg-white px-7 py-4 font-semibold text-dark transition hover:bg-slate-100"
          >
            <PlayCircle size={18} />
            View Demo
          </a>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted">
            ⭐⭐⭐⭐⭐ Built for developers preparing for their next opportunity
          </p>
        </div>

        <div className="mt-16 flex justify-center">
          <div className="w-full max-w-5xl rounded-[2rem] border border-border bg-white p-4 shadow-2xl">
            <img
              src={landingpageimage}
              alt="Dashboard Preview"
              className="w-full rounded-[1.5rem]"
            />
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-white p-6 text-center shadow-sm">
            <h2 className="text-4xl font-bold text-primary">15K+</h2>
            <p className="mt-2 text-muted">Applications Tracked</p>
          </div>

          <div className="rounded-2xl border border-border bg-white p-6 text-center shadow-sm">
            <h2 className="text-4xl font-bold text-primary">95%</h2>
            <p className="mt-2 text-muted">Resume Score Improvement</p>
          </div>

          <div className="rounded-2xl border border-border bg-white p-6 text-center shadow-sm">
            <h2 className="text-4xl font-bold text-primary">24/7</h2>
            <p className="mt-2 text-muted">AI Career Assistant</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
