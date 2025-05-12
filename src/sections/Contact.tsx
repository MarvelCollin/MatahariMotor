import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      // Reset submission message after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }, 1500);
  };
  
  const contactInfo = [
    {
      icon: <FaMapMarkerAlt />,
      title: 'Our Location',
      details: [
        'Jl. Raya Bicycle No. 123',
        'Jakarta, Indonesia 12345'
      ]
    },
    {
      icon: <FaPhone />,
      title: 'Phone Number',
      details: [
        '+62 21 1234 5678',
        '+62 812 3456 7890'
      ]
    },
    {
      icon: <FaEnvelope />,
      title: 'Email Address',
      details: [
        'info@mataharimotor.com',
        'service@mataharimotor.com'
      ]
    },
    {
      icon: <FaClock />,
      title: 'Working Hours',
      details: [
        'Monday-Friday: 8am - 7pm',
        'Saturday: 9am - 5pm'
      ]
    }
  ];
  
  const inputVariants = {
    focus: {
      scale: 1.01,
      borderColor: '#f97316',
      transition: { duration: 0.2 }
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Get In <span className="text-orange-500">Touch</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have questions or need a quote? Contact us today and our team will get back to you as soon as possible.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gray-800 rounded-xl p-6 mb-8"
            >
              <h3 className="text-xl text-white font-bold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
                    <div className="text-orange-500 text-xl mt-1 mr-4">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{info.title}</h4>
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-gray-400">{detail}</p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-8 border-t border-gray-700 pt-6">
                <h4 className="text-white font-medium mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <motion.a 
                    href="#" 
                    className="bg-gray-700 text-orange-500 p-3 rounded-full"
                    whileHover={{ scale: 1.1, backgroundColor: '#f97316', color: '#ffffff' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaInstagram />
                  </motion.a>
                  <motion.a 
                    href="#" 
                    className="bg-gray-700 text-orange-500 p-3 rounded-full"
                    whileHover={{ scale: 1.1, backgroundColor: '#f97316', color: '#ffffff' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaFacebook />
                  </motion.a>
                  <motion.a 
                    href="#" 
                    className="bg-gray-700 text-orange-500 p-3 rounded-full"
                    whileHover={{ scale: 1.1, backgroundColor: '#f97316', color: '#ffffff' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaTwitter />
                  </motion.a>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-800 rounded-xl overflow-hidden"
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.4519796087374!2d106.8230544!3d-6.2097247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f14d30079f01%3A0x2e74f2341fff266d!2sMonas!5e0!3m2!1sen!2sid!4v1652345678901!5m2!1sen!2sid" 
                width="100%" 
                height="250" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
                title="Matahari Motor location"
              ></iframe>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-gray-800 rounded-xl p-6 lg:p-8"
          >
            <h3 className="text-xl text-white font-bold mb-6">Send Us a Message</h3>
            
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-500/20 border border-green-500 text-green-300 rounded-lg p-4 text-center"
              >
                <p className="text-lg font-medium">Thank you for your message!</p>
                <p className="mt-1">We'll get back to you shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-400 mb-2">Full Name</label>
                    <motion.input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none"
                      whileFocus="focus"
                      variants={inputVariants}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-gray-400 mb-2">Email Address</label>
                    <motion.input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none"
                      whileFocus="focus"
                      variants={inputVariants}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-gray-400 mb-2">Phone Number</label>
                    <motion.input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formState.phone}
                      onChange={handleChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none"
                      whileFocus="focus"
                      variants={inputVariants}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-gray-400 mb-2">Subject</label>
                    <motion.select
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none"
                      whileFocus="focus"
                      variants={inputVariants}
                    >
                      <option value="">Select a subject</option>
                      <option value="service">Repair & Service</option>
                      <option value="parts">Parts & Accessories</option>
                      <option value="custom">Custom Builds</option>
                      <option value="quote">Request Quote</option>
                      <option value="other">Other</option>
                    </motion.select>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-400 mb-2">Your Message</label>
                  <motion.textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none"
                    whileFocus="focus"
                    variants={inputVariants}
                  ></motion.textarea>
                </div>
                
                <motion.button
                  type="submit"
                  disabled={submitting}
                  className={`px-8 py-3 rounded-lg font-medium ${
                    submitting ? 'bg-gray-600 text-gray-300' : 'bg-orange-500 text-white hover:bg-orange-600'
                  } transition-colors w-full md:w-auto flex items-center justify-center`}
                  whileHover={{ scale: submitting ? 1 : 1.02 }}
                  whileTap={{ scale: submitting ? 1 : 0.98 }}
                >
                  {submitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 