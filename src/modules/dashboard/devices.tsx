import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import type { Device, Brand } from '../../types';

const Devices: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([
    {
      id: 1,
      brand_id: 1,
      model: 'iPhone 15 Pro',
      tipe: 'Pro',
      created_at: '2025-11-03 06:12:57',
      updated_at: '2025-11-03 06:12:57'
    },
    {
      id: 2,
      brand_id: 1,
      model: 'iPhone 14',
      tipe: 'Standard',
      created_at: '2025-11-03 06:12:57',
      updated_at: '2025-11-03 06:12:57'
    },
    {
      id: 3,
      brand_id: 2,
      model: 'Galaxy S23',
      tipe: 'Ultra',
      created_at: '2025-11-03 06:12:57',
      updated_at: '2025-11-03 06:12:57'
    },
    {
      id: 4,
      brand_id: 3,
      model: 'Redmi Note 13',
      tipe: 'Standard',
      created_at: '2025-11-03 06:12:57',
      updated_at: '2025-11-03 06:12:57'
    },
    {
      id: 5,
      brand_id: 4,
      model: 'Reno 11 Pro',
      tipe: 'Pro',
      created_at: '2025-11-03 06:12:57',
      updated_at: '2025-11-03 06:12:57'
    }
  ]);

  const [brands] = useState<Brand[]>([
    { id: 1, nama: 'Apple', negara_asal: 'USA', created_at: null, updated_at: null },
    { id: 2, nama: 'Samsung', negara_asal: 'Korea Selatan', created_at: null, updated_at: null },
    { id: 3, nama: 'Xiaomi', negara_asal: 'China', created_at: null, updated_at: null },
    { id: 4, nama: 'Oppo', negara_asal: 'China', created_at: null, updated_at: null },
    { id: 5, nama: 'Vivo', negara_asal: 'China', created_at: null, updated_at: null }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const getBrandName = (brandId: number): string => {
    const brand = brands.find(b => b.id === brandId);
    return brand ? brand.nama : 'Unknown';
  };

  const filteredDevices = devices.filter(device =>
    device.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getBrandName(device.brand_id).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Devices Management</h1>
          <p className="text-gray-600">Kelola model perangkat yang tersedia</p>
        </div>
        <button className="bg-teal-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-teal-600 transition">
          <Plus className="w-4 h-4" />
          Tambah Device
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari device atau brand..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Devices Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Model
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Brand
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipe
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
              {filteredDevices.map((device) => (
                <tr key={device.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{device.model}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{getBrandName(device.brand_id)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      device.tipe === 'Pro' || device.tipe === 'Ultra' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {device.tipe}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {device.created_at ? new Date(device.created_at).toLocaleDateString('id-ID') : '-'}
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

      {filteredDevices.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-2">Tidak ada device ditemukan</div>
          <div className="text-sm text-gray-500">Coba ubah kata kunci pencarian</div>
        </div>
      )}
    </div>
  );
};

export default Devices;