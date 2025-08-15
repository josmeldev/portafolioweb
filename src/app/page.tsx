'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            <div className="text-white font-bold text-xl">Josmel</div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-white hover:text-blue-400 transition-colors">Inicio</a>
              <a href="#about" className="text-white hover:text-blue-400 transition-colors">Acerca de</a>
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

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="pt-20 pb-16">
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
              Hola, soy <span className="text-blue-400">Josmel</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Desarrollador Web Full Stack especializado en crear experiencias digitales excepcionales
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                Ver Proyectos
              </button>
              <button className="border border-white/30 hover:bg-white/10 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                Descargar CV
              </button>
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
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-300 text-lg mb-6">
                Soy un desarrollador web apasionado con experiencia en tecnologías modernas como React, Next.js, y TypeScript. 
                Me especializo en crear aplicaciones web performantes y con excelente experiencia de usuario.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-lg backdrop-blur-sm">
                  <h3 className="text-white font-semibold mb-2">Frontend</h3>
                  <p className="text-gray-400 text-sm">React, Next.js, TypeScript, Tailwind CSS</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg backdrop-blur-sm">
                  <h3 className="text-white font-semibold mb-2">Backend</h3>
                  <p className="text-gray-400 text-sm">Node.js, Express, PostgreSQL, MongoDB</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="w-80 h-80 mx-auto bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-6xl font-bold">J</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-white/10 text-white text-sm rounded-full">Grid Layout</span>
              <span className="px-3 py-1 bg-white/10 text-white text-sm rounded-full">Flexbox</span>
              <span className="px-3 py-1 bg-white/10 text-white text-sm rounded-full">CSS</span>
              <span className="px-3 py-1 bg-white/10 text-white text-sm rounded-full">HTML</span>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-white mb-4">Proyectos</h2>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-yellow-400">📋</span>
              <span className="px-2 py-1 bg-yellow-400/20 text-yellow-400 text-sm rounded">Nivel intermedio</span>
            </div>
            <p className="text-gray-300 text-lg max-w-4xl">
              Colección de proyectos web desarrollados con diferentes tecnologías y frameworks modernos, 
              desde aplicaciones frontend hasta soluciones full-stack con bases de datos y APIs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Proyecto 1 - E-commerce */}
            <div className="group relative bg-slate-800/50 rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="aspect-video bg-slate-700 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-white text-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>E-commerce Platform</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-white font-semibold text-xl mb-2">Tienda Online</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Plataforma de e-commerce completa con carrito de compras, pagos y panel de administración.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">Next.js</span>
                  <span className="px-2 py-1 bg-slate-500/20 text-slate-400 text-xs rounded">Node.js</span>
                  <span className="px-2 py-1 bg-gray-500/20 text-gray-400 text-xs rounded">MongoDB</span>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm transition-colors">
                  → Ir al proyecto
                </button>
              </div>
            </div>

            {/* Proyecto 2 - Dashboard */}
            <div className="group relative bg-blue-800/50 rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="aspect-video bg-blue-700 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-white text-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Analytics Dashboard</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-white font-semibold text-xl mb-2">Dashboard Analítico</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Dashboard interactivo con gráficos en tiempo real y visualización de datos complejos.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">React</span>
                  <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded">Chart.js</span>
                  <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded">Firebase</span>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm transition-colors">
                  → Ir al proyecto
                </button>
              </div>
            </div>

            {/* Proyecto 3 - App Móvil */}
            <div className="group relative bg-orange-800/50 rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="aspect-video bg-orange-700 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-white text-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Mobile App</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-white font-semibold text-xl mb-2">App de Tareas</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Aplicación móvil para gestión de tareas con sincronización en la nube y notificaciones.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">React Native</span>
                  <span className="px-2 py-1 bg-indigo-500/20 text-indigo-400 text-xs rounded">Redux</span>
                  <span className="px-2 py-1 bg-slate-500/20 text-slate-400 text-xs rounded">Express</span>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm transition-colors">
                  → Ir al proyecto
                </button>
              </div>
            </div>

            {/* Proyecto 4 - API Rest */}
            <div className="group relative bg-indigo-800/50 rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="aspect-video bg-indigo-700 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-white text-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>REST API</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-white font-semibold text-xl mb-2">API de Autenticación</h3>
                <p className="text-gray-400 text-sm mb-4">
                  API REST robusta con autenticación JWT, validaciones y documentación completa.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-slate-500/20 text-slate-400 text-xs rounded">Node.js</span>
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">PostgreSQL</span>
                  <span className="px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded">Swagger</span>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm transition-colors">
                  → Ir al proyecto
                </button>
              </div>
            </div>

            {/* Proyecto 5 - Blog */}
            <div className="group relative bg-gray-800/50 rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="aspect-video bg-gray-700 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-white text-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Tech Blog</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-white font-semibold text-xl mb-2">Blog Personal</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Blog personal con sistema de comentarios, búsqueda avanzada y panel de administración.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-gray-500/20 text-gray-400 text-xs rounded">Astro</span>
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">Markdown</span>
                  <span className="px-2 py-1 bg-slate-500/20 text-slate-400 text-xs rounded">Vercel</span>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm transition-colors">
                  → Ir al proyecto
                </button>
              </div>
            </div>

            {/* Proyecto 6 - Clon de App */}
            <div className="group relative bg-cyan-800/50 rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="aspect-video bg-cyan-700 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-white text-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Clone App</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-white font-semibold text-xl mb-2">Clon de Twitter</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Recreación de la interfaz y funcionalidades principales de Twitter con React y Firebase.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">React</span>
                  <span className="px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded">Firebase</span>
                  <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded">Tailwind</span>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm transition-colors">
                  → Ir al proyecto
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
            ¿Trabajamos Juntos?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Estoy disponible para proyectos freelance y oportunidades de trabajo. 
            ¡Hablemos sobre tu próximo proyecto!
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
            Contactar
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            © 2025 Josmel. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
