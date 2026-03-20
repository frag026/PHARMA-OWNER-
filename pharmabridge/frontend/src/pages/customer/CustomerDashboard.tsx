import React from 'react';
import { DashboardLayout } from '../../components/layouts/DashboardLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { 
  PlusCircle, 
  Search, 
  Clock, 
  ArrowRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const CustomerDashboard: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Welcome back, <span className="text-primary">{user?.name.split(' ')[0]}!</span>
            </h1>
            <p className="text-slate-500 mt-1 font-medium">Here's what's happening with your medical status today.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/search">
              <Button className="h-12 shadow-md shadow-primary/20 gap-2 pr-6">
                 <PlusCircle className="h-5 w-5" /> New Order
              </Button>
            </Link>
          </div>
        </div>

        {/* Status Alerts */}
        <div className="rounded-2xl border-2 border-primary/20 bg-primary/5 p-6 dark:bg-primary/10">
           <div className="flex items-start gap-4">
              <div className="rounded-xl bg-primary/20 p-2 text-primary">
                 <TrendingUp className="h-6 w-6" />
              </div>
              <div className="flex-1">
                 <p className="text-sm font-bold text-primary uppercase tracking-wider mb-1">Live Order Status</p>
                 <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Order #PB-8273 is being processed</h3>
                 <p className="text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">Your medicines are being packed at Apollo Pharmacy. You'll receive a notification once the delivery partner picks it up.</p>
                 <div className="mt-4 flex items-center gap-4">
                    <div className="h-1.5 flex-1 bg-slate-200 rounded-full overflow-hidden dark:bg-slate-800">
                       <div className="h-full w-2/3 bg-primary rounded-full" />
                    </div>
                    <span className="text-sm font-bold text-primary">60% Complete</span>
                 </div>
              </div>
              <Link to="/customer/orders/PB-8273">
                <Button size="sm" variant="outline" className="hidden sm:flex">Track Order</Button>
              </Link>
           </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           <Card className="card-hover">
              <CardHeader>
                 <div className="mb-2 h-10 w-10 flex items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                    <Search className="h-5 w-5" />
                 </div>
                 <CardTitle className="text-lg">Find Medicine</CardTitle>
                 <CardDescription className="text-sm">Search the entire catalog of partner stores</CardDescription>
              </CardHeader>
              <CardFooter>
                 <Button variant="ghost" className="w-full text-sm font-bold opacity-70 group-hover:opacity-100">Browse Catalog</Button>
              </CardFooter>
           </Card>

           <Card className="card-hover">
              <CardHeader>
                 <div className="mb-2 h-10 w-10 flex items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                    <PlusCircle className="h-5 w-5" />
                 </div>
                 <CardTitle className="text-lg">Rapid Reorder</CardTitle>
                 <CardDescription className="text-sm">Reorder your frequent medicines in 2 clicks</CardDescription>
              </CardHeader>
              <CardFooter>
                 <Button variant="ghost" className="w-full text-sm font-bold opacity-70 group-hover:opacity-100">View Favourites</Button>
              </CardFooter>
           </Card>

           <Card className="card-hover">
              <CardHeader>
                 <div className="mb-2 h-10 w-10 flex items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                    <Clock className="h-5 w-5" />
                 </div>
                 <CardTitle className="text-lg">Health Records</CardTitle>
                 <CardDescription className="text-sm">Access your previous bills and digitised records</CardDescription>
              </CardHeader>
              <CardFooter>
                 <Button variant="ghost" className="w-full text-sm font-bold opacity-70 group-hover:opacity-100">Open History</Button>
              </CardFooter>
           </Card>

           <Card className="card-hover">
              <CardHeader>
                 <div className="mb-2 h-10 w-10 flex items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                    <AlertCircle className="h-5 w-5" />
                 </div>
                 <CardTitle className="text-lg">Support Center</CardTitle>
                 <CardDescription className="text-sm">Talk to a pharmacist or file a return/report</CardDescription>
              </CardHeader>
              <CardFooter>
                 <Button variant="ghost" className="w-full text-sm font-bold opacity-70 group-hover:opacity-100">Help Center</Button>
              </CardFooter>
           </Card>
        </div>

        {/* Tables/Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Recent Orders</h2>
                <Link to="/customer/orders" className="text-sm font-bold text-primary hover:underline flex items-center gap-1">View All <ArrowRight className="h-4 w-4" /></Link>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden dark:border-slate-800 dark:bg-slate-950">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200 dark:bg-slate-900/50 dark:border-slate-800">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Order ID</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Pharmacy</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {[
                      { id: 'PB-8273', pharmacy: 'Apollo Pharmacy', amount: '₹1,240', status: 'PROCESSING', statusVariant: 'warning' as const },
                      { id: 'PB-7192', pharmacy: 'MedPlus Store', amount: '₹450', status: 'DELIVERED', statusVariant: 'success' as const },
                      { id: 'PB-6628', pharmacy: 'Apollo Pharmacy', amount: '₹890', status: 'DELIVERED', statusVariant: 'success' as const },
                      { id: 'PB-5501', pharmacy: 'City Pharma', amount: '₹2,100', status: 'CANCELLED', statusVariant: 'destructive' as const },
                    ].map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold text-slate-900 dark:text-white">{order.id}</p>
                          <p className="text-xs text-slate-500">12 Mar 2026</p>
                        </td>
                        <td className="px-6 py-4 font-medium text-sm">{order.pharmacy}</td>
                        <td className="px-6 py-4 font-bold text-sm">{order.amount}</td>
                        <td className="px-6 py-4">
                          <Badge variant={order.statusVariant}>{order.status}</Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button size="sm" variant="ghost" className="text-xs font-bold">Details</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
           </div>

           <div className="lg:col-span-4 flex flex-col gap-8">
              <div className="flex flex-col gap-6">
                <h2 className="text-2xl font-bold">Quick Reorder</h2>
                <Card className="bg-primary/5 border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Paracetamol 500mg</CardTitle>
                    <CardDescription>Commonly ordered from Apollo</CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-between items-center">
                    <p className="text-2xl font-extrabold text-primary">₹12.00</p>
                    <Button size="sm">Add to Cart</Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Metformin 500mg</CardTitle>
                    <CardDescription>Monthly chronic med reorder</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button size="sm" variant="outline" className="w-full">Reorder All Chronic</Button>
                  </CardFooter>
                </Card>
              </div>

              <div className="rounded-2xl bg-slate-900 p-6 text-white overflow-hidden relative">
                 <div className="absolute top-0 right-0 h-32 w-32 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                 <h3 className="text-xl font-bold mb-2">Bridge Plus</h3>
                 <p className="text-sm font-medium opacity-80 mb-6">Unlock free delivery on all orders above ₹200.</p>
                 <Button className="bg-white text-slate-900 hover:bg-white/90 w-full h-10 font-bold">Upgrade Now</Button>
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CustomerDashboard;
