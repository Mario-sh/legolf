import { MapPin, Phone, MessageSquare, Clock, Instagram, Facebook } from 'lucide-react';
import { motion } from 'motion/react';
import { useReservation } from '../ReservationContext';
import { useContact } from '../ContactContext';

export default function Contact() {
  const { openReservation } = useReservation();
  const { openContact } = useContact();

  return (
    <section id="contact" className="md:col-span-4 grid grid-cols-1 md:grid-cols-4 gap-6">
      
      {/* Reservations / Quick Booking */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="col-span-1 bg-brand-navy-dark border border-brand-light/10 rounded-2xl p-6 flex flex-col justify-between min-h-[200px]"
      >
        <span className="text-[10px] uppercase tracking-widest opacity-50 text-brand-light">Réservations</span>
        <div>
          <p className="text-lg font-serif mb-2 text-brand-light">Réserver une table</p>
          <p className="text-xs opacity-60 text-brand-light mb-4">
            Places limitées, pensez à réserver à l'avance.
          </p>
        </div>
        <button onClick={openReservation} className="w-full cursor-pointer py-3 bg-brand-light/5 border border-brand-light/20 rounded-lg text-xs uppercase tracking-widest hover:bg-brand-light hover:text-brand-bg transition-colors text-brand-light">
          Réserver
        </button>
      </motion.div>

      {/* Opening Hours */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="col-span-1 bg-brand-navy rounded-2xl p-6 flex flex-col justify-between border border-brand-light/5 min-h-[200px]"
      >
        <div className="flex items-center gap-3 mb-4">
           <Clock size={16} className="text-brand-gold" />
           <span className="text-[10px] uppercase tracking-widest opacity-50 text-brand-light">Horaires</span>
        </div>
        <div className="space-y-4 flex-grow flex flex-col justify-center text-brand-light">
          <div className="flex justify-between text-xs">
            <span className="opacity-60">Mar-Dim (Midi)</span>
            <span>12h - 14h30</span>
          </div>
          <div className="flex justify-between text-xs border-t border-brand-light/10 pt-4">
            <span className="opacity-60">Mar-Dim (Soir)</span>
            <span>19h - 22h30</span>
          </div>
          <div className="text-[10px] text-brand-gold text-center pt-2">Fermé le Lundi</div>
        </div>
      </motion.div>

      {/* Contact Form Button & Info */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="col-span-1 bg-brand-bg border border-brand-light/10 rounded-2xl p-6 flex flex-col justify-between min-h-[200px]"
      >
        <div>
          <span className="text-[10px] uppercase tracking-widest opacity-50 text-brand-light">Nous Contacter</span>
          <p className="text-lg font-serif mb-2 text-brand-light mt-2">Une demande ?</p>
          <p className="text-xs opacity-60 text-brand-light">
            Pour toute demande particulière, n'hésitez pas à nous contacter.
          </p>
        </div>
        <button 
          onClick={openContact}
          className="w-full cursor-pointer mt-4 py-3 bg-brand-light text-brand-bg border border-transparent rounded-lg text-xs uppercase font-bold tracking-widest hover:bg-brand-gold transition-colors flex items-center justify-center gap-2"
        >
          <MessageSquare size={16} /> Nous écrire
        </button>
      </motion.div>

      {/* Location / Info overlay */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="col-span-1 bg-brand-navy rounded-2xl p-6 flex flex-col justify-center border border-brand-light/5 min-h-[200px]"
      >
        <div className="flex items-start gap-4 text-brand-gold">
          <MapPin size={24} className="shrink-0" />
          <div>
            <p className="text-lg font-serif text-brand-light mb-2">Notre Adresse</p>
            <p className="text-sm opacity-60 text-brand-light leading-relaxed">
              12 Route des Sanguinaires<br />20000 Ajaccio
            </p>
          </div>
        </div>
      </motion.div>

    </section>
  );
}
