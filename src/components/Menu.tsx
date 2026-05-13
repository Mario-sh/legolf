import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { downloadMenuPDF } from '../utils/generateMenuPDF';

const MENU_CATEGORIES = ['Entrées', 'Plats', 'Desserts', 'Boissons'];

const MENU_ITEMS = [
  // Entrées
  { id: 1, category: 'Entrées', name: 'Carpaccio de Saint-Jacques', description: 'Agrumes, huile de sésame, baies roses', price: '24€', tags: ['Signature'] },
  { id: 2, category: 'Entrées', name: 'Tartare de Thon Rouge', description: 'Avocat, coriandre, citron vert, tuile au sésame', price: '22€' },
  { id: 3, category: 'Entrées', name: 'Burrata des Pouilles', description: 'Tomates anciennes, pesto de pistache, focaccia maison', price: '18€', tags: ['Végétarien'] },
  { id: 4, category: 'Entrées', name: 'Foie Gras Maison', description: 'Chutney de figues, brioche toastée', price: '26€' },
  
  // Plats
  { id: 5, category: 'Plats', name: 'Bar Grillé Entier', description: 'Légumes de saison rôtis, sauce vierge', price: '38€', tags: ['Spécialité du chef'] },
  { id: 6, category: 'Plats', name: 'Filet de Bœuf Rossini', description: 'Pommes grenailles, sauce aux truffes', price: '42€' },
  { id: 7, category: 'Plats', name: 'Risotto au Safran et Gambas', description: 'Bisque de crustacés, parmesan affiné 24 mois', price: '32€' },
  { id: 8, category: 'Plats', name: 'Poulpe Rôti', description: 'Houmous à la betterave, grenade, pignons', price: '34€' },
  
  // Desserts
  { id: 9, category: 'Desserts', name: 'Tartelette Citron Meringuée', description: 'Zestes de citron vert, sablé breton', price: '12€' },
  { id: 10, category: 'Desserts', name: 'Moelleux au Chocolat Grand Cru', description: 'Cœur coulant, glace vanille de Madagascar', price: '14€' },
  { id: 11, category: 'Desserts', name: 'Pavlova aux Fruits Rouges', description: 'Meringue française, crème chantilly, coulis', price: '13€' },
  
  // Boissons
  { id: 12, category: 'Boissons', name: 'Coupe de Champagne', description: 'Ruinart Blanc de Blancs', price: '18€' },
  { id: 13, category: 'Boissons', name: 'Cocktail "Le Golfe"', description: 'Gin infusé au romarin, sirop de pamplemousse, tonic', price: '15€' },
  { id: 14, category: 'Boissons', name: 'Café Espresso', description: 'Pure origine Éthiopie', price: '3.5€' },
];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState(MENU_CATEGORIES[0]);

  const filteredItems = MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="md:col-span-4 bg-brand-navy rounded-2xl p-6 md:p-12 border border-brand-light/5">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-[10px] tracking-widest text-brand-gold uppercase font-bold mb-4">La Carte</h2>
          <h3 className="font-serif text-4xl md:text-5xl text-brand-light">Menu Numérique</h3>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {MENU_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 tracking-widest uppercase text-xs transition-all duration-300 ${
                activeCategory === category 
                  ? 'border-b border-brand-gold text-brand-gold' 
                  : 'text-brand-light/50 hover:text-brand-light border-b border-transparent'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-10"
            >
              {filteredItems.map((item) => (
                <div key={item.id} className="group relative">
                  <div className="flex justify-between items-baseline mb-2">
                    <h4 className="font-serif text-xl md:text-2xl text-brand-light flex items-center gap-3">
                      {item.name}
                      {item.tags?.map(tag => (
                        <span key={tag} className="text-[10px] tracking-widest uppercase bg-brand-gold/10 text-brand-gold px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </h4>
                    <div className="flex-1 mx-4 border-b border-dotted border-brand-light/20 relative top-[-6px]"></div>
                    <span className="font-serif text-xl md:text-2xl text-brand-gold">{item.price}</span>
                  </div>
                  <p className="text-brand-light/60 font-light text-sm md:text-base pr-20">{item.description}</p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="mt-20 text-center">
          <button
            onClick={downloadMenuPDF}
            className="inline-block border border-brand-light/20 bg-brand-light/5 px-8 py-3 uppercase tracking-widest text-xs hover:bg-brand-light hover:text-brand-bg transition-colors rounded-lg cursor-pointer"
          >
            Télécharger le menu PDF
          </button>
        </div>
      </div>
    </section>
  );
}
