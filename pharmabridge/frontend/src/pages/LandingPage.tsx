import React from 'react';
import { Navbar } from '../components/common/Navbar';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { 
  PlusCircle, 
  Search, 
  Truck, 
  ShieldCheck, 
  MessageSquare, 
  History, 
  ArrowRight,
  Stethoscope,
  Pill,
  Clock,
  MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white py-20 dark:bg-slate-950 sm:py-32">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <svg className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-slate-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)] dark:stroke-slate-800" aria-hidden="true">
            <defs>
              <pattern id="e813992c-7d03-4cc4-a2bd-21d7abd49fcd" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
                <path d="M100 200V.5M.5 .5H200" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" strokeWidth="0" fill="url(#e813992c-7d03-4cc4-a2bd-21d7abd49fcd)" />
          </svg>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:text-left">
              <h1>
                <Badge variant="info" className="mb-4 py-1 px-3 text-sm">Now serving 500+ local pharmacies</Badge>
                <span className="block text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl">
                  Medicine delivery from <span className="text-primary">Your Local Pharmacy</span>
                </span>
              </h1>
              <p className="mt-3 text-base text-slate-500 dark:text-slate-400 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                PharmaBridge connects you directly with pharmacies in your neighborhood. Get genuine medicines, prescription verification, and real-time order tracking.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <Link to="/register">
                  <Button size="lg" className="h-14 px-8 text-lg font-bold shadow-lg shadow-primary/20">
                    Order Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/pharmacy-partner">
                  <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-bold">
                    For Pharmacies
                  </Button>
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-6 justify-center lg:justify-start">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-slate-200 dark:border-slate-800" />
                  ))}
                </div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Joined by <span className="text-slate-900 dark:text-white">10,000+ happy customers</span> this month
                </p>
              </div>
            </div>
            <div className="relative mt-12 sm:mx-auto sm:max-w-lg lg:col-span-6 lg:mx-0 lg:mt-0 lg:flex lg:items-center">
              <div className="relative mx-auto w-full max-w-[500px]">
                <div className="rounded-2xl bg-white p-2 shadow-2xl ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                   <div className="overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-950 aspect-[4/3] flex items-center justify-center p-8">
                     <div className="text-center">
                        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 text-primary">
                          <Stethoscope className="h-10 w-10" />
                        </div>
                        <h3 className="text-xl font-bold">Fast & Reliable</h3>
                        <p className="text-sm text-slate-500">Connecting Patients and Pharmacists seamlessly.</p>
                     </div>
                   </div>
                </div>
                <div className="absolute -bottom-6 -left-6 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-slate-100 dark:bg-slate-900 dark:ring-slate-800 md:block">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <ShieldCheck className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500">100% Genuine</p>
                      <p className="text-sm font-bold">Verified Stores</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -right-6 -top-6 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-slate-100 dark:bg-slate-900 dark:ring-slate-800 md:block">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500">Fast Express</p>
                      <p className="text-sm font-bold">30 Min Delivery</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center text-white">
              <p className="text-4xl font-extrabold">50k+</p>
              <p className="text-sm font-medium opacity-80">Active Users</p>
            </div>
            <div className="text-center text-white">
              <p className="text-4xl font-extrabold">1.2M+</p>
              <p className="text-sm font-medium opacity-80">Orders Served</p>
            </div>
            <div className="text-center text-white">
              <p className="text-4xl font-extrabold">500+</p>
              <p className="text-sm font-medium opacity-80">Partner Pharmacies</p>
            </div>
            <div className="text-center text-white">
              <p className="text-4xl font-extrabold">99.9%</p>
              <p className="text-sm font-medium opacity-80">Order Fulfillment</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Everything you need in one app
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500 dark:text-slate-400">
              Modern features designed to make healthcare accessible and convenient for everyone.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Prescription Upload', desc: 'Securely upload your doctor\'s prescription for verification.', icon: Pill },
              { title: 'Real-time Tracking', desc: 'Watch your medicine progress from pharmacy to your doorstep.', icon: Truck },
              { title: 'Chat with Pharmacist', desc: 'Get professional advice directly through our secure chat.', icon: MessageSquare },
              { title: 'Health Records', desc: 'Access your order history and uploaded prescriptions anytime.', icon: History },
              { title: 'Verified Pharmacies', desc: 'Shop only from government-registered and verified local stores.', icon: ShieldCheck },
              { title: 'Medication Reminders', desc: 'Never miss a dose with our built-in pill alert system.', icon: Clock },
            ].map((feature, i) => (
              <Card key={i} className="card-hover border-none bg-white p-4 dark:bg-slate-900">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-sm">{feature.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-slate-100 py-20 dark:bg-slate-900 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">How it works</h2>
            <p className="mt-4 text-slate-500">Getting your medicines delivered is just 3 steps away.</p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3 relative">
            <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-slate-200 dark:bg-slate-800 -translate-x-1/2 z-0" />
            
            {[
              { step: '01', title: 'Find Medicines', desc: 'Search for medications or upload a prescription.', icon: Search },
              { step: '02', title: 'Choose Pharmacy', desc: 'Select from nearby registered local pharmacies.', icon: MapPin },
              { step: '03', title: 'Fast Delivery', desc: 'Get your medicines at your doorstep in 30 mins.', icon: Truck },
            ].map((step, i) => (
              <div key={i} className="relative z-10 text-center flex flex-col items-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-primary shadow-xl dark:bg-slate-800 ring-4 ring-slate-100 dark:ring-slate-900">
                  <step.icon className="h-8 w-8" />
                </div>
                <Badge className="mb-2">{step.step}</Badge>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-slate-500 max-w-xs">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold">Loved by patients and pharmacists</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
             {[1, 2, 3].map((i) => (
               <Card key={i} className="bg-white dark:bg-slate-900 border-none shadow-sm">
                 <CardHeader>
                   <div className="flex gap-1 text-amber-500 mb-2">
                     {[1, 2, 3, 4, 5].map(s => <PlusCircle key={s} className="h-4 w-4 fill-current" />)}
                   </div>
                   <p className="text-slate-600 dark:text-slate-400 italic">"PharmaBridge has completely changed how I manage my monthly medications. The interface is simple and the delivery is incredibly fast."</p>
                 </CardHeader>
                 <CardFooter className="flex items-center gap-4">
                   <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-800" />
                   <div>
                     <p className="text-sm font-bold">Rahul Sharma</p>
                     <p className="text-xs text-slate-500">Regular Customer</p>
                   </div>
                 </CardFooter>
               </Card>
             ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-primary px-8 py-16 text-center text-white shadow-2xl md:py-24">
          <h2 className="text-3xl font-extrabold sm:text-5xl">Ready to get started?</h2>
          <p className="mt-6 text-lg font-medium opacity-80 sm:text-xl">
            Join thousands of users who have streamlined their medicine delivery process.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link to="/register">
              <Button size="lg" variant="secondary" className="h-14 px-10 text-lg font-bold shadow-xl">
                Create Free Account
              </Button>
            </Link>
            <Link to="/pharmacy-partner">
              <Button size="lg" variant="outline" className="h-14 border-white text-white hover:bg-white hover:text-primary px-10 text-lg font-bold">
                Become a Partner
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
           <div className="grid gap-12 md:grid-cols-4">
              <div className="col-span-1 md:col-span-1">
                <Link to="/" className="flex items-center gap-2 mb-6">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-bold">PB</div>
                  <span className="text-xl font-bold underline-offset-4 decoration-primary decoration-4">Pharma<span className="text-primary">Bridge</span></span>
                </Link>
                <p className="text-sm text-slate-500">Digital medicine ordering platform connecting patients with local authorized pharmacies safely.</p>
              </div>
              <div>
                <h4 className="font-bold mb-4">Platform</h4>
                <ul className="space-y-2 text-sm text-slate-500">
                  <li><Link to="/search">Order Medicines</Link></li>
                  <li><Link to="/pharmacy-partner">For Pharmacies</Link></li>
                  <li><Link to="/how-it-works">How it Works</Link></li>
                  <li><Link to="/testimonials">Testimonials</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Support</h4>
                <ul className="space-y-2 text-sm text-slate-500">
                  <li><Link to="/contact">Contact Us</Link></li>
                  <li><Link to="/help">Help Center</Link></li>
                  <li><Link to="/privacy">Privacy Policy</Link></li>
                  <li><Link to="/terms">Terms of Service</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Contact Info</h4>
                <div className="flex flex-col gap-2 text-sm text-slate-500">
                  <p className="flex items-center gap-2"><MapPin className="h-4 w-4" /> 123 Healthcare Way, Metro City, India</p>
                  <p className="flex items-center gap-2"><Clock className="h-4 w-4" /> 24/7 Support Available</p>
                  <p className="flex items-center gap-2 underline decoration-primary font-bold">support@pharmabridge.com</p>
                </div>
              </div>
           </div>
           <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-slate-500">© 2026 PharmaBridge Inc. All rights reserved.</p>
              <div className="flex gap-6">
                 {['Twitter', 'Facebook', 'Instagram', 'LinkedIn'].map(social => (
                   <span key={social} className="text-sm text-slate-500 cursor-pointer hover:text-primary transition-colors">{social}</span>
                 ))}
              </div>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
