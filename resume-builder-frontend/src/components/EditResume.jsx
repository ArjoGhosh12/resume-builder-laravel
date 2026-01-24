import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Pencil, Save, X, Plus, Trash2, 
  User, Mail, Share2, Briefcase, 
  GraduationCap, FolderKanban, Award, Loader2 
} from "lucide-react";
import { useResume } from "../context/ResumeContext";

/* ---------- LOGIC REMAINS UNCHANGED ---------- */
const emptyEducation = { institution: "", degree: "", field: "", grade: "", startDate: "", endDate: "" };
const emptyExperience = { organization: "", position: "", description: "", startDate: "", endDate: "" };
const emptyProject = { name: "", description: "", technologies: [], liveLink: "", githubLink: "", startDate: "", endDate: "" };
const emptyCertification = { title: "", issuer: "", date: "", url: "" };

export default function EditResume() {
  const { resume, update, updateNested, updateArrayItem, addArrayItem, removeArrayItem } = useResume();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    try {
      setSaving(true);
      await axios.put(`http://127.0.0.1:8000/api/resumes/${resume.id}`, resume, {
        headers: { Accept: "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setIsEditing(false);
    } catch (err) {
      alert("Failed to update resume");
    } finally { setSaving(false); }
  };

  return (
    <div className="min-h-screen bg-[#fffafa] text-slate-900 pb-24">
      {/* STICKY ACTION HEADER */}
      <div className="bg-white/80 backdrop-blur-md border-b border-rose-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-rose-600 text-white p-2.5 rounded-xl shadow-lg shadow-rose-200">
              <Pencil size={20} />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-slate-900 leading-none">Editor Mode</h1>
              <p className="text-[10px] text-rose-500 font-bold uppercase tracking-widest mt-1">Status: {isEditing ? "Editing" : "Viewing"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 bg-rose-600 text-white px-8 h-11 rounded-xl font-bold hover:bg-rose-700 transition-all active:scale-95 shadow-md shadow-rose-100"
              >
                <Pencil size={16} />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-5 h-11 rounded-xl font-bold text-slate-500 hover:bg-rose-50 transition-all"
                >
                  Discard
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 bg-red-500 text-white px-8 h-11 rounded-xl font-bold hover:bg-emerald-700 transition-all active:scale-95 shadow-md shadow-emerald-100 disabled:opacity-50"
                >
                  {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-12 space-y-20">
        <div className="grid gap-20">
          
          <Section title="General Information" icon={<User size={18}/>}>
            <div className="grid gap-10">
              <Field label="Resume Title" value={resume.title} disabled={!isEditing} onChange={(v) => update("title", v)} placeholder="e.g. Senior Product Designer" />
              <Field label="Professional Summary" textarea value={resume.summary} disabled={!isEditing} onChange={(v) => update("summary", v)} placeholder="Describe your career Highlights..." />
              <Field label="Skills" value={(resume.skills || []).join(", ")} disabled={!isEditing} onChange={(v) => update("skills", v.split(",").map(s => s.trim()))} placeholder="React, Tailwind, Node.js..." />
            </div>
          </Section>

          <Section title="Personal Details" icon={<Mail size={18}/>}>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
              {["fullName", "designation", "email", "phone", "location"].map((k) => (
                <Field key={k} label={k} value={resume.personal_details?.[k] || ""} disabled={!isEditing} onChange={(v) => updateNested("personal_details", k, v)} />
              ))}
            </div>
          </Section>

          <Section title="Social Presence" icon={<Share2 size={18}/>}>
            <div className="grid md:grid-cols-3 gap-8">
              {["linkedIn", "github", "portfolio"].map((k) => (
                <Field key={k} label={k} value={resume.socials?.[k] || ""} disabled={!isEditing} onChange={(v) => updateNested("socials", k, v)} />
              ))}
            </div>
          </Section>

          <ArraySection
            title="Education"
            icon={<GraduationCap size={20}/>}
            items={resume.education}
            fields={Object.keys(emptyEducation)}
            isEditing={isEditing}
            onAdd={() => addArrayItem("education", emptyEducation)}
            onRemove={(i) => removeArrayItem("education", i)}
            onUpdate={(i, k, v) => updateArrayItem("education", i, k, v)}
          />

          <ArraySection
            title="Experience"
            icon={<Briefcase size={20}/>}
            items={resume.experience}
            fields={Object.keys(emptyExperience)}
            isEditing={isEditing}
            onAdd={() => addArrayItem("experience", emptyExperience)}
            onRemove={(i) => removeArrayItem("experience", i)}
            onUpdate={(i, k, v) => updateArrayItem("experience", i, k, v)}
          />

          <ArraySection
            title="Projects"
            icon={<FolderKanban size={20}/>}
            items={resume.projects}
            fields={Object.keys(emptyProject).filter(f => f !== "technologies")}
            isEditing={isEditing}
            onAdd={() => addArrayItem("projects", emptyProject)}
            onRemove={(i) => removeArrayItem("projects", i)}
            onUpdate={(i, k, v) => updateArrayItem("projects", i, k, v)}
            specialField="technologies"
          />
          
          <ArraySection
            title="Certifications"
            icon={<Award size={20}/>}
            items={resume.certifications}
            fields={Object.keys(emptyCertification)}
            isEditing={isEditing}
            onAdd={() => addArrayItem("certifications", emptyCertification)}
            onRemove={(i) => removeArrayItem("certifications", i)}
            onUpdate={(i, k, v) => updateArrayItem("certifications", i, k, v)}
          />
        </div>
      </div>
    </div>
  );
}

/* ---------------- BEAUTIFIED HELPERS ---------------- */

const Section = ({ title, icon, children }) => (
  <motion.section 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="space-y-6"
  >
    <div className="flex items-center gap-3 ml-2">
      <div className="bg-rose-50 text-rose-600 p-2.5 rounded-2xl">
        {icon}
      </div>
      <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight leading-none">{title}</h2>
    </div>
    <div className="bg-white border border-rose-100 rounded-[2.5rem] p-10 shadow-xl shadow-rose-900/5 transition-all">
      {children}
    </div>
  </motion.section>
);

const Field = ({ label, value, onChange, disabled, textarea, placeholder }) => (
  <div className="space-y-2 group">
    <label className="capitalize text-[10px] font-black tracking-[0.2em] text-slate-400 group-focus-within:text-rose-600 transition-colors">
      {label.replace(/([A-Z])/g, ' $1')}
    </label>
    {textarea ? (
      <textarea
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full text-lg bg-white/50 px-5 py-4 rounded-2xl border-2 outline-none transition-all resize-none min-h-[140px]
          ${disabled ? "border-transparent text-slate-600 bg-transparent px-0 font-medium cursor-default" : "border-rose-50 focus:border-rose-500 focus:bg-white shadow-sm"}`}
      />
    ) : (
      <input
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full text-lg bg-white/50 px-5 py-4 rounded-2xl border-2 outline-none transition-all
          ${disabled ? "border-transparent text-slate-600 bg-transparent px-0 font-medium cursor-default" : "border-rose-50 focus:border-rose-500 focus:bg-white shadow-sm"}`}
      />
    )}
  </div>
);

const ArraySection = ({ title, icon, items = [], fields, isEditing, onAdd, onRemove, onUpdate, specialField }) => (
  <Section title={title} icon={icon}>
    <div className="space-y-12">
      <AnimatePresence mode="popLayout">
        {items.map((item, i) => (
          <motion.div 
            key={i}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="group relative bg-rose-50/20 rounded-[2rem] p-10 border border-rose-50/50 hover:border-rose-200 transition-all"
          >
            {isEditing && (
              <button
                onClick={() => onRemove(i)}
                className="absolute -top-3 -right-3 w-10 h-10 bg-white shadow-md border border-rose-100 rounded-full flex items-center justify-center text-rose-500 hover:bg-rose-500 hover:text-white transition-all z-10"
              >
                <Trash2 size={18} />
              </button>
            )}

            <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
              {fields.map((f) => (
                <Field
                  key={f}
                  label={f}
                  value={item[f] || ""}
                  disabled={!isEditing}
                  onChange={(v) => onUpdate(i, f, v)}
                />
              ))}

              {specialField && (
                <div className="md:col-span-2">
                  <Field
                    label="Technologies (comma separated)"
                    value={(item.technologies || []).join(", ")}
                    disabled={!isEditing}
                    onChange={(v) => onUpdate(i, "technologies", v.split(",").map(t => t.trim()))}
                    placeholder="React, Laravel, Docker..."
                  />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {isEditing && (
        <button
          onClick={onAdd}
          className="w-full py-8 border-2 border-dashed border-rose-200 rounded-[2rem] text-rose-400 font-bold hover:bg-rose-50 hover:border-rose-400 hover:text-rose-600 transition-all flex items-center justify-center gap-3 group"
        >
          <Plus size={24} className="group-hover:rotate-90 transition-transform" />
          Add New {title} Entry
        </button>
      )}
    </div>
  </Section>
);