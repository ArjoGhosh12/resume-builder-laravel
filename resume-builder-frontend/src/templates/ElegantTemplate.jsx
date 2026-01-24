export default function ElegantTemplate({ resume }) {
  const { personal_details, socials } = resume;
  const accent = resume.accentColor || "#8b1d1d";

  return (
    <div
      className="bg-white p-12 rounded-2xl shadow-2xl text-slate-800 font-serif leading-relaxed max-w-[900px] mx-auto"
      style={{ borderTop: `12px solid ${accent}` }}
    >

      {/* HEADER */}
      <header
        className="pb-8 mb-8 flex justify-between items-end"
        style={{ borderBottom: `1px solid ${accent}30` }}
      >
        <div className="space-y-2">
          <h1
            className="text-4xl font-bold tracking-tight"
            style={{ color: accent }}
          >
            {personal_details.fullName || "Full Name"}
          </h1>
          <p
            className="italic text-lg font-medium tracking-wide"
            style={{ color: accent }}
          >
            {personal_details.designation || "Professional Designation"}
          </p>
        </div>

        <div className="text-right text-[11px] font-sans space-y-1 uppercase tracking-widest text-slate-500">
          <p>{personal_details.location}</p>
          <p className="font-bold" style={{ color: accent }}>
            {personal_details.email}
          </p>
          <p>{personal_details.phone}</p>
        </div>
      </header>

      {/* SUMMARY */}
      {resume.summary && (
        <section className="mb-10">
          <p
            className="text-sm font-sans text-slate-600 leading-relaxed first-letter:text-3xl first-letter:font-serif first-letter:float-left first-letter:mr-2"
            style={{ firstLetterColor: accent }}
          >
            {resume.summary}
          </p>
        </section>
      )}

      <div className="grid grid-cols-1 gap-10 font-sans">

        {/* SKILLS */}
        {resume.skills?.length > 0 && (
          <section>
            <h3
              className="text-xs uppercase tracking-[0.3em] font-bold mb-5 flex items-center gap-4"
              style={{ color: accent }}
            >
              Core Skills
              <span
                className="flex-grow h-[1px]"
                style={{ backgroundColor: `${accent}30` }}
              />
            </h3>

            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs">
              {resume.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 font-semibold rounded-full"
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
          <section>
            <h3
              className="text-xs uppercase tracking-[0.3em] font-bold mb-5 flex items-center gap-4"
              style={{ color: accent }}
            >
              Professional Experience
              <span
                className="flex-grow h-[1px]"
                style={{ backgroundColor: `${accent}30` }}
              />
            </h3>

            <div className="space-y-8">
              {resume.experiences.map((e, i) => (
                <div
                  key={i}
                  className="relative pl-6"
                  style={{ borderLeft: `2px solid ${accent}30` }}
                >
                  <div
                    className="absolute size-2 rounded-full -left-[5px] top-1.5"
                    style={{ backgroundColor: accent }}
                  />

                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-slate-900">
                      {e.position}
                    </h4>
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full font-bold"
                      style={{
                        backgroundColor: `${accent}15`,
                        color: accent,
                      }}
                    >
                      {e.startDate} — {e.current ? "Present" : e.endDate}
                    </span>
                  </div>

                  <p
                    className="text-xs font-semibold mb-2"
                    style={{ color: accent }}
                  >
                    {e.organization}
                  </p>

                  <p className="text-xs text-slate-600 leading-normal">
                    {e.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PROJECTS & EDUCATION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* PROJECTS */}
          {resume.projects?.length > 0 && (
            <section>
              <h3
                className="text-xs uppercase tracking-[0.3em] font-bold mb-5"
                style={{ color: accent }}
              >
                Selected Projects
              </h3>

              <div className="space-y-4">
                {resume.projects.map((p, i) => (
                  <div
                    key={i}
                    className="bg-slate-50 p-4 rounded-lg"
                    style={{ borderLeft: `4px solid ${accent}` }}
                  >
                    <h4 className="text-sm font-bold text-slate-900">
                      {p.name}
                    </h4>
                    <p className="text-[11px] text-slate-600 mt-1 mb-2 italic">
                      {p.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* EDUCATION */}
          {resume.educations?.length > 0 && (
            <section>
              <h3
                className="text-xs uppercase tracking-[0.3em] font-bold mb-5"
                style={{ color: accent }}
              >
                Education
              </h3>

              <div className="space-y-4">
                {resume.educations.map((e, i) => (
                  <div key={i} className="space-y-1">
                    <p className="text-sm font-bold text-slate-800">
                      {e.degree}
                    </p>
                    <p className="text-xs text-slate-500">
                      {e.institution}
                    </p>
                    <div
                      className="flex justify-between text-[10px] font-bold"
                      style={{ color: accent }}
                    >
                      <span>{e.endDate}</span>
                      <span>GPA: {e.grade}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* FOOTER */}
        <footer
          className="pt-8 flex flex-col md:flex-row justify-between gap-6"
          style={{ borderTop: `1px solid ${accent}30` }}
        >
          {/* SOCIALS */}
          <div className="space-y-3">
            <h3 className="text-[10px] uppercase tracking-widest font-bold text-slate-400">
              Digital Presence
            </h3>
            <div className="flex gap-4 text-xs font-medium">
              {socials?.linkedIn && <span style={{ color: accent }}>LinkedIn</span>}
              {socials?.github && <span style={{ color: accent }}>GitHub</span>}
              {socials?.portfolio && <span style={{ color: accent }}>Portfolio</span>}
            </div>
          </div>

          {/* CERTIFICATIONS */}
          {resume.certifications?.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-[10px] uppercase tracking-widest font-bold text-slate-400">
                Certifications
              </h3>

              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {resume.certifications.map((c, i) => (
                  <p key={i} className="text-xs text-slate-700 italic">
                    {c.title}{" "}
                    <span
                      className="text-[10px] font-bold"
                      style={{ color: accent }}
                    >
                      ({c.issuer})
                    </span>
                  </p>
                ))}
              </div>
            </div>
          )}
        </footer>
      </div>
    </div>
  );
}
