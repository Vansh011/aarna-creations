import Image from "next/image";
import Link from "next/link";

const VISIT_ADDRESS = "AARNA CREATIONS Boutique, Indore, Madhya Pradesh. Full location shared on WhatsApp.";
const DUMMY_MAP_LINK = "https://www.google.com/maps";

export function BrandStory() {
  const whatsapp = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "91XXXXXXXXXX").replace(/\D/g, "");
  const appointmentMessage = encodeURIComponent(
    "Hi AARNA CREATIONS, I would like to book an appointment to visit the boutique. Please suggest a suitable timing."
  );

  return (
    <>
      <section className="cta-band">
        <div className="section cta-band-inner">
          <div>
            <span className="eyebrow mb-2">WhatsApp ordering</span>
            <h2 className="mt-2">Shortlist here. Confirm personally.</h2>
          </div>
          <p>Select first, then get in touch with us on WhatsApp and pay only after you are satisfied and the piece is customised.</p>
          <Link className="btn-proto btn-outline-proto" href="/shop">
            Start Ordering
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="visit-about">
          <div className="info-panel">
            <span className="eyebrow">Visit us</span>
            <h3>Feel the fabric before buying.</h3>
            <p>
              <strong>Address:</strong> {VISIT_ADDRESS}
            </p>
            <p>
              <strong>Hours:</strong> 11 AM to 7 PM, by appointment.
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a className="btn-proto btn-primary-proto" href={DUMMY_MAP_LINK} target="_blank" rel="noopener noreferrer">
                Google Map
              </a>
              <a
                className="btn-proto btn-outline-proto"
                href={"https://wa.me/" + whatsapp + "?text=" + appointmentMessage}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book an Appointment
              </a>
            </div>
          </div>
          <div className="owner-card">
            <Image
              src="/aarna-redesign/owner-portrait.webp"
              alt="Boutique owner portrait"
              width={360}
              height={450}
              sizes="(max-width: 720px) 100vw, 180px"
            />
            <div>
              <span className="eyebrow">About us</span>
              <p className="quote">
                &quot;I want every customer to feel guided, not rushed. The outfit should look beautiful and feel right.&quot;
              </p>
              <p className="meta mt-3">Abha Maheshwari, Founder and Curator</p>
              <Link className="btn-proto btn-outline-proto mt-4" href="/about">
                Read Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
