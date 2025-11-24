import React, { useEffect, useState } from 'react';
import { Plus, Search, Edit, Trash2, X } from 'lucide-react';
import type { Device, DevicePostRequest, DevicePustRequest } from '../../types/devices';
import type { Brand } from '../../types/brands';
import * as deviceService from '../../services/deviceServices';
import * as brandService from '../../services/brandServices';

const Devices: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Modal States
  const [showFormModal, setShowFormModal] = useState(false);
  const [showBrandModal, setShowBrandModal] = useState(false);
  const [searchBrand, setSearchBrand] = useState('');

  // Growth Calculation
  const calculateGrowth = (items: (Device | Brand)[]) => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const thisMonthCount = items.filter(item => {
      if (!item.created_at) return false;
      const date = new Date(item.created_at);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    }).length;

    return thisMonthCount;
  };
  const deviceGrowth = calculateGrowth(devices);
  const brandGrowth = calculateGrowth(brands);

  // Form State
  const [formData, setFormData] = useState<DevicePostRequest | DevicePustRequest>({
    brand_id: 0,
    model: '',
    tipe: '',
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [deviceRes, brandRes] = await Promise.all([
          deviceService.getDevices(),
          brandService.getBrands(),
        ]);
        setDevices(deviceRes);
        setBrands(brandRes);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getBrandName = (id: number) => {
    return brands.find(b => b.id === id)?.nama || 'Unknown';
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        await deviceService.putDevice({ id: editingId, ...formData });
      } else {
        await deviceService.postDevice(formData as DevicePostRequest);
      }

      const refreshed = await deviceService.getDevices();
      setDevices(refreshed);
      setShowFormModal(false);
      setFormData({ brand_id: 0, model: '', tipe: '' });
      setEditingId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (device: Device) => {
    setFormData({
      brand_id: device.brand_id,
      model: device.model,
      tipe: device.tipe,
      id: device.id,
    });
    setEditingId(device.id);
    setShowFormModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Yakin ingin menghapus device ini?')) return;
    await deviceService.deleteDevice({ id });
    const refreshed = await deviceService.getDevices();
    setDevices(refreshed);
  };

  const filteredDevices = devices.filter(
    d =>
      d.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getBrandName(d.brand_id).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredBrands = brands.filter(b =>
    b.nama.toLowerCase().includes(searchBrand.toLowerCase())
  );

  if (loading) return <div className="p-6 text-gray-500">Loading data...</div>;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Devices Management</h1>
          <p className="text-gray-600">Kelola model perangkat yang tersedia</p>
        </div>
        <button
          onClick={() => {
            setShowFormModal(true);
            setEditingId(null);
            setFormData({ brand_id: 0, model: '', tipe: '' });
          }}
          className="bg-teal-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-teal-600 transition"
        >
          <Plus className="w-4 h-4" />
          Tambah Device
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Total Devices */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 text-sm mb-2">Total Devices</p>
              <h3 className="text-3xl font-bold text-gray-800">{devices.length}</h3>
              <p className="text-teal-500 text-xs mt-2 flex items-center gap-1">
                <span>↑</span> {deviceGrowth} dari bulan lalu
              </p>
            </div>
            <div className="w-20 h-20 bg-blue-100 rounded-lg overflow-hidden">
              <img src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=200&fit=crop" alt="Brands" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Total Brand */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 text-sm mb-2">Total Brand</p>
              <h3 className="text-3xl font-bold text-gray-800">{brands.length}</h3>
              <p className="text-teal-500 text-xs mt-2 flex items-center gap-1">
                <span>↑</span> {brandGrowth} dari bulan lalu
              </p>
            </div>
            <div className="w-20 h-20 bg-blue-100 rounded-lg overflow-hidden">
              <img src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=200&fit=crop" alt="Brands" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Total device Pro/Standard */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 text-sm mb-2">Total device Pro / Standard</p>
              <h3 className="text-3xl font-bold text-gray-800">
                {devices.filter(d => d.tipe.toLowerCase().includes('pro') || d.tipe.toLowerCase().includes('ultra')).length} / {devices.filter(d => !d.tipe.toLowerCase().includes('pro') && !d.tipe.toLowerCase().includes('ultra')).length}
              </h3>
              <p className="text-teal-500 text-xs mt-2 flex items-center gap-1">
                <span>↑</span> {deviceGrowth} dari bulan lalu
              </p>
            </div>
            <div className="w-20 h-20 bg-blue-100 rounded-lg overflow-hidden">
              <img src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=200&fit=crop" alt="Brands" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
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

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipe</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDevices.map(device => (
                <tr key={device.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{device.model}</td>
                  <td className="px-6 py-4">{getBrandName(device.brand_id)}</td>
                  <td className="px-6 py-4">{device.tipe}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(device)} className="text-blue-600 hover:text-blue-900">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(device.id)} className="text-red-600 hover:text-red-900">
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

      {/* FORM MODAL */}
      {showFormModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[400px] relative">
            <button onClick={() => setShowFormModal(false)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-semibold mb-4">
              {editingId ? 'Edit Device' : 'Tambah Device'}
            </h2>

            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700">Brand</label>
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="text"
                    value={getBrandName(formData.brand_id)}
                    readOnly
                    className="flex-1 border rounded-md px-3 py-2 bg-gray-100"
                  />
                  <button
                    onClick={() => setShowBrandModal(true)}
                    className="bg-teal-500 text-white px-3 py-2 rounded-md text-sm hover:bg-teal-600"
                  >
                    Pilih
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Model</label>
                <input
                  type="text"
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Tipe</label>
                <input
                  type="text"
                  value={formData.tipe}
                  onChange={(e) => setFormData({ ...formData, tipe: e.target.value })}
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button onClick={() => setShowFormModal(false)} className="px-4 py-2 border rounded-md">
                Batal
              </button>
              <button onClick={handleSave} className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600">
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BRAND SELECT MODAL */}
      {showBrandModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[400px] relative">
            <button onClick={() => setShowBrandModal(false)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-semibold mb-4">Pilih Brand</h2>

            <input
              type="text"
              placeholder="Cari brand..."
              className="w-full border rounded-md px-3 py-2 mb-3"
              value={searchBrand}
              onChange={(e) => setSearchBrand(e.target.value)}
            />

            <div className="max-h-[250px] overflow-y-auto space-y-1">
              {filteredBrands.map((b) => (
                <button
                  key={b.id}
                  onClick={() => {
                    setFormData({ ...formData, brand_id: b.id });
                    setShowBrandModal(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-teal-50"
                >
                  <div className="font-medium">{b.nama}</div>
                  <div className="text-xs text-gray-500">{b.negara_asal}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Devices;
