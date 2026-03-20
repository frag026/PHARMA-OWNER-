import React from 'react';
import { DashboardLayout } from '../../components/layouts/DashboardLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { 
  ShoppingBag, 
  Users, 
  Package, 
  BarChart3, 
  TrendingUp, 
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis
} from 'recharts';

const data = [
  { name: 'Mon', revenue: 4000, orders: 24 },
  { name: 'Tue', revenue: 3000, orders: 13 },
  { name: 'Wed', revenue: 2000, orders: 98 },
  { name: 'Thu', revenue: 2780, orders: 39 },
  { name: 'Fri', revenue: 1890, orders: 48 },
  { name: 'Sat', revenue: 2390, orders: 38 },
  { name: 'Sun', revenue: 3490, orders: 43 },
];

const PharmacyDashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome & Stats Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Admin Dashboard</h1>
            <p className="text-slate-500 mt-1 font-medium">Monitoring your pharmacy's performance and inventory.</p>
          </div>
          <div className="flex gap-3">
             <Button variant="outline" size="sm" className="hidden sm:flex">Download Report</Button>
             <Link to="/admin/inventory/new">
                <Button size="sm" className="gap-2"><Package className="h-4 w-4" /> Add Product</Button>
             </Link>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="card-hover border-b-4 border-b-primary shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Total Revenue</p>
                <div className="p-2 bg-primary/10 text-primary rounded-lg"><BarChart3 size={18} /></div>
              </div>
              <CardTitle className="text-3xl font-extrabold mt-2">₹42,890</CardTitle>
              <CardDescription className="text-xs font-bold text-emerald-500 flex items-center gap-1 mt-1">
                <TrendingUp size={12} /> +12.5% from last month
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="card-hover border-b-4 border-b-emerald-500 shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Total Orders</p>
                <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg"><ShoppingBag size={18} /></div>
              </div>
              <CardTitle className="text-3xl font-extrabold mt-2">348</CardTitle>
              <CardDescription className="text-xs font-bold text-emerald-500 flex items-center gap-1 mt-1">
                <TrendingUp size={12} /> +4.2% from today
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="card-hover border-b-4 border-b-orange-500 shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Low Stock Items</p>
                <div className="p-2 bg-orange-100 text-orange-600 rounded-lg"><Package size={18} /></div>
              </div>
              <CardTitle className="text-3xl font-extrabold mt-2">12</CardTitle>
              <CardDescription className="text-xs font-bold text-red-500 flex items-center gap-1 mt-1">
                <TrendingUp size={12} /> Require attention
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="card-hover border-b-4 border-b-blue-500 shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Active Customers</p>
                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Users size={18} /></div>
              </div>
              <CardTitle className="text-3xl font-extrabold mt-2">1,240</CardTitle>
              <CardDescription className="text-xs font-bold text-emerald-500 flex items-center gap-1 mt-1">
                <TrendingUp size={12} /> +56 new this week
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           {/* Revenue Chart */}
           <Card className="lg:col-span-8 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                 <div>
                    <CardTitle className="text-xl">Revenue Overview</CardTitle>
                    <CardDescription>Visual stats for the current week</CardDescription>
                 </div>
                 <Badge variant="outline" className="h-6">Weekly</Badge>
              </CardHeader>
              <CardContent className="h-[350px] w-full mt-4">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                       <defs>
                          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.1}/>
                             <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                       <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} />
                       <Tooltip 
                         contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                         itemStyle={{ color: '#0EA5E9', fontWeight: 'bold' }}
                       />
                       <Area type="monotone" dataKey="revenue" stroke="#0EA5E9" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                    </AreaChart>
                 </ResponsiveContainer>
              </CardContent>
           </Card>

           {/* Live Feed / Orders */}
           <div className="lg:col-span-4 space-y-6">
              <div className="flex items-center justify-between">
                 <h2 className="text-xl font-bold">Pending Approval</h2>
                 <Link to="/admin/orders" className="text-primary text-xs font-bold hover:underline">View All</Link>
              </div>
              <div className="space-y-4">
                {[
                  { id: 'ORD-101', name: 'Rahul S.', type: 'Prescription Order', status: 'UNVERIFIED', icon: FileText, color: 'orange' },
                  { id: 'ORD-102', name: 'Simran K.', type: 'Chronic Medicine', status: 'PENDING', icon: ShoppingBag, color: 'blue' },
                  { id: 'ORD-103', name: 'Amit G.', type: 'Normal Reorder', status: 'PACKING', icon: CheckCircle2, color: 'emerald' },
                ].map((item) => (
                  <Card key={item.id} className="card-hover">
                    <CardHeader className="p-4">
                       <div className="flex items-center gap-3">
                          <div className={`p-2 bg-${item.color}-100 text-${item.color}-600 rounded-lg`}>
                             <item.icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                             <div className="flex items-center justify-between mb-0.5">
                                <p className="text-xs font-bold text-slate-400">{item.id}</p>
                                <Badge variant="outline" className="text-[10px] py-0">{item.status}</Badge>
                             </div>
                             <p className="text-sm font-bold">{item.name}</p>
                             <p className="text-xs text-slate-500">{item.type}</p>
                          </div>
                          <Button size="sm" variant="ghost" className="p-2"><ArrowRight size={16} /></Button>
                       </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>

              <Card className="bg-slate-900 text-white p-6 rounded-2xl">
                 <div className="flex items-center gap-4 mb-4">
                    <div className="h-10 w-10 bg-white/10 rounded-xl flex items-center justify-center text-primary"><AlertTriangle size={24} /></div>
                    <div>
                       <h4 className="font-bold">System Health</h4>
                       <p className="text-xs opacity-60">All services are operational.</p>
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-white/5 rounded-xl text-center">
                       <p className="text-xs opacity-60 mb-1">Stock Load</p>
                       <p className="text-sm font-bold">84%</p>
                    </div>
                    <div className="p-3 bg-white/5 rounded-xl text-center">
                       <p className="text-xs opacity-60 mb-1">Server Latency</p>
                       <p className="text-sm font-bold">24ms</p>
                    </div>
                 </div>
              </Card>
           </div>
        </div>

        {/* Activity Table */}
        <Card className="shadow-sm">
           <CardHeader className="flex flex-row items-center justify-between">
              <div>
                 <CardTitle className="text-xl">Latest Transactions</CardTitle>
                 <CardDescription>Monitor every sale across your store.</CardDescription>
              </div>
           </CardHeader>
           <CardContent className="mt-4">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200 dark:bg-slate-900/50 dark:border-slate-800">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Method</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Order Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {[
                      { date: 'Today, 10:45 AM', customer: 'Rohan Sharma', cat: 'Prescription', method: 'Online', amount: '₹1,560', status: 'Delivered' },
                      { date: 'Today, 09:30 AM', customer: 'Priya Verma', cat: 'Over counter', method: 'Cash', amount: '₹420', status: 'Packing' },
                      { date: 'Yesterday', customer: 'Kamal Nath', cat: 'Chronic', method: 'Online', amount: '₹2,890', status: 'Delivered' },
                      { date: 'Yesterday', customer: 'Anjali S.', cat: 'Prescription', method: 'Online', amount: '₹950', status: 'Cancelled' },
                    ].map((item, i) => (
                      <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium">{item.date}</td>
                        <td className="px-6 py-4 text-sm font-bold">{item.customer}</td>
                        <td className="px-6 py-4 text-sm">{item.cat}</td>
                        <td className="px-6 py-4"><Badge variant="outline">{item.method}</Badge></td>
                        <td className="px-6 py-4 text-sm font-extrabold text-primary">{item.amount}</td>
                        <td className="px-6 py-4"><Badge variant={item.status === 'Delivered' ? 'success' : item.status === 'Cancelled' ? 'destructive' : 'warning'}>{item.status}</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
           </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PharmacyDashboard;
