import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useResume } from "../context/ResumeContext";
import { useAuth } from "../context/AuthContext";
import {
  Trash2,
  AlertCircle,
  Plus,
  FileText,
  Clock,
  LogOut,
  ArrowUpRight,
  Download,
  Search,
  Layers,
  Database,
  Layout,
} from "lucide-react";

/* --- Animations --- */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { y: 15, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { resumes, loading, deleteResume, fetchResumes } = useResume();
  const { user, logout } = useAuth();

  const [error, setError] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchResumes();
  }, [fetchResumes]);

  const stats = useMemo(() => {
    const total = resumes.length;
    const usagePercent = (total / 20) * 100;
    return { total, usagePercent, remaining: 20 - total };
  }, [resumes]);

  const filteredResumes = useMemo(() => {
    return resumes.filter((r) =>
      r.title?.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [resumes, searchQuery]);

  /* ---------------- Unchanged Logic ---------------- */
  const createResume = () => {
    if (user?.is_blocked) {
      setError(
        "Your account has been blocked by admin. You cannot create new resumes.",
      );
      setTimeout(() => setError(null), 5000);
      return;
    }
    if (resumes.length < 20) {
      navigate("/resume/new");
    } else {
      setError("Storage Limit: 20/20 Resumes Used");
      setTimeout(() => setError(null), 5000);
    }
  };

  const confirmDelete = async () => {
    if (deleteConfirm) {
      await deleteResume(deleteConfirm);
      setDeleteConfirm(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#FCFCFC] text-slate-900 font-sans">
      {/* --- BRANDED NAVIGATION --- */}
      <nav className="h-20 border-b border-slate-100 flex items-center justify-between px-10 bg-white sticky top-0 z-50">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="size-10 bg-[#E11D48] rounded-xl flex items-center justify-center shadow-lg shadow-rose-100">
            <FileText className="text-white w-6 h-6" strokeWidth={2.5} />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800 uppercase">
            Resume<span className="text-[#E11D48] font-black">Pro</span>
          </span>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right hidden sm:block">
            <button 
  onClick={logout} 
  className="group relative flex items-center gap-2 px-4 py-2 text-[16px] font-bold tracking-tighter text-slate-600 hover:text-white transition-colors duration-300"
>
  {/* Hover Background Layer */}
  <span className="absolute inset-0 bg-red-600 rounded-lg scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 -z-10"></span>
  
  <LogOut size={20} className="text-red-600 group-hover:text-white transition-colors" />
  Logout
</button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-10 py-12">
        {/* --- UNIQUE DASHBOARD TITLE SECTION --- */}
        <section className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="flex items-start gap-5">
            <div className="w-1.5 h-16 bg-[#E11D48] rounded-full hidden md:block" />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                  System Workspace
                </span>
                <span className="px-2 py-0.5 rounded bg-rose-50 text-[10px] font-bold text-[#E11D48] uppercase">
                  User
                </span>
              </div>
              <h1 className="text-5xl font-black tracking-tighter text-slate-900">
                Hello<span className="text-[#E11D48]"> {user?.name}!</span>
              </h1>
            </div>
          </div>

          <div className="relative group self-start md:self-auto">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-[#E11D48] transition-colors" />
            <input
              type="text"
              placeholder="Find a document..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-7 pr-4 py-2 bg-transparent border-b border-slate-200 focus:border-[#E11D48] transition-all outline-none text-sm font-medium w-full md:w-64"
            />
          </div>
        </section>

        {/* --- BLOCKED USER UI --- */}
        {user?.is_blocked && (
          <div className="mb-10 bg-rose-50 border border-rose-100 text-rose-700 p-5 rounded-2xl flex items-center gap-3 shadow-sm">
            <AlertCircle size={20} strokeWidth={3} />
            <p className="font-bold text-sm tracking-tight uppercase">
              Restricted: Creation disabled by administrator.
            </p>
          </div>
        )}

        {/* --- STATISTICS --- */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <StatBox
            label="Active Resumes"
            value={stats.total}
            icon={<Layers size={18} />}
          />
          <StatBox
            label="Available Slots"
            value={stats.remaining}
            icon={<Database size={18} />}
          />
          <div className="md:col-span-2 bg-white border border-slate-100 rounded-3xl p-6 flex flex-col justify-between shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Storage Efficiency
              </span>
              <span className="text-xs font-bold text-[#E11D48]">
                {stats.usagePercent}%
              </span>
            </div>
            <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${stats.usagePercent}%` }}
                className="h-full bg-[#E11D48] rounded-full"
              />
            </div>
          </div>
        </section>

        {/* --- ERROR MESSAGE --- */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mb-8 bg-slate-900 text-white px-6 py-4 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-3"
            >
              <AlertCircle size={16} className="text-[#E11D48]" />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- CREATE ACTION --- */}
        <div className="mb-10">
          <button
            onClick={createResume}
            disabled={user?.is_blocked}
            className="h-16 w-full md:w-auto px-12 bg-[#E11D48] hover:bg-[#BE123C] text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-rose-200 transition-all active:scale-95 disabled:opacity-30 flex items-center justify-center gap-3"
          >
            <Plus size={20} strokeWidth={3} />
            Create New Resume
          </button>
        </div>

        {/* --- RESUME GRID --- */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-64 bg-slate-50 rounded-[2.5rem] animate-pulse"
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
            {filteredResumes.map((resume) => (
              <motion.div
                key={resume.id}
                variants={itemVariants}
                className="group bg-white border border-slate-100 rounded-[2.5rem] p-8 hover:border-rose-100 hover:shadow-2xl hover:shadow-rose-900/5 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="size-12 bg-slate-50 group-hover:bg-rose-50 text-slate-400 group-hover:text-[#E11D48] rounded-2xl flex items-center justify-center transition-colors">
                    <FileText size={24} />
                  </div>
                  <button
                    onClick={() => setDeleteConfirm(resume.id)}
                    className="p-2 text-slate-200 hover:text-rose-600 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <h3 className="font-bold text-lg text-slate-900 mb-1 truncate group-hover:text-[#E11D48] transition-colors">
                  {resume.title || "Untitled Resume"}
                </h3>

                <div className="flex items-center gap-2 text-slate-400 mb-8 text-[10px] font-black uppercase tracking-widest">
                  <Clock size={12} />
                  <span>
                    Saved {new Date(resume.updated_at).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => navigate(`/resume/${resume.id}`)}
                    className="flex-1 h-12 bg-slate-900 text-white rounded-xl font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#E11D48] transition-all"
                  >
                    Open <ArrowUpRight size={14} />
                  </button>
                  <button
                    onClick={() => navigate(`/resume/${resume.id}/download`)}
                    className="size-12 border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:text-[#E11D48] hover:border-rose-100 transition-all"
                  >
                    <Download size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>

      {/* --- DELETE MODAL --- */}
      <AnimatePresence>
        {deleteConfirm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white p-10 rounded-[3rem] shadow-2xl max-w-sm w-full text-center border border-slate-100"
            >
              <div className="size-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6 text-[#E11D48]">
                <AlertCircle size={32} />
              </div>
              <h3 className="text-xl font-black mb-2">Delete Resume?</h3>
              <p className="text-slate-500 text-sm mb-10 font-medium px-4 leading-relaxed">
                This will remove your data from our database permanently.
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={confirmDelete}
                  className="w-full py-4 bg-[#E11D48] hover:bg-[#BE123C] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all"
                >
                  Delete Permanently
                </button>
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="w-full py-4 bg-slate-50 text-slate-500 rounded-2xl font-black text-[10px] uppercase tracking-widest"
                >
                  Go Back
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatBox({ label, value, icon }) {
  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex items-center gap-5">
      <div className="size-12 bg-rose-50 rounded-2xl flex items-center justify-center text-[#E11D48]">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          {label}
        </p>
        <p className="text-2xl font-black text-slate-900 leading-none">
          {value}
        </p>
      </div>
    </div>
  );
}
