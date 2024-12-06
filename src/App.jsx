import React, { useState } from 'react';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import Auth from './Components/Auth';
import Menu from './Components/Menu';
import GenshinImpact from './Components/GenshinImpact/GenshinImpact';
import HonkaiStarRail from './Components/HonkaiStarRail/HonkaiStarRail';
import ZenlessZoneZero from './Components/ZenlessZoneZero/ZenlessZoneZero';
import WutheringWaves from './Components/WutheringWaves/WutheringWaves';

function App() {
  const [uid, setUid] = useState(null);

  return (
    <HashRouter>
      <Auth setUid={setUid} />
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/genshin-impact" element={<GenshinImpact uid={uid} />} />
        <Route path="/honkai-star-rail" element={<HonkaiStarRail uid={uid} />} />
        <Route path="/zenless-zone-zero" element={<ZenlessZoneZero uid={uid} />} />
        <Route path="/wuthering-waves" element={<WutheringWaves uid={uid} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
