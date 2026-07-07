import Link from "next/link";
import { MessageCircle, Youtube } from "lucide-react";

export function Footer() {
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "91XXXXXXXXXX";

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
        <a
          className="btn-proto btn-outline-proto"
          href={"https://wa.me/" + whatsapp.replace(/\D/g, "")}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle className="h-4 w-4" />
          Order on WhatsApp
        </a>
      </div>
    </footer>
  );
}
