import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { useReservation } from '../ReservationContext';
import { useContact } from '../ContactContext';
import { Camera } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { openReservation } = useReservation();
  const { openContact } = useContact();

  const navLinks = [
    { name: 'Accueil', href: '/' },
    { name: 'Le Restaurant', href: '/restaurant' },
    { name: 'La Carte', href: '/#menu' },
    { name: 'Galerie', href: '/galerie' },
    { name: 'Contact', onClick: openContact },
  ];

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <header className="flex justify-between items-center pb-6 md:pb-8 border-b border-brand-light/10 mb-2 mt-2">
      {/* Logo Area */}
      <div className="z-50 relative">
        <Link to="/" onClick={() => setMobileMenuOpen(false)}>
          <h1 className="text-3xl md:text-4xl font-serif tracking-tight text-brand-gold leading-none">Le Golfe</h1>
          <p className="text-[10px] uppercase tracking-[0.3em] opacity-60 mt-2 hidden sm:block">Gastronomie Marine</p>
        </Link>
      </div>
      
      {/* Desktop Nav - Frosted Pill */}
      <nav className="hidden md:flex gap-8 items-center bg-brand-navy border border-brand-light/5 px-8 py-3 rounded-full shadow-lg">
        {navLinks.map((link) => {
          let isActive = false;
          if (link.href === '/') isActive = location.pathname === '/' && !location.hash;
          else if (link.href === '/restaurant') isActive = location.pathname === '/restaurant';
          else if (link.href === '/galerie') isActive = location.pathname === '/galerie';
          else if (link.href?.startsWith('/#')) isActive = location.pathname === '/' && location.hash === link.href.split('/')[1];

          if (link.onClick) {
            return (
              <button
                key={link.name}
                onClick={link.onClick}
                className="relative text-[10px] lg:text-xs uppercase tracking-widest font-medium group transition-colors text-brand-light/70 hover:text-brand-light cursor-pointer"
              >
                {link.name}
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-px bg-brand-gold transition-all duration-300 w-0 group-hover:w-full"></span>
              </button>
            );
          }

          return (
            <Link
              key={link.name}
              to={link.href!}
              className={`relative text-[10px] lg:text-xs uppercase tracking-widest font-medium group transition-colors flex items-center gap-1.5 ${
                link.name === 'Galerie' 
                  ? 'text-brand-light px-3 py-1.5 bg-brand-light/5 border border-brand-light/20 rounded-full hover:bg-brand-light/10 hover:border-brand-gold/50 shadow-sm' 
                  : isActive 
                    ? 'text-brand-gold py-1.5' 
                    : 'text-brand-light/70 hover:text-brand-light py-1.5'
              }`}
            >
              {link.name === 'Galerie' && <Camera size={14} className={isActive ? 'text-brand-gold' : 'text-brand-light/70 group-hover:text-brand-gold transition-colors'} />}
              <span className={link.name === 'Galerie' && isActive ? 'text-brand-gold' : link.name === 'Galerie' ? 'group-hover:text-brand-gold transition-colors' : ''}>
                {link.name}
              </span>
              {link.name !== 'Galerie' && (
                <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-px bg-brand-gold transition-all duration-300 ${
                  isActive ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Desktop Action */}
      <div className="hidden md:block z-50">
        <button
          onClick={openReservation}
          className="px-6 py-3 bg-brand-light/5 border border-brand-gold/50 text-brand-gold text-xs uppercase tracking-widest hover:bg-brand-gold hover:text-brand-bg transition-colors rounded-full shadow-[0_0_15px_rgba(212,175,55,0.1)] hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] cursor-pointer"
        >
          Réserver
        </button>
      </div>

      {/* Mobile Nav Toggle (Animated Hamburger) */}
      <button
        className="md:hidden z-50 relative w-10 h-10 flex flex-col justify-center items-end gap-[6px] text-brand-gold"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Menu"
      >
        <span className={`block h-[2px] bg-current transition-all duration-300 ${mobileMenuOpen ? 'w-6 rotate-45 translate-y-[8px]' : 'w-8'}`}></span>
        <span className={`block h-[2px] bg-current transition-all duration-300 ${mobileMenuOpen ? 'w-0 opacity-0' : 'w-6'}`}></span>
        <span className={`block h-[2px] bg-current transition-all duration-300 ${mobileMenuOpen ? 'w-6 -rotate-45 -translate-y-[8px]' : 'w-4'}`}></span>
      </button>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-brand-bg/95 backdrop-blur-xl z-40 flex flex-col pt-32 px-8 pb-12 overflow-y-auto"
          >
            {/* Decorative Background Element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
            
            <div className="flex flex-col gap-8 flex-grow mt-8">
              {navLinks.map((link, i) => {
                let isActive = false;
                if (link.href === '/') isActive = location.pathname === '/' && !location.hash;
                else if (link.href === '/restaurant') isActive = location.pathname === '/restaurant';
                else if (link.href === '/galerie') isActive = location.pathname === '/galerie';
                else if (link.href?.startsWith('/#')) isActive = location.pathname === '/' && location.hash === link.href.split('/')[1];

                if (link.onClick) {
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 + 0.1 }}
                    >
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          link.onClick();
                        }}
                        className="font-serif text-4xl sm:text-5xl flex items-center gap-4 transition-colors text-brand-light hover:text-brand-gold/80 bg-transparent py-0 text-left cursor-pointer"
                      >
                        {link.name}
                      </button>
                    </motion.div>
                  );
                }

                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.1 }}
                  >
                    <Link
                      to={link.href!}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`font-serif flex items-center gap-4 transition-colors ${
                        link.name === 'Galerie' 
                          ? 'text-3xl sm:text-4xl text-brand-light bg-brand-light/5 border border-brand-light/20 px-6 py-4 rounded-3xl hover:bg-brand-light/10 hover:border-brand-gold/50 shadow-sm w-fit'
                          : isActive 
                            ? 'text-4xl sm:text-5xl text-brand-gold' 
                            : 'text-4xl sm:text-5xl text-brand-light hover:text-brand-gold/80'
                      }`}
                    >
                      {link.name === 'Galerie' && <Camera size={28} className={isActive ? 'text-brand-gold' : 'text-brand-light/70'} />}
                      {isActive && link.name !== 'Galerie' && <motion.span layoutId="activeLine" className="w-8 h-[2px] bg-brand-gold"></motion.span>}
                      <span className={link.name === 'Galerie' && isActive ? 'text-brand-gold' : ''}>{link.name}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-auto"
            >
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openReservation();
                }}
                className="w-full py-5 bg-brand-gold text-brand-bg uppercase tracking-widest text-sm font-bold rounded-xl mb-8 shadow-lg shadow-brand-gold/20 cursor-pointer"
              >
                Réserver une table
              </button>
              
              <div className="flex justify-between items-center text-brand-light/50 text-[10px] uppercase tracking-widest border-t border-brand-light/10 pt-6">
                <span>Le Golfe Restaurant</span>
                <span>Ajaccio, Corse</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
