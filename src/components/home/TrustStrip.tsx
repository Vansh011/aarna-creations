const trustItems = [
  ["🚚", "24-hour dispatch", "Fast packing for ready pieces."],
  ["↩️", "Easy returns help", "Guidance for size or quality issues."],
  ["📱", "Instant in-store feel", "Ask on WhatsApp before buying."],
  ["🧵", "Custom fitting", "Measurement help before order."],
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
