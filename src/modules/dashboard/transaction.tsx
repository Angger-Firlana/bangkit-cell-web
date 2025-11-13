import { useState, useEffect } from 'react';
import { Wrench, Hammer, Home, Mail, Clock, Sparkles, Construction, Zap } from 'lucide-react';

const UnderConstruction = () => {
  const [progress, setProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Load Poppins font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Animated progress bar
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 75) return 0;
        return prev + 1;
      });
    }, 100);

    const handleMouseMove = (e:any) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleGoHome = () => {
    window.location.href = '/bangkit-cell/dashboard';
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden flex items-center justify-center"
      style={{
        fontFamily: "'Poppins', sans-serif",
        background: 'linear-gradient(135deg, #fb923c 0%, #f97316 50%, #ea580c 100%)'
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)',
            left: `${mousePosition.x * 0.02}px`,
            top: `${mousePosition.y * 0.02}px`,
            transition: 'all 0.3s ease-out'
          }}
        />
        <div 
          className="absolute w-64 h-64 rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)',
            right: `${mousePosition.x * 0.03}px`,
            bottom: `${mousePosition.y * 0.03}px`,
            transition: 'all 0.3s ease-out'
          }}
        />
      </div>

      {/* Floating Tools */}
      <div className="absolute inset-0 pointer-events-none">
        <Wrench className="absolute top-20 left-10 w-12 h-12 text-white/20 animate-bounce" style={{ animationDuration: '3s' }} />
        <Hammer className="absolute top-40 right-20 w-10 h-10 text-white/20 animate-pulse" style={{ animationDuration: '2s' }} />
        <Construction className="absolute bottom-32 left-1/4 w-14 h-14 text-white/20 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }} />
        <Zap className="absolute bottom-20 right-1/3 w-8 h-8 text-yellow-300/40 animate-ping" style={{ animationDuration: '3s' }} />
        
        {/* Sparkles */}
        <Sparkles className="absolute top-1/4 right-1/4 w-6 h-6 text-yellow-300/60 animate-pulse" />
        <Sparkles className="absolute bottom-1/3 left-1/3 w-8 h-8 text-yellow-300/40 animate-bounce" style={{ animationDuration: '2.5s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        {/* Logo */}
        <div className="mb-8 flex items-center justify-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          <h1 className="text-2xl font-bold">
            <span className="text-red-500">Bangkit</span>
            <span className="text-white">Cell</span>
          </h1>
        </div>

        {/* Animated Construction Icon */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 bg-white/10 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
          </div>
          <div className="relative">
            <div className="bg-white/20 backdrop-blur-lg w-40 h-40 mx-auto rounded-3xl flex items-center justify-center shadow-2xl border border-white/30">
              <div className="relative">
                <Construction className="w-20 h-20 text-yellow-300 animate-pulse" strokeWidth={2} />
                <Wrench 
                  className="w-10 h-10 text-white absolute -bottom-3 -right-3" 
                  style={{
                    animation: 'rotate 3s linear infinite'
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Title */}
        <div className="mb-8">
          <h2 
            className="text-5xl md:text-7xl font-extrabold text-white mb-4 tracking-tight"
            style={{
              textShadow: '0 10px 30px rgba(0,0,0,0.3)',
              animation: 'fadeInDown 0.8s ease-out'
            }}
          >
            Coming Soon
          </h2>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Clock className="w-6 h-6 text-yellow-300 animate-spin" style={{ animationDuration: '3s' }} />
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Sedang Dalam Pengembangan
            </h3>
            <Clock className="w-6 h-6 text-yellow-300 animate-spin" style={{ animationDuration: '3s' }} />
          </div>
        </div>

        {/* Description Card */}
        <div 
          className="bg-white/15 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white/20 shadow-2xl"
          style={{
            animation: 'fadeInUp 1s ease-out'
          }}
        >
          <p className="text-white/90 text-lg md:text-xl font-medium mb-4 leading-relaxed">
            Kami sedang bekerja keras untuk menghadirkan fitur terbaik untuk Anda! 🚀
          </p>
          <p className="text-white/80 text-base mb-6">
            Halaman ini sedang dalam proses pengembangan. Kami akan segera kembali dengan sesuatu yang luar biasa!
          </p>

          {/* Progress Bar */}
          <div className="bg-white/20 rounded-full h-6 overflow-hidden backdrop-blur-sm border border-white/30 mb-3">
            <div 
              className="h-full bg-gradient-to-r from-teal-400 to-teal-500 transition-all duration-300 ease-out flex items-center justify-end pr-3 relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
              <span className="text-white text-xs font-bold relative z-10">{progress}%</span>
            </div>
          </div>
          <p className="text-white/60 text-sm">Progress pengembangan...</p>
        </div>

        {/* Features Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 hover:bg-white/15 transition-all">
            <Zap className="w-10 h-10 text-yellow-300 mx-auto mb-3 animate-bounce" />
            <h4 className="text-white font-semibold mb-2">Performa Cepat</h4>
            <p className="text-white/70 text-sm">Loading super cepat</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 hover:bg-white/15 transition-all">
            <Sparkles className="w-10 h-10 text-yellow-300 mx-auto mb-3 animate-pulse" />
            <h4 className="text-white font-semibold mb-2">UI Modern</h4>
            <p className="text-white/70 text-sm">Desain yang memukau</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 hover:bg-white/15 transition-all">
            <Construction className="w-10 h-10 text-yellow-300 mx-auto mb-3 animate-bounce" style={{ animationDuration: '2s' }} />
            <h4 className="text-white font-semibold mb-2">Fitur Lengkap</h4>
            <p className="text-white/70 text-sm">Solusi terpadu</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
          <button
            onClick={handleGoHome}
            className="group bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 w-full sm:w-auto"
          >
            <Home className="w-5 h-5" />
            Kembali ke Beranda
          </button>
          <a
            href="mailto:info@bangkitcell.com"
            className="group bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 w-full sm:w-auto"
          >
            <Mail className="w-5 h-5" />
            Hubungi Kami
          </a>
        </div>

        {/* Notify Me */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <p className="text-white/90 text-base mb-4 font-medium">
            Ingin mendapatkan notifikasi saat diluncurkan?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Email Anda"
              className="flex-1 px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-teal-400 backdrop-blur-sm"
            />
            <button className="bg-teal-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-600 transition-colors whitespace-nowrap">
              Notify Me
            </button>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-white/50 text-xs font-mono tracking-wider">
          UNDER_CONSTRUCTION | BangkitCell Team
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

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default UnderConstruction;