import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden font-display bg-[#f5f7f8] dark:bg-[#101c22] text-slate-900 dark:text-slate-100">
      <div className="layout-container flex h-full grow flex-col">
        {/* TopNavBar */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 px-6 py-3 lg:px-40 bg-white dark:bg-[#101c22] sticky top-0 z-50">
          <Link to="/" className="flex items-center gap-4">
            <div className="size-8 text-[#0da2e7] flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl font-bold">medical_services</span>
            </div>
            <h2 className="text-slate-900 dark:text-slate-100 text-xl font-bold leading-tight tracking-tight">PharmaBridge</h2>
          </Link>
          <div className="flex flex-1 justify-end gap-8">
            <div className="hidden md:flex items-center gap-9">
              <a className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-[#0da2e7] transition-colors" href="#how-it-works">How It Works</a>
              <a className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-[#0da2e7] transition-colors" href="#features">Features</a>
              <a className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-[#0da2e7] transition-colors" href="#reviews">Reviews</a>
            </div>
            <div className="flex gap-2">
              <Link to="/register">
                <button className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-xl h-10 px-4 bg-[#0da2e7] text-white text-sm font-bold tracking-wide hover:opacity-90 transition-opacity">
                  <span>Get Started</span>
                </button>
              </Link>
              <Link to="/login">
                <button className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-xl h-10 px-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                  <span>Login</span>
                </button>
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1">
          {/* Hero Section */}
          <div className="px-6 lg:px-40 py-12 md:py-20">
            <div className="flex flex-col gap-8 lg:flex-row items-center">
              <div className="flex flex-col gap-6 lg:w-1/2 lg:pr-12">
                <div className="flex flex-col gap-4">
                  <h1 className="text-slate-900 dark:text-white text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
                    Order Medicines from Your Trusted Local Pharmacy
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl font-normal leading-relaxed">
                    Upload prescriptions, track orders, manage your health — all in one place. Fast delivery from neighborhood experts.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Link to="/register">
                    <button className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-xl h-14 px-8 bg-[#0da2e7] text-white text-base font-bold shadow-lg shadow-[#0da2e7]/20 hover:scale-105 transition-transform">
                      <span>Get Started Now</span>
                    </button>
                  </Link>
                  <Link to="/search">
                    <button className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-xl h-14 px-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-base font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                      <span>View Local Prices</span>
                    </button>
                  </Link>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-200"></div>
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-300"></div>
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-400"></div>
                  </div>
                  <span>Trusted by 10,000+ happy patients</span>
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <div 
                    className="aspect-video bg-cover bg-center" 
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBe9SqW0C_XttYUfoo0XfZRGTRkF5nuTzbivzmlRXQhO79v1LLrwUPNnQvJc385IZ0lMiNFOkvRi5scYp1SG_QTja2scVH54NNOes-ny4iwMqI8NMhUDuqNb4GN1tFqvLPhih_jDQxs9bD7AFs1GlIA5_fgfoBUroRGJQokSfD6WGn7uBcka4FLMdMCPAjTzm6f_djTfGDdv0ehmemsgnJiSDN8SGfB28a2UzXe9Jme_G5G27I4ynuxlYJarwFbNCC2vlkfr7jaSlA")' }}
                  ></div>
                  <div className="absolute inset-0 bg-[#0da2e7]/10 mix-blend-multiply"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Highlights */}
          <section className="bg-white dark:bg-[#101c22] py-20 px-6 lg:px-40 border-y border-slate-100 dark:border-slate-800" id="features">
            <div className="max-w-[1200px] mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-black mb-4">Why PharmaBridge?</h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">Experience the future of healthcare with our comprehensive digital pharmacy services designed for your convenience.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Feature 1 */}
                <div className="group flex flex-col gap-4 p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 hover:border-[#0da2e7]/50 transition-all hover:shadow-xl hover:shadow-[#0da2e7]/5">
                  <div className="w-12 h-12 rounded-xl bg-[#0da2e7]/10 text-[#0da2e7] flex items-center justify-center group-hover:bg-[#0da2e7] group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-2xl">upload_file</span>
                  </div>
                  <h3 className="text-slate-900 dark:text-white text-xl font-bold">Upload Prescription</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Simply snap a photo of your prescription and upload it securely. We handle the rest.</p>
                </div>
                {/* Feature 2 */}
                <div className="group flex flex-col gap-4 p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 hover:border-[#0da2e7]/50 transition-all hover:shadow-xl hover:shadow-[#0da2e7]/5">
                  <div className="w-12 h-12 rounded-xl bg-[#0da2e7]/10 text-[#0da2e7] flex items-center justify-center group-hover:bg-[#0da2e7] group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-2xl">monitoring</span>
                  </div>
                  <h3 className="text-slate-900 dark:text-white text-xl font-bold">Track Orders</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Monitor your delivery status in real-time. Know exactly when your meds will arrive.</p>
                </div>
                {/* Feature 3 */}
                <div className="group flex flex-col gap-4 p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 hover:border-[#0da2e7]/50 transition-all hover:shadow-xl hover:shadow-[#0da2e7]/5">
                  <div className="w-12 h-12 rounded-xl bg-[#0da2e7]/10 text-[#0da2e7] flex items-center justify-center group-hover:bg-[#0da2e7] group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-2xl">autorenew</span>
                  </div>
                  <h3 className="text-slate-900 dark:text-white text-xl font-bold">Repeat Orders</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">One-click refills and smart reminders. Never miss a dose of your regular medication.</p>
                </div>
                {/* Feature 4 */}
                <div className="group flex flex-col gap-4 p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 hover:border-[#0da2e7]/50 transition-all hover:shadow-xl hover:shadow-[#0da2e7]/5">
                  <div className="w-12 h-12 rounded-xl bg-[#0da2e7]/10 text-[#0da2e7] flex items-center justify-center group-hover:bg-[#0da2e7] group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-2xl">local_shipping</span>
                  </div>
                  <h3 className="text-slate-900 dark:text-white text-xl font-bold">Home Delivery</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Same-day delivery from your trusted neighborhood pharmacy right to your doorstep.</p>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-20 px-6 lg:px-40" id="how-it-works">
            <div className="max-w-[1200px] mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-black mb-4">How It Works</h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg">Getting your medication delivered is simple and secure.</p>
              </div>
              <div className="relative">
                {/* Connection Line */}
                <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 dark:bg-slate-800 -translate-y-12"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12">
                  {/* Step 1 */}
                  <div className="relative flex flex-col items-center text-center gap-4">
                    <div className="z-10 w-16 h-16 rounded-full bg-white dark:bg-slate-800 border-4 border-[#0da2e7] text-[#0da2e7] flex items-center justify-center mb-2 shadow-lg">
                      <span className="material-symbols-outlined text-3xl">person_add</span>
                    </div>
                    <h4 className="text-slate-900 dark:text-white font-bold text-lg">Register Account</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Create your secure profile in seconds</p>
                  </div>
                  {/* Step 2 */}
                  <div className="relative flex flex-col items-center text-center gap-4">
                    <div className="z-10 w-16 h-16 rounded-full bg-white dark:bg-slate-800 border-4 border-[#0da2e7] text-[#0da2e7] flex items-center justify-center mb-2 shadow-lg">
                      <span className="material-symbols-outlined text-3xl">add_photo_alternate</span>
                    </div>
                    <h4 className="text-slate-900 dark:text-white font-bold text-lg">Upload Rx</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Scan or snap your prescription document</p>
                  </div>
                  {/* Step 3 */}
                  <div className="relative flex flex-col items-center text-center gap-4">
                    <div className="z-10 w-16 h-16 rounded-full bg-white dark:bg-slate-800 border-4 border-[#0da2e7] text-[#0da2e7] flex items-center justify-center mb-2 shadow-lg">
                      <span className="material-symbols-outlined text-3xl">fact_check</span>
                    </div>
                    <h4 className="text-slate-900 dark:text-white font-bold text-lg">Review</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Verified by a certified local pharmacist</p>
                  </div>
                  {/* Step 4 */}
                  <div className="relative flex flex-col items-center text-center gap-4">
                    <div className="z-10 w-16 h-16 rounded-full bg-white dark:bg-slate-800 border-4 border-[#0da2e7] text-[#0da2e7] flex items-center justify-center mb-2 shadow-lg">
                      <span className="material-symbols-outlined text-3xl">payments</span>
                    </div>
                    <h4 className="text-slate-900 dark:text-white font-bold text-lg">Pay Securely</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Transparent pricing and secure checkout</p>
                  </div>
                  {/* Step 5 */}
                  <div className="relative flex flex-col items-center text-center gap-4">
                    <div className="z-10 w-16 h-16 rounded-full bg-[#0da2e7] text-white flex items-center justify-center mb-2 shadow-lg">
                      <span className="material-symbols-outlined text-3xl">moped</span>
                    </div>
                    <h4 className="text-slate-900 dark:text-white font-bold text-lg">Fast Delivery</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Delivered to your door same-day</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="bg-[#0da2e7]/5 dark:bg-[#0da2e7]/10 py-20 px-6 lg:px-40" id="reviews">
            <div className="max-w-[1200px] mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-black mb-4">Patient Reviews</h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg">Hear what our community has to say about the service.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Testimonial 1 */}
                <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                  <div className="flex text-yellow-400 mb-4">
                    <span className="material-symbols-outlined fill-current">star</span>
                    <span className="material-symbols-outlined fill-current">star</span>
                    <span className="material-symbols-outlined fill-current">star</span>
                    <span className="material-symbols-outlined fill-current">star</span>
                    <span className="material-symbols-outlined fill-current">star</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 italic mb-6">"PharmaBridge has been a lifesaver for my elderly parents. The setup was easy and the medications always arrive exactly when expected."</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#0da2e7]/20 flex items-center justify-center text-[#0da2e7] font-bold">SC</div>
                    <div>
                      <h5 className="text-slate-900 dark:text-white font-bold text-sm">Sarah Chen</h5>
                      <p className="text-slate-500 text-xs">Customer since 2022</p>
                    </div>
                  </div>
                </div>
                {/* Testimonial 2 */}
                <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                  <div className="flex text-yellow-400 mb-4">
                    <span className="material-symbols-outlined fill-current">star</span>
                    <span className="material-symbols-outlined fill-current">star</span>
                    <span className="material-symbols-outlined fill-current">star</span>
                    <span className="material-symbols-outlined fill-current">star</span>
                    <span className="material-symbols-outlined fill-current">star</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 italic mb-6">"I love supporting my local pharmacy while getting the convenience of a modern app. The prescription upload feature is flawlessly designed."</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#0da2e7]/20 flex items-center justify-center text-[#0da2e7] font-bold">MR</div>
                    <div>
                      <h5 className="text-slate-900 dark:text-white font-bold text-sm">Marcus Rodriguez</h5>
                      <p className="text-slate-500 text-xs">Healthcare Advocate</p>
                    </div>
                  </div>
                </div>
                {/* Testimonial 3 */}
                <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                  <div className="flex text-yellow-400 mb-4">
                    <span className="material-symbols-outlined fill-current">star</span>
                    <span className="material-symbols-outlined fill-current">star</span>
                    <span className="material-symbols-outlined fill-current">star</span>
                    <span className="material-symbols-outlined fill-current">star</span>
                    <span className="material-symbols-outlined fill-current">star</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 italic mb-6">"Fast, reliable, and trustworthy. The pharmacist review step gives me peace of mind that I'm getting the right medication every time."</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#0da2e7]/20 flex items-center justify-center text-[#0da2e7] font-bold">EK</div>
                    <div>
                      <h5 className="text-slate-900 dark:text-white font-bold text-sm">Elena Kovic</h5>
                      <p className="text-slate-500 text-xs">Frequent User</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-white dark:bg-[#101c22] border-t border-slate-200 dark:border-slate-800 px-6 lg:px-40 py-12">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="size-6 text-[#0da2e7] flex items-center justify-center">
                  <span className="material-symbols-outlined font-bold">medical_services</span>
                </div>
                <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold">PharmaBridge</h2>
              </div>
              <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-6">
                Bridging the gap between you and your neighborhood pharmacy. Healthcare made accessible, digital, and personal.
              </p>
              <div className="flex gap-4">
                <a className="text-slate-400 hover:text-[#0da2e7]" href="#"><span className="material-symbols-outlined">social_leaderboard</span></a>
                <a className="text-slate-400 hover:text-[#0da2e7]" href="#"><span className="material-symbols-outlined">share</span></a>
                <a className="text-slate-400 hover:text-[#0da2e7]" href="#"><span className="material-symbols-outlined">alternate_email</span></a>
              </div>
            </div>
            <div>
              <h4 className="text-slate-900 dark:text-white font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4">
                <li><a className="text-slate-500 hover:text-[#0da2e7] text-sm transition-colors" href="#">How It Works</a></li>
                <li><a className="text-slate-500 hover:text-[#0da2e7] text-sm transition-colors" href="#">Partner Pharmacies</a></li>
                <li><a className="text-slate-500 hover:text-[#0da2e7] text-sm transition-colors" href="#">Download App</a></li>
                <li><a className="text-slate-500 hover:text-[#0da2e7] text-sm transition-colors" href="#">FAQs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-900 dark:text-white font-bold mb-6">Legal & Contact</h4>
              <ul className="space-y-4">
                <li><a className="text-slate-500 hover:text-[#0da2e7] text-sm transition-colors" href="#">Terms of Service</a></li>
                <li><a className="text-slate-500 hover:text-[#0da2e7] text-sm transition-colors" href="#">Privacy Policy</a></li>
                <li><a className="text-slate-500 hover:text-[#0da2e7] text-sm transition-colors" href="#">HIPAA Compliance</a></li>
                <li><a className="text-slate-500 hover:text-[#0da2e7] text-sm transition-colors" href="#">Contact Support</a></li>
              </ul>
            </div>
          </div>
          <div className="max-w-[1200px] mx-auto border-t border-slate-100 dark:border-slate-800 mt-12 pt-8 text-center text-slate-400 text-sm">
            © 2026 PharmaBridge Inc. All rights reserved. Your health is our bridge to the community.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
