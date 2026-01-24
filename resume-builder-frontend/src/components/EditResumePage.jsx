import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ResumeProvider } from "../context/ResumeContext";
import EditResume from "./EditResume";
import axios from "axios";

export default function EditResumePage() {
  const { id } = useParams();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/resumes/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setResume(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API error:", err.response?.data || err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!resume) return <div>Resume not found</div>;

  return (
    <ResumeProvider initialResume={normalizeResume(resume)}>
      <EditResume />
    </ResumeProvider>
  );
}

/* -------- REQUIRED NORMALIZATION (FIXED) -------- */
function normalizeResume(data) {
  return {
    id: data.id, // ✅ REQUIRED FOR UPDATE

    title: data.title || "",
    summary: data.summary || "",

    personal_details: data.personal_details || {
      name: "",
      email: "",
      phone: "",
      location: "",
    },

    education: data.educations || [],
    experience: data.experiences || [],

    skills:
      typeof data.skills === "string"
        ? JSON.parse(data.skills || "[]")
        : data.skills || [],

    certifications: data.certifications || [],
  };
}
