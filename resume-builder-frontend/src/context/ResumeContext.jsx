import { createContext, useContext, useEffect, useState } from "react";
import api from "../lib/api";

const ResumeContext = createContext(null);

/* ---------- DEFAULT RESUME SHAPE ---------- */

const defaultResume = {
  title: "",
  summary: "",
  personal_details: {
    name: "",
    email: "",
    phone: "",
    location: "",
  },
  education: [
    {
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      grade: "",
    },
  ],
  experience: [],
  skills: [],
  certifications: [],
};

/* ========================================= */

export function ResumeProvider({ children, initialResume }) {
  /* ---------- LIST STATE (Dashboard) ---------- */
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------- SINGLE RESUME STATE (Editor) ---------- */
  const [step, setStep] = useState(0);
  const [resume, setResume] = useState(initialResume || defaultResume);

  /* ================= LIST LOGIC ================= */

  const fetchResumes = async () => {
    try {
      const res = await api.get("/resumes");
      const list = Array.isArray(res.data)
        ? res.data
        : res.data?.data || [];
      setResumes(list);
    } finally {
      setLoading(false);
    }
  };

  const deleteResume = async (id) => {
    await api.delete(`/resumes/${id}`);
    setResumes((prev) => prev.filter((r) => r.id !== id));
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  /* ================= EDIT LOGIC ================= */

  const update = (key, value) => {
    setResume((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateNested = (section, key, value) => {
    setResume((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const updateArrayItem = (section, index, key, value) => {
    setResume((prev) => {
      const updated = [...prev[section]];
      updated[index] = {
        ...updated[index],
        [key]: value,
      };
      return { ...prev, [section]: updated };
    });
  };

  const addArrayItem = (section, emptyItem) => {
    setResume((prev) => ({
      ...prev,
      [section]: [...prev[section], emptyItem],
    }));
  };

  const removeArrayItem = (section, index) => {
    setResume((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  const setResumeData = (data) => {
    setResume(data);
  };

  const resetResume = () => {
    setResume(defaultResume);
    setStep(0);
  };
const logout = async () => {
  try {
    await api.post("/logout"); // backend token revoke
  } catch (_) {
    // ignore error
  } finally {
    localStorage.removeItem("token");
    resetResume(); // optional but good
    window.location.href = "/signin";
  }
};
const addResume = (resume) => {
  setResumes((prev) => [resume, ...prev]);
};
  /* ================= PROVIDER ================= */

  return (
    <ResumeContext.Provider
      value={{
        /* dashboard */
        resumes,
        loading,
        fetchResumes,
        deleteResume,
        addResume,
        /* editor */
        step,
        setStep,
        resume,
        update,
        updateNested,
        updateArrayItem,
        addArrayItem,
        removeArrayItem,
        setResumeData,
        resetResume,
        logout, 
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

/* ================= HOOK ================= */

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResume must be used inside ResumeProvider");
  }
  return context;
}
