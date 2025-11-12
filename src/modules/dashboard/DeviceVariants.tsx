import React, { useEffect, useState } from "react";
import { Plus, Search, Edit, Trash2, Smartphone, Wrench, X } from "lucide-react";
import {
  getDeviceServiceVariants,
  postDeviceServiceVariant,
  putDeviceServiceVariant,
  deleteDeviceServiceVariant,
} from "../../services/deviceVariantServices";
import { getDevices } from "../../services/deviceServices";
import { getServices } from "../../services/serviceServices";
import type { DeviceServiceVariant, Device, Service } from "../../types";

const DeviceServiceVariants: React.FC = () => {
  const [variants, setVariants] = useState<DeviceServiceVariant[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<any>({
    id: null,
    device_id: null,
    service_id: null,
    tipe_part: "",
    harga_min: "",
    harga_max: "",
    catatan: "",
  });
  const [searchDevice, setSearchDevice] = useState("");
  const [searchService, setSearchService] = useState("");
  const [isDeviceListOpen, setDeviceListOpen] = useState(false);
  const [isServiceListOpen, setServiceListOpen] = useState(false);

  // 🔹 Fetch semua data
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [variantRes, deviceRes, serviceRes] = await Promise.all([
      getDeviceServiceVariants(),
      getDevices(),
      getServices(),
    ]);
    setVariants(variantRes);
    setDevices(deviceRes);
    setServices(serviceRes);
  };

  const getDeviceName = (id: number) => devices.find((d) => d.id === id)?.model ?? "Unknown Device";
  const getServiceName = (id: number) => services.find((s) => s.id === id)?.nama ?? "Unknown Service";

  const filteredVariants = variants.filter(
    (v) =>
      getDeviceName(v.device_id).toLowerCase().includes(searchTerm.toLowerCase()) ||
      getServiceName(v.service_id).toLowerCase().includes(searchTerm.toLowerCase()) ||
      (v.tipe_part ?? "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async () => {
    const payload = {
      device_id: formData.device_id,
      service_id: formData.service_id,
      tipe_part: formData.tipe_part,
      harga_min: Number(formData.harga_min),
      harga_max: Number(formData.harga_max),
      catatan: formData.catatan,
    };
    if (formData.id) {
      await putDeviceServiceVariant({ id: formData.id, ...payload });
    } else {
      await postDeviceServiceVariant(payload);
    }
    setShowModal(false);
    loadData();
  };

  const handleDelete = async (id: number) => {
    if (confirm("Yakin ingin menghapus variant ini?")) {
      await deleteDeviceServiceVariant({ id });
      loadData();
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Device Service Variants</h1>
          <p className="text-gray-600">Kelola varian service & harga setiap device</p>
        </div>
        <button
          onClick={() => {
            setFormData({
              id: null,
              device_id: null,
              service_id: null,
              tipe_part: "",
              harga_min: "",
              harga_max: "",
              catatan: "",
            });
            setShowModal(true);
          }}
          className="bg-teal-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-teal-600 transition"
        >
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

      {/* Table */}
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
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredVariants.map((v) => (
                <tr key={v.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-5 h-5 text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-900">{getDeviceName(v.device_id)}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Wrench className="w-3 h-3" />
                          {getServiceName(v.service_id)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        v.tipe_part === "Original"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {v.tipe_part}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      Rp {v.harga_min.toLocaleString()} - Rp {v.harga_max.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => {
                          setFormData(v);
                          setShowModal(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDelete(v.id)}
                      >
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

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative">
            <button onClick={() => setShowModal(false)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-semibold mb-4">
              {formData.id ? "Edit Variant" : "Tambah Variant"}
            </h2>

            {/* Search device */}
            <div className="mb-3">
              <label className="text-sm font-medium text-gray-700">Device</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari device..."
                  value={
                    formData.device_id
                      ? getDeviceName(formData.device_id)
                      : searchDevice
                  }
                  onChange={(e) => {
                    setSearchDevice(e.target.value);
                    setDeviceListOpen(true);
                  }}
                  className="w-full mt-1 border px-3 py-2 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
                {isDeviceListOpen && (
                  <ul className="absolute z-10 bg-white border rounded-lg w-full max-h-40 overflow-y-auto mt-1">
                    {devices
                      .filter((d) =>
                        d.model.toLowerCase().includes(searchDevice.toLowerCase())
                      )
                      .map((d) => (
                        <li
                          key={d.id}
                          onClick={() => {
                            setFormData({ ...formData, device_id: d.id });
                            setSearchDevice("");
                            setDeviceListOpen(false);
                          }}
                          className="px-3 py-2 hover:bg-teal-100 cursor-pointer"
                        >
                          {d.model}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Search service */}
            <div className="mb-3">
              <label className="text-sm font-medium text-gray-700">Service</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari service..."
                  value={
                    formData.service_id
                      ? getServiceName(formData.service_id)
                      : searchService
                  }
                  onChange={(e) => {
                    setSearchService(e.target.value);
                    setServiceListOpen(true);
                  }}
                  className="w-full mt-1 border px-3 py-2 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
                {isServiceListOpen && (
                  <ul className="absolute z-10 bg-white border rounded-lg w-full max-h-40 overflow-y-auto mt-1">
                    {services
                      .filter((s) =>
                        s.nama.toLowerCase().includes(searchService.toLowerCase())
                      )
                      .map((s) => (
                        <li
                          key={s.id}
                          onClick={() => {
                            setFormData({ ...formData, service_id: s.id });
                            setSearchService("");
                            setServiceListOpen(false);
                          }}
                          className="px-3 py-2 hover:bg-teal-100 cursor-pointer"
                        >
                          {s.nama}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Fields lainnya */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-700">Tipe Part</label>
                <input
                  type="text"
                  value={formData.tipe_part}
                  onChange={(e) => setFormData({ ...formData, tipe_part: e.target.value })}
                  className="w-full mt-1 border px-3 py-2 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Harga Min</label>
                <input
                  type="number"
                  value={formData.harga_min}
                  onChange={(e) => setFormData({ ...formData, harga_min: e.target.value })}
                  className="w-full mt-1 border px-3 py-2 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Harga Max</label>
                <input
                  type="number"
                  value={formData.harga_max}
                  onChange={(e) => setFormData({ ...formData, harga_max: e.target.value })}
                  className="w-full mt-1 border px-3 py-2 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Catatan</label>
                <input
                  type="text"
                  value={formData.catatan ?? ""}
                  onChange={(e) => setFormData({ ...formData, catatan: e.target.value })}
                  className="w-full mt-1 border px-3 py-2 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
              >
                Batal
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 rounded-lg bg-teal-500 text-white hover:bg-teal-600"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeviceServiceVariants;
