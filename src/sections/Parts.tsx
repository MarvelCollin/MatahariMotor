import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaStar, FaShoppingCart } from 'react-icons/fa';

const Parts = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredParts, setFilteredParts] = useState<any[]>([]);
  const [isHovering, setIsHovering] = useState<number | null>(null);

  const categories = [
    { id: 'all', name: 'All Parts' },
    { id: 'drivetrain', name: 'Drivetrain' },
    { id: 'brakes', name: 'Brakes' },
    { id: 'wheels', name: 'Wheels & Tires' },
    { id: 'cockpit', name: 'Handlebars & Controls' },
    { id: 'accessories', name: 'Accessories' },
  ];
  
  const parts = [
    {
      id: 1,
      name: 'High-Performance Chain',
      category: 'drivetrain',
      price: 35.99,
      rating: 4.8,
      image: 'https://placehold.co/200x200/333/FFA500?text=Chain',
      description: 'Durable chain with optimized power transfer and long-lasting performance.',
      stock: 15,
    },
    {
      id: 2,
      name: 'Premium Disc Brake Kit',
      category: 'brakes',
      price: 79.99,
      rating: 4.9,
      image: 'https://placehold.co/200x200/333/FFA500?text=Brake',
      description: 'High-performance hydraulic disc brake system with excellent stopping power.',
      stock: 8,
    },
    {
      id: 3,
      name: 'Carbon Fiber Handlebar',
      category: 'cockpit',
      price: 129.99,
      rating: 4.7,
      image: 'https://placehold.co/200x200/333/FFA500?text=Handlebar',
      description: 'Lightweight carbon fiber handlebar for improved control and reduced weight.',
      stock: 5,
    },
    {
      id: 4,
      name: 'All-Terrain MTB Tires',
      category: 'wheels',
      price: 45.99,
      rating: 4.6,
      image: 'https://placehold.co/200x200/333/FFA500?text=Tire',
      description: 'Durable tires with aggressive tread pattern for excellent grip in all conditions.',
      stock: 12,
    },
    {
      id: 5,
      name: 'Rear Derailleur',
      category: 'drivetrain',
      price: 69.99,
      rating: 4.5,
      image: 'https://placehold.co/200x200/333/FFA500?text=Derailleur',
      description: 'Precision engineered rear derailleur for smooth and reliable shifting.',
      stock: 7,
    },
    {
      id: 6,
      name: 'Bicycle Computer',
      category: 'accessories',
      price: 49.99,
      rating: 4.4,
      image: 'https://placehold.co/200x200/333/FFA500?text=Computer',
      description: 'Wireless bicycle computer with GPS tracking and performance metrics.',
      stock: 9,
    },
    {
      id: 7,
      name: 'Performance Pedals',
      category: 'drivetrain',
      price: 89.99,
      rating: 4.7,
      image: 'https://placehold.co/200x200/333/FFA500?text=Pedals',
      description: 'Lightweight pedals with excellent grip and durability for all riding conditions.',
      stock: 11,
    },
    {
      id: 8,
      name: 'LED Light Set',
      category: 'accessories',
      price: 29.99,
      rating: 4.8,
      image: 'https://placehold.co/200x200/333/FFA500?text=Lights',
      description: 'High-visibility LED light set for front and rear with multiple modes.',
      stock: 14,
    },
  ];

  useEffect(() => {
    const filtered = parts.filter(part => {
      const matchesCategory = selectedCategory === 'all' || part.category === selectedCategory;
      const matchesSearch = part.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            part.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    
    setFilteredParts(filtered);
  }, [selectedCategory, searchTerm]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    },
    exit: { 
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section id="parts" className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Our <span className="text-orange-500">Parts Catalog</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Browse our extensive collection of high-quality bicycle parts and accessories to upgrade your ride.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  selectedCategory === category.id 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
          
          <div className="max-w-md mx-auto mb-10 relative">
            <input 
              type="text" 
              placeholder="Search parts..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-700 text-white border border-gray-600 rounded-full py-3 px-6 pl-12 focus:outline-none focus:border-orange-500"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory + searchTerm}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {filteredParts.length > 0 ? (
              filteredParts.map((part) => (
                <motion.div
                  key={part.id}
                  variants={itemVariants}
                  className="bg-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-orange-500/20 transition-all duration-300"
                  onMouseEnter={() => setIsHovering(part.id)}
                  onMouseLeave={() => setIsHovering(null)}
                >
                  <div className="relative overflow-hidden h-48">
                    <motion.img 
                      src={part.image} 
                      alt={part.name}
                      className="w-full h-full object-cover transition-transform duration-500"
                      animate={{ 
                        scale: isHovering === part.id ? 1.1 : 1
                      }}
                    />
                    <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                      ${part.price}
                    </div>
                    {part.stock < 10 && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        Only {part.stock} left
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-white">{part.name}</h3>
                      <div className="flex items-center text-orange-400">
                        <FaStar className="mr-1" size={14} />
                        <span className="text-sm">{part.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">{part.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500 uppercase bg-gray-800 px-2 py-1 rounded">
                        {categories.find(cat => cat.id === part.category)?.name}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-orange-500 text-white p-2 rounded-full"
                      >
                        <FaShoppingCart size={16} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-12"
              >
                <p className="text-gray-400 text-lg">No parts found matching your criteria</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchTerm('');
                  }}
                  className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-full"
                >
                  Reset Filters
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
        
        {filteredParts.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full flex items-center mx-auto"
            >
              <span>View All Parts</span>
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Parts; 