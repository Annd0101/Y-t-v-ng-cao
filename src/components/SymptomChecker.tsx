/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from 'react';
import { useLanguage } from '../useLanguage';
import { Camera, AlertTriangle, Loader2, RefreshCcw, Stethoscope, Heart, Thermometer, ShieldAlert, CheckCircle } from 'lucide-react';
import { useGemini } from '../useGemini';
import { SymptomResult } from '../types';
import { motion } from 'motion/react';

export function SymptomChecker() {
  const { t } = useLanguage();
  const { analyzeSymptoms, loading, error } = useGemini();
  const [image, setImage] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [result, setResult] = useState<SymptomResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAnalyze = async () => {
    if (!description && !image) return;
    const data = await analyzeSymptoms(image || undefined, description);
    if (data) setResult(data);
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'emergency': return 'bg-red-600 text-white';
      case 'high': return 'bg-medical-danger text-white';
      case 'medium': return 'bg-orange-500 text-white';
      default: return 'bg-medical-secondary text-white';
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 className="w-12 h-12 text-medical-primary animate-spin" />
        <p className="text-slate-600 font-medium">Bác sĩ AI đang phân tích...</p>
      </div>
    );
  }

  if (result) {
    return (
      <div className="space-y-6 pb-10">
        <div className={`p-4 rounded-2xl flex items-center justify-between font-bold ${getSeverityColor(result.severity)} shadow-lg`}>
          <div className="flex items-center gap-2">
            <ShieldAlert size={24} />
            <span className="uppercase">{result.severity === 'emergency' ? 'CẤP CỨU NGAY' : 'MỨC ĐỘ: ' + result.severity}</span>
          </div>
          <button onClick={() => setResult(null)} className="p-1 hover:bg-black/10 rounded-full">
            <RefreshCcw size={20} />
          </button>
        </div>

        <div className="glass-panel p-6 rounded-3xl space-y-6">
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Phân tích chi tiết</h3>
            <p className="text-slate-800 leading-relaxed font-medium">{result.analysis}</p>
          </div>

          <div className="bg-medical-primary/5 p-5 rounded-2xl border border-medical-primary/10">
            <h3 className="text-xs font-bold text-medical-primary uppercase tracking-widest mb-3">Lời khuyên chuyên gia</h3>
            <p className="text-sm text-slate-700 font-medium">{result.recommendation}</p>
          </div>

          {result.firstAid && (
            <div className="bg-orange-50 p-5 rounded-2xl border border-orange-100">
              <h3 className="text-xs font-bold text-orange-600 uppercase tracking-widest mb-3">Hướng dẫn sơ cứu</h3>
              <p className="text-sm text-slate-700 font-medium">{result.firstAid}</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
           <button className="bg-medical-primary text-white py-4 rounded-2xl font-bold">Gặp bác sĩ từ xa</button>
           <button className="bg-slate-200 text-slate-700 py-4 rounded-2xl font-bold">Tìm trạm xá gần nhất</button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl text-slate-800">{t('symptomPrompt')}</h2>
        <p className="text-sm text-slate-500">Mô tả tình trạng của bạn hoặc chụp ảnh vùng bị thương</p>
      </div>

      <div className="space-y-4">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Ví dụ: Tôi bị đau đầu âm ỉ kèm theo sốt cao 39 độ từ sáng nay..."
          className="w-full h-40 p-5 glass-panel rounded-3xl resize-none outline-none focus:ring-2 ring-medical-primary/20 text-slate-700 font-medium transition-all"
        />

        <div className="flex items-center gap-4">
          <button 
            onClick={() => fileInputRef.current?.click()}
            className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-2xl font-bold transition-all ${
              image ? 'bg-medical-secondary text-white' : 'bg-slate-200 text-slate-600'
            }`}
          >
            {image ? <CheckCircle size={20} /> : <Camera size={20} />}
            {image ? 'Đã thêm ảnh' : 'Chụp ảnh vùng đau'}
          </button>
          {image && (
            <button onClick={() => setImage(null)} className="p-4 bg-slate-100 rounded-2xl text-slate-400">
               <RefreshCcw size={20} />
            </button>
          )}
          <input type="file" accept="image/*" capture="environment" ref={fileInputRef} onChange={handleImage} className="hidden" />
        </div>
      </div>

      <button
        onClick={handleAnalyze}
        disabled={!description && !image}
        className="w-full bg-medical-primary text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-medical-primary/20 disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-3"
      >
        <Stethoscope size={24} />
        Bắt đầu phân tích
      </button>

      {/* Quick Tools */}
      <div className="grid grid-cols-3 gap-3">
         <div className="p-4 glass-panel rounded-2xl flex flex-col items-center gap-1 opacity-50 cursor-not-allowed">
            <Heart size={20} className="text-red-500" />
            <span className="text-[10px] font-bold">Nhịp tim</span>
         </div>
         <div className="p-4 glass-panel rounded-2xl flex flex-col items-center gap-1 opacity-50 cursor-not-allowed">
            <Thermometer size={20} className="text-orange-500" />
            <span className="text-[10px] font-bold">Nhiệt độ</span>
         </div>
         <div className="p-4 glass-panel rounded-2xl flex flex-col items-center gap-1 opacity-50 cursor-not-allowed">
            <AlertTriangle size={20} className="text-yellow-500" />
            <span className="text-[10px] font-bold">Oxy máu</span>
         </div>
      </div>

      {error && <p className="text-medical-danger text-sm text-center font-medium">{error}</p>}
    </div>
  );
}
