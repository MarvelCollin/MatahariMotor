import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaWrench, FaBicycle, FaCogs, FaTools, FaClipboardCheck } from 'react-icons/fa';

const Services = () => {
  const [activeService, setActiveService] = useState<number | null>(null);

  const services = [
    {
      title: 'Bicycle Repair',
      icon: <FaWrench className="text-4xl text-orange-500" />,
      description: 'Complete bicycle repair services from basic tune-ups to complex overhauls. We ensure your bike rides smoothly and safely.',
      details: [
        'Brake adjustment and replacement',
        'Gear tuning and cable replacement',
        'Wheel truing and spoke replacement',
        'Bearing service and replacement',
        'Complete drivetrain overhaul'
      ]
    },
    {
      title: 'Parts Replacement',
      icon: <FaCogs className="text-4xl text-orange-500" />,
      description: 'Quality replacement parts installed by expert technicians. We use only genuine or high-quality alternative parts.',
      details: [
        'Chainsets and bottom brackets',
        'Derailleurs and shifters',
        'Handlebars and stems',
        'Saddles and seatposts',
        'Wheels and tires'
      ]
    },
    {
      title: 'Custom Builds',
      icon: <FaBicycle className="text-4xl text-orange-500" />,
      description: 'Create your dream bicycle with our custom build service. From frame selection to final assembly, we\'ll build it to your specifications.',
      details: [
        'Frame and fork selection assistance',
        'Component compatibility advice',
        'Professional assembly',
        'Custom paintwork',
        'Personalized fitments'
      ]
    },
    {
      title: 'Maintenance Packages',
      icon: <FaTools className="text-4xl text-orange-500" />,
      description: 'Regular maintenance packages to keep your bicycle in perfect condition year-round. Prevent issues before they happen.',
      details: [
        'Quarterly basic service plans',
        'Annual comprehensive service',
        'Race preparation service',
        'Seasonal transition service',
        'Emergency repair service'
      ]
    },
    {
      title: 'Safety Inspections',
      icon: <FaClipboardCheck className="text-4xl text-orange-500" />,
      description: 'Thorough safety inspections to ensure your bicycle is road-worthy and safe to ride in all conditions.',
      details: [
        'Full frame and fork integrity check',
        'Brake system inspection',
        'Wheel and tire condition assessment',
        'Drivetrain wear analysis',
        'Handlebar and steering safety check'
      ]
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="services" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Our <span className="text-orange-500">Services</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We offer comprehensive bicycle maintenance and repair services to keep your ride in perfect condition.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className={`bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-orange-500/20 transition-all duration-300 border border-gray-700 
                ${activeService === index ? 'scale-105 border-orange-500' : 'hover:scale-102'}`}
              whileHover={{ scale: 1.03 }}
              onClick={() => setActiveService(activeService === index ? null : index)}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 bg-gray-700 p-4 rounded-full">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-gray-400 mb-4">{service.description}</p>
                
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ 
                    height: activeService === index ? 'auto' : 0,
                    opacity: activeService === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden w-full"
                >
                  <ul className="text-left space-y-2 mt-4 text-gray-300">
                    {service.details.map((detail, i) => (
                      <motion.li 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start"
                      >
                        <span className="text-orange-500 mr-2">•</span> {detail}
                      </motion.li>
                    ))}
                  </ul>
                  <div className="mt-6 text-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-orange-500 text-white rounded-full text-sm"
                    >
                      Book This Service
                    </motion.button>
                  </div>
                </motion.div>
                
                {activeService !== index && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-4 px-4 py-2 border border-orange-500 text-orange-500 rounded-full text-sm hover:bg-orange-500 hover:text-white transition-colors"
                  >
                    View Details
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services; 