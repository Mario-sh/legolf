import jsPDF from 'jspdf';

const MENU_CATEGORIES = [
  {
    name: 'Entrées',
    items: [
      { name: 'Carpaccio de Saint-Jacques', description: 'Agrumes, huile de sésame, baies roses', price: '24€' },
      { name: 'Tartare de Thon Rouge', description: 'Avocat, coriandre, citron vert, tuile au sésame', price: '22€' },
      { name: 'Burrata des Pouilles', description: 'Tomates anciennes, pesto de pistache, focaccia maison', price: '18€' },
      { name: 'Foie Gras Maison', description: 'Chutney de figues, brioche toastée', price: '26€' }
    ]
  },
  {
    name: 'Plats',
    items: [
      { name: 'Bar Grillé Entier', description: 'Légumes de saison rôtis, sauce vierge', price: '38€' },
      { name: 'Filet de Bœuf Rossini', description: 'Pommes grenailles, sauce aux truffes', price: '42€' },
      { name: 'Risotto au Safran et Gambas', description: 'Bisque de crustacés, parmesan affiné 24 mois', price: '32€' },
      { name: 'Poulpe Rôti', description: 'Houmous à la betterave, grenade, pignons', price: '34€' }
    ]
  },
  {
    name: 'Desserts',
    items: [
      { name: 'Tartelette Citron Meringuée', description: 'Zestes de citron vert, sablé breton', price: '12€' },
      { name: 'Moelleux au Chocolat Grand Cru', description: 'Cœur coulant, glace vanille de Madagascar', price: '14€' },
      { name: 'Pavlova aux Fruits Rouges', description: 'Meringue française, crème chantilly, coulis', price: '13€' }
    ]
  },
  {
    name: 'Boissons',
    items: [
      { name: 'Coupe de Champagne', description: 'Ruinart Blanc de Blancs', price: '18€' },
      { name: 'Cocktail "Le Golfe"', description: 'Gin infusé au romarin, sirop de pamplemousse, tonic', price: '15€' },
      { name: 'Café Espresso', description: 'Pure origine Éthiopie', price: '3.5€' }
    ]
  }
];

export const downloadMenuPDF = () => {
  const doc = new jsPDF();
  
  // Custom font styling for elegant look
  doc.setFont('times', 'bold');
  
  // Title
  doc.setFontSize(30);
  doc.setTextColor(212, 175, 55); // Brand Gold
  doc.text('LE GOLFE', 105, 30, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setTextColor(150, 150, 150);
  doc.text('Gastronomie Marine & Panorama', 105, 40, { align: 'center' });
  
  let currentY = 60;
  
  MENU_CATEGORIES.forEach((category) => {
    // Check page break
    if (currentY > 250) {
      doc.addPage();
      currentY = 30;
    }

    doc.setFont('times', 'italic');
    doc.setFontSize(18);
    doc.setTextColor(10, 18, 26); // Brand Navy
    doc.text(category.name, 105, currentY, { align: 'center' });
    
    // Add underline
    doc.setDrawColor(212, 175, 55);
    doc.line(95, currentY + 2, 115, currentY + 2);
    
    currentY += 15;

    category.items.forEach((item) => {
      if (currentY > 270) {
        doc.addPage();
        currentY = 30;
      }

      doc.setFont('times', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(item.name, 20, currentY);
      
      const priceText = item.price;
      const priceWidth = doc.getTextWidth(priceText);
      doc.text(priceText, 190 - priceWidth, currentY);
      
      // Dotted line leader
      const nameWidth = doc.getTextWidth(item.name);
      const dotStartX = 20 + nameWidth + 2;
      const dotEndX = 190 - priceWidth - 2;
      doc.setFont('times', 'normal');
      doc.setTextColor(200, 200, 200);
      let dots = '';
      const dotWidth = doc.getTextWidth('.');
      const numDots = Math.floor((dotEndX - dotStartX) / dotWidth);
      if (numDots > 0) {
        for(let i=0; i<numDots; i++) dots += '.';
        doc.text(dots, dotStartX, currentY);
      }

      currentY += 6;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(item.description, 20, currentY);
      
      currentY += 12;
    });

    currentY += 10;
  });

  // Footer
  doc.setFontSize(9);
  doc.setTextColor(150, 150, 150);
  doc.text('© 2024 Restaurant Le Golfe — 12 Route des Sanguinaires, 20000 Ajaccio', 105, 290, { align: 'center' });

  doc.save('Le-Golfe-Menu.pdf');
};
