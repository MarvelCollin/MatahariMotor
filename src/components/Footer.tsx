import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaArrowUp } from 'react-icons/fa';
import logo from '../assets/logo.png';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const quickLinks = [
    { name: 'Home', link: '#home' },
    { name: 'Services', link: '#services' },
    { name: 'Parts', link: '#parts' },
    { name: 'About Us', link: '#about' },
    { name: 'Contact', link: '#contact' },
  ];

  const services = [
    { name: 'Bicycle Repair', link: '#services' },
    { name: 'Parts Replacement', link: '#services' },
    { name: 'Custom Builds', link: '#services' },
    { name: 'Maintenance Packages', link: '#services' },
    { name: 'Safety Inspections', link: '#services' },
  ];

  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 pt-16 pb-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500"></div>
      <div className="absolute -bottom-5 -right-5 w-32 h-32 rounded-full bg-orange-500/10"></div>
      <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-orange-500/5"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-4">
              <img src={logo} alt="Matahari Motor" className="h-16 mr-3" />
              <h3 className="text-2xl font-bold text-white">
                <span className="text-orange-500">Matahari</span> Motor
              </h3>
            </div>
            <p className="text-gray-400 mb-6">
              Premium bicycle spare parts workshop providing high-quality services and products for all cycling enthusiasts.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                className="text-gray-400 hover:text-orange-500 transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaFacebook />
              </motion.a>
              <motion.a
                href="#"
                className="text-gray-400 hover:text-orange-500 transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTwitter />
              </motion.a>
              <motion.a
                href="#"
                className="text-gray-400 hover:text-orange-500 transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaInstagram />
              </motion.a>
              <motion.a
                href="#"
                className="text-gray-400 hover:text-orange-500 transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaLinkedin />
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <a 
                    href={link.link} 
                    className="text-gray-400 hover:text-orange-500 transition-colors flex items-center"
                  >
                    <span className="mr-2">&gt;</span> {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-white mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <a 
                    href={service.link} 
                    className="text-gray-400 hover:text-orange-500 transition-colors flex items-center"
                  >
                    <span className="mr-2">&gt;</span> {service.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-white mb-6">Contact Us</h3>
            <div className="space-y-4 text-gray-400">
              <p>Jl. Raya Bicycle No. 123</p>
              <p>Jakarta, Indonesia 12345</p>
              <p>Phone: +62 21 1234 5678</p>
              <p>Email: info@mataharimotor.com</p>
            </div>
            <motion.button
              onClick={scrollToTop}
              className="mt-6 bg-orange-500 text-white p-3 rounded-full float-right"
              whileHover={{ scale: 1.1, rotate: 360 }}
              whileTap={{ scale: 0.9 }}
              transition={{ rotate: { duration: 0.5 } }}
            >
              <FaArrowUp />
            </motion.button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 pt-8 text-center"
        >
          <p className="text-gray-500">
            &copy; {year} Matahari Motor. All rights reserved. Designed with ❤️ for bicycle enthusiasts.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 