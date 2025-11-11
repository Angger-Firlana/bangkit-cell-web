import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, Phone, User, ArrowRight, CheckCircle } from 'lucide-react';
import './style.css';

const BangkitCellRegister = () => {
  // Add Poppins font
  React.useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    document.body.style.fontFamily = "'Poppins', sans-serif";
    
    return () => {
      document.body.style.fontFamily = '';
    };
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = () => {
    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
      alert('Mohon lengkapi semua field');
      return;
    }

    if (!agreeTerms) {
      alert('Mohon setujui Syarat & Ketentuan');
      return;
    }

    if (formData.password.length < 8) {
      alert('Password minimal 8 karakter');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Password tidak cocok');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Format email tidak valid');
      return;
    }

    alert('Registrasi berhasil! Silakan login dengan akun Anda');
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    });
    setAgreeTerms(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0">
        
        {/* Left Side - Branding */}
        <div className="hidden lg:flex bg-gradient-to-br from-teal-500 to-teal-400 rounded-l-2xl p-12 flex-col justify-center relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-3 h-3 bg-white rounded-full"></div>
              <h1 className="text-3xl font-bold text-white">
                <span className="text-white">Bangkit</span>
                <span className="text-orange-300">Cell</span>
              </h1>
            </div>
            
            <h2 className="text-4xl font-bold text-white mb-4">
              Bergabung Bersama Kami!
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Dapatkan akses ke layanan perbaikan terbaik dan nikmati berbagai keuntungan eksklusif.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white text-lg">Layanan Prioritas</p>
                  <p className="text-sm text-white/90">Dapatkan antrian prioritas untuk perbaikan perangkat Anda</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white text-lg">Diskon Eksklusif</p>
                  <p className="text-sm text-white/90">Nikmati potongan harga khusus member untuk setiap perbaikan</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white text-lg">Riwayat Lengkap</p>
                  <p className="text-sm text-white/90">Lacak semua riwayat perbaikan perangkat Anda dengan mudah</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white text-lg">Garansi Extended</p>
                  <p className="text-sm text-white/90">Garansi lebih panjang untuk member setia kami</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative Circles */}
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-orange-300 rounded-full opacity-50"></div>
          <div className="absolute -left-10 top-20 w-40 h-40 bg-orange-400 rounded-full opacity-30"></div>
          <div className="absolute right-10 top-10 w-24 h-24 bg-white rounded-full opacity-20"></div>
        </div>

        {/* Right Side - Register Form */}
        <div className="bg-white rounded-2xl lg:rounded-l-none lg:rounded-r-2xl shadow-xl p-8 md:p-12">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <h1 className="text-2xl font-bold">
              <span className="text-red-500">Bangkit</span>
              <span className="text-gray-800">Cell</span>
            </h1>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Buat Akun Baru
          </h2>
          <p className="text-gray-600 mb-8">
            Daftar sekarang dan dapatkan berbagai keuntungan eksklusif
          </p>

          {/* Register Form */}
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Depan <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="John"
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Belakang <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Doe"
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="nama@email.com"
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nomor Telepon <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  placeholder="+62 821-XXXX-XXXX"
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Format: +62 atau 08xx</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimal 8 karakter"
                  className="w-full pl-11 pr-11 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <div className="mt-2 space-y-1">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${formData.password.length >= 8 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className={`text-xs ${formData.password.length >= 8 ? 'text-green-600' : 'text-gray-500'}`}>
                    Minimal 8 karakter
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Konfirmasi Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Ulangi password"
                  className="w-full pl-11 pr-11 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {formData.confirmPassword && (
                <p className={`text-xs mt-1 ${formData.password === formData.confirmPassword ? 'text-green-600' : 'text-red-500'}`}>
                  {formData.password === formData.confirmPassword ? '✓ Password cocok' : '✗ Password tidak cocok'}
                </p>
              )}
            </div>

            <div className="flex items-start gap-3 pt-2">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 mt-1 text-teal-500 border-gray-300 rounded focus:ring-teal-500 cursor-pointer"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
              />
              <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
                Saya setuju dengan <button type="button" className="text-teal-500 hover:text-teal-600 font-medium">Syarat & Ketentuan</button> dan <button type="button" className="text-teal-500 hover:text-teal-600 font-medium">Kebijakan Privasi</button> Bangkit Cell
              </label>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-teal-500 text-white py-3 rounded-lg font-semibold hover:bg-teal-600 transition flex items-center justify-center gap-2"
            >
              Daftar Sekarang
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-sm text-gray-500">atau daftar dengan</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Social Register */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <button className="border border-gray-300 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition flex items-center justify-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="hidden sm:inline">Google</span>
            </button>

            <button className="border border-gray-300 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="hidden sm:inline">Facebook</span>
            </button>
          </div>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Sudah punya akun? <button className="text-teal-500 hover:text-teal-600 font-semibold">Masuk di sini</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BangkitCellRegister;