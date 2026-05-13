/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import RestaurantPage from './pages/RestaurantPage';
import GalleryPage from './pages/GalleryPage';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  const location = useLocation();

  useEffect(() => {
    // Only scroll to top if there isn't a hash we want to scroll to
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  // Handle hash scrolling natively after slightly delaying to allow render
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.replace('#', ''));
      if (element) {
        setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  }, [location.hash, location.pathname]);

  return (
    <div className="relative font-sans antialiased bg-brand-bg text-brand-light min-h-screen">
      <div className="max-w-[1200px] mx-auto p-4 md:p-6 flex flex-col gap-6">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/restaurant" element={<RestaurantPage />} />
          <Route path="/galerie" element={<GalleryPage />} />
        </Routes>
        <Footer />
        <ScrollToTop />
      </div>
    </div>
  );
}
