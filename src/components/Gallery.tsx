import { motion } from 'motion/react';
import { Maximize2 } from 'lucide-react';

const IMAGES = [
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800"
];

export default function Gallery() {
  return (
    <section className="md:col-span-4 grid grid-cols-1 md:grid-cols-3 gap-6">
      
      <div className="col-span-1 md:col-span-3 flex justify-between items-end mb-2 px-2">
        <div>
          <h3 className="font-serif text-3xl text-brand-light">L'Art de Vivre</h3>
          <p className="text-[10px] tracking-widest text-brand-gold uppercase font-bold mt-2">Galerie Virtuelle</p>
        </div>
        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-xs uppercase tracking-widest text-brand-light/60 hover:text-brand-light transition-colors pb-1 border-b border-transparent hover:border-brand-light">
          Voir l'Instagram
        </a>
      </div>

      {IMAGES.map((src, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className={`group relative rounded-2xl overflow-hidden bg-brand-navy cursor-pointer ${
            index === 0 ? 'aspect-square md:aspect-auto md:h-[400px]' : 'aspect-square md:h-[400px]'
          }`}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url('${src}')` }}
          />
          <div className="absolute inset-0 bg-brand-bg/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
            <div className="w-12 h-12 rounded-full border border-brand-light/30 flex items-center justify-center text-brand-light mt-10 group-hover:mt-0 transition-all duration-300">
              <Maximize2 size={18} />
            </div>
          </div>
        </motion.div>
      ))}

    </section>
  );
}
