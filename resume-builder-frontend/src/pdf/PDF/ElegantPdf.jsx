import { View, Text, StyleSheet } from "@react-pdf/renderer";

export default function ElegantPDF({ resume }) {
  if (!resume) return null;

  const accent = resume.accentColor || "#9f1239";

  const styles = StyleSheet.create({
    page: {
      padding: 42,
      fontFamily: "Times-Roman",
      color: "#1f2937",
    },

    /* HEADER */
    header: {
      borderBottomWidth: 1,
      borderBottomColor: `${accent}20`,
      paddingBottom: 14,
      marginBottom: 18,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    name: {
      fontSize: 26,
      fontWeight: "bold",
    },
    designation: {
      fontSize: 12,
      fontStyle: "italic",
      color: accent,
      marginTop: 4,
    },
    contact: {
      fontSize: 9,
      textAlign: "right",
      color: "#6b7280",
    },

    /* SECTION */
    section: {
      marginBottom: 18,
    },
    sectionTitle: {
      fontSize: 10,
      textTransform: "uppercase",
      letterSpacing: 2,
      color: accent,
      marginBottom: 8,
    },

    /* SKILLS */
    skillsWrap: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 6,
    },
    skill: {
      fontSize: 9,
      backgroundColor: `${accent}20`,
      color: accent,
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 10,
    },

    /* EXPERIENCE */
    expItem: {
      marginBottom: 10,
      paddingLeft: 10,
      borderLeftWidth: 2,
      borderLeftColor: `${accent}30`,
    },
    expHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    expRole: {
      fontSize: 11,
      fontWeight: "bold",
    },
    expDate: {
      fontSize: 8,
      color: "#9ca3af",
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

    /* TWO COLUMN */
    grid: {
      flexDirection: "row",
      gap: 18,
    },
    col: {
      flex: 1,
    },

    /* PROJECTS */
    projectBox: {
      backgroundColor: "#f9fafb",
      padding: 8,
      borderLeftWidth: 4,
      borderLeftColor: accent,
      marginBottom: 8,
    },
    projectTitle: {
      fontSize: 10,
      fontWeight: "bold",
    },
    projectText: {
      fontSize: 9,
      color: "#374151",
    },

    /* EDUCATION */
    eduItem: {
      marginBottom: 8,
    },
    eduDegree: {
      fontSize: 10,
      fontWeight: "bold",
    },
    eduMeta: {
      fontSize: 9,
      color: accent,
    },

    /* CERTIFICATIONS */
    certItem: {
      fontSize: 9,
      color: "#374151",
      marginBottom: 4,
    },
  });

  const {
    personal_details,
    skills = [],
    experiences = [],
    projects = [],
    educations = [],
    certifications = [],
  } = resume;

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <View>
          <Text style={styles.name}>{personal_details.fullName}</Text>
          <Text style={styles.designation}>{personal_details.designation}</Text>
        </View>

        <View style={styles.contact}>
          <Text>{personal_details.location}</Text>
          <Text>{personal_details.email}</Text>
          <Text>{personal_details.phone}</Text>
        </View>
      </View>

      {resume.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={{ fontSize: 10, lineHeight: 1.5 }}>
            {resume.summary}
          </Text>
        </View>
      )}

      {skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Core Skills</Text>
          <View style={styles.skillsWrap}>
            {skills.map((s, i) => (
              <Text key={i} style={styles.skill}>{s}</Text>
            ))}
          </View>
        </View>
      )}

      {experiences.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Experience</Text>
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

      <View style={styles.grid}>
        {projects.length > 0 && (
          <View style={styles.col}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.map((p, i) => (
              <View key={i} style={styles.projectBox}>
                <Text style={styles.projectTitle}>{p.name}</Text>
                <Text style={styles.projectText}>{p.description}</Text>
              </View>
            ))}
          </View>
        )}

        {educations.length > 0 && (
          <View style={styles.col}>
            <Text style={styles.sectionTitle}>Education</Text>
            {educations.map((e, i) => (
              <View key={i} style={styles.eduItem}>
                <Text style={styles.eduDegree}>{e.degree}</Text>
                <Text>{e.institution}</Text>
                <Text style={styles.eduMeta}>
                  {e.endDate} • GPA {e.grade}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>

      {certifications.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Certifications</Text>
          {certifications.map((c, i) => (
            <Text key={i} style={styles.certItem}>
              {c.title} ({c.issuer})
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}
