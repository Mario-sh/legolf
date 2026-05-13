import { motion } from 'motion/react';
import { Camera, Sunrise, Flame, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RestaurantPage() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-in fade-in duration-500">
      
      {/* Title & Introduction */}
      <div className="md:col-span-4 bg-brand-navy rounded-2xl p-8 md:p-12 border border-brand-light/5 text-center flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-5"></div>
        <div className="relative z-10 max-w-2xl">
          <span className="text-[10px] tracking-widest text-brand-gold uppercase font-bold mb-4 block">Notre Philosophie</span>
          <h2 className="font-serif text-4xl md:text-6xl text-brand-light mb-6 leading-tight">Une histoire d'eau, de feu et de terre.</h2>
          <p className="text-brand-light/70 font-light text-sm md:text-base">
            Le Golfe n'est pas seulement un restaurant, c'est une vitrine de notre terroir. Chaque ingrédient est sélectionné avec une rigueur absolue, chaque plat raconte une histoire ancrée dans notre patrimoine méditerranéen.
          </p>
        </div>
      </div>

      {/* Chef Profile (2x2) */}
      <div className="md:col-span-2 md:row-span-2 bg-brand-navy-dark rounded-2xl p-6 md:p-8 flex flex-col justify-end border border-brand-gold/10 relative overflow-hidden group min-h-[400px]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 transition-transform duration-700 group-hover:scale-105"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/60 to-transparent"></div>
        <div className="relative z-10 flex flex-col">
          <span className="bg-brand-gold w-max text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">Chef Exécutif</span>
          <h3 className="font-serif text-3xl text-brand-light leading-tight mb-2">Jean Dupont</h3>
          <p className="text-brand-light/60 text-xs italic font-serif mb-4">"La véritable cuisine est une forme de respect."</p>
          <p className="text-xs text-brand-light/80 font-light leading-relaxed max-w-sm">
            Né en bord de mer, Jean a grandi avec le sel sur les lèvres et le parfum de la garrigue. Après avoir travaillé dans plusieurs établissements étoilés à travers le monde, il revient aux sources pour proposer une cuisine sincère et émouvante.
          </p>
        </div>
      </div>

      {/* Philosophy Points (1x1 each) */}
      <div className="md:col-span-1 md:row-span-1 bg-brand-navy rounded-2xl p-6 border border-brand-light/5 flex flex-col justify-center min-h-[200px]">
        <Leaf size={24} className="text-brand-gold mb-4" />
        <h4 className="font-serif text-lg text-brand-light mb-2">Circuit Court</h4>
        <p className="text-[10px] sm:text-xs text-brand-light/60 font-light">Nous collaborons à 90% avec des producteurs et pêcheurs locaux situés à moins de 50km de notre établissement.</p>
      </div>

      <div className="md:col-span-1 md:row-span-1 bg-brand-bg rounded-2xl p-6 border border-brand-gold/20 flex flex-col justify-center min-h-[200px]">
        <Flame size={24} className="text-brand-gold mb-4" />
        <h4 className="font-serif text-lg text-brand-light mb-2">Cuisson au Feu</h4>
        <p className="text-[10px] sm:text-xs text-brand-light/60 font-light">Notre cuisine est rythmée par la chaleur de la flamme, apportant des notes torréfiées et primitives à nos poissons.</p>
      </div>

      <div className="md:col-span-1 md:row-span-1 bg-[url('https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&q=80')] bg-cover bg-center rounded-2xl p-6 md:p-8 min-h-[200px]">
        {/* Just for aesthetic image visual */}
      </div>

      <div className="md:col-span-1 md:row-span-1 bg-brand-navy-dark rounded-2xl p-6 border border-brand-light/10 flex flex-col justify-center min-h-[200px] text-center items-center">
        <Sunrise size={32} className="text-brand-light opacity-20 mb-4" />
        <p className="font-serif text-sm text-brand-light italic opacity-80">
          Chaque matin, la mer nous dicte le menu du jour.
        </p>
      </div>

      {/* Farm to table / The Wine Cellar */}
      <div className="md:col-span-2 bg-brand-navy rounded-2xl p-6 flex items-center justify-between border border-brand-light/5 min-h-[160px]">
        <div>
          <h4 className="font-serif text-xl text-brand-light mb-2">La Cave</h4>
          <p className="text-[10px] sm:text-xs text-brand-light/50 font-light max-w-xs">Plus de 300 références sélectionnées avec passion par notre chef sommelier, mettant à l'honneur les vignerons indépendants.</p>
        </div>
        <div className="w-16 h-16 rounded-full bg-[url('https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80')] bg-cover bg-center border-2 border-brand-gold"></div>
      </div>
      
      {/* Gallery Highlight */}
      <Link to="/galerie" className="md:col-span-2 bg-brand-navy-dark rounded-2xl p-6 flex flex-col justify-center group overflow-hidden relative min-h-[160px] cursor-pointer">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30 transition-transform duration-700 group-hover:scale-105"></div>
        <div className="absolute inset-0 bg-brand-bg/40"></div>
        <div className="relative z-10 flex w-full justify-between items-center text-brand-light">
          <div>
            <h4 className="font-serif text-xl">Galerie Culinaire</h4>
            <p className="text-xs opacity-60">Découvrez nos créations.</p>
          </div>
          <div className="h-10 w-10 border border-brand-gold rounded-full flex items-center justify-center bg-brand-bg text-brand-gold transition-all duration-300 group-hover:bg-brand-gold group-hover:text-black">
            <Camera size={16} />
          </div>
        </div>
      </Link>

    </main>
  );
}
