import { motion } from 'motion/react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

const RESTAURANT_LOCATION = { lat: 41.9267, lng: 8.7381 };

export default function MapSection() {
  if (!hasValidKey) {
    return (
      <section id="location" className="md:col-span-4 bg-brand-navy rounded-2xl p-8 border border-brand-light/5 text-center flex flex-col items-center justify-center min-h-[400px]">
        <div className="max-w-md">
          <h2 className="text-2xl font-serif text-brand-light mb-4 text-brand-gold">Carte Interactive</h2>
          <p className="text-sm text-brand-light/60 mb-6">
            Pour afficher la carte interactive, veuillez configurer votre clé API Google Maps.
          </p>
          <div className="text-left bg-black/30 p-6 rounded-xl border border-brand-gold/20 text-xs leading-relaxed space-y-4">
            <p><strong>Étape 1:</strong> <a href="https://console.cloud.google.com/google/maps-apis/start?utm_campaign=gmp-code-assist-ais" target="_blank" rel="noopener" className="text-brand-gold underline">Obtenez une clé API</a></p>
            <p><strong>Étape 2:</strong> Ajoutez votre clé dans AI Studio:</p>
            <ul className="list-disc ml-4 space-y-2">
              <li>Ouvrez les <strong>Paramètres</strong> (icône ⚙️ en haut à droite)</li>
              <li>Sélectionnez <strong>Secrets</strong></li>
              <li>Tapez <code>GOOGLE_MAPS_PLATFORM_KEY</code> comme nom du secret</li>
              <li>Collez votre clé comme valeur et appuyez sur <strong>Entrée</strong></li>
            </ul>
          </div>
        </div>
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
