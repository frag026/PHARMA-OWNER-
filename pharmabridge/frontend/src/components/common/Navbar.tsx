import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../ui/Button';
import { User, LogOut, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
            <span className="font-bold">PB</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Pharma<span className="text-primary">Bridge</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-6 md:flex">
          {isAuthenticated ? (
            <>
              <>
                <Link to="/admin/dashboard" className="text-sm font-medium hover:text-primary">Dashboard</Link>
                <Link to="/admin/inventory" className="text-sm font-medium hover:text-primary">Inventory</Link>
                <Link to="/admin/orders" className="text-sm font-medium hover:text-primary">Orders</Link>
              </>
              <div className="flex items-center gap-4 border-l border-slate-200 pl-6 dark:border-slate-800">
                <Link to="/admin/settings">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    <span>{user?.name.split(' ')[0]}</span>
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="text-slate-500">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-sm font-medium hover:text-primary">Login</Link>
              <Link to="/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="border-t border-slate-200 p-4 md:hidden dark:border-slate-800">
          <div className="grid gap-2">
            {isAuthenticated ? (
              <>
                <Link to="/admin/dashboard" className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-slate-50">Dashboard</Link>
                <Link to="/admin/inventory" className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-slate-50">Inventory</Link>
                <Link to="/admin/orders" className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-slate-50">Orders</Link>
                <div className="my-2 border-t border-slate-200" />
                <button onClick={handleLogout} className="flex w-full items-center gap-2 px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50">
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-slate-50">Login</Link>
                <Link to="/register" className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-slate-50 text-primary">Get Started</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
