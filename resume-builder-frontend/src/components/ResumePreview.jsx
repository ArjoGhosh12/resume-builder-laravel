import ModernTemplate from "../templates/ModernTemplate";
import MinimalTemplate from "../templates/MinimalTemplate";
import ElegantTemplate from "../templates/ElegantTemplate";

export default function ResumePreview({ resume }) {
  if (resume.template === "minimal") {
    return <MinimalTemplate resume={resume} />;
  }
  if (resume.template === "elegant") {
    return <ElegantTemplate resume={resume} />;
  }
  return <ModernTemplate resume={resume} />;
}
