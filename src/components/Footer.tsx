import { Instagram, Facebook, Twitter, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-12 bg-brand-navy-dark border border-brand-light/10 rounded-3xl overflow-hidden relative">
      {/* Decorative Top Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent opacity-50"></div>

      <div className="p-8 md:p-12 lg:p-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand & Introduction */}
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-serif tracking-tight text-brand-gold">Le Golfe</h2>
            <p className="text-[10px] uppercase tracking-[0.3em] opacity-60 mt-1">Gastronomie Marine</p>
          </div>
          <p className="text-sm text-brand-light/60 font-light leading-relaxed">
            L'excellence culinaire à Ajaccio. Une expérience gastronomique inoubliable mêlant produits marins locaux et panorama exceptionnel.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full border border-brand-light/10 flex items-center justify-center text-brand-light/60 hover:text-brand-gold hover:border-brand-gold transition-colors">
              <Instagram size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-brand-light/10 flex items-center justify-center text-brand-light/60 hover:text-brand-gold hover:border-brand-gold transition-colors">
              <Facebook size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-brand-light/10 flex items-center justify-center text-brand-light/60 hover:text-brand-gold hover:border-brand-gold transition-colors">
              <Twitter size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-6 pt-2 lg:pt-0">
          <h3 className="text-xs uppercase tracking-widest text-brand-light font-bold">Navigation</h3>
          <ul className="space-y-4">
            {['Le Restaurant', 'La Carte', 'Réserver', 'Événements Privés', 'Recrutement'].map((link) => (
              <li key={link}>
                <Link to="/" className="text-sm text-brand-light/60 hover:text-brand-gold transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-px bg-brand-gold transition-all duration-300 group-hover:w-4"></span>
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact info list */}
        <div className="space-y-6 pt-2 lg:pt-0">
          <h3 className="text-xs uppercase tracking-widest text-brand-light font-bold">Contact</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-4">
              <MapPin size={18} className="text-brand-gold shrink-0 mt-0.5" />
              <span className="text-sm text-brand-light/60">12 Route des Sanguinaires<br/>20000 Ajaccio, Corse</span>
            </li>
            <li className="flex items-center gap-4">
              <Phone size={18} className="text-brand-gold shrink-0" />
              <span className="text-sm text-brand-light/60">+33 4 95 00 00 00</span>
            </li>
            <li className="flex items-center gap-4">
              <Mail size={18} className="text-brand-gold shrink-0" />
              <span className="text-sm text-brand-light/60">contact@legolfe.com</span>
            </li>
          </ul>
        </div>

        {/* Newsletter / Awards */}
        <div className="space-y-6 pt-2 lg:pt-0">
          <h3 className="text-xs uppercase tracking-widest text-brand-light font-bold">L'Épicurien (Newsletter)</h3>
          <p className="text-sm text-brand-light/60">Recevez nos menus de saison et nos invitations à des soirées dégustation privées.</p>
          <form className="flex" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Votre email" 
              className="bg-brand-bg/50 border border-brand-light/10 text-brand-light text-sm px-4 py-3 rounded-l-lg w-full focus:outline-none focus:border-brand-gold transition-colors"
            />
            <button typeof="submit" className="bg-brand-gold text-brand-bg px-4 py-3 rounded-r-lg hover:bg-white transition-colors cursor-pointer flex items-center justify-center">
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Optional awards graphics or badges */}
          <div className="pt-4 flex gap-4 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
             {/* Michelin Star mockup or recognized logos */}
             <div className="flex flex-col items-center justify-center text-center">
                <span className="text-brand-gold mx-auto block mb-1">❂</span>
                <span className="text-[8px] uppercase tracking-widest block text-brand-light">Guide Rouge</span>
             </div>
             <div className="flex flex-col items-center justify-center text-center">
                <span className="text-brand-gold mx-auto block mb-1">G&M</span>
                <span className="text-[8px] uppercase tracking-widest block text-brand-light">3 Toques 2024</span>
             </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-brand-light/10 py-6 px-8 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
        <p className="text-[10px] uppercase tracking-[0.2em] opacity-40">
          © {new Date().getFullYear()} Restaurant Le Golfe — Tous Droits Réservés
        </p>
        <div className="flex gap-4 text-[10px] uppercase tracking-[0.2em] opacity-40">
          <a href="#" className="hover:text-brand-gold transition-colors">Mentions Légales</a>
          <a href="#" className="hover:text-brand-gold transition-colors">CGV</a>
          <a href="#" className="hover:text-brand-gold transition-colors">Confidentialité</a>
        </div>
      </div>
    </footer>
  );
}
