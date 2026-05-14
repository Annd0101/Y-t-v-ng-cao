/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GraduationCap, Play, ChevronRight, BookOpen, HeartPulse, Apple, Baby } from 'lucide-react';
import { useLanguage } from '../useLanguage';

export function EducationModule() {
  const { t } = useLanguage();

  const categories = [
    { name: 'Sức khỏe Mẹ & Bé', icon: Baby, color: 'bg-pink-100 text-pink-600', count: '12 bài viết' },
    { name: 'Dinh dưỡng Vùng Cao', icon: Apple, color: 'bg-green-100 text-green-600', count: '8 video' },
    { name: 'Phòng dịch bệnh', icon: HeartPulse, color: 'bg-red-100 text-red-600', count: '15 bài viết' },
    { name: 'Sử dụng thuốc an toàn', icon: BookOpen, color: 'bg-blue-100 text-blue-600', count: '5 video' },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl text-slate-800 font-bold">{t('education')}</h2>
        <p className="text-sm text-slate-500">Cẩm nang sống khỏe dễ hiểu nhất cho bà con</p>
      </div>

      {/* Featured Video Card */}
      <div className="relative aspect-video rounded-[32px] overflow-hidden group cursor-pointer shadow-xl">
         <img 
           src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=800" 
           alt="Health Lesson" 
           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
         />
         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
            <h3 className="text-white text-xl font-bold leading-tight mb-2">Cách rửa tay và vệ sinh bản làng mùa mưa</h3>
            <div className="flex items-center gap-3">
               <span className="bg-medical-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-widest">Video mới</span>
               <span className="text-white/60 text-xs font-medium uppercase tracking-widest">5:30 phút</span>
            </div>
         </div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 text-white group-hover:scale-125 transition-transform">
            <Play size={24} fill="white" />
         </div>
      </div>

      {/* Categories Grid */}
      <section className="space-y-4">
         <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest px-1">Chủ đề phổ biến</h3>
         <div className="grid grid-cols-2 gap-4">
            {categories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <div key={i} className="glass-panel p-5 rounded-[32px] space-y-3 cursor-pointer hover:shadow-md transition-shadow">
                   <div className={`w-12 h-12 ${cat.color} rounded-2xl flex items-center justify-center`}>
                      <Icon size={28} />
                   </div>
                   <div>
                      <p className="font-bold text-sm text-slate-800 leading-tight">{cat.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-widest">{cat.count}</p>
                   </div>
                </div>
              );
            })}
         </div>
      </section>

      {/* Quick Tips List */}
      <section className="space-y-4">
         <div className="flex justify-between items-end px-1">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Bài viết nổi bật</h3>
            <span className="text-xs text-medical-primary font-bold">Tất cả</span>
         </div>
         <div className="space-y-3">
            {[
              "Làm gì khi bị sốt đột ngột trong đêm?",
              "Chế độ ăn cho người già bị cao huyết áp",
              "Phân biệt cây thuốc quý và cỏ độc"
            ].map((title, i) => (
              <div key={i} className="bg-white p-4 rounded-2xl flex items-center justify-between border border-slate-50 group cursor-pointer hover:bg-slate-50">
                 <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">{i+1}</div>
                    <p className="text-sm font-medium text-slate-700 leading-snug">{title}</p>
                 </div>
                 <ChevronRight size={16} className="text-slate-300 group-hover:text-medical-primary transition-colors" />
              </div>
            ))}
         </div>
      </section>
    </div>
  );
}
