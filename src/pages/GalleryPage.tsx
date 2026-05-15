import { motion } from 'motion/react';
import { Camera, Search } from 'lucide-react';

const images = [
  "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1481070555726-e2fe8357725c?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1623341214825-9f4f963727da?auto=format&fit=crop&q=80&w=800"
];

export default function GalleryPage() {
  return (
    <div className="animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="bg-brand-navy rounded-3xl p-8 md:p-16 border border-brand-light/5 text-center flex flex-col items-center justify-center min-h-[300px] mb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center opacity-10"></div>
        <div className="relative z-10">
          <span className="text-[10px] tracking-widest text-brand-gold uppercase font-bold mb-4 block flex items-center justify-center gap-2">
            <Camera size={14} /> Galerie Culinaire
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-light mb-6 leading-tight">Nos Créations</h2>
          <p className="text-brand-light/70 font-light text-sm md:text-base max-w-2xl mx-auto">
            Un voyage visuel au cœur de notre cuisine. Chaque plat est une toile où s'expriment les saveurs méditerranéennes et la passion de notre chef.
          </p>
        </div>
      </div>

      {/* Masonry Grid (Pinterest Style) */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
        {images.map((src, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (index % 5) * 0.1, duration: 0.6 }}
            className="break-inside-avoid relative group rounded-2xl overflow-hidden cursor-pointer"
          >
            <img 
              src={src} 
              alt={`Plat gastronomique ${index + 1}`} 
              className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/90 via-brand-bg/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full border border-brand-gold/50 flex items-center justify-center text-brand-gold backdrop-blur-sm bg-brand-navy/30 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <Search size={20} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
