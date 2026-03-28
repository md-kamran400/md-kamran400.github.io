import { Mail, MapPin, Phone, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import emailjs from 'emailjs-com';

interface ContactProps {
  isDark: boolean;
}

const Contact = ({ isDark }: ContactProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // EmailJS configuration - Replace with your actual EmailJS credentials
  const EMAILJS_CONFIG = {
    SERVICE_ID: 'service_ad7rbtr', // Get from EmailJS dashboard
    TEMPLATE_ID: 'template_0g0ygya', // Get from EmailJS dashboard
    PUBLIC_KEY: 'rjhdr749l9UKbf-xS', // Get from EmailJS dashboard
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      // Initialize EmailJS with your public key
      emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: 'Md Kamran',
        reply_to: formData.email,
      };

      // Send email using EmailJS
      const result = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams
      );

      if (result.status === 200) {
        setStatus('sent');
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        // Reset status after 5 seconds
        setTimeout(() => {
          setStatus('idle');
        }, 5000);
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Email sending error:', error);
      setStatus('error');
      setErrorMessage(
        'Failed to send message. Please try again or contact me directly at ka5452488@gmail.com'
      );
      
      // Reset error status after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setErrorMessage('');
      }, 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'ka5452488@gmail.com',
      link: 'mailto:ka5452488@gmail.com',
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+91 8207473188',
      link: 'tel:+918207473188',
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Jharkhand, India',
      link: '#',
    },
  ];

  return (
    <section
      id="contact"
      className={`py-24 relative overflow-hidden min-h-screen ${
        isDark ? 'bg-gradient-to-br from-black via-gray-900 to-black' : 'bg-gradient-to-br from-white via-gray-50 to-white'
      }`}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full animate-float ${
              isDark ? 'bg-green-500/10' : 'bg-green-400/20'
            }`}
            style={{
              width: Math.random() * 15 + 5,
              height: Math.random() * 15 + 5,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${Math.random() * 15 + 10}s`
            }}
          />
        ))}

        {/* Gradient Orbs */}
        <div className={`absolute top-1/4 -left-20 w-80 h-80 rounded-full blur-3xl animate-pulse-slow ${
          isDark ? 'bg-green-500/10' : 'bg-green-400/15'
        }`}></div>
        <div className={`absolute bottom-1/4 -right-20 w-80 h-80 rounded-full blur-3xl animate-pulse-slow ${
          isDark ? 'bg-emerald-500/10' : 'bg-emerald-400/10'
        }`} style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className={`w-12 h-0.5 rounded-full ${
              isDark ? 'bg-green-400' : 'bg-green-600'
            }`}></div>
            <span className={`text-sm font-semibold tracking-wider ${
              isDark ? 'text-green-400' : 'text-green-600'
            }`}>
              CONTACT ME
            </span>
            <div className={`w-12 h-0.5 rounded-full ${
              isDark ? 'bg-green-400' : 'bg-green-600'
            }`}></div>
          </div>
          
          <h2 className={`text-5xl md:text-6xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Let's <span className={isDark ? 'text-green-400' : 'text-green-600'}>Connect</span>
          </h2>
          
          <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Ready to bring your ideas to life? Let's discuss your project and create something extraordinary together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className={`p-8 rounded-2xl backdrop-blur-sm border ${
              isDark
                ? 'bg-gradient-to-br from-green-500/10 via-transparent to-emerald-500/5 border-green-500/20'
                : 'bg-gradient-to-br from-green-50 via-white to-emerald-50 border-green-200'
            }`}>
              <h3 className={`text-3xl font-bold mb-6 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Get In <span className={isDark ? 'text-green-400' : 'text-green-600'}>Touch</span>
              </h3>
              
              <p className={`text-lg mb-8 leading-relaxed ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                I'm always excited to hear about new projects and opportunities. 
                Whether you have a specific idea in mind or just want to explore possibilities, 
                let's start a conversation!
              </p>

              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <a
                      key={index}
                      href={info.link}
                      className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:scale-105 group backdrop-blur-sm border ${
                        isDark
                          ? 'bg-green-500/10 border-green-500/20 hover:bg-green-500/20 hover:border-green-500/40'
                          : 'bg-green-50 border-green-200 hover:bg-green-100 hover:border-green-300'
                      }`}
                    >
                      <div className={`p-3 rounded-xl transition-all duration-300 group-hover:scale-110 ${
                        isDark 
                          ? 'bg-green-500/20 text-green-400 group-hover:bg-green-500/30' 
                          : 'bg-green-100 text-green-600 group-hover:bg-green-200'
                      }`}>
                        <Icon size={24} />
                      </div>
                      <div className="flex-1">
                        <div className={`text-sm font-medium ${
                          isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {info.title}
                        </div>
                        <div className={`font-semibold text-lg ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                          {info.value}
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Response Time Card */}
            <div className={`p-6 rounded-2xl backdrop-blur-sm border text-center ${
              isDark
                ? 'bg-gradient-to-br from-emerald-500/10 to-transparent border-emerald-500/20'
                : 'bg-gradient-to-br from-emerald-50 to-transparent border-emerald-200'
            }`}>
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600'
              }`}>
                <CheckCircle2 size={32} />
              </div>
              <h4 className={`font-bold text-lg mb-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Quick Response
              </h4>
              <p className={`text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                I typically respond within 24 hours during business days. 
                Your message is important to me!
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`p-8 rounded-2xl backdrop-blur-sm border ${
            isDark
              ? 'bg-gradient-to-br from-green-500/10 via-transparent to-emerald-500/5 border-green-500/20'
              : 'bg-gradient-to-br from-green-50 via-white to-emerald-50 border-green-200'
          }`}>
            <h3 className={`text-2xl font-bold mb-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Send Me a Message
            </h3>
            <p className={`text-sm mb-6 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Fill out the form below and I'll get back to you as soon as possible.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className={`block text-sm font-medium mb-2 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-xl transition-all duration-300 focus:ring-2 focus:outline-none backdrop-blur-sm ${
                      isDark
                        ? 'bg-black/30 border border-green-500/30 text-white focus:ring-green-500/50 focus:border-green-500 placeholder-gray-500'
                        : 'bg-white/80 border border-green-200 text-gray-900 focus:ring-green-600/50 focus:border-green-600 placeholder-gray-400'
                    }`}
                    placeholder="John Doe"
                    disabled={status === 'sending'}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className={`block text-sm font-medium mb-2 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Your Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-xl transition-all duration-300 focus:ring-2 focus:outline-none backdrop-blur-sm ${
                      isDark
                        ? 'bg-black/30 border border-green-500/30 text-white focus:ring-green-500/50 focus:border-green-500 placeholder-gray-500'
                        : 'bg-white/80 border border-green-200 text-gray-900 focus:ring-green-600/50 focus:border-green-600 placeholder-gray-400'
                    }`}
                    placeholder="john@example.com"
                    disabled={status === 'sending'}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-xl transition-all duration-300 focus:ring-2 focus:outline-none backdrop-blur-sm ${
                    isDark
                      ? 'bg-black/30 border border-green-500/30 text-white focus:ring-green-500/50 focus:border-green-500 placeholder-gray-500'
                      : 'bg-white/80 border border-green-200 text-gray-900 focus:ring-green-600/50 focus:border-green-600 placeholder-gray-400'
                  }`}
                  placeholder="Project Inquiry"
                  disabled={status === 'sending'}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className={`w-full px-4 py-3 rounded-xl transition-all duration-300 focus:ring-2 focus:outline-none resize-none backdrop-blur-sm ${
                    isDark
                      ? 'bg-black/30 border border-green-500/30 text-white focus:ring-green-500/50 focus:border-green-500 placeholder-gray-500'
                      : 'bg-white/80 border border-green-200 text-gray-900 focus:ring-green-600/50 focus:border-green-600 placeholder-gray-400'
                  }`}
                  placeholder="Tell me about your project, timeline, and any specific requirements..."
                  disabled={status === 'sending'}
                />
              </div>

              {/* Status Messages */}
              {status === 'error' && (
                <div className={`p-4 rounded-xl flex items-center gap-3 ${
                  isDark ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-red-100 text-red-700 border border-red-200'
                }`}>
                  <AlertCircle size={20} />
                  <span className="text-sm">{errorMessage}</span>
                </div>
              )}

              {status === 'sent' && (
                <div className={`p-4 rounded-xl flex items-center gap-3 ${
                  isDark ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-green-100 text-green-700 border border-green-200'
                }`}>
                  <CheckCircle2 size={20} />
                  <span className="text-sm">Message sent successfully! I'll get back to you soon.</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'sending' || status === 'sent'}
                className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 group ${
                  status === 'sent'
                    ? isDark
                      ? 'bg-green-600 text-white'
                      : 'bg-green-700 text-white'
                    : isDark
                    ? 'bg-green-500 text-black hover:bg-green-400 hover:shadow-2xl hover:shadow-green-500/50'
                    : 'bg-green-600 text-white hover:bg-green-700 hover:shadow-2xl hover:shadow-green-600/30'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Sending Message...
                  </>
                ) : status === 'sent' ? (
                  <>
                    <CheckCircle2 size={20} />
                    Message Sent!
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(10px) rotate(240deg); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }

        .animate-float {
          animation: float infinite ease-in-out;
        }

        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Contact;