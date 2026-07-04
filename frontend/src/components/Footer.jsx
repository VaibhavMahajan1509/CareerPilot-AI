import { Sparkles } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid gap-10 md:grid-cols-4">

          {/* Logo */}

          <div>

            <div className="flex items-center gap-2">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                <Sparkles size={20} />
              </div>

              <h2 className="text-xl font-bold">
                CareerPilot AI
              </h2>

            </div>

            <p className="mt-5 leading-7 text-slate-400">
              AI-powered career management platform helping developers track
              applications, improve resumes, and prepare for interviews.
            </p>

          </div>

          {/* Product */}

          <div>

            <h3 className="font-semibold text-lg">
              Product
            </h3>

            <ul className="mt-5 space-y-3 text-slate-400">

              <li>Dashboard</li>
              <li>Applications</li>
              <li>Resume Review</li>
              <li>AI Assistant</li>

            </ul>

          </div>

          {/* Company */}

          <div>

            <h3 className="font-semibold text-lg">
              Company
            </h3>

            <ul className="mt-5 space-y-3 text-slate-400">

              <li>About</li>
              <li>Features</li>
              <li>Pricing</li>
              <li>Contact</li>

            </ul>

          </div>

          {/* Legal */}

          <div>

            <h3 className="font-semibold text-lg">
              Legal
            </h3>

            <ul className="mt-5 space-y-3 text-slate-400">

              <li>Privacy Policy</li>
              <li>Terms of Service</li>

            </ul>

          </div>

        </div>

        <div className="mt-16 border-t border-slate-700 pt-8 text-center text-slate-500">

          © 2026 CareerPilot AI. Built with ❤️ using React, Node.js &
          MongoDB.

        </div>

      </div>
    </footer>
  );
};

export default Footer;