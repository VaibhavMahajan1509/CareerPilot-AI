import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import landingpageimage from "../assets/Landing_page.png";

const DashboardPreview = () => {
  return (
    <section className="bg-softBg py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center">
          <p className="font-semibold uppercase tracking-wider text-primary">
            Dashboard
          </p>

          <h2 className="mt-3 text-4xl font-bold text-dark">
            Everything Organized In One Dashboard
          </h2>

          <p className="mt-5 max-w-3xl mx-auto text-lg text-muted">
            Monitor applications, interviews, offers, deadlines, and AI insights
            through a clean dashboard designed for job seekers.
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
        
        <div className="mt-12 flex justify-center">
          <Link
            to="/signup"
            className="flex items-center gap-2 rounded-xl bg-primary px-7 py-4 font-semibold text-white transition hover:bg-indigo-700"
          >
            Explore Dashboard
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
