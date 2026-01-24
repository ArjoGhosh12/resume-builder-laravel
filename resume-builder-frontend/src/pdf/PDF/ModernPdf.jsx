import { View, Text, StyleSheet } from "@react-pdf/renderer";

export default function ModernPDF({ resume }) {
  const accent = resume.accentColor || "#dc2626";
  const { personal_details } = resume;

  const styles = StyleSheet.create({
    page: {
      padding: 40,
      fontFamily: "Helvetica",
      fontSize: 10,
      color: "#1f2937",
    },

    /* HEADER */
    header: {
      marginBottom: 20,
    },
    name: {
      fontSize: 20,
      fontWeight: "bold",
    },
    designation: {
      fontSize: 11,
      color: accent,
      marginBottom: 4,
    },
    contact: {
      fontSize: 9,
      color: "#6b7280",
    },

    /* SECTION */
    section: {
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 9,
      fontWeight: "bold",
      textTransform: "uppercase",
      marginBottom: 6,
      color: accent,
      borderBottomWidth: 1,
      borderBottomColor: `${accent}40`,
      paddingBottom: 3,
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
      marginBottom: 8,
    },
    expTitle: {
      fontSize: 10,
      fontWeight: "bold",
    },
    expDate: {
      fontSize: 8,
      color: "#6b7280",
    },
    expDesc: {
      fontSize: 9,
      lineHeight: 1.4,
    },
  });

  return (
    <View style={styles.page}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.name}>{personal_details.fullName}</Text>
        <Text style={styles.designation}>{personal_details.designation}</Text>
        <Text style={styles.contact}>
          {personal_details.email} • {personal_details.phone} • {personal_details.location}
        </Text>
      </View>

      {/* SUMMARY */}
      {resume.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text>{resume.summary}</Text>
        </View>
      )}

      {/* SKILLS */}
      {resume.skills?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillsWrap}>
            {resume.skills.map((skill, i) => (
              <Text key={i} style={styles.skill}>{skill}</Text>
            ))}
          </View>
        </View>
      )}

      {/* EXPERIENCE */}
      {resume.experiences?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {resume.experiences.map((e, i) => (
            <View key={i} style={styles.expItem}>
              <Text style={styles.expTitle}>
                {e.position} — {e.organization}
              </Text>
              <Text style={styles.expDate}>
                {e.startDate} – {e.current ? "Present" : e.endDate}
              </Text>
              <Text style={styles.expDesc}>{e.description}</Text>
            </View>
          ))}
        </View>
      )}

      {/* EDUCATION */}
      {resume.educations?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {resume.educations.map((e, i) => (
            <Text key={i}>
              {e.degree}, {e.field} — {e.institution}
            </Text>
          ))}
        </View>
      )}

      {/* PROJECTS */}
      {resume.projects?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Projects</Text>
          {resume.projects.map((p, i) => (
            <Text key={i}>
              {p.name}: {p.description}
            </Text>
          ))}
        </View>
      )}

      {/* CERTIFICATIONS */}
      {resume.certifications?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Certifications</Text>
          {resume.certifications.map((c, i) => (
            <Text key={i}>
              {c.title} — {c.issuer}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}
