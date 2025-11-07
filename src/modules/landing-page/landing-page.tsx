import { Search, User, ShoppingCart, Star, ArrowRight, Facebook, Twitter, Instagram, Github, Linkedin, Menu, X } from 'lucide-react';
import { useState } from 'react';
import "./style.css";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const products = [
    { id: 1, name: "Red Velvet & Cream Cheese ( 500g )", rating: 4.5, reviews: 62 },
    { id: 2, name: "Red Velvet & Cream Cheese ( 500g )", rating: 4.5, reviews: 41 },
    { id: 3, name: "Red Velvet & Cream Cheese ( 500g )", rating: 4.5, reviews: 75 },
    { id: 4, name: "Red Velvet & Cream Cheese ( 500g )", rating: 4.5, reviews: 63 },
    { id: 5, name: "Red Velvet & Cream Cheese ( 500g )", rating: 4.5, reviews: 89 }
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800&display=swap');
        
        body {
          font-family: 'Poppins', sans-serif;
        }
        
        .nav-link:hover {
          color: #111827 !important;
        }
        
        .btn-primary {
          background-color: #1f2937;
        }
        
        .btn-primary:hover {
          background-color: #374151;
        }
        
        .btn-secondary {
          border: 2px solid #1f2937;
          color: #1f2937;
          background-color: transparent;
        }
        
        .btn-secondary:hover {
          background-color: #f9fafb;
        }
        
        .hero-img:hover {
          opacity: 1 !important;
        }
        
        .product-card:hover {
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          transform: translateY(-4px);
        }
        
        .text-link:hover {
          color: #374151 !important;
        }
        
        .footer-link:hover {
          color: #111827 !important;
        }
        
        .social-link:hover {
          color: #111827 !important;
        }
      `}</style>

      <div className="min-h-screen bg-white w-full" style={{ fontFamily: 'Poppins, sans-serif' }}>
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-4 bg-white shadow relative">
          <div className="text-2xl font-semibold" style={{ color: '#1f2937' }}>
            Kenangan <span className="font-normal">Bakery</span>
          </div>
          
          <nav className="hidden md:flex gap-8">
            <a href="#" className="text-sm transition-colors nav-link" style={{ color: '#374151' }}>Home</a>
            <a href="#" className="text-sm transition-colors nav-link" style={{ color: '#374151' }}>Categories</a>
            <a href="#" className="text-sm transition-colors nav-link" style={{ color: '#374151' }}>About Us</a>
            <a href="#" className="text-sm transition-colors nav-link" style={{ color: '#374151' }}>Contact Us</a>
          </nav>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search"
                className="py-2 px-4 pr-10 border rounded-md text-sm w-48"
                style={{ borderColor: '#d1d5db' }}
              />
              <button className="absolute right-0 top-0 h-full px-3 text-white rounded-r-md" style={{ backgroundColor: '#1f2937' }}>
                <Search size={18} />
              </button>
            </div>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <User size={20} />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <ShoppingCart size={20} />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-white shadow-lg px-8 py-4 z-50 md:hidden">
              <a href="#" className="block py-3 text-sm" style={{ color: '#374151' }}>Home</a>
              <a href="#" className="block py-3 text-sm" style={{ color: '#374151' }}>Categories</a>
              <a href="#" className="block py-3 text-sm" style={{ color: '#374151' }}>About Us</a>
              <a href="#" className="block py-3 text-sm" style={{ color: '#374151' }}>Contact Us</a>
            </div>
          )}
        </header>

        {/* Hero Section */}
        <section className="px-8 py-16" style={{ background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)' }}>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6" style={{ color: '#111827' }}>
                Membawakan Kebahagian<br />dengan sebagian kue kami
              </h1>
              <p className="mb-8 leading-relaxed" style={{ color: '#4b5563' }}>
                Kita membuat coklat, kue<br />
                kukis, cheesecake pie atau lainnya yang berbeda<br />
                Sesuai dengan kemauanmu
              </p>
              <div className="flex justify-center md:justify-start gap-4 flex-wrap">
                <button className="btn-primary text-white px-8 py-3 rounded-md font-medium transition-colors">
                  Order Sekarang
                </button>
                <button className="btn-secondary px-8 py-3 rounded-md font-medium transition-colors">
                  Lihat Semua Menu
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 rounded-3xl flex items-center justify-center shadow-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #92400e 0%, #451a03 100%)' }}>
                <img
                  src="./images/5f0f80d4e5eea.jpg"
                  alt="Kue Lezat dari Kenangan Bakery"
                  className="w-full h-full object-cover rounded-3xl transition-opacity hero-img"
                  style={{ opacity: 0.9 }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Best Selling Section */}
        <section className="px-8 py-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <h2 className="text-4xl font-bold" style={{ color: '#111827' }}>Cobalah Kue Terbaik Kami</h2>
            <div className="leading-relaxed" style={{ color: '#4b5563' }}>
              Disinilah kue dan roti terbaik yang kami ciptakan, dengan rating yang sangat baik
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
            {products.map((product) => (
              <div key={product.id} className="product-card bg-white rounded-xl overflow-hidden shadow-md cursor-pointer transition-all">
                <div className="h-48 flex items-center justify-center transition-transform overflow-hidden" style={{ background: 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)' }}>
                  <span className="text-6xl">🧁</span>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-sm mb-2" style={{ color: '#1f2937' }}>{product.name}</h3>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14}
                        style={{ fill: i < Math.floor(product.rating) ? '#fbbf24' : 'transparent', color: i < Math.floor(product.rating) ? '#fbbf24' : '#d1d5db' }}
                      />
                    ))}
                    <span className="text-xs ml-1" style={{ color: '#6b7280' }}>{product.reviews} Rating</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="btn-secondary px-8 py-3 rounded-md inline-flex items-center gap-2 font-medium transition-colors">
              <span>View More</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </section>

        {/* Kami Membuatnya untuk Anda Section */}
        <section className="px-8 py-16 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-4 leading-tight" style={{ color: '#111827' }}>
                Kami Membuat untuk Anda<br />Segar Langsung dari Oven
              </h2>
              <p className="mb-6 leading-relaxed" style={{ color: '#4b5563' }}>
                Kami menggunakan bahan-bahan berkualitas yang diperoleh langsung dari para petani. 
                Para pembuat roti kami adalah orang-orang berpengalaman di bidang kuliner, 
                sehingga produk yang kami hasilkan terjamin kualitas dan rasanya. 
                Rasanya begitu lezat, Anda wajib mencobanya!
              </p>
              <button className="text-link font-medium inline-flex items-center gap-2 transition-colors bg-transparent border-0 cursor-pointer" style={{ color: '#111827' }}>
                <span>Baca Selengkapnya</span>
                <ArrowRight size={18} />
              </button>
            </div>
            <div className="h-96 rounded-3xl flex items-center justify-center shadow-xl" style={{ background: 'linear-gradient(135deg, #dbeafe 0%, #cffafe 100%)' }}>
              <span className="text-7xl">👨‍🍳</span>
            </div>
          </div>
        </section>

        {/* Datang dan Pilih Bagian */}
        <section className="px-8 py-16 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="h-96 rounded-3xl flex items-center justify-center shadow-xl order-2 md:order-1" style={{ background: 'linear-gradient(135deg, #f3e8ff 0%, #fce7f3 100%)' }}>
              <span className="text-7xl">☕</span>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-4xl font-bold mb-4 leading-tight" style={{ color: '#111827' }}>
                Datang dan pilih<br />favoritmu
              </h2>
              <p className="mb-6 leading-relaxed" style={{ color: '#4b5563' }}>
                Kami memiliki puluhan jenis kue yang siap disajikan, 
                baru saja keluar dari oven! Nikmati bersama secangkir kopi atau teh 
                di toko kami yang nyaman — tempat yang sempurna untuk bersantai, 
                mengobrol, atau bertemu dengan timmu.
              </p>
              <button className="text-link font-medium inline-flex items-center gap-2 transition-colors bg-transparent border-0 cursor-pointer" style={{ color: '#111827' }}>
                <span>Baca Selengkapnya</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </section>

        {/* Banner Pesanan Besar */}
        <section className="px-8 py-16 mx-8 mb-16 rounded-3xl" style={{ background: 'linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%)' }}>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#111827' }}>
              Untuk Pemesanan Kue di atas 1 KG
            </h2>
            <p className="mb-6 leading-relaxed" style={{ color: '#374151' }}>
              Silakan kunjungi toko kami terdekat atau hubungi kami di +62 812 0000 0000 (10.00–19.00 WIB)<br />
              untuk melakukan pemesanan.
            </p>
            <button className="btn-primary text-white px-8 py-3 rounded-md font-medium transition-colors">
              Hubungi Kami Sekarang
            </button>
          </div>
        </section>

        {/* Testimoni */}
        <section className="px-8 py-16 max-w-4xl mx-auto text-center">
          <div className="text-sm font-semibold mb-4 tracking-wider" style={{ color: '#d97706' }}>TESTIMONI</div>
          <blockquote className="text-3xl font-bold mb-8 leading-tight" style={{ color: '#111827' }}>
            Kue tanpa telur di sini benar-benar enak.<br />
            Saya memesan kue KitKat dan rasanya<br />
            luar biasa. Wajib dicoba!
          </blockquote>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full mb-4" style={{ background: 'linear-gradient(135deg, #60a5fa 0%, #a855f7 100%)' }}></div>
            <div className="font-semibold mb-1" style={{ color: '#111827' }}>Darren Dunlap</div>
            <div className="text-sm" style={{ color: '#4b5563' }}>CEO & Founder di Flex.co</div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-8 py-12" style={{ backgroundColor: '#fffbeb' }}>
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap justify-between items-center mb-8">
              <div className="text-2xl font-semibold mb-4 md:mb-0" style={{ color: '#1f2937' }}>Kenangan Bakery</div>
              <nav className="flex flex-wrap gap-6">
                <a href="#" className="footer-link text-sm transition-colors" style={{ color: '#374151' }}>Beranda</a>
                <a href="#" className="footer-link text-sm transition-colors" style={{ color: '#374151' }}>Kategori</a>
                <a href="#" className="footer-link text-sm transition-colors" style={{ color: '#374151' }}>Tentang Kami</a>
                <a href="#" className="footer-link text-sm transition-colors" style={{ color: '#374151' }}>Hubungi Kami</a>
                <a href="#" className="footer-link text-sm transition-colors" style={{ color: '#374151' }}>Karier</a>
                <a href="#" className="footer-link text-sm transition-colors" style={{ color: '#374151' }}>Bantuan</a>
                <a href="#" className="footer-link text-sm transition-colors" style={{ color: '#374151' }}>Privasi</a>
              </nav>
            </div>
            <div className="flex justify-between items-center pt-8 border-t flex-wrap gap-4" style={{ borderColor: '#d1d5db' }}>
              <div className="text-sm" style={{ color: '#4b5563' }}>
                © 2025 Kenangan Bakery. Semua hak cipta dilindungi.
              </div>
              <div className="flex gap-4">
                <a href="#" className="social-link transition-colors" style={{ color: '#4b5563' }}><Facebook size={18} /></a>
                <a href="#" className="social-link transition-colors" style={{ color: '#4b5563' }}><Twitter size={18} /></a>
                <a href="#" className="social-link transition-colors" style={{ color: '#4b5563' }}><Instagram size={18} /></a>
                <a href="#" className="social-link transition-colors" style={{ color: '#4b5563' }}><Github size={18} /></a>
                <a href="#" className="social-link transition-colors" style={{ color: '#4b5563' }}><Linkedin size={18} /></a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}