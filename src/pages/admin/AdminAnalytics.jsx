import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";

const AdminAnalytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/dashboard/stats");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!data) return <div className="p-10 text-center text-red-500">No Data</div>;

  // ✅ REMOVE FOOD & TEACHING
  const filteredCategories = data.categories.filter(
    c => c.category !== "Food" && c.category !== "Teaching"
  );

  const maxCategory = Math.max(...filteredCategories.map(c => c.count), 1);

  // ✅ REQUIRED LANGUAGES ONLY
  const allowedLanguages = [
    "English",
    "Tamil",
    "Hindi",
    "Gujarati",
    "Marathi",
    "Telugu",
    "Others"
  ];

  const filteredLanguages = data.languages.filter(l =>
    allowedLanguages.includes(l.language)
  );

  // ✅ COLORS
  const languageColors = {
    English: "#2563eb",
    Tamil: "#059669",
    Hindi: "#7c3aed",
    Gujarati: "#14b8a6",
    Marathi: "#f97316",
    Telugu: "#f59e0b",
    Others: "#6b7280"
  };

  // ✅ PIE CHART MATH (NO ARC ERROR)
  const totalLang = filteredLanguages.reduce((s, l) => s + l.percentage, 0) || 1;
  let cumulativeAngle = 0;

  const pieData = filteredLanguages.map(l => {
    const start = cumulativeAngle;
    const angle = (l.percentage / totalLang) * 360;
    cumulativeAngle += angle;
    return { ...l, start, angle };
  });

  const polar = (cx, cy, r, angle) => {
    const rad = (angle - 90) * Math.PI / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };

  const arcPath = (cx, cy, r, start, end) => {
    const s = polar(cx, cy, r, end);
    const e = polar(cx, cy, r, start);
    const large = end - start > 180 ? 1 : 0;

    return `
      M ${cx} ${cy}
      L ${s.x} ${s.y}
      A ${r} ${r} 0 ${large} 0 ${e.x} ${e.y}
      Z
    `;
  };

  // ✅ ACCURACY & ESCALATION CIRCLES
  const circle = 2 * Math.PI * 40;
  const accuracyStroke = (circle * data.accuracy) / 100;
  const escalationStroke = (circle * data.human_escalations) / 100;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar activePage="analytics" />

      <div className="flex-1 p-8 ml-64">
        <h1 className="text-3xl font-bold mb-6">Admin Analytics Dashboard</h1>

        {/* ✅ TOP CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Users" value={data.totalUsers} />
          <StatCard title="Total Queries" value={data.totalQueries} />
          <StatCard title="AI Accuracy" value={`${data.accuracy}%`} />
          <StatCard title="Human Escalations" value={data.human_escalations} />
        </div>

        {/* ✅ CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* ✅ PERFECT PIE CHART */}
          <div className="bg-white p-6 rounded shadow text-center">
            <h2 className="font-semibold mb-4">Language Distribution</h2>

            <svg viewBox="0 0 200 200" className="w-64 mx-auto">
              {pieData.map(l => (
                <path
                  key={l.language}
                  d={arcPath(100, 100, 90, l.start, l.start + l.angle)}
                  fill={languageColors[l.language] || "#999"}
                />
              ))}
            </svg>

            <div className="mt-4 space-y-2 text-sm">
              {filteredLanguages.map(l => (
                <div key={l.language} className="flex justify-between">
                  <span>{l.language}</span>
                  <span>{l.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* ✅ CATEGORY BAR CHART */}
          <div className="bg-white p-6 rounded shadow">
            <h2 className="font-semibold mb-4">Query Categories</h2>
            {filteredCategories.map(cat => (
              <div key={cat.category} className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span>{cat.category}</span>
                  <span>{cat.count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded h-3">
                  <div
                    className="h-3 rounded"
                    style={{
                      width: `${(cat.count / maxCategory) * 100}%`,
                      backgroundColor: cat.color
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ✅ BEST UI — CIRCULAR GRAPHS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">

          {/* ✅ AI ACCURACY CIRCLE */}
          <div className="bg-white p-6 rounded shadow text-center">
            <h2 className="font-semibold mb-3">AI Accuracy</h2>
            <svg width="120" height="120">
              <circle cx="60" cy="60" r="40" stroke="#e5e7eb" strokeWidth="10" fill="none" />
              <circle
                cx="60"
                cy="60"
                r="40"
                stroke="#22c55e"
                strokeWidth="10"
                fill="none"
                strokeDasharray={`${accuracyStroke} ${circle}`}
                transform="rotate(-90 60 60)"
              />
            </svg>
            <p className="mt-2 text-xl font-bold">{data.accuracy}%</p>
          </div>

          {/* ✅ HUMAN ESCALATION CIRCLE */}
          <div className="bg-white p-6 rounded shadow text-center">
            <h2 className="font-semibold mb-3">Human Escalation</h2>
            <svg width="120" height="120">
              <circle cx="60" cy="60" r="40" stroke="#e5e7eb" strokeWidth="10" fill="none" />
              <circle
                cx="60"
                cy="60"
                r="40"
                stroke="#f97316"
                strokeWidth="10"
                fill="none"
                strokeDasharray={`${escalationStroke} ${circle}`}
                transform="rotate(-90 60 60)"
              />
            </svg>
            <p className="mt-2 text-xl font-bold">{data.human_escalations}</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;

/* ✅ CARD */
const StatCard = ({ title, value }) => (
  <div className="bg-white p-6 rounded shadow">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);