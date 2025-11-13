import { Bell, UserCircle } from 'lucide-react';

const Navbar = ({ toggle }: { toggle: () => void }) => (
  <header className="bg-white shadow flex justify-between items-center px-6 py-3 sticky top-0 z-40">
    <button onClick={toggle} className="md:hidden text-gray-700 text-xl">☰</button>
    <h2 className="font-bold text-gray-700 text-lg">Admin Dashboard</h2>
    <div className="flex items-center gap-4">
      <Bell className="text-gray-600 w-5 h-5" />
      <UserCircle className="text-gray-600 w-7 h-7" />
    </div>
  </header>
);

export default Navbar;
