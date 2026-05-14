/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, ReactNode } from 'react';
import { useLanguage } from '../useLanguage';
import { Phone, Home, Pill, Activity, MapPin, GraduationCap, Menu, X, Mic } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LayoutProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Layout({ children, activeTab, onTabChange }: LayoutProps) {
  const { t, language, setLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: t('home'), icon: Home },
    { id: 'scan', label: t('scan'), icon: Pill },
    { id: 'symptoms', label: t('symptoms'), icon: Activity },
    { id: 'clinics', label: t('clinics'), icon: MapPin },
    { id: 'education', label: t('education'), icon: GraduationCap },
  ];

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-medical-bg relative overflow-hidden">
      {/* Header */}
      <header className="px-4 py-4 glass-panel sticky top-0 z-50 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-medical-primary rounded-xl flex items-center justify-center text-white shadow-lg">
            <Activity size={24} />
          </div>
          <div>
            <h1 className="text-xl leading-tight text-medical-primary">{t('appName')}</h1>
            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium font-sans">Remote Health AI</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <select 
            className="text-xs bg-slate-100 border-none rounded-lg px-2 py-1 outline-none"
            value={language}
            onChange={(e) => setLanguage(e.target.value as any)}
          >
            <option value="vi">Tiếng Việt</option>
            <option value="hmong">Tiếng H'Mông</option>
            <option value="tay">Tiếng Tày</option>
          </select>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-full large-tap-target"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-4 py-6 scroll-smooth">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* SOS Floating Button (Global) */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onTabChange('emergency')}
        className="absolute bottom-24 right-4 z-40 bg-medical-danger text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 font-bold animate-pulse-soft"
      >
        <Phone size={20} fill="currentColor" />
        {t('sos')}
      </motion.button>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-slate-100 flex justify-around items-center py-3 px-2 z-50">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center gap-1 transition-colors relative large-tap-target ${
                isActive ? 'text-medical-primary' : 'text-slate-400'
              }`}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.label}</span>
              {isActive && (
                <motion.div 
                  layoutId="activeNav"
                  className="absolute -top-3 w-1 h-1 bg-medical-primary rounded-full"
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Voice Assistant UI Overlay */}
      <div className="fixed bottom-0 left-0 right-0 pointer-events-none flex justify-center py-6 z-50">
         <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            const msg = new SpeechSynthesisUtterance(t('voicePrompt'));
            msg.lang = language === 'vi' ? 'vi-VN' : 'en-US';
            window.speechSynthesis.speak(msg);
          }}
          className="w-14 h-14 bg-white shadow-2xl rounded-full flex items-center justify-center border-4 border-medical-primary text-medical-primary pointer-events-auto active:bg-medical-primary active:text-white transition-colors"
         >
           <Mic size={28} />
         </motion.button>
      </div>

      {/* Side Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/40 z-[60] backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed right-0 top-0 bottom-0 w-64 bg-white z-[70] p-6 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl">Danh mục</h2>
                <button onClick={() => setIsMenuOpen(false)}><X size={24} /></button>
              </div>
              <ul className="space-y-4">
                <li className="p-3 hover:bg-slate-50 rounded-xl cursor-pointer">Cài đặt</li>
                <li className="p-3 hover:bg-slate-50 rounded-xl cursor-pointer">Lịch sử quét thuốc</li>
                <li className="p-3 hover:bg-slate-50 rounded-xl cursor-pointer">Hồ sơ sức khỏe</li>
                <li className="p-3 hover:bg-slate-50 rounded-xl cursor-pointer">Chia sẻ ứng dụng</li>
                <li className="p-3 text-medical-danger font-medium">Báo cáo lỗi khẩn cấp</li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
