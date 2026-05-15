import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section id="home" className="md:col-span-4 relative group overflow-hidden rounded-2xl bg-brand-navy min-h-[400px] flex items-center justify-center text-center p-8 md:p-12 border border-brand-light/5">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-bg/40 via-brand-bg/20 to-brand-bg z-10"></div>
      
      <div className="relative z-20 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-brand-gold text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest inline-block mb-6"
          >
            L'Expérience
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-4xl md:text-6xl font-serif leading-tight text-brand-light mb-6"
          >
            L'horizon dans <br/><span className="text-brand-gold">votre assiette.</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-sm md:text-base opacity-70 max-w-sm mx-auto text-brand-light"
          >
            Une cuisine d'exception face à l'immensité bleue du golfe d'Ajaccio.
          </motion.p>
        </motion.div>
      </div>

      {/* Background Image Effect */}
      <div 
        className="absolute inset-0 opacity-40 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&q=80&w=1200')" }}
      ></div>
    </section>
  );
}
