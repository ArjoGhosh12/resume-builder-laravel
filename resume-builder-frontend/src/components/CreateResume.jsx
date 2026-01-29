import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  Plus,
  Trash2,
  User,
  Check,
  Share2,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Award,
  Save,
  Loader2,
  Palette,
  Layout,
  ChevronDown,
  AlertCircle,
  X,
} from "lucide-react";
import { pdf } from "@react-pdf/renderer";
import ResumeDocument from "../pdf/ResumeDocument";
import api from "../lib/api";
import ResumePreview from "../components/ResumePreview";
import Resume1 from "../assets/Resume1.png";
import Resume2 from "../assets/Resume2.png";
import Resume3 from "../assets/Resume3.png";

const steps = [
  { label: "Basics", icon: <User size={18} /> },
  { label: "Socials", icon: <Share2 size={18} /> },
  { label: "Experience", icon: <Briefcase size={18} /> },
  { label: "Education", icon: <GraduationCap size={18} /> },
  { label: "Projects", icon: <FolderGit2 size={18} /> },
  { label: "Certifications", icon: <Award size={18} /> },
];

export default function CreateResume() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [isTemplateOpen, setIsTemplateOpen] = useState(false);
const [error, setError] = useState(null);
  const [resume, setResume] = useState({
    title: "",
    summary: "",
    skills: [],
    languages: [],
    accentColor: "#8b1d1d",
    template: "modern",
    personal_details: {
      fullName: "",
      designation: "",
      email: "",
      phone: "",
      location: "",
    },
    socials: { linkedIn: "", github: "", portfolio: "" },
    experiences: [],
    educations: [],
    projects: [],
    certifications: [],
  });

  const update = (key, value) => setResume({ ...resume, [key]: value });
  const updateNested = (section, key, value) =>
    setResume({ ...resume, [section]: { ...resume[section], [key]: value } });
  const updateArray = (section, index, key, value) => {
    const arr = [...resume[section]];
    arr[index][key] = value;
    setResume({ ...resume, [section]: arr });
  };
  const addRow = (section, row) =>
    setResume({ ...resume, [section]: [...resume[section], row] });
  const removeRow = (section, index) => {
    const arr = [...resume[section]];
    arr.splice(index, 1);
    setResume({ ...resume, [section]: arr });
  };

  const sanitize = (obj) =>
    Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [k, v === "" ? null : v])
    );

  const normalizeArray = (value) => {
    if (Array.isArray(value)) return value;
    if (typeof value === "string") {
      try { return JSON.parse(value); } catch { return []; }
    }
    return [];
  };

  const cleanArray = (arr, requiredKey) =>
    Array.isArray(arr) ? arr.filter((item) => item?.[requiredKey]?.trim()) : [];

  const handleNext=async() =>
  {
    setLoading(true);
    try {
      const payload = {
        ...resume,
        skills: normalizeArray(resume.skills),
        languages: normalizeArray(resume.languages),
        experiences: cleanArray(resume.experiences, "organization"),
        educations: cleanArray(resume.educations, "institution"),
        projects: cleanArray(resume.projects, "name"),
        certifications: cleanArray(resume.certifications, "title"),
        personal_details: sanitize(resume.personal_details),
        socials: sanitize(resume.socials),
      };

      const res = await api.post("/resumes", payload);
      const savedResume = {
        ...res.data,
        skills: normalizeArray(res.data.skills),
        languages: normalizeArray(res.data.languages),
        template: res.data.template || "modern",
      };
      setSuccess("Your progress has been saved successfully!");
    setTimeout(() => setSuccess(null), 3000);
      setStep(step + 1); 
      
    }
    catch(error)
    {
      setError("Failed to save the form...Check the form again ");
    setTimeout(() => setError(null), 4000);
      
    }
    finally {
      setLoading(false);
    }
    

  }
//For Save button
  const handleSaveDraft = async () => {
    setLoading(true);
    try {
      const payload = {
        ...resume,
        skills: normalizeArray(resume.skills),
        languages: normalizeArray(resume.languages),
        experiences: cleanArray(resume.experiences, "organization"),
        educations: cleanArray(resume.educations, "institution"),
        projects: cleanArray(resume.projects, "name"),
        certifications: cleanArray(resume.certifications, "title"),
        personal_details: sanitize(resume.personal_details),
        socials: sanitize(resume.socials),
      };

      const res = await api.post("/resumes", payload);
      const savedResume = {
        ...res.data,
        skills: normalizeArray(res.data.skills),
        languages: normalizeArray(res.data.languages),
        template: res.data.template || "modern",
      };
      setSuccess("Your progress has been saved successfully!");
    setTimeout(() => setSuccess(null), 3000);
       navigate("/dashboard");
    } catch (error) {
      setError("Error generating resumes");
    setTimeout(() => setError(null), 4000);
    } finally {
      setLoading(false);
    }
  };
//For Downlaod option
  const submitResume = async () => {
    setLoading(true);
    try {
      const payload = {
        ...resume,
        skills: normalizeArray(resume.skills),
        languages: normalizeArray(resume.languages),
        experiences: cleanArray(resume.experiences, "organization"),
        educations: cleanArray(resume.educations, "institution"),
        projects: cleanArray(resume.projects, "name"),
        certifications: cleanArray(resume.certifications, "title"),
        personal_details: sanitize(resume.personal_details),
        socials: sanitize(resume.socials),
      };

      const res = await api.post("/resumes", payload);
      const savedResume = {
        ...res.data,
        skills: normalizeArray(res.data.skills),
        languages: normalizeArray(res.data.languages),
        template: res.data.template || "modern",
      };

      const blob = await pdf(<ResumeDocument resume={savedResume} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${savedResume.title || "resume"}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      navigate("/dashboard");
    } catch (error) {
      setError("Error generating resumes");
    
    setTimeout(() => setError(null), 4000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* NAVBAR WITH LOGO AND ACTIONS */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-[1500px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-10">
             <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Resume<span className="text-2xl text-red-500 font-bold"> Pro</span>
          </h1>

            {/* Template Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsTemplateOpen(!isTemplateOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-600 font-bold transition-all"
              >
                <Layout size={18} className="text-red-500" />
                <span className="capitalize">{resume.template} Template</span>
                <ChevronDown size={14} className={`transition-transform ${isTemplateOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isTemplateOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-12 left-0 w-56 bg-white shadow-xl rounded-xl border p-2 flex flex-col gap-1"
                  >
                    {[
                      { src: Resume1, name: "Minimal" },
                      { src: Resume2, name: "Modern" },
                      { src: Resume3, name: "Elegant" }
                    ].map((t) => (
                      <button
                        key={t.name}
                        onClick={() => { update("template", t.name.toLowerCase()); setIsTemplateOpen(false); }}
                        className={`flex items-center gap-3 p-2 rounded-lg transition-all ${resume.template === t.name.toLowerCase() ? 'bg-red-50 text-red-600' : 'hover:bg-slate-50'}`}
                      >
                        <img src={t.src} className="w-8 h-10 object-cover rounded shadow-sm" alt="" />
                        <span className="text-sm font-bold">{t.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleSaveDraft}
              className="flex items-center gap-2 px-4 py-2 text-slate-600 font-bold hover:text-red-500 transition-colors"
            >
              <Save size={18} />
              Save Changes
            </button>
            <button
              onClick={submitResume}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-bold shadow-md shadow-red-100 transition-all"
            >
              Download PDF
            </button>
          </div>
        </div>
      </nav>

      {/* STEPPER PROGRESS */}
      <div className="bg-white border-b overflow-x-auto no-scrollbar">
        <div className="max-w-[1500px] mx-auto px-6 py-4">
          <div className="flex justify-between items-center min-w-[700px]">
            {steps.map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-2 relative group flex-1">
                <div
                  className={`z-10 size-10 rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm
                  ${i <= step ? "bg-red-600 text-white shadow-red-100" : "bg-slate-100 text-red-500"}`}
                >
                  {s.icon}
                </div>
                <span className={`text-xs font-bold transition-colors ${i <= step ? "text-red-600" : "text-slate-500"}`}>
                  {s.label}
                </span>
                {i < steps.length - 1 && (
                  <div className={`absolute top-5 left-[60%] w-[80%] h-[2px] -z-0 ${i < step ? "bg-red-600" : "bg-slate-100"}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-[1500px] mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12">
        {/* FORM SIDE */}
        <div className="flex flex-col min-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex-grow space-y-6"
            >
              {/* Step 0: Basics */}
              {step === 0 && (
                <section className="space-y-6">
                  <div className="grid gap-4">
                    <label className="text-sm font-semibold text-red-500 uppercase tracking-wider">Resume Header</label>
                    <input className="w-full px-4 py-3 rounded-lg border border-gray-900 focus:ring-2 focus:ring-red-500 outline-none transition-all" placeholder="e.g. Senior Software Engineer" value={resume.title} onChange={(e) => update("title", e.target.value)} />
                    <textarea className="w-full px-4 py-3 rounded-lg border border-gray-900 focus:ring-2 focus:ring-red-500 outline-none min-h-[120px]" placeholder="Brief career summary..." value={resume.summary} onChange={(e) => update("summary", e.target.value)} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(resume.personal_details).map(([k, v]) => (
                      <div key={k} className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-red-500 ml-1">{k.replace(/([A-Z])/g, " $1")}</label>
                        <input className="w-full px-4 py-2.5 rounded-lg border border-gray-900 focus:ring-2 focus:ring-red-500 outline-none" value={v} onChange={(e) => updateNested("personal_details", k, e.target.value)} />
                      </div>
                    ))}
                  </div>
                </section>
              )}
              {/* Steps 1-5 follow your original logic... */}
              {step === 1 && (
                <div className="space-y-4">
                  {Object.entries(resume.socials).map(([k, v]) => (
                    <div key={k} className="flex items-center gap-4 bg-white p-2 rounded-xl border border-slate-100 shadow-sm">
                      <div className="bg-slate-50 p-3 rounded-lg text-slate-500 capitalize font-medium min-w-[100px] text-center">{k}</div>
                      <input className="flex-grow px-4 py-2 bg-transparent outline-none" placeholder={`URL for ${k}`} value={v} onChange={(e) => updateNested("socials", k, e.target.value)} />
                    </div>
                  ))}
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  {resume.experiences.map((e, i) => (
                    <div key={i} className="group relative bg-rose-50/30 border-2 border-rose-50 p-6 rounded-2xl space-y-4">
                      <button onClick={() => removeRow("experiences", i)} className="absolute -top-3 -right-3 bg-white text-rose-500 shadow-md p-2 rounded-full"><Trash2 size={16} /></button>
                      <input className="w-full h-12 px-4 rounded-xl border-2 border-transparent focus:border-rose-500 bg-white/50 outline-none font-bold" placeholder="Organization" value={e.organization} onChange={(ev) => updateArray("experiences", i, "organization", ev.target.value)} />
                      <input className="w-full h-12 px-4 rounded-xl border-2 border-transparent focus:border-rose-500 bg-white/50 outline-none italic" placeholder="Position" value={e.position} onChange={(ev) => updateArray("experiences", i, "position", ev.target.value)} />
                      <div className="grid grid-cols-2 gap-4">
                        <input type="date" className="w-full h-12 px-4 rounded-xl bg-white/50" value={e.startDate} onChange={(ev) => updateArray("experiences", i, "startDate", ev.target.value)} />
                        <input type="date" disabled={e.current} className="w-full h-12 px-4 rounded-xl bg-white/50 disabled:opacity-40" value={e.endDate} onChange={(ev) => updateArray("experiences", i, "endDate", ev.target.value)} />
                      </div>
                      <div className="flex items-center gap-2"><input type="checkbox" checked={e.current} onChange={(ev) => updateArray("experiences", i, "current", ev.target.checked)} /><label className="text-sm">Current job</label></div>
                      <textarea className="w-full h-32 p-4 rounded-xl border-2 border-transparent focus:border-rose-500 bg-white/50 outline-none text-sm" placeholder="Description..." value={e.description} onChange={(ev) => updateArray("experiences", i, "description", ev.target.value)} />
                    </div>
                  ))}
                  <button className="w-full py-4 border-2 border-dashed border-rose-200 rounded-2xl text-rose-600 font-bold hover:bg-rose-50 flex items-center justify-center gap-2" onClick={() => addRow("experiences", { organization: "", position: "", description: "", startDate: "", endDate: "", current: false })}>
                    <Plus size={20} /> Add Experience
                  </button>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  {resume.educations.map((e, i) => (
                    <div key={i} className="group relative bg-rose-50/30 border-2 border-rose-50 p-6 rounded-2xl space-y-4">
                      <button onClick={() => removeRow("educations", i)} className="absolute -top-3 -right-3 bg-white text-rose-500 shadow-md p-2 rounded-full"><Trash2 size={16} /></button>
                      <input className="w-full h-12 px-4 rounded-xl border-2 border-transparent focus:border-rose-500 bg-white/50 outline-none font-bold" placeholder="Institution" value={e.institution} onChange={(ev) => updateArray("educations", i, "institution", ev.target.value)} />
                      <div className="grid grid-cols-2 gap-4">
                        <input className="w-full h-12 px-4 rounded-xl bg-white/50 outline-none" placeholder="Degree" value={e.degree} onChange={(ev) => updateArray("educations", i, "degree", ev.target.value)} />
                        <input className="w-full h-12 px-4 rounded-xl bg-white/50 outline-none" placeholder="Field" value={e.field} onChange={(ev) => updateArray("educations", i, "field", ev.target.value)} />
                      </div>
                    </div>
                  ))}
                  <button className="w-full py-4 border-2 border-dashed border-rose-200 rounded-2xl text-rose-600 font-bold hover:bg-rose-50 flex items-center justify-center gap-2" onClick={() => addRow("educations", { institution: "", degree: "", field: "", grade: "", startDate: "", endDate: "" })}>
                    <Plus size={20} /> Add Education
                  </button>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  {resume.projects.map((p, i) => (
                    <div key={i} className="group relative bg-rose-50/30 border-2 border-rose-50 p-6 rounded-2xl space-y-4">
                      <button onClick={() => removeRow("projects", i)} className="absolute -top-3 -right-3 bg-white text-rose-500 shadow-md p-2 rounded-full"><Trash2 size={16} /></button>
                      <input className="w-full h-12 px-4 rounded-xl border-2 border-transparent focus:border-rose-500 bg-white/50 outline-none font-bold" placeholder="Project Name" value={p.name} onChange={(ev) => updateArray("projects", i, "name", ev.target.value)} />
                      <textarea className="w-full h-24 p-4 rounded-xl bg-white/50 outline-none text-sm" placeholder="Description" value={p.description} onChange={(ev) => updateArray("projects", i, "description", ev.target.value)} />
                    </div>
                  ))}
                  <button className="w-full py-4 border-2 border-dashed border-rose-200 rounded-2xl text-rose-600 font-bold hover:bg-rose-50 flex items-center justify-center gap-2" onClick={() => addRow("projects", { name: "", description: "", technologies: [], liveLink: "", githubLink: "", startDate: "", endDate: "" })}>
                    <Plus size={20} /> Add Project
                  </button>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-6">
                  {resume.certifications.map((c, i) => (
                    <div key={i} className="group relative bg-rose-50/30 border-2 border-rose-50 p-6 rounded-2xl space-y-4">
                      <button onClick={() => removeRow("certifications", i)} className="absolute -top-3 -right-3 bg-white text-rose-500 shadow-md p-2 rounded-full"><Trash2 size={16} /></button>
                      <input className="w-full h-12 px-4 rounded-xl border-2 border-transparent focus:border-rose-500 bg-white/50 outline-none font-bold" placeholder="Certification Title" value={c.title} onChange={(ev) => updateArray("certifications", i, "title", ev.target.value)} />
                      <input className="w-full h-12 px-4 rounded-xl bg-white/50 outline-none" placeholder="Issuer" value={c.issuer} onChange={(ev) => updateArray("certifications", i, "issuer", ev.target.value)} />
                    </div>
                  ))}
                  <button className="w-full py-4 border-2 border-dashed border-rose-200 rounded-2xl text-rose-600 font-bold hover:bg-rose-50 flex items-center justify-center gap-2" onClick={() => addRow("certifications", { title: "", issuer: "", date: "", url: "" })}>
                    <Plus size={20} /> Add Certification
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* NAVIGATION FOOTER */}
          <div className="mt-12 flex justify-between items-center bg-white p-4 rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100">
            <button disabled={step === 0} onClick={() => setStep(step - 1)} className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-slate-600 hover:bg-slate-50 transition-all">
              <ChevronLeft size={18} /> Back
            </button>
            {step < steps.length - 1 ? (
              <button onClick={() =>handleNext()
                
              }
               className="flex items-center gap-2 bg-slate-900 text-white px-8 py-2.5 rounded-xl font-semibold shadow-md transition-all active:scale-95">
                Next <ChevronRight size={18} />
              </button>
            ) : (
              <button onClick={submitResume} disabled={loading} className="flex items-center gap-2 bg-red-600 text-white px-8 py-2.5 rounded-xl font-semibold shadow-md disabled:opacity-70">
                {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                {loading ? "Saving..." : "Finish & Download"}
              </button>
            )}
          </div>
        </div>

        {/* PREVIEW SIDE (CLEAN) */}
        <div className="hidden lg:block relative">
          <div className="sticky top-28">
            <div className="flex items-center justify-between mb-4 px-2">
                <div className="flex items-center gap-2">
                    <Palette size={20} className="text-red-500" />
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Theme Color</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-100">
                    {["#8b1d1d", "#1e40af", "#065f46", "#1e293b", "#7c3aed"].map((color) => (
                        <button
                            key={color}
                            onClick={() => update("accentColor", color)}
                            className={`size-4 rounded-full border-2 border-white transition-all shadow-sm ${resume.accentColor === color ? 'scale-125 ring-2 ring-red-100' : 'hover:scale-110'}`}
                            style={{ backgroundColor: color }}
                        />
                    ))}
                    <div className="w-[1px] h-3 bg-slate-200 mx-1" />
                    <input 
                        type="color" 
                        value={resume.accentColor} 
                        onChange={(e) => update("accentColor", e.target.value)} 
                        className="size-4 bg-transparent cursor-pointer border-none" 
                    />
                </div>
            </div>

            <div className="bg-white shadow-2xl rounded-sm overflow-hidden min-h-[842px] border border-slate-100">
              <div className="max-h-[85vh] overflow-y-auto custom-scrollbar">
                <ResumePreview resume={resume} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <AnimatePresence>
  {error && (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-4 bg-white border border-red-100 px-6 py-4 rounded-2xl shadow-[0_20px_50px_rgba(220,38,38,0.15)] min-w-[350px]"
    >
      {/* Icon with Red Glow */}
      <div className="flex-shrink-0 bg-red-600 p-2 rounded-xl shadow-lg shadow-red-200">
        <AlertCircle size={20} className="text-white" />
      </div>

      {/* Text Content */}
      <div className="flex-grow">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600 mb-0.5">
          Error!
        </p>
        <p className="text-sm text-slate-700 font-semibold">
          {error}
        </p>
      </div>

      {/* Close Button */}
      <button 
        onClick={() => setError(null)}
        className="text-slate-300 hover:text-slate-500 transition-colors"
      >
        <X size={18} />
      </button>

      {/* Progress bar that depletes as it hides */}
      <motion.div 
        initial={{ width: "100%" }}
        animate={{ width: "0%" }}
        transition={{ duration: 4, ease: "linear" }}
        className="absolute bottom-0 left-0 h-1 bg-red-600 rounded-b-2xl opacity-20"
      />
    </motion.div>
  )}
</AnimatePresence>
<AnimatePresence>
  {success && (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="fixed bottom-10 left-10 z-[100] flex items-center gap-4 bg-white border border-emerald-100 px-6 py-4 rounded-2xl shadow-[0_20px_50px_rgba(16,185,129,0.15)] min-w-[320px]"
    >
      {/* Success Icon with Glow */}
      <div className="flex-shrink-0 bg-emerald-500 p-2 rounded-xl shadow-lg shadow-emerald-100">
        <Check size={18} className="text-white" />
      </div>

      {/* Message Text */}
      <div className="flex-grow">
        <p className="text-[10px] font-black uppercase tracking-[0.15em] text-emerald-600 mb-0.5">
          Auto-Save
        </p>
        <p className="text-sm text-slate-700 font-bold">
          {success}
        </p>
      </div>

      {/* Small Close Icon */}
      <button 
        onClick={() => setSuccess(null)}
        className="text-slate-300 hover:text-slate-500 transition-colors"
      >
        <X size={16} />
      </button>
    </motion.div>
  )}
</AnimatePresence>
    </div>
  );
}