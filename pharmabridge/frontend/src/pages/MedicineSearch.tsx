import React from 'react';
import { DashboardLayout } from '../components/layouts/DashboardLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { 
  Search, 
  Filter, 
  ShoppingCart, 
  Info, 
  Plus, 
  Minus,
  Star,
  ChevronDown
} from 'lucide-react';
import api from '../services/api';

const MedicineSearch: React.FC = () => {
  const [search, setSearch] = React.useState('');
  const [medicines, setMedicines] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchMedicines = async () => {
      setIsLoading(true);
      try {
        const resp = await api.get(`/medicines?search=${search}`);
        setMedicines(resp.data.data);
      } catch (err) {
        // Fallback with mock data for demo
        setMedicines([
          { id: '1', name: 'Paracetamol 500mg', brand: 'Dolo 650', genericName: 'Acetaminophen', price: 12.50, stock: 100, category: 'Tablet', requiresPrescription: false },
          { id: '2', name: 'Amoxicillin 250mg', brand: 'Mox', genericName: 'Amoxicillin', price: 85.00, stock: 45, category: 'Capsule', requiresPrescription: true },
          { id: '3', name: 'Cough Syrup 100ml', brand: 'Benadryl', genericName: 'Diphenhydramine', price: 145.00, stock: 20, category: 'Syrup', requiresPrescription: false },
          { id: '4', name: 'Metformin 500mg', brand: 'Glycomet', genericName: 'Metformin', price: 32.00, stock: 300, category: 'Tablet', requiresPrescription: true },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(fetchMedicines, 500);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Order Medicines</h1>
            <p className="text-slate-500 mt-1 font-medium">Browse thousands of products from local verified stores.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2"><Filter size={16} /> Filters</Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative transform transition-all duration-300 focus-within:scale-[1.01]">
          <Input 
            className="h-14 text-lg pl-12 rounded-2xl shadow-xl shadow-primary/10 border-slate-200" 
            placeholder="Search by medicine name, brand, or salt..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<Search size={24} className="text-primary" />}
          />
        </div>

        {/* Filters/Categories Chips */}
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
           {['All', 'Tablets', 'Capsules', 'Syrups', 'Injections', 'Ointments', 'Skin Care', 'First Aid'].map((cat, i) => (
             <Badge 
               key={cat} 
               variant={i === 0 ? 'secondary' : 'outline'} 
               className={`px-6 py-2 cursor-pointer text-sm transition-all whitespace-nowrap rounded-xl ${i === 0 ? 'bg-primary text-white hover:bg-primary/90' : 'hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800'}`}
             >
               {cat}
             </Badge>
           ))}
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
           {isLoading && Array(8).fill(0).map((_, i) => (
             <Card key={i} className="animate-pulse h-80 bg-slate-100 border-none dark:bg-slate-800/50" />
           ))}
           
           {!isLoading && medicines.map((med) => (
             <Card key={med.id} className="card-hover group border-none shadow-sm dark:bg-slate-900">
               <CardHeader className="relative pb-0">
                  <div className="rounded-2xl bg-slate-100 aspect-square mb-4 flex items-center justify-center p-8 dark:bg-slate-800">
                     <Plus className="h-12 w-12 text-slate-300 group-hover:text-primary transition-colors" />
                  </div>
                  {med.requiresPrescription && (
                    <Badge variant="destructive" className="absolute top-6 right-6 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest shadow-lg">Rx Required</Badge>
                  )}
                  <div className="flex items-center gap-1 mb-1">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-bold text-slate-400">4.8 (230 reviews)</span>
                  </div>
                  <CardTitle className="text-xl font-extrabold text-slate-900 dark:text-white leading-tight mb-1">{med.name}</CardTitle>
                  <CardDescription className="text-xs font-medium text-slate-500 line-clamp-1">{med.brand} • {med.genericName}</CardDescription>
               </CardHeader>
               <CardContent className="mt-4">
                  <div className="flex items-center justify-between">
                     <span className="text-2xl font-black text-primary">₹{med.price.toFixed(2)}</span>
                     <Badge variant={med.stock > 0 ? 'success' : 'destructive'} className="rounded-md">
                        {med.stock > 0 ? 'In Stock' : 'Out of Stock'}
                     </Badge>
                  </div>
               </CardContent>
               <CardFooter className="pt-2">
                  <Button className="w-full h-11 text-sm font-bold shadow-md shadow-primary/20 gap-2" disabled={med.stock <= 0}>
                     <ShoppingCart size={16} /> Add to Cart
                  </Button>
               </CardFooter>
             </Card>
           ))}

           {!isLoading && medicines.length === 0 && (
              <div className="col-span-full py-20 text-center">
                 <div className="mx-auto h-20 w-20 bg-slate-100 rounded-full flex items-center justify-center mb-4 dark:bg-slate-800">
                    <Search className="h-10 w-10 text-slate-300" />
                 </div>
                 <h3 className="text-xl font-bold">No medicines found</h3>
                 <p className="text-slate-500">Try searching with a different name or generic salt.</p>
              </div>
           )}
        </div>
        
        {/* Bulk Action / Cart View Bar */}
        <div className="sticky bottom-6 z-40 bg-slate-950 text-white p-4 rounded-3xl shadow-2xl flex items-center justify-between mx-auto max-w-2xl transform transition-all duration-300 translate-y-0 opacity-100 border border-white/10 backdrop-blur-xl">
           <div className="flex items-center gap-4 pl-2">
              <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center font-black">2</div>
              <div>
                 <p className="text-sm font-bold">Items in Cart</p>
                 <p className="text-xs opacity-60">Subtotal: ₹97.50</p>
              </div>
           </div>
           <Link to="/cart">
              <Button variant="secondary" className="h-10 px-8 text-sm font-bold shadow-lg shadow-emerald-500/20">
                 View Cart <ArrowRight size={16} className="ml-2" />
              </Button>
           </Link>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MedicineSearch;
