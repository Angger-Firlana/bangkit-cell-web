import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, Phone, ArrowRight } from 'lucide-react';
import './style.css';
import { login, register } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const BangkitCellLogin = () => {
  const navigate = useNavigate();
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

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    rememberMe: false
  });

  const handleSubmit = async () => {
    if (isLogin) {
      if (!formData.email || !formData.password) {
        alert('Mohon lengkapi email dan password');
        return;
      }

      try{
        const response = await login(formData.email, formData.password);
        if(response.status){
          alert('Login berhasil! Selamat datang di Bangkit Cell');
          setIsLogin(true);
          navigate('/bangkit-cell/dashboard');
        };

      }catch(error:any){
        alert(error.response?.data?.message || 'Login gagal, coba lagi');
      }
    } else {
      if (!formData.name || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
        alert('Mohon lengkapi semua field');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        alert('Password tidak cocok');
        return;
      } 
      try{
        const response = await register(formData.name, formData.email, formData.password, formData.phone, "operator");
        if(response.status){
          alert('Registrasi berhasil! Silakan login');
          setIsLogin(true);
        };
      }catch(error:any){
        alert(error.response?.data?.message || 'Registerasi gagal, coba lagi');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0">
        
        {/* Left Side - Branding */}
        <div className="hidden lg:flex bg-gradient-to-br from-orange-400 to-orange-300 rounded-l-2xl p-12 flex-col justify-center relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <h1 className="text-3xl font-bold">
                <span className="text-red-500">Bangkit</span>
                <span className="text-gray-800">Cell</span>
              </h1>
            </div>
            
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Selamat Datang!
            </h2>
            <p className="text-gray-700 text-lg mb-8">
              Perbaikan perangkat mobile yang cepat, terjangkau, dan terpercaya.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-gray-800" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Layanan Profesional</p>
                  <p className="text-sm text-gray-700">Teknisi berpengalaman dan terpercaya</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Lock className="w-6 h-6 text-gray-800" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Aman & Terjamin</p>
                  <p className="text-sm text-gray-700">Data Anda terlindungi dengan baik</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative Circle */}
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-yellow-300 rounded-full opacity-50"></div>
          <div className="absolute -left-10 top-20 w-40 h-40 bg-teal-400 rounded-full opacity-30"></div>
        </div>

        {/* Right Side - Form */}
        <div className="bg-white rounded-2xl lg:rounded-l-none lg:rounded-r-2xl shadow-xl p-8 md:p-12">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <h1 className="text-2xl font-bold">
              <span className="text-red-500">Bangkit</span>
              <span className="text-gray-800">Cell</span>
            </h1>
          </div>

          {/* Toggle Login/Register */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 rounded-lg font-semibold transition ${
                isLogin 
                  ? 'bg-teal-500 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Masuk
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 rounded-lg font-semibold transition ${
                !isLogin 
                  ? 'bg-teal-500 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Daftar
            </button>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            {isLogin ? 'Masuk ke Akun Anda' : 'Buat Akun Baru'}
          </h2>
          <p className="text-gray-600 mb-8">
            {isLogin 
              ? 'Silakan masukkan kredensial Anda untuk melanjutkan' 
              : 'Daftar untuk mendapatkan layanan terbaik kami'}
          </p>

          {/* Login Form */}
          {isLogin ? (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
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
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
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
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-teal-500 border-gray-300 rounded focus:ring-teal-500"
                    checked={formData.rememberMe}
                    onChange={(e) => setFormData({...formData, rememberMe: e.target.checked})}
                  />
                  <span className="text-sm text-gray-600">Ingat saya</span>
                </label>
                <button className="text-sm text-teal-500 hover:text-teal-600 font-medium">
                  Lupa Password?
                </button>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-teal-500 text-white py-3 rounded-lg font-semibold hover:bg-teal-600 transition flex items-center justify-center gap-2"
              >
                Masuk
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          ) : (
            // Register Form
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  placeholder="Masukkan nama lengkap"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
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
                  Nomor Telepon
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
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
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
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Konfirmasi Password
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
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 mt-1 text-teal-500 border-gray-300 rounded focus:ring-teal-500"
                />
                <span className="text-sm text-gray-600">
                  Saya setuju dengan <button className="text-teal-500 hover:text-teal-600 font-medium">Syarat & Ketentuan</button> dan <button className="text-teal-500 hover:text-teal-600 font-medium">Kebijakan Privasi</button>
                </span>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-teal-500 text-white py-3 rounded-lg font-semibold hover:bg-teal-600 transition flex items-center justify-center gap-2"
              >
                Daftar Sekarang
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-sm text-gray-500">atau</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <button className="w-full border border-gray-300 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition flex items-center justify-center gap-3">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Lanjutkan dengan Google
            </button>

            <button className="w-full border border-gray-300 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition flex items-center justify-center gap-3">
              <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Lanjutkan dengan Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BangkitCellLogin;