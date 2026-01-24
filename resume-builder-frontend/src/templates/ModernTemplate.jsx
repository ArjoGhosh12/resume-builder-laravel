export default function ModernTemplate({ resume }) {
  const { personal_details } = resume;
  const accent = resume.accentColor || "#8b1d1d";

  return (
    <div className="bg-white p-8 rounded-2xl shadow space-y-6 text-sm">
      
      {/* HEADER */}
      <header>
        <h1
          className="text-2xl font-bold"
          style={{ color: accent }}
        >
          {personal_details.fullName}
        </h1>

        <p
          className="font-medium"
          style={{ color: accent }}
        >
          {personal_details.designation}
        </p>

        <p className="text-xs text-gray-600">
          {personal_details.email} • {personal_details.phone} • {personal_details.location}
        </p>
      </header>

      {/* SUMMARY */}
      {resume.summary && (
        <section>
          <h3
            className="font-bold uppercase text-xs"
            style={{ color: accent }}
          >
            Summary
          </h3>
          <p>{resume.summary}</p>
        </section>
      )}

      {/* SKILLS */}
      {resume.skills?.length > 0 && (
        <section>
          <h3
            className="font-bold uppercase text-xs"
            style={{ color: accent }}
          >
            Skills
          </h3>

          <div className="flex flex-wrap gap-2 mt-1">
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
        <section>
          <h3
            className="font-bold uppercase text-xs"
            style={{ color: accent }}
          >
            Experience
          </h3>

          {resume.experiences.map((e, i) => (
            <div key={i} className="mt-2">
              <p className="font-semibold">
                {e.position} — {e.organization}
              </p>
              <p className="text-xs text-gray-500">
                {e.startDate} – {e.current ? "Present" : e.endDate}
              </p>
              <p>{e.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* EDUCATION */}
      {resume.educations?.length > 0 && (
        <section>
          <h3
            className="font-bold uppercase text-xs"
            style={{ color: accent }}
          >
            Education
          </h3>

          {resume.educations.map((e, i) => (
            <p key={i}>
              {e.degree}, {e.field} — {e.institution}
            </p>
          ))}
        </section>
      )}

      {/* PROJECTS */}
      {resume.projects?.length > 0 && (
        <section>
          <h3
            className="font-bold uppercase text-xs"
            style={{ color: accent }}
          >
            Projects
          </h3>

          {resume.projects.map((p, i) => (
            <p key={i}>
              <strong>{p.name}</strong>: {p.description}
            </p>
          ))}
        </section>
      )}

      {/* CERTIFICATIONS */}
      {resume.certifications?.length > 0 && (
        <section>
          <h3
            className="font-bold uppercase text-xs"
            style={{ color: accent }}
          >
            Certifications
          </h3>

          {resume.certifications.map((c, i) => (
            <p key={i}>
              {c.title} — {c.issuer}
            </p>
          ))}
        </section>
      )}
    </div>
  );
}
