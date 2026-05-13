import { TestimonialsColumn } from "./ui/testimonials-columns-1";
import { motion } from "motion/react";

const testimonials = [
  {
    text: "Une expérience culinaire inoubliable ! Le bar grillé était parfait, et la vue au coucher du soleil est à couper le souffle.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Marie Laurent",
    role: "Google Reviews",
  },
  {
    text: "Le menu numérique est très pratique. Le service est impeccable, digne d'un étoilé sans le côté guindé. Le moelleux au chocolat est un délice.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "François Dubois",
    role: "TripAdvisor",
  },
  {
    text: "Nous avons célébré notre anniversaire de mariage au Golfe. Ils ont été aux petits soins. La daurade en croûte de sel est une merveille.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Sophie T.",
    role: "Google Reviews",
  },
  {
    text: "Les saveurs méditerranéennes explosent en bouche. Le chef a su revisiter les classiques avec une touche d'originalité remarquable.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Julien M.",
    role: "Critique Culinaire",
  },
  {
    text: "Cadre exceptionnel et cuisine raffinée. Le poulpe rôti est tout bonnement le meilleur que j'aie jamais goûté !",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Claire Moreau",
    role: "Guide Local",
  },
  {
    text: "Une belle adresse à Ajaccio. La fraîcheur des produits de la mer se ressent. Mention spéciale pour l'accord mets & vins.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Antoine B.",
    role: "TripAdvisor",
  },
  {
    text: "Merveilleux du début à la fin. De l'accueil au dessert, tout respire la passion et l'amour du bon produit. Hautement recommandé.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Emilie R.",
    role: "Google Reviews",
  },
  {
    text: "J'y suis allé dîner trois soirs de suite pendant mes vacances. La carte est courte et d'une maîtrise absolue. Parfait.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Thomas V.",
    role: "Yelp",
  },
  {
    text: "Une vue mer imprenable avec des noix de Saint-Jacques d'une douceur rare. Un moment suspendu dans le temps.",
    image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Céline F.",
    role: "TripAdvisor",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export default function Reviews() {
  return (
    <section className="md:col-span-4 bg-brand-navy rounded-2xl border border-brand-light/5 relative overflow-hidden flex flex-col items-center">
      
      <div className="z-10 w-full pt-12 pb-8 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <span className="text-[10px] tracking-widest text-brand-gold uppercase font-bold mb-4 block">Témoignages</span>
          <h2 className="text-3xl md:text-5xl font-serif text-brand-light">
            Ce que disent nos hôtes
          </h2>
          <p className="text-center mt-4 text-brand-light/60 font-light text-sm md:text-base">
            Ils ont goûté, ils ont partagé. Laissez-vous inspirer par l'expérience de ceux qui sont venus à notre table.
          </p>
        </motion.div>
      </div>

      {/* The scrolling mask container */}
      <div className="flex justify-center gap-6 mt-4 pb-12 w-full [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] h-[500px] overflow-hidden px-6">
        <TestimonialsColumn testimonials={firstColumn} duration={25} />
        {/* On mobile we only show one column as requested to avoid infinite scrolling clutter, the other two are hidden on small screens */}
        <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={30} />
        <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={27} />
      </div>

    </section>
  );
}
