import React from 'react';
import { DashboardLayout } from '../../components/layouts/DashboardLayout';
import { useAuthStore } from '../../store/authStore';
import { Link } from 'react-router-dom';

const CustomerDashboard: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-6 lg:p-10 transition-all">
        {/* Header / Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500 overflow-hidden border-2 border-white dark:border-slate-700 shadow-sm">
              <span className="material-symbols-outlined text-3xl">person</span>
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight">Good morning, {user?.name.split(' ')[0]}</h1>
              <p className="text-slate-500 text-sm font-medium">May your health stay bright today.</p>
            </div>
          </div>
          <div className="relative w-full md:w-96">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input 
              type="text" 
              placeholder="Search medicines or symptoms..." 
              className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm focus:ring-2 focus:ring-[#0da2e7] outline-none transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Active Order Banner */}
        <div className="bg-[#0da2e7] rounded-3xl p-6 text-white shadow-xl shadow-[#0da2e7]/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-9xl">moped</span>
          </div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 bg-white/20 w-max px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Live Delivery</div>
              <h2 className="text-2xl font-black">Your medicines are on the way!</h2>
              <p className="text-white/80 text-sm max-w-lg">Order #PB-1024 from Apollo Pharmacy is currently being delivered by our partner John Doe.</p>
            </div>
            <button className="bg-white text-[#0da2e7] px-8 py-3 rounded-xl font-bold text-sm shadow-lg hover:bg-slate-50 transition-colors whitespace-nowrap">Track Order</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <div>
              <h3 className="text-lg font-black mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#0da2e7]">bolt</span> Quick Actions
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Upload Rx', icon: 'upload_file', color: 'bg-blue-50 text-blue-600' },
                  { label: 'Repeat', icon: 'autorenew', color: 'bg-emerald-50 text-emerald-600' },
                  { label: 'Consult', icon: 'chat', color: 'bg-orange-50 text-orange-600' },
                  { label: 'History', icon: 'history', color: 'bg-purple-50 text-purple-600' },
                ].map((action) => (
                  <button key={action.label} className="flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group">
                    <div className={`${action.color} w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <span className="material-symbols-outlined">{action.icon}</span>
                    </div>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Orders */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-black tracking-tight">Recent Orders</h3>
                <Link to="/customer/orders" className="text-[#0da2e7] text-xs font-bold hover:underline">View All</Link>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                    <tr>
                      <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Order ID</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Items</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Status</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                    {[
                      { id: '#PB-1024', items: 'Dolo 650, Benadryl', status: 'Delivering', color: 'text-blue-500', price: '₹145.00' },
                      { id: '#PB-0982', items: 'Metformin 500mg', status: 'Completed', color: 'text-emerald-500', price: '₹420.00' },
                      { id: '#PB-0911', items: 'Amoxicillin 250mg', status: 'Completed', color: 'text-emerald-500', price: '₹85.00' },
                    ].map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer">
                        <td className="px-6 py-4 text-xs font-bold">{order.id}</td>
                        <td className="px-6 py-4 text-xs font-medium text-slate-600 dark:text-slate-400">{order.items}</td>
                        <td className="px-6 py-4">
                          <span className={`text-[10px] font-black uppercase tracking-widest ${order.color}`}>{order.status}</span>
                        </td>
                        <td className="px-6 py-4 text-right text-xs font-black">{order.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            {/* Primary Pharmacy Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm p-6 space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-[#0da2e7]">Primary Pharmacy</h4>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl">local_pharmacy</span>
                </div>
                <div>
                  <h5 className="font-black text-lg">Apollo Pharmacy</h5>
                  <p className="text-slate-400 text-xs font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">location_on</span> 0.4 km away
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2 pt-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-400">Response Time</span>
                  <span className="text-emerald-500">~15 mins</span>
                </div>
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-400">Total Orders</span>
                  <span>42 Orders</span>
                </div>
              </div>
              <button className="w-full py-3 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl text-xs font-black hover:bg-slate-100 transition-colors">Call Pharmacist</button>
            </div>

            {/* Health Stats */}
            <div className="space-y-4">
              <h3 className="text-lg font-black tracking-tight">Your Health Bridge</h3>
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm p-6 overflow-hidden relative">
                <div className="absolute -bottom-4 -right-4 opacity-5 rotate-12">
                   <span className="material-symbols-outlined text-8xl">monitoring</span>
                </div>
                <div className="flex flex-col gap-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Medication Adherence</p>
                      <h4 className="text-3xl font-black text-[#0da2e7]">92%</h4>
                    </div>
                    <div className="h-2 w-24 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-2">
                      <div className="h-full w-[92%] bg-[#0da2e7]"></div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">You've missed only 2 doses this month. Your next refill for Metformin is in 4 days.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CustomerDashboard;
