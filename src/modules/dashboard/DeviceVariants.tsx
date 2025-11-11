import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Smartphone, Wrench } from 'lucide-react';
import type { DeviceServiceVariant } from '../../types';

const DeviceVariants: React.FC = () => {
  const [variants, setVariants] = useState<DeviceServiceVariant[]>([
    {
      id: 1,
      device_id: 1,
      service_id: 1,
      tipe_part: 'Original',
      harga_min: 2500000,
      harga_max: 3500000,
      catatan: null,
      created_at: '2025-11-03 06:12:57',
      updated_at: '2025-11-03 06:12:57'
    },
    {
      id: 2,
      device_id: 1,
      service_id: 1,
      tipe_part: 'OEM',
      harga_min: 1800000,
      harga_max: 2500000,
      catatan: null,
      created_at: '2025-11-03 06:12:57',
      updated_at: '2025-11-03 06:12:57'
    },
    {
      id: 3,
      device_id: 2,
      service_id: 2,
      tipe_part: 'Original',
      harga_min: 800000,
      harga_max: 1000000,
      catatan: null,
      created_at: '2025-11-03 06:12:57',
      updated_at: '2025-11-03 06:12:57'
    },
    {
      id: 4,
      device_id: 3,
      service_id: 1,
      tipe_part: 'Original',
      harga_min: 2200000,
      harga_max: 3000000,
      catatan: null,
      created_at: '2025-11-03 06:12:57',
      updated_at: '2025-11-03 06:12:57'
    },
    {
      id: 5,
      device_id: 4,
      service_id: 4,
      tipe_part: 'OEM',
      harga_min: 300000,
      harga_max: 500000,
      catatan: null,
      created_at: '2025-11-03 06:12:57',
      updated_at: '2025-11-03 06:12:57'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const getDeviceName = (deviceId: number): string => {
    const devices: { [key: number]: string } = {
      1: 'iPhone 15 Pro',
      2: 'iPhone 14',
      3: 'Galaxy S23',
      4: 'Redmi Note 13',
      5: 'Reno 11 Pro'
    };
    return devices[deviceId] || 'Unknown Device';
  };

  const getServiceName = (serviceId: number): string => {
    const services: { [key: number]: string } = {
      1: 'Ganti LCD',
      2: 'Ganti Baterai',
      3: 'Ganti Kamera Belakang',
      4: 'Ganti Speaker',
      5: 'Ganti Port Charger'
    };
    return services[serviceId] || 'Unknown Service';
  };

  const filteredVariants = variants.filter(variant =>
    getDeviceName(variant.device_id).toLowerCase().includes(searchTerm.toLowerCase()) ||
    getServiceName(variant.service_id).toLowerCase().includes(searchTerm.toLowerCase()) ||
    variant.tipe_part?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Device Service Variants</h1>
          <p className="text-gray-600">Kelola varian harga untuk setiap service per device</p>
        </div>
        <button className="bg-teal-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-teal-600 transition">
          <Plus className="w-4 h-4" />
          Tambah Variant
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari device, service, atau tipe part..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Variants Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Device & Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipe Part
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Harga Range
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
              {filteredVariants.map((variant) => (
                <tr key={variant.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        <Smartphone className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {getDeviceName(variant.device_id)}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Wrench className="w-3 h-3" />
                          {getServiceName(variant.service_id)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      variant.tipe_part === 'Original' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {variant.tipe_part}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      Rp {variant.harga_min.toLocaleString()} - Rp {variant.harga_max.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      Range harga
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {variant.created_at ? new Date(variant.created_at).toLocaleDateString('id-ID') : '-'}
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

      {filteredVariants.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-2">Tidak ada variant ditemukan</div>
          <div className="text-sm text-gray-500">Coba ubah kata kunci pencarian</div>
        </div>
      )}
    </div>
  );
};

export default DeviceVariants;