import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import logoRounded from "/images/logo-rounded.jpg";
const Footer = ({ onAdminAccess }) => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "About Us", href: "#about" },
    { label: "Contact", href: "#contact" }
  ];

  const services = [
    "AC Repair",
    "Refrigerator Repair",
    "Washing Machine Repair",
    "Microwave Repair",
    "TV Repair",
    "Geyser Repair"
  ];

  const socialLinks = [
    { icon: "Facebook", href: "#" },
    { icon: "Twitter", href: "#" },
    { icon: "Instagram", href: "#" },
    { icon: "Linkedin", href: "#" }
  ];

  const handleLinkClick = (href) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-3">
              {/* <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <ApperIcon name="Wrench" className="w-6 h-6 text-white" />
              </div> */}
              <img src={logoRounded} alt="Logo" className="w-16 h-16" />
              <div>
                <h3 className="text-lg font-bold">RR HomeTech Services</h3>
                <p className="text-sm text-gray-400">Appliance Service</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              Your trusted partner for fast, reliable, and affordable home appliance repair services. 
              Expert technicians, genuine parts, and same-day service.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.icon}
                  href={social.href}
                  className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-normal"
                >
                  <ApperIcon name={social.icon} className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="text-gray-300 hover:text-white transition-colors duration-normal text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-gray-300 text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <ApperIcon name="Phone" className="w-4 h-4 text-primary" />
                <span className="text-gray-300 text-sm">+91 9511634622</span>
              </div>
              <div className="flex items-center space-x-3">
                <ApperIcon name="Mail" className="w-4 h-4 text-primary" />
                <span className="text-gray-300 text-sm">rrhometechservices@gmail.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <ApperIcon name="MapPin" className="w-4 h-4 text-primary mt-0.5" />
                <span className="text-gray-300 text-sm">
                  Nashik, Maharashtra<br />
                  {/* Service Area: Downtown, Midtown, Uptown */}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} RR HomeTech Services. All rights reserved.
          </p>
          <div className="mt-4 sm:mt-0 flex items-center space-x-6">
            <button
              onClick={onAdminAccess}
              className="text-xs text-gray-600 hover:text-gray-400 transition-colors duration-normal"
            >
              Admin
            </button>
            <span className="text-gray-400 text-sm">
              Made with ❤️ for better homes
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;