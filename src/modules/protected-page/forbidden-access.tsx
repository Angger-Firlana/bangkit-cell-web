import React, { useState, useEffect } from 'react';
import { ShieldX, Lock, Home, ArrowLeft, AlertTriangle } from 'lucide-react';

const ForbiddenAccess = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Load Poppins font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    const handleMouseMove = (e: any) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleGoBack = () => {
    window.history.back();
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden flex items-center justify-center"
      style={{
        fontFamily: "'Poppins', sans-serif",
        background: 'linear-gradient(135deg, #14b8a6 0%, #0891b2 50%, #0e7490 100%)'
      }}
    >
      {/* Animated Background Circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
            left: `${mousePosition.x * 0.02}px`,
            top: `${mousePosition.y * 0.02}px`,
            transition: 'all 0.3s ease-out'
          }}
        />
        <div 
          className="absolute w-64 h-64 rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
            right: `${mousePosition.x * 0.03}px`,
            bottom: `${mousePosition.y * 0.03}px`,
            transition: 'all 0.3s ease-out'
          }}
        />
      </div>

      {/* Floating Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 border-4 border-white/20 rounded-full animate-bounce" style={{ animationDuration: '3s' }} />
        <div className="absolute top-40 right-20 w-16 h-16 border-4 border-orange-300/30 rotate-45 animate-pulse" />
        <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-white/10 rounded-lg animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }} />
        <div className="absolute bottom-20 right-1/3 w-8 h-8 bg-orange-300/20 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        {/* Logo */}
        <div className="mb-8 flex items-center justify-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          <h1 className="text-2xl font-bold">
            <span className="text-red-500">Bangkit</span>
            <span className="text-white">Cell</span>
          </h1>
        </div>

        {/* Animated Lock Icon */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-40 h-40 bg-white/10 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
          </div>
          <div className="relative bg-white/20 backdrop-blur-lg w-32 h-32 mx-auto rounded-3xl flex items-center justify-center shadow-2xl border border-white/30 transform hover:scale-110 transition-transform duration-300">
            <div className="relative">
              <ShieldX className="w-16 h-16 text-red-500 animate-pulse" strokeWidth={2.5} />
              <Lock className="w-8 h-8 text-white absolute -bottom-2 -right-2 animate-bounce" />
            </div>
          </div>
        </div>

        {/* Error Code */}
        <div className="mb-6">
          <h2 
            className="text-8xl md:text-9xl font-extrabold text-white mb-4 tracking-tight"
            style={{
              textShadow: '0 10px 30px rgba(0,0,0,0.3)',
              animation: 'fadeInDown 0.8s ease-out'
            }}
          >
            403
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <AlertTriangle className="w-6 h-6 text-orange-300" />
            <h3 className="text-3xl md:text-4xl font-bold text-white">
              Akses Ditolak
            </h3>
            <AlertTriangle className="w-6 h-6 text-orange-300" />
          </div>
        </div>

        {/* Description Card */}
        <div 
          className="bg-white/15 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white/20 shadow-2xl transform hover:scale-105 transition-all duration-300"
          style={{
            animation: 'fadeInUp 1s ease-out'
          }}
        >
          <p className="text-white/90 text-lg md:text-xl font-medium mb-4 leading-relaxed">
            Maaf, Anda tidak memiliki izin untuk mengakses halaman ini.
          </p>
          <p className="text-white/70 text-base">
            Jika Anda merasa ini adalah kesalahan, silakan hubungi administrator atau tim support kami.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
          <button
            onClick={handleGoBack}
            className="group bg-white text-teal-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 w-full sm:w-auto"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Kembali
          </button>
          <button
            onClick={handleGoHome}
            className="group bg-gradient-to-r from-orange-400 to-orange-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 w-full sm:w-auto"
          >
            <Home className="w-5 h-5" />
            Ke Beranda
            <ArrowLeft className="w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Contact Support */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <p className="text-white/80 text-sm mb-3">Butuh bantuan?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm">
            <a 
              href="mailto:info@bangkitcell.com" 
              className="text-white hover:text-orange-300 transition-colors flex items-center gap-2 font-medium"
            >
              📧 info@bangkitcell.com
            </a>
            <span className="hidden sm:inline text-white/40">|</span>
            <a 
              href="tel:+6282100000000" 
              className="text-white hover:text-orange-300 transition-colors flex items-center gap-2 font-medium"
            >
              📞 +62 821-XXXX-XXXX
            </a>
          </div>
        </div>

        {/* Error Code Footer */}
        <div className="mt-8 text-white/50 text-xs font-mono tracking-wider">
          ERROR_CODE: FORBIDDEN_403 | BangkitCell Security
        </div>
      </div>

      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ForbiddenAccess;