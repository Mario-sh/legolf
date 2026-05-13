import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section id="home" className="md:col-span-2 relative group overflow-hidden rounded-2xl bg-brand-navy min-h-[400px]">
      <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-transparent z-10"></div>
      
      <div className="absolute bottom-0 left-0 p-8 z-20">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-brand-gold text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest inline-block"
        >
          L'Expérience
        </motion.span>
        
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-4xl md:text-5xl font-serif mt-4 leading-tight text-brand-light"
        >
          L'horizon dans <br/>votre assiette.
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-sm opacity-70 mt-2 max-w-xs text-brand-light"
        >
          Une cuisine d'exception face à l'immensité bleue du golfe d'Ajaccio.
        </motion.p>
      </div>

      {/* Background Image Effect */}
      <div 
        className="absolute inset-0 opacity-40 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&q=80&w=800')" }}
      ></div>
    </section>
  );
}
