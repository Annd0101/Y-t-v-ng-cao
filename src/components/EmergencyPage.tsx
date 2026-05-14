/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Phone, ShieldAlert, Heart, Truck, MapPin, AlertCircle, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../useLanguage';

export function EmergencyPage() {
  const { t } = useLanguage();

  const emergencyContacts = [
    { title: 'Trạm xá Xã', phone: '115 (Trực 24/7)', sub: 'Gọi cấp cứu xã sở tại', icon: Truck, color: 'bg-medical-danger' },
    { title: 'Công an Bản', phone: '113', sub: 'Hỗ trợ an ninh, cứu hộ', icon: ShieldAlert, color: 'bg-blue-600' },
    { title: 'Tư vấn Bác sĩ', phone: '0888 123 xxx', sub: 'Hỗ trợ sơ cứu ban đầu', icon: Heart, color: 'bg-medical-secondary' },
  ];

  return (
    <div className="space-y-8 pb-20">
      <div className="text-center space-y-4">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto animate-pulse">
           <Phone size={48} className="text-medical-danger" fill="currentColor" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-slate-800 uppercase tracking-tighter">Hỗ trợ khẩn cấp</h2>
          <p className="text-sm text-slate-500 font-medium">Chọn dịch vụ pỉ noòng cần trợ giúp lẹ nhất</p>
        </div>
      </div>

      <div className="space-y-4">
        {emergencyContacts.map((contact, i) => {
          const Icon = contact.icon;
          return (
            <motion.a
                key={i}
                href={`tel:${contact.phone}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white p-6 rounded-[32px] flex items-center justify-between shadow-lg shadow-slate-200/50 border border-slate-100 group"
            >
                <div className="flex items-center gap-5">
                    <div className={`w-14 h-14 ${contact.color} rounded-2xl flex items-center justify-center text-white shadow-xl`}>
                        <Icon size={28} />
                    </div>
                    <div className="space-y-0.5">
                        <h3 className="font-bold text-lg text-slate-800">{contact.title}</h3>
                        <p className="text-2xl font-black text-medical-danger leading-none">{contact.phone}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{contact.sub}</p>
                    </div>
                </div>
            </motion.a>
          );
        })}
      </div>

      {/* Quick Action: Share Location */}
      <div className="glass-panel p-6 rounded-[40px] space-y-5">
         <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><MapPin size={24} /></div>
            <h4 className="font-bold text-slate-800">Chia sẻ vị trí của bạn</h4>
         </div>
         <p className="text-sm text-slate-500 leading-relaxed font-secondary">Dùng chức năng này để đội cứu hộ tìm thấy bạn nhanh hơn trong rừng hoặc vùng núi hẻo lánh.</p>
         <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20">
            Gửi tọa độ GPS ngay
         </button>
      </div>

      {/* First Aid Quick Guide */}
      <section className="space-y-4">
         <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest px-1">Sơ cứu nhanh</h3>
         <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-orange-50 border border-orange-100 rounded-3xl space-y-3">
                <AlertCircle className="text-orange-500" />
                <p className="text-xs font-bold text-slate-700">Khi bị rắn cắn</p>
                <button className="text-[10px] font-bold text-orange-600 bg-white px-2 py-1 rounded-full uppercase">Xem hướng dẫn</button>
            </div>
            <div className="p-4 bg-red-50 border border-red-100 rounded-3xl space-y-3">
                <MessageSquare className="text-red-500" />
                <p className="text-xs font-bold text-slate-700">Khi bị chảy máu</p>
                <button className="text-[10px] font-bold text-red-600 bg-white px-2 py-1 rounded-full uppercase">Xem hướng dẫn</button>
            </div>
         </div>
      </section>

      {/* Offline Notice */}
      <div className="flex justify-center p-6 text-slate-400 gap-2 border-t border-slate-100">
         <AlertCircle size={16} />
         <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Tính năng khẩn cấp luôn hoạt động ngoại tuyến</p>
      </div>
    </div>
  );
}
