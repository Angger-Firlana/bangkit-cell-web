import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Wrench, Zap, ShieldCheck, CheckCircle, ChevronDown, Menu, X } from 'lucide-react';
import './style.css';
import { useNavigate } from 'react-router-dom';

const BangkitCell = () => {
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
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedDevice, setSelectedDevice] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    deviceType: '',
    subject: '',
    message: ''
  });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const devices = [
    { name: 'iPhone', icon: '📱' },
    { name: 'iPad', icon: '📱' },
    { name: 'Android', icon: '📱' },
    { name: 'Tablet', icon: '📱' }
  ];

  const faqs = [
    {
      q: 'Apakah ada biaya pembagian pendapatan?',
      a: 'Kami menggunakan model penetapan harga yang sederhana dan jelas yang memberikan konten paling banyak untuk perangkat Anda.'
    },
    {
      q: 'Apakah ada biaya minimum atau biaya bulanan tetap?',
      a: 'Tidak ada biaya tersembunyi. Kami hanya mengenakan biaya untuk layanan perbaikan yang Anda butuhkan.'
    },
    {
      q: 'Apakah Anda mengenakan biaya untuk program PCI DSS atau ketidakpatuhan?',
      a: 'Kami memastikan semua layanan kami mematuhi standar keamanan tertinggi tanpa biaya tambahan.'
    },
    {
      q: 'Dapatkah saya melihat harga untuk pedagang saya?',
      a: 'Ya, kami menyediakan transparansi harga penuh untuk semua layanan kami.'
    },
    {
      q: 'Apakah tingkat harga "pilih tingkat" atau "isi tingkat"?',
      a: 'Kami menggunakan struktur harga yang jelas dan mudah dipahami untuk semua layanan.'
    },
    {
      q: 'Apakah Anda mengenakan biaya berbasis volume ACH?',
      a: 'Biaya kami kompetitif dan transparan untuk semua jenis layanan.'
    }
  ];

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Mohon lengkapi semua field yang diperlukan');
      return;
    }
    alert('Pesan Anda telah dikirim! Kami akan menghubungi Anda segera.');
    setFormData({
      name: '',
      lastName: '',
      email: '',
      phone: '',
      deviceType: '',
      subject: '',
      message: ''
    });
  };

  const renderHome = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-orange-400 to-orange-300 px-6 py-12 md:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-xl">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-2 md:mb-4">
              Cepat, terjangkau<br />dan perbaikan terpercaya
            </h1>
            <p className="text-gray-700 text-lg md:text-xl mb-6 md:mb-8">untuk perangkat mobile Anda</p>
            <div className="flex justify-center  sm:flex-row gap-4">
              <button 
                onClick={() => setCurrentPage('device')}
                className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
              >
                Pesan Perbaikan
              </button>
              <button 
                onClick={() => setCurrentPage('device')}
                className="bg-teal-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-600 transition"
              >
                Mulai Perbaikan
              </button>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-64 h-64 md:w-96 md:h-96">
          <div className="bg-yellow-300 rounded-full w-48 h-48 md:w-80 md:h-80 absolute -right-12 md:-right-20 top-8 md:top-12"></div>
        </div>
      </div>

      {/* Features */}
      <div className="px-6 py-12 md:py-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 md:mb-20">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <Wrench className="w-12 h-12 mx-auto mb-3 text-gray-700" />
            <h3 className="font-bold text-gray-800 mb-2">Profesional Terpercaya</h3>
            <p className="text-sm text-gray-600">Kami memiliki profesional terbaik di bidang kami yang berdedikasi sebagai ahli perbaikan untuk membantu Anda.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <Clock className="w-12 h-12 mx-auto mb-3 text-gray-700" />
            <h3 className="font-bold text-gray-800 mb-2">Penyelesaian Cepat</h3>
            <p className="text-sm text-gray-600">Kami dapat mengembalikan perangkat Anda yang sudah diperbaiki dalam waktu 30 menit atau kurang.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <ShieldCheck className="w-12 h-12 mx-auto mb-3 text-gray-700" />
            <h3 className="font-bold text-gray-800 mb-2">Diagnosa Gratis</h3>
            <p className="text-sm text-gray-600">Jika Anda tidak yakin masalahnya, datanglah untuk diagnosa gratis tanpa diagnosis biaya awal.</p>
          </div>
        </div>

        {/* All Kinds of Repairs */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8 md:mb-12">
          Semua jenis perbaikan. Sungguh nyata.
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
          {devices.map((device, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-5xl mb-3">{device.icon}</div>
              <h3 className="font-bold text-gray-800 mb-2">{device.name}</h3>
              <p className="text-xs text-gray-600">
                {device.name === 'iPhone' && 'Layar retak? Masalah baterai? Kerusakan air? Kami siap membantu.'}
                {device.name === 'iPad' && 'Layar retak? Port pengisian rusak? Masalah perangkat lunak? Kami siap membantu.'}
                {device.name === 'Android' && 'Masalah perangkat keras? Penggantian? Kami siap membantu.'}
                {device.name === 'Tablet' && 'Solusi cepat dan terpercaya untuk semua jenis tablet.'}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Perbaiki Perangkat Mobile Anda Hari Ini!
          </h2>
          <p className="text-sm md:text-base text-gray-600 mb-6">
            Kami hanya menggunakan suku cadang berkualitas tinggi dan menawarkan berbagai layanan perbaikan, dari perbaikan layar sederhana hingga penggantian motherboard yang rumit. Kami juga menawarkan perbaikan di hari yang sama di sebagian besar area!
          </p>
          <button 
            onClick={() => setCurrentPage('device')}
            className="bg-teal-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-600 transition"
          >
            Mulai Perbaikan
          </button>
        </div>
      </div>
    </div>
  );

  const renderDeviceSelection = () => (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          Perangkat apa yang bermasalah?
        </h2>
        <p className="text-gray-600 mb-8 text-center">
          Para ahli kami akan memperbaiki perangkat Anda dan mengembalikannya dalam waktu singkat.
        </p>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {devices.slice(0, 3).map((device, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedDevice(device.name);
                setFormData({...formData, deviceType: device.name});
                setCurrentPage('contact');
              }}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition text-center"
            >
              <div className="text-5xl mb-3">{device.icon}</div>
              <p className="font-semibold text-gray-800">{device.name}</p>
            </button>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => {
              setSelectedDevice('Tablet');
              setFormData({...formData, deviceType: 'Tablet'});
              setCurrentPage('contact');
            }}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition text-center w-32"
          >
            <div className="text-5xl mb-3">📱</div>
            <p className="font-semibold text-gray-800">Tablet</p>
          </button>
        </div>
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          Hubungi Kami
        </h2>
        <p className="text-gray-600 mb-8 text-center">
          Ada pertanyaan atau permintaan? Kirim kami pesan!
        </p>

        {/* Contact Info Card */}
        <div className="bg-gradient-to-br from-teal-500 to-teal-400 text-white p-6 rounded-lg mb-6">
          <h3 className="text-xl font-bold mb-4">Informasi Kontak</h3>
          <p className="text-sm mb-4">Isi formulir dan tim kami akan menghubungi Anda dalam 24 jam.</p>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5" />
              <span>+62 821-XXXX-XXXX</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5" />
              <span>info@bangkitcell.com</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5" />
              <span>Jl. Contoh No. 123, Jakarta Selatan, DKI Jakarta 12345</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nama Depan</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nama Belakang</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Telepon</label>
            <input
              type="tel"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Subjek</label>
            <div className="grid grid-cols-2 gap-2">
              {['Konsultasi Umum', 'Pertanyaan Teknis', 'Pertanyaan Harga', 'Pertanyaan Lainnya'].map((subject, idx) => (
                <label key={idx} className="flex items-center gap-2">
                  <input 
                    type="radio" 
                    name="subject" 
                    className="text-teal-500"
                    checked={formData.subject === subject}
                    onChange={() => setFormData({...formData, subject})}
                  />
                  <span className="text-sm">{subject}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Tulis pesan Anda</label>
            <textarea
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              placeholder="Tulis pesan Anda disini"
            ></textarea>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-teal-500 text-white py-3 rounded-lg font-semibold hover:bg-teal-600 transition"
          >
            Kirim Pesan
          </button>
        </div>

        {/* Map Section */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Lokasi Kami</h3>
          <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
            <p className="text-gray-600">Peta Google Maps</p>
          </div>
          <div className="mt-4 bg-white p-4 rounded-lg shadow-sm">
            <p className="font-semibold text-gray-800">Alamat:</p>
            <p className="text-gray-600 text-sm">Jl. Contoh No. 123, Jakarta Selatan, DKI Jakarta 12345</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAbout = () => (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-md mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Nilai Kami</h2>
        <p className="text-gray-600 mb-8 text-center">
          Inilah yang kami perjuangkan setiap hari
        </p>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-start gap-4">
              <div className="bg-gray-100 p-3 rounded-lg">
                <ShieldCheck className="w-6 h-6 text-gray-700" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Keandalan</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Kami berada di sini untuk memberikan produk dan layanan terbaik.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Kami tidak akan pernah kecewa pelanggan tanpa alasan</li>
                  <li>• Kami bekerja lebih keras agar Anda fokus pada bisnisnya</li>
                  <li>• Kami tidak takut melakukan apa pun untuk membantu Anda dan bisnis Anda</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-start gap-4">
              <div className="bg-gray-100 p-3 rounded-lg">
                <Zap className="w-6 h-6 text-gray-700" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Layanan Cepat</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Kami di garis depan.
                </p>
                <p className="text-sm text-gray-600">
                  Jika ada sesuatu yang mengharuskan perubahan cepat, kami akan melakukannya.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-start gap-4">
              <div className="bg-gray-100 p-3 rounded-lg">
                <Phone className="w-6 h-6 text-gray-700" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Akses Online</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Kami bisa dihubungi melalui panggilan telepon.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Kami ingin membuat orang lebih mencintai teknologi</li>
                  <li>• Kami tidak butuh jawaban yang rumit</li>
                  <li>• Kami bekerja bersama-sama</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-lg">
            <div className="flex items-start gap-4">
              <div className="bg-white p-3 rounded-lg">
                <CheckCircle className="w-6 h-6 text-gray-700" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Mitra Profesional</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Kami memenangkan hati pelanggan dan klien kami.
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  Tidak ada "Penjual" di tim kami - semuanya adalah penasihat.
                </p>
                <p className="text-sm text-gray-600">
                  Tidak seperti kebanyakan perusahaan layanan, kami 100% transparan tentang saran kami - lihat itu untuk diri Anda sendiri.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-start gap-4">
              <div className="bg-gray-100 p-3 rounded-lg">
                <ShieldCheck className="w-6 h-6 text-gray-700" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Terpercaya</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Kami jujur dan setia.
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  Kami tidak akan membual tentang hal yang tidak pasti.
                </p>
                <p className="text-sm text-gray-600">
                  Kinerjanya yang lebih berat dengan metode, teknologi, dan implementasi - tetapi kami di sini untuk melakukan yang terbaik untuk Anda.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFAQ = () => (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          Pertanyaan yang Sering Diajukan
        </h2>

        <div className="space-y-3 mb-8">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full px-4 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition"
              >
                <span className="font-medium text-gray-800 text-sm flex-1 pr-2">{faq.q}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-teal-500 transition-transform flex-shrink-0 ${
                    openFaq === idx ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-4 pb-4">
                  <p className="text-sm text-gray-600">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Masih punya pertanyaan atau ingin tahu lebih banyak?
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            Kami menawarkan suku cadang berkualitas tinggi dan menawarkan berbagai layanan perbaikan, dari perbaikan layar sederhana hingga penggantian motherboard yang rumit. Kami juga menawarkan perbaikan di hari yang sama di sebagian besar area!
          </p>
          <button
            onClick={() => setCurrentPage('contact')}
            className="bg-teal-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-600 transition"
          >
            Hubungi Kami
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <h1 className="text-xl font-bold">
                <span className="text-red-500">Bangkit</span>
                <span className="text-gray-800">Cell</span>
              </h1>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <button
                onClick={() => setCurrentPage('home')}
                className={`font-medium transition ${currentPage === 'home' ? 'text-teal-500' : 'text-gray-700 hover:text-teal-500'}`}
              >
                Beranda
              </button>
              <button
                onClick={() => setCurrentPage('about')}
                className={`font-medium transition ${currentPage === 'about' ? 'text-teal-500' : 'text-gray-700 hover:text-teal-500'}`}
              >
                Tentang
              </button>
              <button
                onClick={() => setCurrentPage('contact')}
                className={`font-medium transition ${currentPage === 'contact' ? 'text-teal-500' : 'text-gray-700 hover:text-teal-500'}`}
              >
                Hubungi Kami
              </button>
              <button
                onClick={() => setCurrentPage('faq')}
                className={`font-medium transition ${currentPage === 'faq' ? 'text-teal-500' : 'text-gray-700 hover:text-teal-500'}`}
              >
                FAQ
              </button>
              <button
                onClick={() =>navigate('/bangkit-cell/auth')}
                className="bg-teal-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-teal-600 transition"
              >
                Login
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 md:hidden"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="bg-white border-t md:hidden">
            <nav className="max-w-7xl mx-auto px-6 py-4">
              <button
                onClick={() => { setCurrentPage('home'); setMenuOpen(false); }}
                className={`block w-full text-left py-2 ${currentPage === 'home' ? 'text-teal-500 font-semibold' : 'text-gray-700'}`}
              >
                Beranda
              </button>
              <button
                onClick={() => { setCurrentPage('about'); setMenuOpen(false); }}
                className={`block w-full text-left py-2 ${currentPage === 'about' ? 'text-teal-500 font-semibold' : 'text-gray-700'}`}
              >
                Tentang
              </button>
              <button
                onClick={() => { setCurrentPage('contact'); setMenuOpen(false); }}
                className={`block w-full text-left py-2 ${currentPage === 'contact' ? 'text-teal-500 font-semibold' : 'text-gray-700'}`}
              >
                Hubungi Kami
              </button>
              <button
                onClick={() => { setCurrentPage('faq'); setMenuOpen(false); }}
                className={`block w-full text-left py-2 ${currentPage === 'faq' ? 'text-teal-500 font-semibold' : 'text-gray-700'}`}
              >
                FAQ
              </button>
              <button
                onClick={() => { setCurrentPage('device'); setMenuOpen(false); }}
                className="w-full mt-4 bg-teal-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-teal-600 transition"
              >
                Pesan Perbaikan
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Page Content */}
      {currentPage === 'home' && renderHome()}
      {currentPage === 'device' && renderDeviceSelection()}
      {currentPage === 'contact' && renderContact()}
      {currentPage === 'about' && renderAbout()}
      {currentPage === 'faq' && renderFAQ()}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-md mx-auto px-6">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-bold mb-3">Menu Layanan</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><button onClick={() => setCurrentPage('home')}>Beranda</button></li>
                <li><button onClick={() => setCurrentPage('about')}>Tentang</button></li>
                <li><button onClick={() => setCurrentPage('contact')}>Kontak</button></li>
                <li><button onClick={() => setCurrentPage('faq')}>FAQ</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">Lokasi Populer</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Jakarta</li>
                <li>Bandung</li>
                <li>Surabaya</li>
                <li>Medan</li>
              </ul>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-bold mb-3">Ingin Menjadi Mitra?</h4>
            <button
              onClick={() => setCurrentPage('contact')}
              className="bg-teal-500 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-teal-600 transition"
            >
              Hubungi Kami
            </button>
          </div>

          <div className="border-t border-gray-700 pt-6 text-center">
            <p className="text-xs text-gray-400 mb-2">
              © 2025 Bangkit Cell - Semua hak dilindungi
            </p>
            <p className="text-xs text-gray-400">
              Dipercaya oleh ribuan pelanggan di seluruh Indonesia
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BangkitCell;