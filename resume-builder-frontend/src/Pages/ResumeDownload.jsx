import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { pdf } from "@react-pdf/renderer";
import api from "../lib/api";
import ResumeDocument from "../pdf/ResumeDocument";

export default function ResumeDownload() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const download = async () => {
      try {
        const res = await api.get(`/resumes/${id}`);
        console.log("API RESPONSE:", res.data);

        const resume = res.data;

        // ✅ Normalize JSON-string fields
        const normalizeArray = (val) => {
          if (Array.isArray(val)) return val;
          if (typeof val === "string") {
            try {
              return JSON.parse(val);
            } catch {
              return [];
            }
          }
          return [];
        };

        resume.skills = normalizeArray(resume.skills);
        resume.languages = normalizeArray(resume.languages);

        if (!resume) throw new Error("Resume not found");

        // 2️⃣ Generate PDF
        const blob = await pdf(<ResumeDocument resume={resume} />).toBlob();

        // 3️⃣ Download
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${resume.title || "resume"}.pdf`;
        link.click();
        URL.revokeObjectURL(url);

        // 4️⃣ Redirect back
        navigate("/dashboard");
      } catch (e) {
        console.error(e);
        alert("Failed to download resume");
        navigate("/dashboard");
      }
    };

    download();
  }, [id, navigate]);

  return (
    <div className="flex justify-center py-20 text-slate-500">
      Generating PDF…
    </div>
  );
}
