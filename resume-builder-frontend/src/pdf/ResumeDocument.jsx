// src/pdf/ResumeDocument.jsx
import { Document, Page } from "@react-pdf/renderer";

import ModernPDF from "./PDF/ModernPdf";
import MinimalPDF from "./PDF/MinimalPdf";
import ElegantPDF from "./PDF/ElegantPdf";

export default function ResumeDocument({ resume }) {
  if (!resume) {
    console.error("ResumeDocument received undefined resume");
    return null;
  }

  const templateKey = resume.template || "modern";

  const Template =
    {
      modern: ModernPDF,
      minimal: MinimalPDF,
      elegant: ElegantPDF,
    }[templateKey] || ModernPDF;

  return (
    <Document>
      <Page size="A4">
        <Template resume={resume} />
      </Page>
    </Document>
  );
}
