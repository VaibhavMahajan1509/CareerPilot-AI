import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  CalendarClock,
  CheckCircle2,
  XCircle,
  Sparkles,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import Card from "../components/ui/Card";
import StatCard from "../components/ui/StatCard";
import PageHeader from "../components/ui/PageHeader";
import Button from "../components/ui/Button";
import API from "../api/axios";

const Dashboard = () => {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await API.get("/applications");
      setApplications(res.data.data.applications);
    } catch (error) {
      console.log("Failed to fetch dashboard data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const totalApplications = applications.length;
  const interviews = applications.filter(
    (app) => app.status === "Interview"
  ).length;
  const offers = applications.filter((app) => app.status === "Offer").length;
  const rejected = applications.filter(
    (app) => app.status === "Rejected"
  ).length;

  const stats = [
    {
      title: "Total Applications",
      value: totalApplications,
      icon: <Briefcase />,
      change: "All tracked jobs",
    },
    {
      title: "Interviews",
      value: interviews,
      icon: <CalendarClock />,
      change: "Active opportunities",
    },
    {
      title: "Offers",
      value: offers,
      icon: <CheckCircle2 />,
      change: offers > 0 ? "Great progress" : "Keep applying",
    },
    {
      title: "Rejected",
      value: rejected,
      icon: <XCircle />,
      change: "Part of the process",
    },
  ];

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const applicationActivity = weekDays.map((day) => ({
    day,
    applications: 0,
  }));

  applications.forEach((app) => {
    if (!app.appliedDate) return;

    const date = new Date(app.appliedDate);
    const dayName = weekDays[date.getDay()];

    const dayData = applicationActivity.find((item) => item.day === dayName);

    if (dayData) {
      dayData.applications += 1;
    }
  });

  const recentApplications = applications.slice(0, 5);

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        subtitle="Track your job search progress and AI career insights."
        action={
          <Button onClick={() => navigate("/resume")}>Review Resume</Button>
        }
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={loading ? "..." : stat.value}
            icon={stat.icon}
            change={stat.change}
          />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <div>
            <h3 className="text-xl font-bold text-dark">
              Application Activity
            </h3>
            <p className="mt-1 text-sm text-muted">
              Applications grouped by weekday
            </p>
          </div>

          <div className="mt-8 h-72 rounded-2xl bg-softBg p-5">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={applicationActivity}>
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748B", fontSize: 12 }}
                />
                <Tooltip />
                <Bar
                  dataKey="applications"
                  radius={[10, 10, 0, 0]}
                  fill="#4F46E5"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="bg-dark text-white">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
            <Sparkles />
          </div>

          <p className="mt-6 text-sm font-semibold text-indigo-300">
            AI Insight
          </p>

          <h3 className="mt-3 text-2xl font-bold">
            Improve your resume impact
          </h3>

          <p className="mt-4 leading-7 text-slate-300">
            Add measurable achievements, clearer MERN project responsibilities,
            and stronger keywords for React/MERN roles.
          </p>

          <Button
            variant="secondary"
            className="mt-6"
            onClick={() => navigate("/ai")}
          >
            Start AI Review
          </Button>
        </Card>
      </div>

      <Card>
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h3 className="text-xl font-bold text-dark">Recent Applications</h3>
            <p className="mt-1 text-sm text-muted">
              Latest jobs you added to your tracker
            </p>
          </div>

          <Button onClick={() => navigate("/applications")}>
            Add Application
          </Button>
        </div>

        <div className="mt-6 overflow-x-auto">
          {loading ? (
            <p className="py-10 text-center text-muted">
              Loading recent applications...
            </p>
          ) : recentApplications.length === 0 ? (
            <p className="py-10 text-center text-muted">
              No applications yet. Start by adding your first job application.
            </p>
          ) : (
            <table className="w-full min-w-[700px] text-left">
              <thead>
                <tr className="border-b border-border text-sm text-muted">
                  <th className="py-4 font-semibold">Company</th>
                  <th className="py-4 font-semibold">Role</th>
                  <th className="py-4 font-semibold">Status</th>
                  <th className="py-4 font-semibold">Applied Date</th>
                </tr>
              </thead>

              <tbody>
                {recentApplications.map((app) => (
                  <tr
                    key={app._id}
                    className="border-b border-border last:border-0"
                  >
                    <td className="py-4 font-semibold text-dark">
                      {app.company}
                    </td>
                    <td className="py-4 text-muted">{app.role}</td>
                    <td className="py-4">
                      <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-primary">
                        {app.status}
                      </span>
                    </td>
                    <td className="py-4 text-muted">
                      {formatDate(app.appliedDate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;