import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useResume } from "../context/ResumeContext";
import { useAuth } from "../context/AuthContext";
import {
  Trash2,
  AlertCircle,
  X,
  Plus,
  Download,
  FileText,
  Clock,
  ShieldCheck,
  Zap,
  Calendar,
  TrendingUp,
  LogOut,
  Sparkles,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};


export default function Dashboard() {
  const navigate = useNavigate();
  const { resumes, loading, deleteResume, fetchResumes } = useResume();
  const { user, logout } = useAuth();
  const [error, setError] = useState(null);
  

  useEffect(() => {
    fetchResumes();
  }, [fetchResumes]);

  const stats = useMemo(() => {
    if (!resumes.length)
      return {
        maxDay: "N/A",
        counts: new Array(7).fill(0),
        days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      };
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const counts = new Array(7).fill(0);
    resumes.forEach((r) => counts[new Date(r.created_at).getDay()]++);
    const maxVal = Math.max(...counts);
    return { maxDay: days[counts.indexOf(maxVal)], counts, days };
  }, [resumes]);

  const createResume = async () => {
    if (resumes.length < 20) navigate("/resume/new");
    else {
      setError("Storage Limit: 20/20 Resumes Used");
      setTimeout(() => setError(null), 5000);
    }
  };
  

const [deleteConfirm, setDeleteConfirm] = useState(null); // Stores the ID of the resume to delete

const handleDeleteClick = (id) => {
  setDeleteConfirm(id);
};

const confirmDelete = async () => {
  if (deleteConfirm) {
    await deleteResume(deleteConfirm);

    setDeleteConfirm(null); // Close the toast after deleting
  }
};

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-red-600 selection:text-white">
      {/* NAVIGATION */}
      <nav className="sticky top-0 z-[60] bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="size-10 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-100">
              <ShieldCheck className="text-white w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black tracking-tighter text-slate-900 uppercase">
              Resume<span className="text-red-600">Pro</span>
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={logout}
              className="size-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* TOP ANALYTICS GRID */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
          {/* ACTIVITY BAR GRAPH CARD */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-8 bg-white border-2 border-slate-100 rounded-[2.5rem] p-10 flex flex-col justify-between min-h-[400px] shadow-sm"
          >
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Sparkles size={16} className="text-red-600" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600">
                  Activity Report
                </span>
              </div>
              <h2 className="text-4xl font-black mb-2 text-slate-900">
                Welcome, {user?.name?.split(" ")[0]}
              </h2>
              <p className="text-slate-500 font-medium italic">
                Peak productivity on{" "}
                <span className="text-red-600 font-bold">{stats.maxDay}s</span>
              </p>
            </div>

            {/* THE BAR GRAPH */}
            <div className="flex items-end justify-between gap-4 h-48 mt-8 px-2 border-b-2 border-slate-50 pb-2">
              {stats.counts.map((count, i) => (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center gap-3 h-full justify-end group"
                >
                  <div className="invisible group-hover:visible bg-red-600 text-white text-[10px] py-1 px-2 rounded mb-1 font-bold">
                    {count}
                  </div>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{
                      height: `${(count / (Math.max(...stats.counts) || 1)) * 100}%`,
                    }}
                    className={`w-full max-w-[40px] rounded-t-xl transition-all duration-500 shadow-sm ${count === Math.max(...stats.counts) ? "bg-red-600" : "bg-red-100"}`}
                  />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                    {stats.days[i].substring(0, 3)}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ACTION & CAPACITY CARDS */}
          <div className="lg:col-span-4 grid grid-cols-1 gap-6">
            {/* CLEAN RED CREATE CARD */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={createResume}
              className="bg-red-600 rounded-[2.5rem] p-8 text-white flex flex-col justify-between items-start text-left shadow-xl shadow-red-100 group relative overflow-hidden"
            >
              <div className="p-3 bg-white/20 rounded-2xl">
                <Plus size={24} strokeWidth={3} />
              </div>
              <div>
                <h4 className="text-3xl font-black mb-1">Create New</h4>
                <p className="text-xs font-black uppercase tracking-widest opacity-90">
                  Design your next resume
                </p>
              </div>
            </motion.button>

            {/* CAPACITY CARD */}
            <div className="bg-white border-2 border-slate-100 rounded-[2.5rem] p-8 flex flex-col justify-between shadow-sm">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-red-50 rounded-2xl text-red-600">
                  <TrendingUp size={24} />
                </div>
                <p className="text-[10px] font-black text-red-600 uppercase tracking-widest">
                  Storage
                </p>
              </div>
              <div>
                <h4 className="text-4xl font-black text-slate-900">
                  {resumes.length}
                  <span className="text-slate-200 mx-2">/</span>20
                </h4>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">
                  Free Slots Used
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* DOCUMENTS GRID */}
        <div className="flex items-center gap-4 mb-10 px-2">
          <h3 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400">
            Your Documents
          </h3>
          <div className="h-px flex-grow bg-slate-100" />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-72 bg-slate-50 animate-pulse rounded-[3rem]"
              />
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {resumes.map((resume) => (
              <motion.div
                key={resume.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group bg-white border-2 border-slate-50 rounded-[3rem] p-8 transition-all hover:border-red-100 hover:shadow-xl hover:shadow-red-50"
              >
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center mb-8">
                    <div className="size-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-600">
                      <FileText size={22} />
                    </div>
                    <button
                      onClick={() => setDeleteConfirm(resume.id)}
                      className="size-10 flex items-center justify-center text-slate-300 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  <h3 className="text-xl font-black text-slate-800 mb-2 truncate group-hover:text-red-600">
                    {resume.title || "Untitled Resume"}
                  </h3>
                  <div className="flex items-center gap-2 mb-10 text-slate-400">
                    <Clock size={12} />
                    <p className="text-[10px] font-bold uppercase tracking-widest">
                      {new Date(resume.updated_at).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => navigate(`/resume/${resume.id}`)}
                      className="bg-red-600 text-white py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-red-700 shadow-lg shadow-red-50"
                    >
                      Open
                    </button>
                    <button
                      onClick={() => navigate(`/resume/${resume.id}/download`)}
                      className="bg-white border-2 border-slate-100 text-slate-600 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest hover:border-red-100 hover:text-red-600 transition-all"
                    >
                      Export
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>

      {/* MODALS */}
      <AnimatePresence>
        {deleteConfirm && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-slate-900/20 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white p-12 rounded-[3.5rem] shadow-2xl max-w-md w-full text-center border-b-8 border-red-600"
            >
              <div className="size-20 bg-red-50 text-red-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8">
                <Trash2 size={32} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tighter">
                Delete Resume?
              </h3>
              <p className="text-slate-500 font-medium mb-10 leading-relaxed text-sm">
                This action will permanently remove this record from your
                storage slots.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 py-4 font-black uppercase tracking-widest text-slate-400 text-xs"
                >
                  Keep
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 bg-red-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs"
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
