import { motion } from 'motion/react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

const RESTAURANT_LOCATION = { lat: 41.9267, lng: 8.7381 };

export default function MapSection() {
  if (!hasValidKey) {
    return (
      <section id="location" className="md:col-span-4 bg-brand-navy rounded-2xl p-12 border border-brand-light/5 text-center flex flex-col items-center justify-center min-h-[500px] relative overflow-hidden group">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-brand-gold blur-[120px]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] rounded-full bg-brand-gold blur-[100px]"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-xl"
        >
          <span className="bg-brand-gold text-black text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.2em] inline-block mb-6 shadow-xl">
            Localisation
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-brand-light mb-6">Nous trouver</h2>
          <p className="text-lg text-brand-light/70 mb-8 font-light">
            Situé au bord de l'eau sur la célèbre route des Sanguinaires, Le Golfe vous accueille dans un cadre idyllique.
          </p>
          
          <div className="bg-white/5 backdrop-blur-sm border border-brand-light/10 p-8 rounded-2xl mb-8">
            <p className="text-xl text-brand-gold font-serif mb-1">12 Route des Sanguinaires</p>
            <p className="text-brand-light/60 uppercase tracking-widest text-sm">20000 Ajaccio, Corse</p>
          </div>

          <a 
            href={`https://www.google.com/maps/dir/?api=1&destination=${RESTAURANT_LOCATION.lat},${RESTAURANT_LOCATION.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-brand-gold text-brand-bg px-10 py-5 rounded-full uppercase tracking-widest text-[11px] font-bold hover:bg-brand-light transition-all duration-500 shadow-2xl group-hover:scale-105"
          >
            Ouvrir dans Google Maps
          </a>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="location" className="md:col-span-4 relative group overflow-hidden rounded-2xl bg-brand-navy min-h-[500px] border border-brand-light/5">
      <div className="absolute top-8 left-8 z-20">
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
        >
          <span className="bg-brand-gold text-black text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.2em] inline-block mb-4 shadow-xl">
            Localisation
          </span>
          <h2 className="text-4xl font-serif text-brand-light drop-shadow-lg">Nous trouver</h2>
          <p className="text-sm text-brand-light/80 mt-2 font-light drop-shadow">12 Route des Sanguinaires, Ajaccio</p>
        </motion.div>
      </div>
      
      <div className="w-full h-full min-h-[500px] grayscale contrast-125 brightness-50 hover:grayscale-0 hover:brightness-100 transition-all duration-1000">
        <APIProvider apiKey={API_KEY} version="weekly">
          <Map
            defaultCenter={RESTAURANT_LOCATION}
            defaultZoom={15}
            mapId="DEMO_MAP_ID"
            disableDefaultUI={true}
            gestureHandling={'cooperative'}
            internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
            style={{ width: '100%', height: '100%' }}
          >
            <AdvancedMarker position={RESTAURANT_LOCATION}>
              <Pin background="#C5A572" glyphColor="#0A0F14" borderColor="#C5A572" scale={1.2} />
            </AdvancedMarker>
          </Map>
        </APIProvider>
      </div>
      
      <div className="absolute bottom-8 left-8 md:left-auto md:right-8 z-20">
         <motion.a 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          href={`https://www.google.com/maps/dir/?api=1&destination=${RESTAURANT_LOCATION.lat},${RESTAURANT_LOCATION.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-brand-gold text-brand-bg px-8 py-4 rounded-full uppercase tracking-widest text-[10px] font-bold hover:bg-brand-light transition-all duration-500 shadow-2xl"
         >
           Obtenir l'itinéraire
         </motion.a>
      </div>
    </section>
  );
}
