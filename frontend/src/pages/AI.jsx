import { useState } from "react";
import {
  Sparkles,
  FileText,
  Mail,
  MessageSquareText,
  Code2,
  ArrowRight,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  KeyRound,
  Lightbulb,
  X,
  Copy,
  Star,
} from "lucide-react";
import toast from "react-hot-toast";

import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import PageHeader from "../components/ui/PageHeader";
import API from "../api/axios";

const initialCoverLetterForm = {
  company: "",
  role: "",
  jobDescription: "",
};

const initialInterviewForm = {
  role: "",
  difficulty: "Beginner",
  questionType: "Both",
};

const initialProjectForm = {
  projectName: "",
  projectDescription: "",
  techStack: "",
};

const AI = () => {
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState(null);

  const [coverLetterModalOpen, setCoverLetterModalOpen] = useState(false);
  const [coverLetterLoading, setCoverLetterLoading] = useState(false);
  const [coverLetterForm, setCoverLetterForm] = useState(
    initialCoverLetterForm,
  );
  const [coverLetterResult, setCoverLetterResult] = useState(null);

  const [interviewModalOpen, setInterviewModalOpen] = useState(false);
  const [interviewLoading, setInterviewLoading] = useState(false);
  const [interviewForm, setInterviewForm] = useState(initialInterviewForm);
  const [interviewResult, setInterviewResult] = useState(null);

  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [projectLoading, setProjectLoading] = useState(false);
  const [projectForm, setProjectForm] = useState(initialProjectForm);
  const [projectResult, setProjectResult] = useState(null);

  const [quickPrompt, setQuickPrompt] = useState("");
  const [quickPromptLoading, setQuickPromptLoading] = useState(false);
  const [quickPromptResult, setQuickPromptResult] = useState(null);

  const clearAllResults = () => {
    setReview(null);
    setCoverLetterResult(null);
    setInterviewResult(null);
    setProjectResult(null);
    setQuickPromptResult(null);
  };

  const handleResumeReview = async () => {
    try {
      setLoading(true);
      clearAllResults();

      const res = await API.post("/ai/resume-review");

      setReview(res.data.data.review);
      toast.success("Resume reviewed successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to review resume");
    } finally {
      setLoading(false);
    }
  };

  const handleCoverLetterChange = (e) => {
    setCoverLetterForm({
      ...coverLetterForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenerateCoverLetter = async (e) => {
    e.preventDefault();

    const { company, role, jobDescription } = coverLetterForm;

    if (!company.trim() || !role.trim() || !jobDescription.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setCoverLetterLoading(true);
      clearAllResults();

      const res = await API.post("/ai/cover-letter", coverLetterForm);

      setCoverLetterResult(res.data.data);
      toast.success("Cover letter generated successfully");

      setCoverLetterModalOpen(false);
      setCoverLetterForm(initialCoverLetterForm);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to generate cover letter",
      );
    } finally {
      setCoverLetterLoading(false);
    }
  };

  const handleCopyCoverLetter = async () => {
    try {
      await navigator.clipboard.writeText(coverLetterResult.coverLetter);
      toast.success("Cover letter copied to clipboard");
    } catch (error) {
      toast.error("Failed to copy cover letter");
    }
  };

  const handleInterviewChange = (e) => {
    setInterviewForm({
      ...interviewForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenerateInterviewQuestions = async (e) => {
    e.preventDefault();

    const { role, difficulty, questionType } = interviewForm;

    if (!role.trim() || !difficulty || !questionType) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setInterviewLoading(true);
      clearAllResults();

      const res = await API.post("/ai/interview-questions", interviewForm);

      setInterviewResult(res.data.data);
      toast.success("Interview questions generated successfully");

      setInterviewModalOpen(false);
      setInterviewForm(initialInterviewForm);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to generate interview questions",
      );
    } finally {
      setInterviewLoading(false);
    }
  };

  const handleProjectChange = (e) => {
    setProjectForm({
      ...projectForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenerateProjectExplanation = async (e) => {
    e.preventDefault();

    const { projectName, projectDescription, techStack } = projectForm;

    if (
      !projectName.trim() ||
      !projectDescription.trim() ||
      !techStack.trim()
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setProjectLoading(true);
      clearAllResults();

      const res = await API.post("/ai/project-explanation", projectForm);

      setProjectResult(res.data.data);
      toast.success("Project explanation generated successfully");

      setProjectModalOpen(false);
      setProjectForm(initialProjectForm);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to generate project explanation",
      );
    } finally {
      setProjectLoading(false);
    }
  };

  const handleQuickPrompt = async () => {
    if (!quickPrompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    try {
      setQuickPromptLoading(true);
      clearAllResults();

      const res = await API.post("/ai/quick-prompt", {
        prompt: quickPrompt,
      });

      setQuickPromptResult(res.data.data);
      toast.success("AI response generated successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to generate AI response",
      );
    } finally {
      setQuickPromptLoading(false);
    }
  };

  const aiTools = [
    {
      icon: <FileText size={26} />,
      title: "Resume Review",
      description:
        "Get AI feedback on resume strength, keywords, and improvements.",
      loading,
      onClick: handleResumeReview,
      actionLabel: "Review Resume",
      loadingLabel: "Reviewing...",
    },
    {
      icon: <Mail size={26} />,
      title: "Cover Letter Generator",
      description:
        "Generate personalized cover letters based on job descriptions.",
      loading: false,
      onClick: () => setCoverLetterModalOpen(true),
      actionLabel: "Generate Cover Letter",
      loadingLabel: "Generating...",
    },
    {
      icon: <MessageSquareText size={26} />,
      title: "Interview Questions",
      description:
        "Prepare role-specific technical and HR interview questions.",
      loading: false,
      onClick: () => setInterviewModalOpen(true),
      actionLabel: "Generate Questions",
      loadingLabel: "Generating...",
    },
    {
      icon: <Code2 size={26} />,
      title: "Project Explanation",
      description:
        "Create interview-ready explanations for your MERN projects.",
      loading: false,
      onClick: () => setProjectModalOpen(true),
      actionLabel: "Explain Project",
      loadingLabel: "Generating...",
    },
  ];

  const renderList = (items) => {
    if (!items || items.length === 0) {
      return <p className="text-sm text-muted">No suggestions available.</p>;
    }

    return (
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex gap-3 text-sm leading-6 text-slate-700"
          >
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Assistant"
        subtitle="Use AI to improve your resume, cover letters, interview prep, and project explanations."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {aiTools.map((tool) => (
          <Card
            key={tool.title}
            className="transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-primary">
              {tool.icon}
            </div>

            <h3 className="mt-5 text-xl font-bold text-dark">{tool.title}</h3>
            <p className="mt-3 leading-7 text-muted">{tool.description}</p>

            <button
              onClick={tool.onClick}
              disabled={tool.loading}
              className="mt-6 flex items-center gap-2 font-semibold text-primary disabled:cursor-not-allowed disabled:opacity-70"
            >
              {tool.loading ? (
                <>
                  <Loader2 size={17} className="animate-spin" />
                  {tool.loadingLabel}
                </>
              ) : (
                <>
                  {tool.actionLabel}
                  <ArrowRight size={17} />
                </>
              )}
            </button>
          </Card>
        ))}
      </div>

      {review && (
        <div className="space-y-6">
          <Card>
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-primary">
                  <Sparkles size={22} />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-dark">
                    AI Resume Review
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    Gemini analyzed your saved resume and generated structured
                    feedback.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-indigo-50 px-6 py-4 text-center">
                <p className="text-sm font-semibold text-muted">Resume Score</p>
                <p className="mt-1 text-4xl font-bold text-primary">
                  {review.score}/100
                </p>
              </div>
            </div>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <CheckCircle2 size={20} />
                </div>
                <h3 className="text-lg font-bold text-dark">Strong Points</h3>
              </div>
              {renderList(review.strongPoints)}
            </Card>

            <Card>
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
                  <AlertTriangle size={20} />
                </div>
                <h3 className="text-lg font-bold text-dark">Weak Points</h3>
              </div>
              {renderList(review.weakPoints)}
            </Card>

            <Card>
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-primary">
                  <KeyRound size={20} />
                </div>
                <h3 className="text-lg font-bold text-dark">
                  Missing Keywords
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {review.missingKeywords?.length > 0 ? (
                  review.missingKeywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-primary"
                    >
                      {keyword}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-muted">
                    No missing keywords found.
                  </p>
                )}
              </div>
            </Card>

            <Card>
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <Lightbulb size={20} />
                </div>
                <h3 className="text-lg font-bold text-dark">
                  Project Suggestions
                </h3>
              </div>
              {renderList(review.projectSuggestions)}
            </Card>
          </div>

          <Card>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-primary">
                <FileText size={20} />
              </div>
              <h3 className="text-lg font-bold text-dark">Improved Summary</h3>
            </div>

            <p className="rounded-2xl bg-softBg p-5 text-sm leading-7 text-slate-700">
              {review.improvedSummary}
            </p>
          </Card>
        </div>
      )}

      {coverLetterResult && (
        <Card>
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-primary">
                <Mail size={22} />
              </div>

              <div>
                <h3 className="text-xl font-bold text-dark">
                  AI Generated Cover Letter
                </h3>
                <p className="mt-1 text-sm text-muted">
                  Personalized using your saved resume and the job details you
                  provided.
                </p>
              </div>
            </div>

            <Button variant="secondary" onClick={handleCopyCoverLetter}>
              <Copy size={18} />
              Copy Cover Letter
            </Button>
          </div>

          <p className="mt-6 whitespace-pre-line rounded-2xl bg-softBg p-5 text-sm leading-7 text-slate-700">
            {coverLetterResult.coverLetter}
          </p>

          {coverLetterResult.keyHighlights?.length > 0 && (
            <div className="mt-6">
              <div className="mb-3 flex items-center gap-2">
                <Star size={18} className="text-amber-500" />
                <h4 className="text-sm font-bold text-dark">Key Highlights</h4>
              </div>

              <div className="flex flex-wrap gap-2">
                {coverLetterResult.keyHighlights.map((highlight, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-primary"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          )}
        </Card>
      )}

      {interviewResult && (
        <Card>
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-primary">
              <MessageSquareText size={22} />
            </div>

            <div>
              <h3 className="text-xl font-bold text-dark">
                AI Generated Interview Questions
              </h3>
              <p className="mt-1 text-sm text-muted">
                Personalized using your saved resume, selected role, difficulty,
                and question type.
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-5">
            {interviewResult.questions?.length > 0 ? (
              interviewResult.questions.map((item, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-border bg-softBg p-5"
                >
                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-primary">
                    {item.type}
                  </span>

                  <h4 className="mt-4 font-bold leading-7 text-dark">
                    Q{index + 1}. {item.question}
                  </h4>

                  <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-700">
                    {item.answer}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted">No questions generated.</p>
            )}
          </div>
        </Card>
      )}

      {projectResult && (
        <Card>
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-primary">
              <Code2 size={22} />
            </div>

            <div>
              <h3 className="text-xl font-bold text-dark">
                AI Generated Project Explanation
              </h3>
              <p className="mt-1 text-sm text-muted">
                Interview-ready explanation for your project.
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-5">
            <div className="rounded-2xl bg-softBg p-5">
              <h4 className="font-bold text-dark">Project Overview</h4>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                {projectResult.projectOverview}
              </p>
            </div>

            <div className="rounded-2xl bg-softBg p-5">
              <h4 className="font-bold text-dark">Problem Solved</h4>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                {projectResult.problemSolved}
              </p>
            </div>

            <div className="rounded-2xl bg-softBg p-5">
              <h4 className="font-bold text-dark">Key Features</h4>
              {renderList(projectResult.keyFeatures)}
            </div>

            <div className="rounded-2xl bg-softBg p-5">
              <h4 className="font-bold text-dark">Tech Stack</h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {projectResult.techStack?.map((tech, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-primary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              <div className="rounded-2xl bg-softBg p-5">
                <h4 className="font-bold text-dark">Frontend</h4>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  {projectResult.frontendExplanation}
                </p>
              </div>

              <div className="rounded-2xl bg-softBg p-5">
                <h4 className="font-bold text-dark">Backend</h4>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  {projectResult.backendExplanation}
                </p>
              </div>

              <div className="rounded-2xl bg-softBg p-5">
                <h4 className="font-bold text-dark">Database</h4>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  {projectResult.databaseExplanation}
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-indigo-50 p-5">
              <h4 className="font-bold text-dark">Interview Pitch</h4>
              <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-700">
                {projectResult.interviewPitch}
              </p>
            </div>

            <div className="rounded-2xl bg-softBg p-5">
              <h4 className="font-bold text-dark">
                Possible Interview Questions
              </h4>

              <div className="mt-4 space-y-4">
                {projectResult.possibleQuestions?.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-border bg-white p-4"
                  >
                    <h5 className="font-semibold text-dark">
                      Q{index + 1}. {item.question}
                    </h5>
                    <p className="mt-2 text-sm leading-7 text-slate-700">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}

      <Card>
        <h3 className="text-xl font-bold text-dark">Quick AI Prompt</h3>
        <p className="mt-2 text-muted">
          Ask anything related to resumes, interviews, MERN stack, or your
          career prep.
        </p>

        <textarea
          value={quickPrompt}
          onChange={(e) => setQuickPrompt(e.target.value)}
          placeholder="Example: Explain JWT authentication in my CareerPilot AI project..."
          className="mt-5 min-h-36 w-full rounded-2xl border border-border bg-white px-4 py-3 outline-none focus:border-primary"
        />

        <Button
          className="mt-4"
          onClick={handleQuickPrompt}
          disabled={quickPromptLoading}
        >
          {quickPromptLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles size={18} />
              Generate Response
            </>
          )}
        </Button>

        {quickPromptResult && (
          <div className="mt-6 rounded-2xl bg-softBg p-5">
            <h4 className="mb-3 font-bold text-dark">AI Response</h4>
            <p className="whitespace-pre-line text-sm leading-7 text-slate-700">
              {quickPromptResult.response}
            </p>
          </div>
        )}
      </Card>

      {coverLetterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <Card className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto">
            <button
              onClick={() => setCoverLetterModalOpen(false)}
              className="absolute right-5 top-5 text-muted transition hover:text-dark"
            >
              <X size={22} />
            </button>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-primary">
              <Mail size={22} />
            </div>

            <h3 className="mt-5 text-xl font-bold text-dark">
              Generate Cover Letter
            </h3>

            <p className="mt-2 text-sm text-muted">
              Fill in the job details below and Gemini will craft a personalized
              cover letter using your saved resume.
            </p>

            <form
              onSubmit={handleGenerateCoverLetter}
              className="mt-6 space-y-4"
            >
              <input
                type="text"
                name="company"
                value={coverLetterForm.company}
                onChange={handleCoverLetterChange}
                placeholder="Company"
                className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
                required
              />

              <input
                type="text"
                name="role"
                value={coverLetterForm.role}
                onChange={handleCoverLetterChange}
                placeholder="Role"
                className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
                required
              />

              <textarea
                name="jobDescription"
                value={coverLetterForm.jobDescription}
                onChange={handleCoverLetterChange}
                placeholder="Paste the job description here..."
                rows={5}
                className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
                required
              />

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="secondary"
                  className="flex-1"
                  onClick={() => setCoverLetterModalOpen(false)}
                  disabled={coverLetterLoading}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  variant="primary"
                  className="flex-1"
                  disabled={coverLetterLoading}
                >
                  {coverLetterLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles size={18} />
                      Generate
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {projectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <Card className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto">
            <button
              onClick={() => setProjectModalOpen(false)}
              className="absolute right-5 top-5 text-muted transition hover:text-dark"
            >
              <X size={22} />
            </button>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-primary">
              <Code2 size={22} />
            </div>

            <h3 className="mt-5 text-xl font-bold text-dark">
              Generate Project Explanation
            </h3>

            <p className="mt-2 text-sm text-muted">
              Add your project details and Gemini will create an interview-ready
              explanation.
            </p>

            <form
              onSubmit={handleGenerateProjectExplanation}
              className="mt-6 space-y-4"
            >
              <input
                type="text"
                name="projectName"
                value={projectForm.projectName}
                onChange={handleProjectChange}
                placeholder="Project Name"
                className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
                required
              />

              <textarea
                name="projectDescription"
                value={projectForm.projectDescription}
                onChange={handleProjectChange}
                placeholder="Explain what your project does..."
                rows={5}
                className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
                required
              />

              <input
                type="text"
                name="techStack"
                value={projectForm.techStack}
                onChange={handleProjectChange}
                placeholder="React, Node.js, Express, MongoDB, Gemini API"
                className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
                required
              />

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="secondary"
                  className="flex-1"
                  onClick={() => setProjectModalOpen(false)}
                  disabled={projectLoading}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  variant="primary"
                  className="flex-1"
                  disabled={projectLoading}
                >
                  {projectLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles size={18} />
                      Generate
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {interviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <Card className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto">
            <button
              onClick={() => setInterviewModalOpen(false)}
              className="absolute right-5 top-5 text-muted transition hover:text-dark"
            >
              <X size={22} />
            </button>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-primary">
              <MessageSquareText size={22} />
            </div>

            <h3 className="mt-5 text-xl font-bold text-dark">
              Generate Interview Questions
            </h3>

            <p className="mt-2 text-sm text-muted">
              Fill in interview details and Gemini will generate questions using
              your saved resume and projects.
            </p>

            <form
              onSubmit={handleGenerateInterviewQuestions}
              className="mt-6 space-y-4"
            >
              <input
                type="text"
                name="role"
                value={interviewForm.role}
                onChange={handleInterviewChange}
                placeholder="Role"
                className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
                required
              />

              <select
                name="difficulty"
                value={interviewForm.difficulty}
                onChange={handleInterviewChange}
                className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>

              <select
                name="questionType"
                value={interviewForm.questionType}
                onChange={handleInterviewChange}
                className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
              >
                <option value="Technical">Technical</option>
                <option value="HR">HR</option>
                <option value="Both">Both</option>
              </select>

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="secondary"
                  className="flex-1"
                  onClick={() => setInterviewModalOpen(false)}
                  disabled={interviewLoading}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  variant="primary"
                  className="flex-1"
                  disabled={interviewLoading}
                >
                  {interviewLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles size={18} />
                      Generate
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AI;
