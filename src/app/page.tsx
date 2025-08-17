'use client';

import { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import { 
  JavaOriginal,
  LaravelOriginal,
  SpringOriginal,
  PostgresqlOriginal,
  FirebaseOriginal,
  Css3Original,
  Html5Original,
  DartOriginal,
  FlutterOriginal,
  GitOriginal,
  GithubOriginal,
  PostmanOriginal,
  SwaggerOriginal,
  DockerOriginal
} from 'devicons-react';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [displayedName, setDisplayedName] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  
  // Estado para el año (evita problemas de hidratación)
  const [currentYear, setCurrentYear] = useState(2025);
  
  // Estados para el formulario de contacto
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [submitCount, setSubmitCount] = useState(0);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  
  const fullName = 'Josmel';

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < fullName.length) {
        setDisplayedName(fullName.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        // Ocultar el cursor después de una pequeña pausa
        setTimeout(() => {
          setShowCursor(false);
        }, 500); // Espera 500ms después de terminar de escribir
      }
    }, 150); // 150ms entre cada letra

    return () => clearInterval(typingInterval);
  }, []);

  // Sincronizar el año después de la hidratación para evitar mismatch
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  // Funciones para el formulario de contacto
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // PROTECCIÓN 1: Rate limiting (máximo 3 envíos por hora)
      const now = Date.now();
      const oneHour = 60 * 60 * 1000; // 1 hora en millisegundos
      
      if (now - lastSubmitTime < 2 * 60 * 1000) { // 2 minutos entre envíos
        throw new Error('Por favor espera 2 minutos antes de enviar otro mensaje.');
      }

      // PROTECCIÓN 2: Verificar contenido spam básico
      const spamWords = ['viagra', 'casino', 'lottery', 'winner', 'million', 'click here', 'free money'];
      const messageText = (formData.message + formData.subject + formData.name).toLowerCase();
      const hasSpam = spamWords.some(word => messageText.includes(word));
      
      if (hasSpam) {
        throw new Error('Mensaje detectado como spam. Por favor revisa el contenido.');
      }

      // PROTECCIÓN 3: Validación básica de contenido
      if (formData.message.length < 10) {
        throw new Error('El mensaje debe tener al menos 10 caracteres.');
      }

      if (formData.name.length < 2) {
        throw new Error('El nombre debe tener al menos 2 caracteres.');
      }

      // Configuración de EmailJS usando variables de entorno
      const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      // Debug: verificar variables de entorno
      console.log('Service ID:', serviceID);
      console.log('Template ID:', templateID);
      console.log('Public Key:', publicKey);
      console.log('Form data:', formData);

      if (!serviceID || !templateID || !publicKey) {
        throw new Error('Error de configuración. Por favor intenta más tarde.');
      }

      // Envío real con EmailJS - Variables ajustadas a tu template
      await emailjs.send(
        serviceID,
        templateID,
        {
          name: formData.name,           // {{name}} en tu template
          email: formData.email,         // Email del remitente
          title: formData.subject,       // {{title}} en tu template (tu usas title en lugar de subject)
          message: formData.message,     // {{message}} en tu template
          to_email: 'josmelvt@gmail.com' // Email de destino
        },
        publicKey
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setLastSubmitTime(now);
      setSubmitCount(prev => prev + 1);
      
    } catch (error) {
      console.error('Error enviando email:', error);
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Error al enviar el mensaje. Por favor intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        isScrolled || isMobileMenuOpen
          ? 'bg-black/20 backdrop-blur-md border-white/10' 
          : 'bg-transparent border-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-white font-bold text-xl">Josmel Vergara</div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-white hover:text-blue-400 transition-colors">Inicio</a>
              <a href="#about" className="text-white hover:text-blue-400 transition-colors">Acerca de</a>
              <a href="#experience" className="text-white hover:text-blue-400 transition-colors">Experiencia</a>
              <a href="#technologies" className="text-white hover:text-blue-400 transition-colors">Tecnologías</a>
              <a href="#projects" className="text-white hover:text-blue-400 transition-colors">Proyectos</a>
              <a href="#contact" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 border border-white/20">
                Contacto
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-white/10 py-4">
              <div className="flex flex-col space-y-4">
                <a 
                  href="#home" 
                  className="text-white hover:text-blue-400 transition-colors py-2 px-4 hover:bg-white/5 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Inicio
                </a>
                <a 
                  href="#about" 
                  className="text-white hover:text-blue-400 transition-colors py-2 px-4 hover:bg-white/5 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Acerca de
                </a>
                <a 
                  href="#experience" 
                  className="text-white hover:text-blue-400 transition-colors py-2 px-4 hover:bg-white/5 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Experiencia
                </a>
                <a 
                  href="#technologies" 
                  className="text-white hover:text-blue-400 transition-colors py-2 px-4 hover:bg-white/5 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Tecnologías
                </a>
                <a 
                  href="#projects" 
                  className="text-white hover:text-blue-400 transition-colors py-2 px-4 hover:bg-white/5 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Proyectos
                </a>
                <a 
                  href="#contact" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 text-center mx-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contacto
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="h-full w-full bg-grid-pattern bg-repeat" style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3e%3cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='%23ffffff' stroke-width='1'/%3e%3c/pattern%3e%3c/defs%3e%3crect width='100%25' height='100%25' fill='url(%23grid)' /%3e%3c/svg%3e")`,
            }}></div>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[80vh] py-12">
            {/* Contenido izquierdo */}
            <div className="text-left">
              <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4">
                Hola, soy <span className="text-blue-400">Josmel</span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-300 mb-6">
                Desarrollador de software especializado en desarrollo backend con Laravel y SpringBoot, creando soluciones eficientes y escalables
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                  </svg>
                  Ver Proyectos
                </button>
                <button className="border border-white/30 hover:bg-white/10 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  Descargar CV
                </button>
              </div>
              <div className="flex gap-3 mt-5">
                <a href="https://linkedin.com/in/tu-perfil" target="_blank" rel="noopener noreferrer" className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
                <a href="https://github.com/josmeldev" target="_blank" rel="noopener noreferrer" className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
              </div>
            </div>

            {/* Foto derecha */}
            <div className="relative lg:order-last order-first">
              <div className="relative w-64 h-64 mx-auto lg:w-80 lg:h-80">
                {/* Fondo decorativo */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full blur-3xl opacity-20"></div>
                
                {/* Contenedor de la foto */}
                <div className="relative w-full h-full bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center border-4 border-white/20 shadow-2xl overflow-hidden">
                  {/* Foto real de Josmel */}
                  <img 
                    src="/foto.png" 
                    alt="Josmel - Desarrollador Web Full Stack" 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                
                {/* Elementos decorativos */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-500/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-white/10 rounded-full blur-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">
            Acerca de Mí
          </h2>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed">
              Ingeniero de Sistemas con enfoque en el desarrollo backend, experiencia en Laravel y conocimientos en SpringBoot. 
              Especializado en diseñar e implementar soluciones eficientes y escalables. Destacado por mi proactividad, 
              capacidad para el trabajo colaborativo y familiaridad con metodologías ágiles. Profesional autodidacta, 
              con gran disposición para aprender e incorporar nuevas tecnologías.
            </p>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">
            Experiencia Profesional
          </h2>
          
          <div className="max-w-4xl mx-auto">
            {/* Timeline Container */}
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-blue-700"></div>
              
              {/* Experience Item */}
              <div className="relative flex items-start mb-12">
                {/* Timeline Icon */}
                <div className="relative z-10 flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center border-4 border-white/20 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 6h-2V4c0-1.11-.89-2-2-2H8c-1.11 0-2 .89-2 2v2H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zM8 4h8v2H8V4zm12 15H4V8h16v11z"/>
                    <circle cx="12" cy="12" r="2"/>
                  </svg>
                </div>
                
                {/* Content Card */}
                <div className="ml-8 flex-1">
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 shadow-lg">
                    {/* Header */}
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-white mb-1">Ditech-Group SAC</h3>
                      <h4 className="text-lg text-blue-400 font-semibold mb-2">Desarrollador BackEnd (Practicante)</h4>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                          </svg>
                          Febrero 2024 – Septiembre 2024
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                          </svg>
                          Miramar, La Libertad
                        </span>
                      </div>
                    </div>
                    
                    {/* Achievements */}
                    <div className="space-y-3 mb-4">
                      <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          Contribuí al desarrollo de un sistema web para la gestión de guías de remisión y cálculo de pagos periódicos para transportistas del sector agropecuario, implementando lógica de negocio en Laravel y base de datos en PostgreSQL.
                        </p>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          Desarrollé funcionalidades backend para un libro de reclamaciones digital, integrando notificaciones automáticas, seguimiento de estados y sistema de auditoría interna.
                        </p>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          Implementé el backend de un sistema de ventas para una cadena de restaurantes, con gestión de stock en tiempo real, reportes en dashboard y control de productos.
                        </p>
                      </div>
                    </div>
                    
                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full border border-blue-500/30">Laravel</span>
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full border border-blue-500/30">PostgreSQL</span>
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full border border-blue-500/30">PHP</span>
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full border border-blue-500/30">Backend Development</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="technologies" className="py-16 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">
            Tecnologías
          </h2>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              
              {/* Java */}
              <div className="group flex flex-col items-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 mb-3 flex items-center justify-center">
                  <JavaOriginal size={40} />
                </div>
                <span className="text-sm font-medium text-gray-300 text-center">Java</span>
              </div>

              {/* Laravel */}
              <div className="group flex flex-col items-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 mb-3 flex items-center justify-center">
                  <LaravelOriginal size={40} />
                </div>
                <span className="text-sm font-medium text-gray-300 text-center">Laravel</span>
              </div>

              {/* Spring Boot */}
              <div className="group flex flex-col items-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 mb-3 flex items-center justify-center">
                  <SpringOriginal size={40} />
                </div>
                <span className="text-sm font-medium text-gray-300 text-center">Spring Boot</span>
              </div>

              {/* PostgreSQL */}
              <div className="group flex flex-col items-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 mb-3 flex items-center justify-center">
                  <PostgresqlOriginal size={40} />
                </div>
                <span className="text-sm font-medium text-gray-300 text-center">PostgreSQL</span>
              </div>

              {/* Firebase */}
              <div className="group flex flex-col items-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 mb-3 flex items-center justify-center">
                  <FirebaseOriginal size={40} />
                </div>
                <span className="text-sm font-medium text-gray-300 text-center">Firebase</span>
              </div>

              {/* CSS */}
              <div className="group flex flex-col items-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 mb-3 flex items-center justify-center">
                  <Css3Original size={40} />
                </div>
                <span className="text-sm font-medium text-gray-300 text-center">CSS</span>
              </div>

              {/* HTML */}
              <div className="group flex flex-col items-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 mb-3 flex items-center justify-center">
                  <Html5Original size={40} />
                </div>
                <span className="text-sm font-medium text-gray-300 text-center">HTML</span>
              </div>

              {/* Dart */}
              <div className="group flex flex-col items-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 mb-3 flex items-center justify-center">
                  <DartOriginal size={40} />
                </div>
                <span className="text-sm font-medium text-gray-300 text-center">Dart</span>
              </div>

              {/* Flutter */}
              <div className="group flex flex-col items-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 mb-3 flex items-center justify-center">
                  <FlutterOriginal size={40} />
                </div>
                <span className="text-sm font-medium text-gray-300 text-center">Flutter</span>
              </div>

              {/* Git */}
              <div className="group flex flex-col items-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 mb-3 flex items-center justify-center">
                  <GitOriginal size={40} />
                </div>
                <span className="text-sm font-medium text-gray-300 text-center">Git</span>
              </div>

              {/* GitHub */}
              <div className="group flex flex-col items-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 mb-3 flex items-center justify-center">
                  <GithubOriginal size={40} />
                </div>
                <span className="text-sm font-medium text-gray-300 text-center">GitHub</span>
              </div>

              {/* Postman */}
              <div className="group flex flex-col items-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 mb-3 flex items-center justify-center">
                  <PostmanOriginal size={40} />
                </div>
                <span className="text-sm font-medium text-gray-300 text-center">Postman</span>
              </div>

              {/* Swagger */}
              <div className="group flex flex-col items-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 mb-3 flex items-center justify-center">
                  <SwaggerOriginal size={40} />
                </div>
                <span className="text-sm font-medium text-gray-300 text-center">Swagger</span>
              </div>

              {/* REST API */}
              <div className="group flex flex-col items-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 mb-3 flex items-center justify-center">
                  <svg className="w-10 h-10 text-purple-500 group-hover:text-purple-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zM8.5 6h7c.276 0 .5.224.5.5s-.224.5-.5.5h-7c-.276 0-.5-.224-.5-.5s.224-.5.5-.5zm0 2h7c.276 0 .5.224.5.5s-.224.5-.5.5h-7c-.276 0-.5-.224-.5-.5s.224-.5.5-.5zm0 2h7c.276 0 .5.224.5.5s-.224.5-.5.5h-7c-.276 0-.5-.224-.5-.5s.224-.5.5-.5zm0 2h7c.276 0 .5.224.5.5s-.224.5-.5.5h-7c-.276 0-.5-.224-.5-.5s.224-.5.5-.5zm0 2h7c.276 0 .5.224.5.5s-.224.5-.5.5h-7c-.276 0-.5-.224-.5-.5s.224-.5.5-.5zm0 2h7c.276 0 .5.224.5.5s-.224.5-.5.5h-7c-.276 0-.5-.224-.5-.5s.224-.5.5-.5z"/>
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-300 text-center">REST API</span>
              </div>

              {/* Arquitectura MVC */}
              <div className="group flex flex-col items-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 mb-3 flex items-center justify-center">
                  <svg className="w-10 h-10 text-indigo-500 group-hover:text-indigo-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-300 text-center">MVC</span>
              </div>

              {/* JWT Auth */}
              <div className="group flex flex-col items-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 mb-3 flex items-center justify-center">
                  <svg className="w-10 h-10 text-red-500 group-hover:text-red-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/>
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-300 text-center">JWT Auth</span>
              </div>

              {/* Docker */}
              <div className="group flex flex-col items-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 mb-3 flex items-center justify-center">
                  <DockerOriginal size={40} />
                </div>
                <span className="text-sm font-medium text-gray-300 text-center">Docker</span>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-white mb-4">Proyectos</h2>
            
            <p className="text-gray-300 text-lg max-w-4xl">
              Colección de proyectos web desarrollados con diferentes tecnologías y frameworks modernos, 
              desde aplicaciones frontend hasta soluciones full-stack con bases de datos y APIs.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {/* Proyecto 1 - Crack-D */}
            <div className="group relative bg-gray-900/80 rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)] max-w-sm flex flex-col min-h-[28rem]">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src="/crack-d-portafolio.webp" 
                  alt="Crack-D - App de clasificación de grietas con Deep Learning" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-white text-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Mobile App</span>
                  </div>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-white font-semibold text-xl mb-2">Crack-D</h3>
                <p className="text-gray-400 text-sm mb-4 flex-1">
                  Desarrollé una app móvil multiplataforma con Flutter y FastAPI que integra modelos de Deep Learning para la clasificación de grietas estructurales por nivel de riesgo, alcanzando un 90% de precisión.
                </p>
                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">Flutter</span>
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">FastAPI</span>
                    <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded">Deep Learning</span>
                  </div>
                  <a 
                    href="https://github.com/josmeleli/crack_detection_app" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm transition-colors flex items-center justify-center"
                  >
                    → Ir al proyecto
                  </a>
                </div>
              </div>
            </div>

            {/* Proyecto 2 - Cifrador de texto */}
            <div className="group relative bg-gray-900/80 rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)] max-w-sm flex flex-col min-h-[28rem]">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src="/encriptador-portafolio.webp" 
                  alt="Cifrador de texto - Encriptación y desencriptación en tiempo real" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-white text-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Web App</span>
                  </div>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-white font-semibold text-xl mb-2">Cifrador de texto</h3>
                <p className="text-gray-400 text-sm mb-4 flex-1">
                  Implementé una interfaz web responsive con HTML, CSS y JavaScript para la encriptación y desencriptación de texto en tiempo real.
                </p>
                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded">HTML</span>
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">CSS</span>
                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded">JavaScript</span>
                  </div>
                  <a 
                    href="https://josmeldev.github.io/encriptador-de-texto/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm transition-colors flex items-center justify-center"
                  >
                    → Ir al proyecto
                  </a>
                </div>
              </div>
            </div>

            {/* Proyecto 3 - Conversor de monedas */}
            <div className="group relative bg-gray-900/80 rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)] max-w-sm flex flex-col min-h-[28rem]">
              <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-cyan-800 to-cyan-600 flex items-center justify-center">
                <img 
                  src="/conversor.webp" 
                  alt="Conversor de monedas - Aplicación de escritorio en Java Swing" 
                  className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-white text-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Desktop App</span>
                  </div>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-white font-semibold text-xl mb-2">Conversor de monedas</h3>
                <p className="text-gray-400 text-sm mb-4 flex-1">
                  Construí una aplicación de escritorio en Java utilizando Swing para la conversión de monedas, con una interfaz intuitiva y funcionalidades.
                </p>
                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded">Java</span>
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">Swing</span>
                    <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded">Desktop</span>
                  </div>
                  <a 
                    href="https://github.com/josmeldev/conversorAlura" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm transition-colors flex items-center justify-center"
                  >
                    → Ir al proyecto
                  </a>
                </div>
              </div>
            </div>

            {/* Proyecto 4 - Txtscan */}
            <div className="group relative bg-gray-900/80 rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)] max-w-sm flex flex-col min-h-[28rem]">
              <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-cyan-800 to-cyan-600 flex items-center justify-center">
                <img 
                  src="/txtscan-portafolio.webp" 
                  alt="Txtscan - App de detección de mensajes maliciosos con Machine Learning" 
                  className="max-w-full max-h-full object-contain"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-white text-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Mobile App</span>
                  </div>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-white font-semibold text-xl mb-2">Txtscan</h3>
                <p className="text-gray-400 text-sm mb-4 flex-1">
                  Desarrollé un aplicativo móvil multiplataforma con Flutter y FastAPI que integra la detección de mensajes de texto maliciosos en tiempo real usando un modelo entrenado con un conjunto de datos público, obteniendo un 96% de precisión.
                </p>
                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">Flutter</span>
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">FastAPI</span>
                    <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded">ML Model</span>
                  </div>
                  <a 
                    href="https://github.com/josmeldev/txtscan" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm transition-colors flex items-center justify-center"
                  >
                    → Ir al proyecto
                  </a>
                </div>
              </div>
            </div>


            
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              ¿Trabajamos Juntos?
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Estoy disponible para proyectos freelance y oportunidades de trabajo. 
              ¡Hablemos sobre tu próximo proyecto!
            </p>
          </div>
          
          <div className="bg-gray-900/50 rounded-2xl p-8 border border-white/10">
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-green-400">¡Mensaje enviado exitosamente! Te responderé pronto.</p>
                </div>
              </div>
            )}
            
            {submitStatus === 'error' && errorMessage && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-red-400 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <div className="flex-1">
                    <p className="text-red-400 font-medium mb-1">Error al enviar mensaje</p>
                    <p className="text-red-300 text-sm">{errorMessage}</p>
                  </div>
                </div>
              </div>
            )}
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Nombre / Empresa
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50"
                    placeholder="Tu nombre o empresa"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  Asunto
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50"
                  placeholder="¿De qué quieres hablar?"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none disabled:opacity-50"
                  placeholder="Cuéntame sobre tu proyecto, oportunidad laboral o colaboración..."
                />
              </div>
              
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Enviar mensaje
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            © {currentYear} Josmel Vergara. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
