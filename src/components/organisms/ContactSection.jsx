import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import Textarea from "@/components/atoms/Textarea";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { leadService } from "@/services/api/leadService";

const ContactSection = ({ selectedService = null }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    service: selectedService?.name || "",
    address: "",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const serviceOptions = [
    { value: "AC Repair & Installation", label: "AC Repair & Installation" },
    { value: "Refrigerator Repair", label: "Refrigerator Repair" },
    { value: "Washing Machine Repair", label: "Washing Machine Repair" },
    { value: "Microwave Repair", label: "Microwave Repair" },
    { value: "TV Repair", label: "TV Repair" },
    { value: "Geyser Repair", label: "Geyser Repair" }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    
if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s\-()]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.service) {
      newErrors.service = "Please select a service";
    }
    
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    try {
      await leadService.create(formData);
      
      // Success
      toast.success("Thank you! We'll contact you within 30 minutes to schedule your service.", {
        position: "top-center",
        autoClose: 5000,
      });
      
      // Reset form
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        service: "",
        address: "",
        message: ""
      });
      
    } catch (error) {
      toast.error("Something went wrong. Please try again or call us directly.", {
        position: "top-center"
      });
    } finally {
      setLoading(false);
    }
  };
// Update form when selectedService changes
  useEffect(() => {
    if (selectedService?.name && selectedService.name !== formData.service) {
      setFormData(prev => ({ ...prev, service: selectedService.name }));
    }
  }, [selectedService]);

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">
            Get Your{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Free Quote
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ready to fix your appliance? Fill out the form below and we'll contact you 
            within 30 minutes to schedule your service appointment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="card">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    required
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    error={errors.fullName}
                    placeholder="Enter your full name"
                  />
                  <Input
                    label="Phone Number"
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    error={errors.phone}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <Input
                  label="Email Address"
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  error={errors.email}
                  placeholder="your.email@example.com"
                />

                <Select
                  label="Select Service"
                  required
                  options={serviceOptions}
                  value={formData.service}
                  onChange={(e) => handleInputChange("service", e.target.value)}
                  error={errors.service}
                  placeholder="Choose the appliance you need repaired"
                />

                <Textarea
                  label="Address"
                  required
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  error={errors.address}
                  placeholder="Enter your complete address"
                  rows={2}
                />

                <Textarea
                  label="Message (Optional)"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Describe the issue with your appliance..."
                  rows={3}
                />

                <Button
                  type="submit"
                  loading={loading}
                  disabled={loading}
                  className="w-full"
                  size="lg"
                  icon={loading ? undefined : "Send"}
                >
                  {loading ? "Submitting..." : "Book Service Now"}
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Contact Info */}
            <div className="card">
              <h3 className="text-display-md font-semibold text-gray-900 mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <ApperIcon name="Phone" className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Call Us</p>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <ApperIcon name="Mail" className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Email Us</p>
                    <p className="text-gray-600">info@quickfixhome.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <ApperIcon name="MapPin" className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Service Area</p>
                    <p className="text-gray-600">Downtown, Midtown, Uptown<br />New York, NY</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <ApperIcon name="Clock" className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Working Hours</p>
                    <p className="text-gray-600">Mon - Sat: 8:00 AM - 8:00 PM<br />Sunday: 10:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="card p-0 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d96708.34194156103!2d-74.03927096447748!3d40.759040329405195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258fce8d7b7e1%3A0xa9fb8b4b2c5d4c43!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="QuickFix Home Service Area"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;