import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar as CalendarIcon, Clock, Users, ArrowRight, Check } from 'lucide-react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(2);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', requests: '' });

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1);
        setDate('');
        setTime('');
        setGuests(2);
        setFormData({ name: '', email: '', phone: '', requests: '' });
      }, 500);
    }
  }, [isOpen]);

  const timeSlots = ['19:00', '19:30', '20:00', '20:30', '21:00', '21:30'];

  const handleNext = () => {
    if (step === 1 && date && time) setStep(2);
    else if (step === 2 && formData.name && formData.email) setStep(3);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleOverlayClick}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-bg/80 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="w-full max-w-lg bg-brand-navy-dark border border-brand-gold/20 rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="bg-brand-navy p-6 flex justify-between items-center border-b border-brand-light/5">
              <div>
                <h3 className="font-serif text-2xl text-brand-light">Réservation</h3>
                <p className="text-xs text-brand-gold tracking-widest uppercase mt-1">
                  {step === 1 ? 'Date & Heure' : step === 2 ? 'Vos coordonnées' : 'Confirmation'}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-brand-light/50 hover:text-brand-light transition-colors p-2"
                aria-label="Fermer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    {/* Guests selection */}
                    <div>
                      <label className="flex items-center gap-2 text-sm text-brand-light/70 mb-3">
                        <Users size={16} /> Nombre de convives
                      </label>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => setGuests((g) => Math.max(1, g - 1))}
                          className="w-10 h-10 rounded-full border border-brand-light/20 flex items-center justify-center text-brand-light hover:border-brand-gold hover:text-brand-gold transition-colors"
                        >
                          -
                        </button>
                        <span className="text-2xl font-serif text-brand-light w-8 text-center">{guests}</span>
                        <button
                          onClick={() => setGuests((g) => Math.min(12, g + 1))}
                          className="w-10 h-10 rounded-full border border-brand-light/20 flex items-center justify-center text-brand-light hover:border-brand-gold hover:text-brand-gold transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Date selection */}
                    <div>
                      <label className="flex items-center gap-2 text-sm text-brand-light/70 mb-3">
                        <CalendarIcon size={16} /> Date
                      </label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full bg-brand-bg text-brand-light border border-brand-light/10 rounded-lg p-3 focus:outline-none focus:border-brand-gold transition-colors"
                      />
                    </div>

                    {/* Time selection */}
                    <div>
                      <label className="flex items-center gap-2 text-sm text-brand-light/70 mb-3">
                        <Clock size={16} /> Heure
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {timeSlots.map((t) => (
                          <button
                            key={t}
                            onClick={() => setTime(t)}
                            className={`p-2 rounded-lg text-sm border transition-colors ${
                              time === t
                                ? 'bg-brand-gold/10 border-brand-gold text-brand-gold'
                                : 'bg-brand-bg border-brand-light/10 text-brand-light/70 hover:border-brand-light/30'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={handleNext}
                      disabled={!date || !time}
                      className="w-full py-4 mt-6 bg-brand-light text-brand-bg uppercase tracking-widest text-xs font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-gold transition-colors flex items-center justify-center gap-2"
                    >
                      Continuer <ArrowRight size={16} />
                    </button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-4"
                  >
                    <div className="bg-brand-navy p-4 rounded-lg flex items-center justify-between text-sm text-brand-light mb-6">
                      <div className="flex flex-col">
                        <span className="opacity-50 text-[10px] uppercase">Rappel</span>
                        <span>{new Date(date).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })} à {time}</span>
                      </div>
                      <div className="flex flex-col text-right">
                        <span className="opacity-50 text-[10px] uppercase">Convives</span>
                        <span>{guests} pers.</span>
                      </div>
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder="Nom complet"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-brand-bg text-brand-light border border-brand-light/10 rounded-lg p-3 focus:outline-none focus:border-brand-gold transition-colors"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Adresse email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-brand-bg text-brand-light border border-brand-light/10 rounded-lg p-3 focus:outline-none focus:border-brand-gold transition-colors"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        placeholder="Numéro de téléphone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-brand-bg text-brand-light border border-brand-light/10 rounded-lg p-3 focus:outline-none focus:border-brand-gold transition-colors"
                      />
                    </div>
                    <div>
                      <textarea
                        placeholder="Demandes particulières (allergies, anniversaire...)"
                        value={formData.requests}
                        onChange={(e) => setFormData({ ...formData, requests: e.target.value })}
                        className="w-full bg-brand-bg text-brand-light border border-brand-light/10 rounded-lg p-3 focus:outline-none focus:border-brand-gold transition-colors h-24 resize-none"
                      />
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button
                        onClick={() => setStep(1)}
                        className="px-6 py-4 border border-brand-light/20 text-brand-light uppercase tracking-widest text-xs font-bold rounded-lg hover:bg-brand-light/5 transition-colors"
                      >
                        Retour
                      </button>
                      <button
                        onClick={handleNext}
                        disabled={!formData.name || !formData.email}
                        className="flex-1 py-4 bg-brand-light text-brand-bg uppercase tracking-widest text-xs font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-gold transition-colors flex items-center justify-center gap-2"
                      >
                        Confirmer
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-20 h-20 bg-brand-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <div className="w-12 h-12 bg-brand-gold rounded-full flex items-center justify-center text-brand-bg">
                        <Check size={24} />
                      </div>
                    </div>
                    <h4 className="font-serif text-3xl text-brand-light mb-2">Réservation Confirmée</h4>
                    <p className="text-brand-light/60 text-sm mb-8">
                      Merci {formData.name}. Un email de confirmation a été envoyé à {formData.email}.
                    </p>
                    
                    <button
                      onClick={onClose}
                      className="px-8 py-3 border border-brand-light/20 text-brand-light uppercase tracking-widest text-xs rounded-lg hover:bg-brand-light hover:text-brand-bg transition-colors"
                    >
                      Terminer
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
