/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Video, Mic, Calendar, User, Clock, MessageSquare, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export function Telehealth() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl text-slate-800 font-bold">Kết nối Bác sĩ từ xa</h2>
        <p className="text-sm text-slate-500">Gặp bác sĩ chuyên khoa qua video ngay tại bản</p>
      </div>

      {/* Featured Doctor */}
      <div className="bg-white rounded-[40px] p-6 shadow-xl border border-slate-100 relative overflow-hidden group">
        <div className="flex gap-5 relative z-10">
          <div className="w-24 h-24 bg-slate-200 rounded-3xl overflow-hidden flex-shrink-0 border-2 border-medical-primary/20">
             <img src="https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=200" alt="Doctor" className="w-full h-full object-cover" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-medical-primary tracking-widest">
              <ShieldCheck size={12} /> Bác sĩ ưu tú
            </div>
            <h3 className="text-xl font-bold text-slate-800">BS. Nguyễn Văn An</h3>
            <p className="text-xs text-slate-500 font-medium">Chuyên khoa Nội tổng quát • 15 năm kinh nghiệm</p>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-[10px] font-bold text-medical-secondary bg-medical-secondary/10 px-2 py-0.5 rounded-full">
                <div className="w-1.5 h-1.5 bg-medical-secondary rounded-full animate-pulse" /> Trực tuyến
              </span>
              <span className="text-[10px] font-bold text-slate-400">Phí: Miễn phí hỗ trợ vùng cao</span>
            </div>
          </div>
        </div>
        <button className="w-full mt-6 bg-medical-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 group-hover:scale-[1.02] transition-transform">
          <Video size={20} /> Bắt đầu cuộc gọi video
        </button>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-panel p-5 rounded-[32px] space-y-3">
           <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center">
              <Calendar size={20} />
           </div>
           <p className="font-bold text-sm text-slate-800">Đặt lịch hẹn</p>
           <p className="text-[10px] text-slate-400 font-medium leading-tight">Chọn giờ bác sĩ rảnh để được tư vấn kỹ hơn.</p>
        </div>
        <div className="glass-panel p-5 rounded-[32px] space-y-3">
           <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
              <MessageSquare size={20} />
           </div>
           <p className="font-bold text-sm text-slate-800">Nhắn tin</p>
           <p className="text-[10px] text-slate-400 font-medium leading-tight">Gửi câu hỏi và ảnh chụp thuốc cho bác sĩ.</p>
        </div>
      </div>

      {/* Upcoming Sessions */}
      <section className="space-y-4">
         <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest px-1">Lịch khám cộng đồng</h3>
         <div className="space-y-3">
            {[1, 2].map(i => (
              <div key={i} className="bg-white p-4 rounded-2xl flex items-center justify-between border border-slate-50">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
                       <Clock size={20} />
                    </div>
                    <div>
                       <p className="text-sm font-bold text-slate-700">Chuyên đề: Dinh dưỡng trẻ em</p>
                       <p className="text-[10px] text-slate-400 font-medium">Thứ 7, 08:30 sáng • Trực tiếp trên ứng dụng</p>
                    </div>
                 </div>
                 <ArrowRight size={16} className="text-slate-300" />
              </div>
            ))}
         </div>
      </section>

      {/* Technical Tip */}
      <div className="p-4 bg-slate-900 rounded-3xl text-white flex gap-4 items-center overflow-hidden relative">
         <div className="w-12 h-12 bg-white/10 rounded-2xl flex-shrink-0 flex items-center justify-center">
            <Mic size={24} className="text-medical-secondary" />
         </div>
         <div className="relative z-10">
            <p className="text-xs font-bold leading-tight">Mẹo đường truyền yếu</p>
            <p className="text-[10px] text-slate-400 mt-1">Nếu mạng bản yếu, hãy chuyển sang chế độ "Chỉ âm thanh" để nghe bác sĩ nói rõ hơn.</p>
         </div>
         <div className="absolute -top-4 -right-4 w-24 h-24 bg-medical-secondary/10 rounded-full blur-2xl" />
      </div>
    </div>
  );
}
