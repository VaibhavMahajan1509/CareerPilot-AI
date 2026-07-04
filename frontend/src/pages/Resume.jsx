import { useEffect, useState } from "react";
import { FileText, Sparkles, Trash2, Save } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import PageHeader from "../components/ui/PageHeader";
import Input from "../components/ui/Input";
import API from "../api/axios";

const Resume = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [resumeExists, setResumeExists] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    skills: "",
    experience: "",
    education: "",
    projects: "",
  });

  const fetchResume = async () => {
    try {
      setLoading(true);

      const res = await API.get("/resume");
      const resume = res.data.data.resume;

      setResumeExists(true);

      setFormData({
        title: resume.title || "",
        summary: resume.summary || "",
        skills: resume.skills?.join(", ") || "",
        experience: resume.experience || "",
        education: resume.education || "",
        projects: resume.projects || "",
      });
    } catch (error) {
      if (error.response?.status !== 404) {
        toast.error("Failed to load resume");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResume();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveResume = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const payload = {
        ...formData,
        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
      };

      await API.post("/resume", payload);

      setResumeExists(true);
      toast.success("Resume saved successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save resume");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteResume = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your resume?",
    );

    if (!confirmDelete) return;

    try {
      await API.delete("/resume");

      setResumeExists(false);
      setFormData({
        title: "",
        summary: "",
        skills: "",
        experience: "",
        education: "",
        projects: "",
      });

      toast.success("Resume deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete resume");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Resume Manager"
        subtitle="Build, save, and prepare your resume for AI-powered feedback."
      />

      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-dark">Resume Builder</h3>
              <p className="mt-2 text-muted">
                Add your resume details once. Later, AI will review this saved
                data.
              </p>
            </div>

            {resumeExists && (
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-600">
                Saved
              </span>
            )}
          </div>

          {loading ? (
            <p className="py-16 text-center text-muted">Loading resume...</p>
          ) : (
            <form onSubmit={handleSaveResume} className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-dark">
                  Resume Title
                </label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="MERN Developer Resume"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-dark">
                  Professional Summary
                </label>
                <textarea
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                  placeholder="Write a short summary about your skills, experience, and career goal..."
                  className="min-h-32 w-full rounded-2xl border border-border px-4 py-3 outline-none focus:border-primary focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-dark">
                  Skills
                </label>
                <Input
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="React, Node.js, Express, MongoDB, Tailwind CSS"
                />
                <p className="mt-1 text-xs text-muted">
                  Separate skills using commas.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-dark">
                  Experience
                </label>
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="Mention internship, work experience, responsibilities, and achievements..."
                  className="min-h-36 w-full rounded-2xl border border-border px-4 py-3 outline-none focus:border-primary focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-dark">
                  Education
                </label>
                <textarea
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  placeholder="Mention degree, college, year, and relevant coursework..."
                  className="min-h-28 w-full rounded-2xl border border-border px-4 py-3 outline-none focus:border-primary focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-dark">
                  Projects
                </label>
                <textarea
                  name="projects"
                  value={formData.projects}
                  onChange={handleChange}
                  placeholder="Describe your best projects with tech stack, features, and impact..."
                  className="min-h-40 w-full rounded-2xl border border-border px-4 py-3 outline-none focus:border-primary focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                {resumeExists && (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleDeleteResume}
                  >
                    <Trash2 size={18} />
                    Delete Resume
                  </Button>
                )}

                <Button type="submit" disabled={saving}>
                  <Save size={18} />
                  {saving ? "Saving..." : "Save Resume"}
                </Button>
              </div>
            </form>
          )}
        </Card>

        <Card className="bg-dark text-white">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
            <Sparkles />
          </div>

          <p className="mt-6 text-sm font-semibold text-indigo-300">
            AI Ready Resume
          </p>

          <h3 className="mt-3 text-3xl font-bold">
            {resumeExists ? "Ready for Review" : "Build your resume"}
          </h3>

          <p className="mt-4 leading-7 text-slate-300">
            {resumeExists
              ? "Your resume data is saved. Soon, Gemini AI will analyze this content and suggest improvements."
              : "Save your resume details first. Then AI features can provide personalized feedback."}
          </p>

          <div className="mt-6 rounded-2xl bg-white/10 p-4">
            <p className="font-semibold">Product Flow</p>
            <p className="mt-2 text-sm text-slate-300">
              Resume Builder → MongoDB → Gemini AI Review → Improvement
              Suggestions
            </p>
          </div>

          <Button
            variant="secondary"
            className="mt-6"
            disabled={!resumeExists}
            onClick={() => navigate("/ai")}
          >
            <Sparkles size={18} />
            Review with AI
          </Button>
        </Card>
      </div>

      <Card>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-primary">
            <FileText size={22} />
          </div>

          <div>
            <h3 className="text-xl font-bold text-dark">Saved Resume Status</h3>
            <p className="mt-1 text-sm text-muted">
              {resumeExists
                ? "Your resume is saved and ready for AI analysis."
                : "No resume saved yet. Fill the builder above and save it."}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Resume;
