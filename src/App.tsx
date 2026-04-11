/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ShowcasePage } from './pages/ShowcasePage';
import { SpeedyInventoryPage } from './pages/SpeedyInventoryPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShowcasePage />} />
        <Route path="/speedy-inventory" element={<SpeedyInventoryPage />} />
      </Routes>
    </Router>
  );
}
