/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { LanguageProvider } from './useLanguage';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { MedicineScanner } from './components/MedicineScanner';
import { SymptomChecker } from './components/SymptomChecker';
import { Clinics } from './components/Clinics';
import { Telehealth } from './components/Telehealth';
import { EducationModule } from './components/EducationModule';
import { EmergencyPage } from './components/EmergencyPage';

function AppContent() {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home onTabChange={setActiveTab} />;
      case 'scan':
        return <MedicineScanner />;
      case 'symptoms':
        return <SymptomChecker />;
      case 'clinics':
        return <Clinics />;
      case 'telehealth':
        return <Telehealth />;
      case 'education':
        return <EducationModule />;
      case 'emergency':
        return <EmergencyPage />;
      default:
        return <Home onTabChange={setActiveTab} />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </Layout>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

