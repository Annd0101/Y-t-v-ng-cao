/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useLanguage } from '../useLanguage';
import { Pill, Activity, MapPin, GraduationCap, Phone, Info, ChevronRight, HeartPulse, ShieldCheck, Stethoscope } from 'lucide-react';
import { motion } from 'motion/react';

export function Home({ onTabChange }: { onTabChange: (tab: string) => void }) {
  const { t } = useLanguage();

  const quickActions = [
    { id: 'scan', label: t('scan'), icon: Pill, color: 'bg-medical-primary', desc: 'Xác định loại thuốc' },
    { id: 'symptoms', label: t('symptoms'), icon: Activity, color: 'bg-medical-secondary', desc: 'Kiểm tra sức khỏe' },
    { id: 'clinics', label: t('clinics'), icon: MapPin, color: 'bg-orange-500', desc: 'Tìm trạm xá gần nhất' },
    { id: 'education', label: t('education'), icon: GraduationCap, color: 'bg-purple-500', desc: 'Kiến thức y tế' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome & Stats */}
      <section className="space-y-2">
        <h2 className="text-3xl text-slate-800 leading-tight">Chào bạn,<br/><span className="text-medical-primary font-bold">Cùng sống khỏe!</span></h2>
        <p className="text-sm text-slate-500 font-medium">Hôm nay bạn thấy thế nào?</p>
      </section>

      {/* Hero Card */}
      <div className="bg-medical-primary rounded-3xl p-6 text-white shadow-2xl shadow-medical-primary/30 relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2 bg-white/20 w-fit px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest border border-white/30 backdrop-blur-sm">
            <HeartPulse size={12} /> Live AI Support
          </div>
          <h3 className="text-2xl font-bold leading-tight">Gặp bác sĩ trực tuyến<br/>miễn phí sáng nay!</h3>
          <button 
            onClick={() => onTabChange('telehealth')}
            className="bg-white text-medical-primary px-6 py-3 rounded-2xl font-bold text-sm shadow-xl"
          >
            Đăng ký ngay
          </button>
        </div>
        <Stethoscope className="absolute -bottom-4 -right-4 w-32 h-32 opacity-20 rotate-12" />
      </div>

      {/* Grid Menu */}
      <section className="space-y-4">
        <div className="flex justify-between items-end px-1">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Dịch vụ ưu tiên</h3>
          <span className="text-xs text-medical-primary font-bold">Xem tất cả</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={action.id}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onTabChange(action.id)}
                className="p-6 glass-panel rounded-[32px] flex flex-col items-start gap-4 text-left group"
              >
                <div className={`p-3 rounded-2xl ${action.color} text-white shadow-lg shadow-${action.color}/20 group-hover:scale-110 transition-transform`}>
                  <Icon size={24} />
                </div>
                <div>
                  <p className="font-bold text-slate-800 block">{action.label}</p>
                  <p className="text-[10px] text-slate-400 font-medium">{action.desc}</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Safety Tips Horizontal */}
      <section className="space-y-4">
         <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest px-1">Mẹo sống khỏe bản vùng cao</h3>
         <div className="flex gap-4 overflow-x-auto pb-4 snap-x no-scrollbar">
            {[1, 2, 3].map((i) => (
              <div key={i} className="min-w-[280px] snap-center glass-panel p-5 rounded-3xl flex gap-4 items-center">
                 <div className="w-16 h-16 bg-slate-100 rounded-2xl flex-shrink-0 flex items-center justify-center text-slate-400">
                    <ShieldCheck size={32} />
                 </div>
                 <div className="space-y-1">
                    <p className="font-bold text-sm text-slate-800">Rửa tay sạch sẽ {i}</p>
                    <p className="text-xs text-slate-400 leading-tight">Phòng tránh bệnh đường ruột và dịch cúm mùa này.</p>
                 </div>
              </div>
            ))}
         </div>
      </section>

      {/* Emergency Quick Access */}
      <div className="bg-medical-danger/10 border border-medical-danger/20 rounded-3xl p-5 flex items-center justify-between group cursor-pointer" onClick={() => onTabChange('emergency')}>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-medical-danger rounded-2xl flex items-center justify-center text-white shadow-lg">
            <Phone size={24} fill="white" />
          </div>
          <div>
            <p className="font-bold text-medical-danger">Hỗ trợ khẩn cấp</p>
            <p className="text-[10px] text-medical-danger/60 font-bold uppercase tracking-widest">Luôn sẵn sàng 24/7</p>
          </div>
        </div>
        <ChevronRight className="text-medical-danger group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
}
