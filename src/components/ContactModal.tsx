import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Check } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', subject: '', message: '' });

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1);
        setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
      }, 500);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.subject) {
      setStep(2);
    }
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
                <h3 className="font-serif text-2xl text-brand-light">Nous Contacter</h3>
                <p className="text-xs text-brand-gold tracking-widest uppercase mt-1">
                  {step === 1 ? 'Laissez-nous un message' : 'Confirmation'}
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
                  <motion.form
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div>
                      <input
                        type="text"
                        placeholder="Nom complet"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-brand-bg text-brand-light border border-brand-light/10 rounded-lg p-3 focus:outline-none focus:border-brand-gold transition-colors"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Adresse email"
                        required
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
                      <input
                        type="text"
                        placeholder="Objet de la demande"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-brand-bg text-brand-light border border-brand-light/10 rounded-lg p-3 focus:outline-none focus:border-brand-gold transition-colors"
                      />
                    </div>
                    <div>
                      <textarea
                        placeholder="Votre message..."
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-brand-bg text-brand-light border border-brand-light/10 rounded-lg p-3 focus:outline-none focus:border-brand-gold transition-colors h-24 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={!formData.name || !formData.email || !formData.subject || !formData.message}
                      className="w-full py-4 mt-2 bg-brand-light text-brand-bg uppercase tracking-widest text-xs font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-gold transition-colors flex items-center justify-center gap-2"
                    >
                      Envoyer <Send size={16} />
                    </button>
                  </motion.form>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-20 h-20 bg-brand-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <div className="w-12 h-12 bg-brand-gold rounded-full flex items-center justify-center text-brand-bg">
                        <Check size={24} />
                      </div>
                    </div>
                    <h4 className="font-serif text-3xl text-brand-light mb-4">Votre demande a été soumise</h4>
                    <p className="text-brand-light/60 text-sm mb-8 leading-relaxed">
                      Merci de nous avoir contacté, {formData.name}.<br />
                      Notre équipe vous répondra dans les plus brefs délais.
                    </p>
                    
                    <button
                      onClick={onClose}
                      className="px-8 py-3 border border-brand-light/20 text-brand-light uppercase tracking-widest text-xs rounded-lg hover:bg-brand-light hover:text-brand-bg transition-colors inline-block"
                    >
                      Fermer
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
