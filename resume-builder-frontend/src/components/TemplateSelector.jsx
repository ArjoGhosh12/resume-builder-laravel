export default function TemplateSelector({ value, onChange }) {
  const templates = [
    { id: "modern", label: "Modern" },
    { id: "minimal", label: "Minimal" },
    { id: "elegant", label: "Elegant" },
  ];

  return (
    <div className="bg-white border-b">
      <div className="max-w-[1400px] mx-auto px-10 py-6">
        <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
          Resume Template
        </h3>

        <div className="flex gap-4">
          {templates.map((t) => (
            <button
              key={t.id}
              onClick={() => onChange(t.id)}
              className={`px-6 py-3 rounded-xl border font-semibold transition
                ${
                  value === t.id
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border hover:border-primary/40"
                }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
