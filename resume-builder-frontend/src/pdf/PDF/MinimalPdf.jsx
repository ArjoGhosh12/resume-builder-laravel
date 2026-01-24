import { View, Text, StyleSheet } from "@react-pdf/renderer";

export default function MinimalPdf({ resume }) {
  const accent = resume.accentColor || "#e11d48";

  const styles = StyleSheet.create({
    page: {
      padding: 40,
      fontFamily: "Helvetica",
      fontSize: 10,
      color: "#1f2937",
    },

    /* HEADER */
    header: {
      textAlign: "center",
      marginBottom: 24,
    },
    name: {
      fontSize: 26,
      fontWeight: 300,
      marginBottom: 6,
    },
    designation: {
      fontSize: 10,
      letterSpacing: 3,
      color: accent,
      textTransform: "uppercase",
      marginBottom: 10,
    },
    contactRow: {
      flexDirection: "row",
      justifyContent: "center",
      gap: 10,
      fontSize: 9,
      color: "#9ca3af",
      borderTopWidth: 1,
      borderTopColor: "#f1f5f9",
      paddingTop: 6,
      marginBottom: 6,
    },
    socials: {
      flexDirection: "row",
      justifyContent: "center",
      gap: 12,
      fontSize: 9,
      color: "#6b7280",
    },

    /* SECTION */
    section: {
      marginBottom: 18,
    },
    sectionTitle: {
      fontSize: 9,
      textTransform: "uppercase",
      letterSpacing: 2,
      color: accent,
      borderBottomWidth: 1,
      borderBottomColor: `${accent}40`,
      paddingBottom: 3,
      marginBottom: 8,
      fontWeight: "bold",
    },

    /* SUMMARY */
    summary: {
      fontSize: 10,
      fontStyle: "italic",
      textAlign: "center",
      color: "#475569",
      marginBottom: 20,
    },

    /* SKILLS */
    skillsWrap: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 6,
    },
    skill: {
      fontSize: 9,
      paddingVertical: 3,
      paddingHorizontal: 8,
      borderRadius: 10,
      backgroundColor: `${accent}20`,
      color: accent,
    },

    /* EXPERIENCE */
    expItem: {
      marginBottom: 10,
    },
    expHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    expRole: {
      fontSize: 10,
      fontWeight: "bold",
    },
    expDate: {
      fontSize: 8,
      color: "#9ca3af",
      textTransform: "uppercase",
    },
    expOrg: {
      fontSize: 9,
      color: accent,
      marginBottom: 2,
    },
    expDesc: {
      fontSize: 9,
      color: "#374151",
      lineHeight: 1.4,
    },

    /* PROJECTS */
    projectItem: {
      marginBottom: 8,
    },
    projectTitle: {
      fontSize: 9,
      fontWeight: "bold",
    },
    projectDesc: {
      fontSize: 9,
      color: "#374151",
      marginVertical: 2,
    },
    projectLinks: {
      fontSize: 8,
      color: accent,
      textTransform: "uppercase",
    },

    /* EDUCATION */
    eduRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      fontSize: 9,
      marginBottom: 6,
    },
    eduDegree: {
      fontWeight: "bold",
    },
    eduMeta: {
      fontSize: 8,
      color: accent,
      textAlign: "right",
    },

    /* CERTIFICATIONS */
    certRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      fontSize: 9,
      marginBottom: 4,
    },
    dot: {
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: accent,
    },
  });

  const {
    personal_details,
    socials,
    summary,
    skills = [],
    experiences = [],
    projects = [],
    educations = [],
    certifications = [],
  } = resume;

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.name}>{personal_details.fullName}</Text>
        <Text style={styles.designation}>{personal_details.designation}</Text>

        <View style={styles.contactRow}>
          {personal_details.email && <Text>{personal_details.email}</Text>}
          {personal_details.phone && <Text>{personal_details.phone}</Text>}
          {personal_details.location && <Text>{personal_details.location}</Text>}
        </View>

        <View style={styles.socials}>
          {socials?.linkedIn && <Text>LinkedIn</Text>}
          {socials?.github && <Text>GitHub</Text>}
          {socials?.portfolio && <Text>Portfolio</Text>}
        </View>
      </View>

      {summary && <Text style={styles.summary}>"{summary}"</Text>}

      {skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillsWrap}>
            {skills.map((s, i) => (
              <Text key={i} style={styles.skill}>{s}</Text>
            ))}
          </View>
        </View>
      )}

      {experiences.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {experiences.map((e, i) => (
            <View key={i} style={styles.expItem}>
              <View style={styles.expHeader}>
                <Text style={styles.expRole}>{e.position}</Text>
                <Text style={styles.expDate}>
                  {e.startDate} — {e.current ? "Present" : e.endDate}
                </Text>
              </View>
              <Text style={styles.expOrg}>{e.organization}</Text>
              <Text style={styles.expDesc}>{e.description}</Text>
            </View>
          ))}
        </View>
      )}

      {projects.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Projects</Text>
          {projects.map((p, i) => (
            <View key={i} style={styles.projectItem}>
              <Text style={styles.projectTitle}>{p.name}</Text>
              <Text style={styles.projectDesc}>{p.description}</Text>
              <Text style={styles.projectLinks}>
                {p.githubLink && "Code "}
                {p.liveLink && "Live"}
              </Text>
            </View>
          ))}
        </View>
      )}

      {educations.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {educations.map((e, i) => (
            <View key={i} style={styles.eduRow}>
              <View>
                <Text style={styles.eduDegree}>
                  {e.degree} in {e.field}
                </Text>
                <Text>{e.institution}</Text>
              </View>
              <Text style={styles.eduMeta}>
                {e.endDate}
                {"\n"}
                {e.grade}
              </Text>
            </View>
          ))}
        </View>
      )}

      {certifications.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Certifications</Text>
          {certifications.map((c, i) => (
            <View key={i} style={styles.certRow}>
              <View style={styles.dot} />
              <Text>{c.title} — {c.issuer}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
