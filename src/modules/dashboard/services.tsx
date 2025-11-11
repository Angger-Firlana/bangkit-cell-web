import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import type { Service } from '../../types';

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([
    {
      id: 1,
      nama: 'Ganti LCD',
      deskripsi: 'Penggantian layar LCD rusak atau pecah.',
      created_at: '2025-11-03 06:12:57',
      updated_at: '2025-11-03 06:12:57'
    },
    {
      id: 2,
      nama: 'Ganti Baterai',
      deskripsi: 'Mengganti baterai yang sudah drop atau rusak.',
      created_at: '2025-11-03 06:12:57',
      updated_at: '2025-11-03 06:12:57'
    },
    {
      id: 3,
      nama: 'Ganti Kamera Belakang',
      deskripsi: 'Perbaikan modul kamera belakang.',
      created_at: '2025-11-03 06:12:57',
      updated_at: '2025-11-03 06:12:57'
    },
    {
      id: 4,
      nama: 'Ganti Speaker',
      deskripsi: 'Perbaikan atau penggantian speaker rusak.',
      created_at: '2025-11-03 06:12:57',
      updated_at: '2025-11-03 06:12:57'
    },
    {
      id: 5,
      nama: 'Ganti Port Charger',
      deskripsi: 'Perbaikan konektor charger yang longgar atau tidak berfungsi.',
      created_at: '2025-11-03 06:12:57',
      updated_at: '2025-11-03 06:12:57'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredServices = services.filter(service =>
    service.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.deskripsi?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Services Management</h1>
          <p className="text-gray-600">Kelola layanan perbaikan yang tersedia</p>
        </div>
        <button className="bg-teal-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-teal-600 transition">
          <Plus className="w-4 h-4" />
          Tambah Service
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari service..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Services Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deskripsi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dibuat
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredServices.map((service) => (
                <tr key={service.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{service.nama}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600 max-w-xs truncate">
                      {service.deskripsi}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {service.created_at ? new Date(service.created_at).toLocaleDateString('id-ID') : '-'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-900 p-1">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900 p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-2">Tidak ada service ditemukan</div>
          <div className="text-sm text-gray-500">Coba ubah kata kunci pencarian</div>
        </div>
      )}
    </div>
  );
};

export default Services;