/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from 'react';
import { useLanguage } from '../useLanguage';
import { Camera, Upload, RotateCcw, CheckCircle, AlertCircle, Info, Loader2 } from 'lucide-react';
import { useGemini } from '../useGemini';
import { MedicineInfo } from '../types';
import { motion } from 'motion/react';

export function MedicineScanner() {
  const { t } = useLanguage();
  const { identifyMedicine, loading, error } = useGemini();
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<MedicineInfo | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCapture = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result as string;
      setImage(base64);
      const data = await identifyMedicine(base64);
      if (data) setResult(data);
    };
    reader.readAsDataURL(file);
  };

  const reset = () => {
    setImage(null);
    setResult(null);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 className="w-12 h-12 text-medical-primary animate-spin" />
        <p className="text-slate-600 font-medium animate-pulse">{t('scanning')}...</p>
        <p className="text-xs text-slate-400">Đang phân tích hình ảnh nhãn thuốc</p>
      </div>
    );
  }

  if (result) {
    return (
      <div className="space-y-6 pb-10">
        <div className="flex items-center justify-between">
          <button onClick={reset} className="text-slate-500 flex items-center gap-1 text-sm">
            <RotateCcw size={16} /> Quét lại
          </button>
          {result.isSafe ? (
            <div className="bg-medical-secondary/10 text-medical-secondary px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <CheckCircle size={14} /> AN TOÀN
            </div>
          ) : (
            <div className="bg-medical-danger/10 text-medical-danger px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <AlertCircle size={14} /> CẢNH BÁO
            </div>
          )}
        </div>

        <div className="glass-panel p-6 rounded-3xl space-y-4">
          <div className="flex items-start gap-4">
            <img src={image!} alt="Drug" className="w-24 h-24 object-cover rounded-2xl shadow-md border-2 border-white" />
            <div>
              <h2 className="text-2xl text-slate-900">{result.name}</h2>
              <p className="text-medical-primary font-medium text-sm">{result.type}</p>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                <Info size={14} /> {t('usage')}
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">{result.usage}</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                <RotateCcw size={14} /> {t('dosage')}
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">{result.dosage}</p>
            </div>

            <div className="bg-medical-danger/5 p-4 rounded-2xl border border-medical-danger/10">
              <h3 className="text-xs font-bold text-medical-danger uppercase tracking-wider mb-2 flex items-center gap-1">
                <AlertCircle size={14} /> {t('safetyWarning')}
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">{result.warnings}</p>
            </div>
          </div>
        </div>

        <button className="w-full bg-medical-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-medical-primary/20">
          Đặt lời nhắc uống thuốc
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl text-slate-800">{t('scanPrompt')}</h2>
        <p className="text-sm text-slate-500">Giữ camera ổn định và đủ ánh sáng để nhận diện chính xác</p>
      </div>

      <div 
        onClick={() => fileInputRef.current?.click()}
        className="aspect-square bg-slate-100 rounded-3xl border-4 border-dashed border-slate-200 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
      >
        <div className="w-20 h-20 bg-white rounded-full shadow-xl flex items-center justify-center text-medical-primary">
          <Camera size={40} />
        </div>
        <p className="font-bold text-slate-500">Chụp ảnh nhãn thuốc</p>
        <input 
          type="file" 
          accept="image/*" 
          capture="environment" 
          ref={fileInputRef} 
          onChange={handleCapture}
          className="hidden" 
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-col items-center gap-3 p-6 glass-panel rounded-3xl text-slate-600 hover:text-medical-primary transition-colors"
        >
          <Upload size={24} />
          <span className="text-xs font-bold">Tải ảnh lên</span>
        </button>
        <div className="flex flex-col items-center gap-3 p-6 glass-panel rounded-3xl text-slate-600">
           <Info size={24} />
           <span className="text-xs font-bold text-center">Hướng dẫn nhận diện</span>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-medical-danger/10 text-medical-danger rounded-2xl text-sm font-medium flex items-center gap-2">
          <AlertCircle size={20} />
          {error}
        </div>
      )}
    </div>
  );
}
