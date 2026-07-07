const trustItems = [
  ["Dispatch", "24-hour dispatch", "Fast packing for ready pieces."],
  ["Returns", "Easy returns help", "Guidance for size or quality issues."],
  ["WhatsApp", "Instant in-store feel", "Ask on WhatsApp before buying."],
  ["Fit", "Custom fitting", "Measurement help before order."],
];

export function TrustStrip() {
  return (
    <section className="section section-tight trust-strip-section">
      <div className="trust-strip">
        {trustItems.map(([icon, title, text]) => (
          <div key={title} className="trust-item">
            <span className="trust-icon">{icon}</span>
            <strong>{title}</strong>
            <span>{text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
