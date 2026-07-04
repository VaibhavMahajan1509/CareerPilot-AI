import { useEffect, useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Target,
  CalendarDays,
  Briefcase,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import Card from "../components/ui/Card";
import StatCard from "../components/ui/StatCard";
import PageHeader from "../components/ui/PageHeader";
import API from "../api/axios";

const Analytics = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await API.get("/applications");
      setApplications(res.data.data.applications || []);
    } catch (error) {
      console.log("Failed to fetch analytics data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const total = applications.length;

  const interviews = applications.filter(
    (app) => app.status === "Interview"
  ).length;

  const offers = applications.filter((app) => app.status === "Offer").length;

  const rejected = applications.filter(
    (app) => app.status === "Rejected"
  ).length;

  const applied = applications.filter((app) => app.status === "Applied").length;

  const interviewRate = total ? Math.round((interviews / total) * 100) : 0;
  const offerRate = total ? Math.round((offers / total) * 100) : 0;

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const thisMonthApplications = applications.filter((app) => {
    if (!app.appliedDate) return false;

    const date = new Date(app.appliedDate);

    return (
      date.getMonth() === currentMonth && date.getFullYear() === currentYear
    );
  }).length;

  const metrics = [
    {
      title: "Total Applications",
      value: total,
      icon: <Briefcase size={22} />,
      change: "All tracked jobs",
    },
    {
      title: "Interview Rate",
      value: `${interviewRate}%`,
      icon: <TrendingUp size={22} />,
      change: `${interviews} interviews received`,
    },
    {
      title: "Offer Rate",
      value: `${offerRate}%`,
      icon: <Target size={22} />,
      change: `${offers} offers received`,
    },
    {
      title: "This Month",
      value: thisMonthApplications,
      icon: <CalendarDays size={22} />,
      change: "Applications sent",
    },
  ];

  const weekData = [
    { week: "W1", applications: 0 },
    { week: "W2", applications: 0 },
    { week: "W3", applications: 0 },
    { week: "W4", applications: 0 },
  ];

  applications.forEach((app) => {
    if (!app.appliedDate) return;

    const date = new Date(app.appliedDate);
    const day = date.getDate();

    if (day <= 7) weekData[0].applications += 1;
    else if (day <= 14) weekData[1].applications += 1;
    else if (day <= 21) weekData[2].applications += 1;
    else weekData[3].applications += 1;
  });

  const statusData = [
    { name: "Applied", value: applied },
    { name: "Interview", value: interviews },
    { name: "Offer", value: offers },
    { name: "Rejected", value: rejected },
  ].filter((item) => item.value > 0);

  const COLORS = ["#4F46E5", "#2563EB", "#16A34A", "#DC2626"];

  const getInsight = () => {
    if (total === 0) {
      return "Start adding job applications to unlock useful analytics and AI insights.";
    }

    if (interviewRate >= 30) {
      return "Your interview rate is strong. Focus on interview preparation and improving your project explanation.";
    }

    if (offerRate > 0) {
      return "You already received offers. Keep applying to relevant roles and negotiate confidently.";
    }

    if (rejected > interviews) {
      return "Rejections are higher than interviews. Improve resume keywords and customize applications for each role.";
    }

    return "Keep tracking applications consistently. Apply to relevant roles and use AI tools to improve your resume and cover letters.";
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics"
        subtitle="Understand your job search progress with real application insights."
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((item) => (
          <StatCard
            key={item.title}
            title={item.title}
            value={loading ? "..." : item.value}
            icon={item.icon}
            change={item.change}
          />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <div>
            <h3 className="text-xl font-bold text-dark">
              Applications Per Month Week
            </h3>
            <p className="mt-1 text-sm text-muted">
              Applications grouped by applied date
            </p>
          </div>

          <div className="mt-8 h-72 rounded-2xl bg-softBg p-5">
            {total === 0 ? (
              <div className="flex h-full items-center justify-center text-muted">
                No application data available yet.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weekData}>
                  <XAxis
                    dataKey="week"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748B", fontSize: 12 }}
                  />
                  <YAxis
                    allowDecimals={false}
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
            )}
          </div>
        </Card>

        <Card>
          <div>
            <h3 className="text-xl font-bold text-dark">
              Status Distribution
            </h3>
            <p className="mt-1 text-sm text-muted">
              Current progress of your applications
            </p>
          </div>

          <div className="mt-8 h-72 rounded-2xl bg-softBg p-5">
            {statusData.length === 0 ? (
              <div className="flex h-full items-center justify-center text-muted">
                No status data available yet.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={65}
                    outerRadius={95}
                    paddingAngle={4}
                  >
                    {statusData.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            {statusData.map((item, index) => (
              <div
                key={item.name}
                className="rounded-xl border border-border bg-white p-3"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <p className="text-sm font-semibold text-dark">
                    {item.name}
                  </p>
                </div>
                <p className="mt-1 text-sm text-muted">{item.value} jobs</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="bg-dark text-white">
        <div className="flex items-center gap-3">
          <BarChart3 className="text-indigo-300" />
          <h3 className="text-xl font-bold">AI Analytics Insight</h3>
        </div>

        <p className="mt-4 leading-7 text-slate-300">{getInsight()}</p>
      </Card>
    </div>
  );
};

export default Analytics;