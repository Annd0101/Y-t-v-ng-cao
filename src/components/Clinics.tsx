/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { useLanguage } from '../useLanguage';
import { MapPin, Phone, Clock, ChevronRight, Navigation2, Search, Info, Activity, Pill } from 'lucide-react';
import { Clinic } from '../types';

export function Clinics() {
  const { t } = useLanguage();
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated GPS lookup
    setTimeout(() => {
      setClinics([
        { id: '1', name: 'Trạm y tế Xã Lóng Luông', distance: '1.2 km', address: 'Bản Pa Háng, Lóng Luông, Vân Hồ', phone: '0212 3456 789', type: 'clinic', lat: 0, lng: 0 },
        { id: '2', name: 'Nhà thuốc Vân Hồ', distance: '3.5 km', address: 'Thị trấn Vân Hồ, Sơn La', phone: '0987 654 321', type: 'pharmacy', lat: 0, lng: 0 },
        { id: '3', name: 'Bệnh viện Đa khoa Mộc Châu', distance: '12.8 km', address: 'Tiểu khu 10, Mộc Châu, Sơn La', phone: '0212 852 115', type: 'hospital', lat: 0, lng: 0 },
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-48 bg-slate-200 rounded-3xl animate-pulse" />
        <div className="space-y-4">
          {[1, 2, 3].map(i => <div key={i} className="h-24 bg-slate-100 rounded-2xl animate-pulse" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-4 flex items-center text-slate-400">
           <Search size={20} />
        </div>
        <input 
          type="text" 
          placeholder="Tìm trạm xá, nhà thuốc..."
          className="w-full pl-12 pr-4 py-4 glass-panel rounded-2xl outline-none focus:ring-2 ring-medical-primary/20"
        />
      </div>

      {/* Simulated Map View */}
      <div className="relative h-56 rounded-3xl overflow-hidden shadow-lg border-4 border-white">
        <div className="absolute inset-0 bg-slate-200 flex items-center justify-center">
           <div className="relative">
              <MapPin size={48} className="text-medical-primary animate-bounce" fill="white" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-1 bg-black/10 rounded-full blur-sm" />
           </div>
           <p className="absolute bottom-4 left-0 right-0 text-center font-bold text-slate-500 text-xs uppercase tracking-widest">Bản đồ vệ tinh vùng cao</p>
        </div>
        <div className="absolute top-4 right-4 flex flex-col gap-2">
           <button className="p-2 bg-white rounded-lg shadow-md"><Plus size={20} /></button>
           <button className="p-2 bg-white rounded-lg shadow-md"><Minus size={20} /></button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest px-1">Danh sách gần bạn</h3>
        {clinics.map(clinic => (
          <div key={clinic.id} className="glass-panel p-5 rounded-[32px] flex items-center justify-between hover:bg-slate-50 transition-colors group cursor-pointer">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-2xl ${clinic.type === 'hospital' ? 'bg-red-500' : clinic.type === 'pharmacy' ? 'bg-medical-secondary' : 'bg-medical-primary'} text-white shadow-lg`}>
                {clinic.type === 'hospital' ? <Activity size={24} /> : clinic.type === 'pharmacy' ? <Pill size={24} /> : <MapPin size={24} />}
              </div>
              <div>
                <h4 className="text-lg leading-tight text-slate-800">{clinic.name}</h4>
                <div className="flex items-center gap-3 text-xs text-slate-500 font-medium mt-1">
                  <span className="flex items-center gap-1"><Clock size={12} /> {clinic.distance}</span>
                  <span className="flex items-center gap-1"><Navigation2 size={12} /> Dẫn đường</span>
                </div>
              </div>
            </div>
            <button className="p-3 bg-slate-100 rounded-2xl group-hover:bg-medical-primary group-hover:text-white transition-colors">
              <Phone size={20} />
            </button>
          </div>
        ))}
      </div>

      <div className="p-4 bg-orange-50 border border-orange-100 rounded-2xl space-y-2">
        <div className="flex items-center gap-2 text-orange-600 font-bold text-xs uppercase">
          <Info size={16} /> Lưu ý vùng cao
        </div>
        <p className="text-xs text-slate-600 leading-relaxed italic">Vào mùa mưa lũ, một số tuyến đường bản có thể bị sạt lở. Vui lòng gọi điện trước khi di chuyển.</p>
      </div>
    </div>
  );
}

function Plus({ size }: { size: number }) { return <span className="font-bold text-xl">+</span>; }
function Minus({ size }: { size: number }) { return <span className="font-bold text-xl">-</span>; }
