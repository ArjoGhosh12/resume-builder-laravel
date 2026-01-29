
import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  PlusCircle,
  LogOut,
  LayoutDashboard,
  Settings,
  UserX,
  ChevronDown,
} from "lucide-react";

import api from "../lib/api";
import { useAuth } from "../context/AuthContext";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedUser, setExpandedUser] = useState(null); // Track which user is expanded

  const itemsPerPage = 8;

  const fetchResumes = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/resumes");
      setResumes(res.data.data ?? []);
    } catch (err) {
      console.error("Failed to fetch resumes", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const toggleUserBlock = async (userId) => {
    try {
      await api.post(`/admin/users/${userId}/block`);
      await fetchResumes();
    } catch (err) {
      console.error("User block failed", err.response?.data || err);
      alert("Failed to update user status");
    }
  };

  /* ================= GROUPING LOGIC ================= */
  // Group resumes by user ID to create a list of users
  const usersWithResumes = useMemo(() => {
    const groups = resumes.reduce((acc, resume) => {
      const userId = resume.user.id;
      if (!acc[userId]) {
        acc[userId] = {
          ...resume.user,
          resumes: [],
        };
      }
      acc[userId].resumes.push(resume);
      return acc;
    }, {});
    return Object.values(groups);
  }, [resumes]);

  /* ================= PAGINATION ================= */
  const totalPages = Math.max(
    1,
    Math.ceil(usersWithResumes.length / itemsPerPage),
  );
  const currentItems = usersWithResumes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="flex min-h-screen bg-white text-slate-900">
      {/* SIDEBAR - (Keeping your existing sidebar) */}
      <aside className="w-72 bg-white/70 backdrop-blur-xl border-r border-red-50 flex flex-col sticky top-0 h-screen shadow-sm">
        <div className="p-8 flex items-center gap-3">
          <div className="size-10 bg-red-600 rounded-xl flex items-center justify-center text-white shadow-lg red-500">
            <FileText size={22} />
          </div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">
            Resume <span className="text-red-600">  Pro</span>
          </h1>
        </div>
        <nav className="flex-1 px-4 space-y-1.5">
          <SidebarItem
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            active={true}
          />
          <SidebarItem
            icon={<PlusCircle size={20} />}
            label="Create Resume"
            onClick={() => navigate("/resume/new")}
          />
          <SidebarItem icon={<Settings size={20} />} label="Admin Settings" />
        </nav>
        <div className="p-6 mt-auto">
          <button
            onClick={() => {
              logout();
              navigate("/signin");
            }}
            className="flex items-center gap-3 w-full px-4 py-3 text-slate-500 hover:bg-red-600 hover:text-white rounded-xl font-semibold transition-all group"
          >
            <LogOut
              size={20}
              className="group-hover:rotate-12 transition-transform"
            />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-10 bg-[#fafafa]">
        <div className="max-w-[1400px] mx-auto">
          <header className="mb-10">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              User Management
            </h2>
            <p className="text-sm text-slate-500">
              Expand a user to view and manage their specific resumes.
            </p>
          </header>

          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 w-10"></th>
                  <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    User Details
                  </th>
                  <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 text-center">
                    Resumes
                  </th>
                  <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Status
                  </th>
                  <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-50">
                {currentItems.map((user) => (
                  <React.Fragment key={user.id}>
                    <tr className="group hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <button
                          onClick={() =>
                            setExpandedUser(
                              expandedUser === user.id ? null : user.id,
                            )
                          }
                          className={`p-1 rounded-md transition-transform ${expandedUser === user.id ? "rotate-180" : ""}`}
                        >
                          <ChevronDown size={18} className="text-slate-400" />
                        </button>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm font-medium text-slate-900">
                          {user.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          {user.email}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full text-xs font-bold">
                          {user.resumes.length}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${user.is_blocked ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"}`}
                        >
                          {user.is_blocked ? "Blocked" : "Active"}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <button
                          onClick={() => toggleUserBlock(user.id)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-all"
                        >
                          <UserX
                            size={13}
                            className={
                              user.is_blocked
                                ? "text-red-500"
                                : "text-slate-400"
                            }
                          />
                          {user.is_blocked ? "Unblock" : "Block User"}
                        </button>
                      </td>
                    </tr>

                    {/* EXPANDABLE SECTION */}
                    <AnimatePresence>
                      {expandedUser === user.id && (
                        <motion.tr
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-slate-50/30"
                        >
                          <td colSpan={5} className="px-12 py-4">
                            <div className="border-l-2 border-red-200 pl-6 py-2 space-y-3">
                              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                                User Resumes
                              </h4>
                              {user.resumes.map((resume) => (
                                <div
                                  key={resume.id}
                                  className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-100 shadow-sm"
                                >
                                  <div>
                                    <div className="text-sm font-semibold text-slate-700">
                                      {resume.title || "Untitled Resume"}
                                    </div>
                                    <div className="text-[10px] text-slate-400">
                                      ID: {resume.id}
                                    </div>
                                  </div>
                                  <div className="text-xs text-slate-500">
                                    Last Edited:{" "}
                                    {new Date(
                                      resume.updated_at,
                                    ).toLocaleDateString()}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </td>
                        </motion.tr>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                ))}
              </tbody>
            </table>

            <footer className="px-8 py-6 flex justify-between">
              <span className="text-sm text-slate-400">
                Showing {currentItems.length} of {usersWithResumes.length} users
              </span>
              <div className="flex gap-2">
                <PaginationButton
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                >
                  <ChevronLeft />
                </PaginationButton>
                <PaginationButton
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                >
                  <ChevronRight />
                </PaginationButton>
              </div>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ================= HELPERS ================= */

function SidebarItem({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-4 w-full px-5 py-4 rounded-2xl font-bold ${
        active ? "bg-red-600 text-white" : "text-slate-400 hover:bg-slate-800"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function PaginationButton({ children, ...props }) {
  return (
    <button
      {...props}
      className="size-10 rounded-xl border bg-white hover:border-red-600 disabled:opacity-30"
    >
      {children}
    </button>
  );
}
