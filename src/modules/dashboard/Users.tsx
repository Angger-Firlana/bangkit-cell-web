import React, { useEffect, useState } from "react";
import { Plus, Search, Edit, Trash2, X } from "lucide-react";
import type {
  User,
  UserPostRequest,
  UserPutRequest,
} from "../../types/users";
import * as userService from "../../services/userService";

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Modal
  const [showFormModal, setShowFormModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);

  // Form
  const [formData, setFormData] = useState<UserPostRequest | UserPutRequest>({
    name: "",
    email: "",
    role: "",
    password: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  const roles = ["admin", "operator"];

  // Fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await userService.getUsers();
        setUsers(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // const handleSave = async () => {
  //   try {
  //     if (editingId) {
  //       await userService.putUser({
  //         id: editingId,
  //         ...formData,
  //       });
  //     } else {
  //       await userService.postUser(formData as UserPostRequest);
  //     }

  //     const refreshed = await userService.getUsers();
  //     setUsers(refreshed);

  //     setShowFormModal(false);
  //     setEditingId(null);
  //     setFormData({ name: "", email: "", role: "", password: "" });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const handleSave = async () => {
  try {
    if (editingId) {
      const payload: any = { id: editingId, ...formData };

      // ❗ Hapus password kalau kosong saat EDIT
      if (!payload.password) {
        delete payload.password;
      }

      await userService.putUser(payload);
    } else {
      await userService.postUser(formData as UserPostRequest);
    }

    const refreshed = await userService.getUsers();
    setUsers(refreshed);

    setShowFormModal(false);
    setEditingId(null);
    setFormData({ name: "", email: "", role: "", password: "" });
  } catch (err) {
    console.error(err);
  }
};

  const handleEdit = (user: User) => {
    setFormData({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      password: "",
    });
    setEditingId(user.id);
    setShowFormModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus user ini?")) return;
    await userService.deleteUser({ id });
    const refreshed = await userService.getUsers();
    setUsers(refreshed);
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Users Management</h1>
          <p className="text-gray-600">Kelola data pengguna aplikasi</p>
        </div>

        <button
          onClick={() => {
            setShowFormModal(true);
            setEditingId(null);
            setFormData({ name: "", email: "", role: "", password: "" });
          }}
          className="bg-teal-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-teal-600 transition"
        >
          <Plus className="w-4 h-4" />
          Tambah User
        </button>
      </div>

      {/* Search */}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4 capitalize">{user.role}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:text-red-800"
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

      {/* FORM MODAL */}
      {showFormModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[400px] relative shadow-lg">
            <button
              onClick={() => setShowFormModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-semibold mb-4">
              {editingId ? "Edit User" : "Tambah User"}
            </h2>

            <div className="space-y-3">
              <div>
                <label className="text-sm">Nama</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="text-sm">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="text-sm">Role</label>
                <div className="flex gap-2 mt-1">
                  <input
                    type="text"
                    readOnly
                    value={formData.role}
                    className="flex-1 border rounded-md px-3 py-2 bg-gray-100"
                  />
                  <button
                    onClick={() => setShowRoleModal(true)}
                    className="bg-teal-500 text-white px-3 py-2 rounded-md"
                  >
                    Pilih
                  </button>
                </div>
              </div>

              {!editingId && (
                <div>
                  <label className="text-sm">Password</label>
                  <input
                    type="password"
                    value={formData.password || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full border rounded-md px-3 py-2"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setShowFormModal(false)}
                className="px-4 py-2 border rounded-md"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ROLE MODAL */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[400px] relative">
            <button
              onClick={() => setShowRoleModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-semibold mb-4">Pilih Role</h2>

            <div className="max-h-[250px] overflow-y-auto space-y-1">
              {roles.map((role) => (
                <button
                  key={role}
                  onClick={() => {
                    setFormData({ ...formData, role });
                    setShowRoleModal(false);
                  }}
                   className="w-full text-left px-3 py-2 rounded-md hover:bg-teal-50"
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;