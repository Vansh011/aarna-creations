import Link from "next/link";
import { CalendarCheck, MapPin, Store, Youtube } from "lucide-react";

const DUMMY_MAP_LINK = "https://www.google.com/maps";

export function Footer() {
  const whatsapp = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "91XXXXXXXXXX").replace(/\D/g, "");
  const appointmentMessage = encodeURIComponent(
    "Hi AARNA CREATIONS, I would like to book an appointment to visit the boutique. Please suggest a suitable timing."
  );

  return (
    <footer className="footer">
      <div className="section">
        <div>
          <strong className="block font-serif text-2xl leading-none text-[#fffaf1]">AARNA CREATIONS</strong>
          <p className="mt-2">Curated ethnic wear by Abha Maheshwari.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/shop" className="text-sm font-bold text-[#e8c989] hover:text-white">
              Shop collection
            </Link>
            <Link href="/about" className="text-sm font-bold text-[#e8c989] hover:text-white">
              Our story
            </Link>
            <a
              href="https://www.youtube.com/@aarnacreations1921"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-bold text-[#e8c989] hover:text-white"
            >
              <Youtube className="h-4 w-4" /> YouTube
            </a>
          </div>
        </div>
        <div className="footer-actions">
          <Link className="btn-proto btn-outline-proto" href="/shop">
            <Store className="h-4 w-4" />
            Store
          </Link>
          <a className="btn-proto btn-outline-proto" href={DUMMY_MAP_LINK} target="_blank" rel="noopener noreferrer">
            <MapPin className="h-4 w-4" />
            Location
          </a>
          <a
            className="btn-proto btn-outline-proto"
            href={"https://wa.me/" + whatsapp + "?text=" + appointmentMessage}
            target="_blank"
            rel="noopener noreferrer"
          >
            <CalendarCheck className="h-4 w-4" />
            Book Appointment
          </a>
        </div>
      </div>
    </footer>
  );
}
