import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar as CalendarIcon, Clock, Users, ArrowRight, Check, Download, QrCode } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(2);
  const [preference, setPreference] = useState('salle');
  const [occasion, setOccasion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', requests: '' });
  const receiptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1);
        setDate('');
        setTime('');
        setGuests(2);
        setPreference('salle');
        setOccasion('');
        setIsSubmitting(false);
        setIsDownloading(false);
        setFormData({ name: '', email: '', phone: '', requests: '' });
      }, 500);
    }
  }, [isOpen]);

  const timeSlots = ['12:00', '12:30', '13:00', '13:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'];

  const handleNext = () => {
    if (step === 1 && date && time) setStep(2);
    else if (step === 2) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setStep(3);
      }, 2000);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleDownload = async () => {
    if (!receiptRef.current) return;
    
    try {
      setIsDownloading(true);
      // Wait a bit for the UI to be fully ready and stable
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const canvas = await html2canvas(receiptRef.current, {
        backgroundColor: '#0A0F14',
        scale: 3,
        useCORS: true,
        allowTaint: true,
        logging: false,
      });
      
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: [80, 140]
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Pass_LeGolfe_${formData.name.trim().replace(/\s+/g, '_') || 'Reservation'}.pdf`);
      setIsDownloading(false);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setIsDownloading(false);
      alert("Une erreur est survenue lors de la génération du PDF.");
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
            <div className="p-4 md:p-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
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
                          type="button"
                          onClick={() => setGuests((g) => Math.max(1, g - 1))}
                          className="w-10 h-10 rounded-full border border-brand-light/20 flex items-center justify-center text-brand-light hover:border-brand-gold hover:text-brand-gold transition-colors focus:outline-none"
                        >
                          -
                        </button>
                        <span className="text-2xl font-serif text-brand-light w-8 text-center">{guests}</span>
                        <button
                          type="button"
                          onClick={() => setGuests((g) => Math.min(12, g + 1))}
                          className="w-10 h-10 rounded-full border border-brand-light/20 flex items-center justify-center text-brand-light hover:border-brand-gold hover:text-brand-gold transition-colors focus:outline-none"
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
                        className="w-full bg-brand-bg text-brand-light border border-brand-light/10 rounded-lg p-3 text-sm focus:outline-none focus:border-brand-gold transition-colors"
                      />
                    </div>

                    {/* Time selection */}
                    <div>
                      <label className="flex items-center gap-2 text-sm text-brand-light/70 mb-3">
                        <Clock size={16} /> Heure
                      </label>
                      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-5 gap-2">
                        {timeSlots.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setTime(t)}
                            className={`py-2 rounded-lg text-[10px] md:text-xs border transition-all duration-300 ${
                              time === t
                                ? 'bg-brand-gold text-brand-bg border-brand-gold font-bold shadow-lg shadow-brand-gold/20'
                                : 'bg-brand-bg border-brand-light/10 text-brand-light/70 hover:border-brand-gold/50'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Table Preference */}
                    <div>
                      <label className="flex items-center gap-2 text-sm text-brand-light/70 mb-3">
                        Placement souhaité
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {[
                          { id: 'salle', label: 'Salle', desc: 'Ambiance feutrée' },
                          { id: 'terrasse', label: 'Terrasse', desc: 'Face à la mer' },
                          { id: 'vip', label: 'VIP', desc: 'Alcôve privée' }
                        ].map((p) => (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => setPreference(p.id)}
                            className={`p-3 rounded-xl border text-left transition-all duration-300 ${
                              preference === p.id
                                ? 'bg-brand-gold/5 border-brand-gold'
                                : 'bg-brand-bg border-brand-light/10 text-brand-light/70 hover:border-brand-light/30'
                            }`}
                          >
                            <div className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${preference === p.id ? 'text-brand-gold' : 'text-brand-light/50'}`}>
                              {p.label}
                            </div>
                            <div className="text-[9px] opacity-60 leading-tight">{p.desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={!date || !time}
                      className="w-full py-4 mt-6 bg-brand-light text-brand-bg uppercase tracking-widest text-[10px] font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-gold transition-colors flex items-center justify-center gap-2 shadow-xl"
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
                      <label className="text-[10px] uppercase tracking-widest text-brand-light/50 mb-2 block">Occasion spéciale ?</label>
                      <select 
                        value={occasion}
                        onChange={(e) => setOccasion(e.target.value)}
                        className="w-full bg-brand-bg text-brand-light border border-brand-light/10 rounded-lg p-3 text-sm focus:outline-none focus:border-brand-gold transition-colors"
                      >
                        <option value="">Aucune</option>
                        <option value="birthday">Anniversaire</option>
                        <option value="anniversary">Anniversaire de mariage</option>
                        <option value="business">Repas d'affaires</option>
                        <option value="other">Autre</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Nom complet"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-brand-bg text-brand-light border border-brand-light/10 rounded-lg p-3 text-sm focus:outline-none focus:border-brand-gold transition-colors"
                      />
                      <input
                        type="email"
                        placeholder="Adresse email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-brand-bg text-brand-light border border-brand-light/10 rounded-lg p-3 text-sm focus:outline-none focus:border-brand-gold transition-colors"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        placeholder="Numéro de téléphone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-brand-bg text-brand-light border border-brand-light/10 rounded-lg p-3 text-sm focus:outline-none focus:border-brand-gold transition-colors"
                      />
                    </div>
                    <div>
                      <textarea
                        placeholder="Demandes particulières (allergies, placement spécifique...)"
                        value={formData.requests}
                        onChange={(e) => setFormData({ ...formData, requests: e.target.value })}
                        className="w-full bg-brand-bg text-brand-light border border-brand-light/10 rounded-lg p-3 text-sm focus:outline-none focus:border-brand-gold transition-colors h-24 resize-none"
                      />
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button
                        onClick={() => setStep(1)}
                        disabled={isSubmitting}
                        className="px-6 py-4 border border-brand-light/20 text-brand-light uppercase tracking-widest text-[10px] font-bold rounded-lg hover:bg-brand-light/5 transition-colors disabled:opacity-50"
                      >
                        Retour
                      </button>
                      <button
                        onClick={handleNext}
                        disabled={!formData.name || !formData.email || !formData.phone || isSubmitting}
                        className="flex-1 py-4 bg-brand-light text-brand-bg uppercase tracking-widest text-[10px] font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-gold transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-brand-bg border-t-transparent rounded-full"
                          />
                        ) : (
                          <>Confirmer la réservation <Check size={16} /></>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-4"
                  >
                    <div className="w-16 h-16 bg-brand-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="w-10 h-10 bg-brand-gold rounded-full flex items-center justify-center text-brand-bg">
                        <Check size={20} />
                      </div>
                    </div>
                    <h4 className="font-serif text-2xl text-brand-light mb-1">Confirmation</h4>
                    <p className="text-brand-light/60 text-xs mb-6">
                      Votre table est réservée avec succès !
                    </p>

                    {/* Receipt Container */}
                    <div className="flex flex-col items-center">
                      <div 
                        ref={receiptRef}
                        data-receipt="true"
                        className="bg-[#0A0F14] p-6 rounded-2xl border border-brand-gold/30 text-left mb-6 w-full max-w-[320px] shadow-2xl relative overflow-hidden"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {/* Decorative elements for the receipt */}
                        <div className="absolute top-[-20px] right-[-20px] w-20 h-20 bg-brand-gold/5 rounded-full blur-xl"></div>
                        
                        <div className="mb-6 text-center border-b border-brand-light/10 pb-4">
                          <h5 className="font-serif text-2xl text-brand-gold">Le Golfe</h5>
                          <p className="text-[8px] uppercase tracking-[0.4em] text-brand-light/40 mt-1">Restaurant Ajaccio</p>
                        </div>

                        <div className="space-y-4">
                          <div className="flex justify-between items-end border-b border-brand-light/5 pb-2">
                            <div>
                              <p className="text-[7px] uppercase tracking-widest text-brand-light/40 mb-1">Client</p>
                              <p className="text-xs text-brand-light font-medium">{formData.name}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-[7px] uppercase tracking-widest text-brand-light/40 mb-1">Convives</p>
                              <p className="text-xs text-brand-light">{guests} Pers.</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 border-b border-brand-light/5 pb-2">
                            <div>
                              <p className="text-[7px] uppercase tracking-widest text-brand-light/40 mb-1">Date</p>
                              <p className="text-[10px] text-brand-light font-medium">
                                {new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-[7px] uppercase tracking-widest text-brand-light/40 mb-1">Heure</p>
                              <p className="text-[10px] text-brand-light font-medium">{time}</p>
                            </div>
                          </div>

                          <div className="flex justify-between items-center bg-white/5 p-2 rounded-lg">
                            <span className="text-[8px] uppercase tracking-widest text-brand-light/40">Placement</span>
                            <span className="text-[10px] text-brand-gold font-bold uppercase">{preference}</span>
                          </div>

                          <div className="pt-4 flex flex-col items-center justify-center">
                            <div className="bg-white p-2 rounded-xl mb-3 shadow-lg">
                              <QRCodeCanvas 
                                value={`LE-GOLFE-RES-${Date.now()}-${formData.name}`} 
                                size={90}
                                level="H"
                                includeMargin={false}
                              />
                            </div>
                            <p className="text-[6px] text-brand-light/20 uppercase tracking-[0.5em] font-mono">
                              ID: {Math.random().toString(36).substring(7).toUpperCase()}
                            </p>
                          </div>
                        </div>

                        {/* Zigzag bottom deco */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 flex">
                          {[...Array(20)].map((_, i) => (
                            <div key={i} className="flex-1 h-1 bg-brand-gold/10 transform rotate-45 translate-y-1/2"></div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-3 w-full max-w-[320px]">
                        <button
                          type="button"
                          onClick={handleDownload}
                          disabled={isDownloading}
                          className="w-full py-4 bg-brand-gold text-brand-bg uppercase tracking-[0.2em] text-[10px] font-bold rounded-xl hover:bg-brand-light transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                        >
                          {isDownloading ? (
                             <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-4 h-4 border-2 border-brand-bg border-t-transparent rounded-full"
                            />
                          ) : (
                            <><Download size={16} /> Télécharger le Pass</>
                          )}
                        </button>
                        
                        <button
                          type="button"
                          onClick={onClose}
                          className="w-full py-3 text-brand-light/40 uppercase tracking-[0.2em] text-[8px] hover:text-brand-light transition-colors"
                        >
                          Terminer
                        </button>
                      </div>
                    </div>
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
