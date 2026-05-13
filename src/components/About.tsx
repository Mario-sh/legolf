import { motion } from 'motion/react';

export default function About() {
  return (
    <section id="about" className="md:col-span-4 bg-brand-navy-dark rounded-2xl p-6 md:p-12 border border-brand-gold/10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Images */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=800&auto=format&fit=crop" 
              alt="Intérieur du restaurant Le Golfe" 
              className="w-[85%] aspect-[4/5] object-cover float-right rounded-xl opacity-80"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute bottom-10 left-0 w-[55%]"
          >
            <img 
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop" 
              alt="Plat de Fruits de mer" 
              className="w-full aspect-square object-cover border-8 border-brand-navy rounded-xl opacity-90 block"
            />
          </motion.div>
        </div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="lg:pl-10"
        >
          <h2 className="text-[10px] tracking-widest text-brand-gold uppercase font-bold mb-4">Notre Histoire</h2>
          <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-light mb-8 leading-tight">
            L'essence de la mer, servie à votre table.
          </h3>
          
          <div className="space-y-6 text-brand-light/70 font-light leading-relaxed text-sm md:text-base">
            <p>
              Situé sur la côte magnifique, Le Golfe est une célébration de la cuisine méditerranéenne et des fruits de mer locaux. Depuis nos débuts, nous nous efforçons de capturer la fraîcheur de l'océan dans chaque plat.
            </p>
            <p>
              Notre chef collabore étroitement avec les pêcheurs et les agriculteurs de la région pour vous offrir des ingrédients de la plus haute qualité, transformés en expériences culinaires inoubliables.
            </p>
          </div>

          <div className="mt-10">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Signature_Line.svg" 
              alt="Signature du chef" 
              className="h-12 opacity-40 filter invert"
            />
            <p className="mt-2 text-xs text-brand-light/50 font-serif italic">Jean Dupont, Chef Exécutif</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
