export default function MinimalTemplate({ resume }) {
  const { personal_details, socials } = resume;
  const accent = resume.accentColor || "#8b1d1d";

  return (
    <div className="bg-white p-12 rounded-2xl text-slate-800 leading-relaxed min-h-[1000px] shadow-sm border border-slate-100">
      
      {/* HEADER */}
      <header className="text-center space-y-3 mb-12">
        <h1
          className="text-4xl font-extralight tracking-tight text-slate-900"
          style={{ color: accent }}
        >
          {personal_details.fullName || "Your Name"}
        </h1>

        <p
          className="uppercase text-xs tracking-[0.3em] font-semibold"
          style={{ color: accent }}
        >
          {personal_details.designation || "Professional Title"}
        </p>
        
        <div
          className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[11px] text-slate-400 pt-2 max-w-md mx-auto"
          style={{ borderTop: `1px solid ${accent}20` }}
        >
          {personal_details.email && <span>{personal_details.email}</span>}
          {personal_details.phone && <span>{personal_details.phone}</span>}
          {personal_details.location && <span>{personal_details.location}</span>}
        </div>

        <div className="flex justify-center gap-4 text-[10px] font-medium pt-1">
          {socials?.linkedIn && <span style={{ color: accent }}>LinkedIn</span>}
          {socials?.github && <span style={{ color: accent }}>GitHub</span>}
          {socials?.portfolio && <span style={{ color: accent }}>Portfolio</span>}
        </div>
      </header>

      {/* SUMMARY */}
      {resume.summary && (
        <section className="mb-10 text-center max-w-2xl mx-auto">
          <p className="text-sm text-slate-600 italic">"{resume.summary}"</p>
        </section>
      )}

      <div className="space-y-10">

        {/* SKILLS */}
        {resume.skills?.length > 0 && (
          <section className="space-y-4">
            <h3
              className="text-[10px] uppercase tracking-[0.2em] font-bold pb-1"
              style={{ borderBottom: `1px solid ${accent}`, color: accent }}
            >
              Skills
            </h3>

            <div className="flex flex-wrap gap-2">
              {resume.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs rounded-full"
                  style={{
                    backgroundColor: `${accent}15`,
                    color: accent,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* EXPERIENCE */}
        {resume.experiences?.length > 0 && (
          <section className="space-y-4">
            <h3
              className="text-[10px] uppercase tracking-[0.2em] font-bold pb-1"
              style={{ borderBottom: `1px solid ${accent}`, color: accent }}
            >
              Experience
            </h3>

            <div className="space-y-6">
              {resume.experiences.map((e, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline">
                    <h4
                      className="font-bold text-sm"
                      style={{ color: accent }}
                    >
                      {e.position}
                    </h4>
                    <span className="text-[10px] text-slate-400 uppercase">
                      {e.startDate} — {e.current ? "Present" : e.endDate}
                    </span>
                  </div>

                  <p className="text-xs font-medium text-slate-500 mb-1">
                    {e.organization}
                  </p>

                  <p className="text-xs text-slate-600">
                    {e.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PROJECTS */}
        {resume.projects?.length > 0 && (
          <section className="space-y-4">
            <h3
              className="text-[10px] uppercase tracking-[0.2em] font-bold pb-1"
              style={{ borderBottom: `1px solid ${accent}`, color: accent }}
            >
              Projects
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resume.projects.map((p, i) => (
                <div key={i}>
                  <h4
                    className="text-xs font-bold"
                    style={{ color: accent }}
                  >
                    {p.name}
                  </h4>
                  <p className="text-[11px] text-slate-600 my-1">
                    {p.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* EDUCATION */}
        {resume.educations?.length > 0 && (
          <section className="space-y-4">
            <h3
              className="text-[10px] uppercase tracking-[0.2em] font-bold pb-1"
              style={{ borderBottom: `1px solid ${accent}`, color: accent }}
            >
              Education
            </h3>

            <div className="space-y-4">
              {resume.educations.map((e, i) => (
                <div key={i} className="flex justify-between text-xs">
                  <div>
                    <span className="font-bold">{e.degree}</span>{" "}
                    <span className="text-slate-400">in</span>{" "}
                    <span>{e.field}</span>
                    <p className="text-slate-500 text-[11px]">
                      {e.institution}
                    </p>
                  </div>
                  <span className="text-[10px] text-right">
                    {e.endDate}
                    <br />
                    <span style={{ color: accent }} className="font-bold">
                      {e.grade}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CERTIFICATIONS */}
        {resume.certifications?.length > 0 && (
          <section className="space-y-4">
            <h3
              className="text-[10px] uppercase tracking-[0.2em] font-bold pb-1"
              style={{ borderBottom: `1px solid ${accent}`, color: accent }}
            >
              Certifications
            </h3>

            <div className="grid grid-cols-2 gap-y-2 text-xs">
              {resume.certifications.map((c, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div
                    className="size-1 rounded-full"
                    style={{ backgroundColor: accent }}
                  />
                  <span className="font-bold">{c.title}</span>
                  <span className="text-slate-400 text-[10px]">
                    — {c.issuer}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
