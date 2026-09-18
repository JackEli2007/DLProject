import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import Lab from './pages/Lab.jsx';
import JKSimulator from './pages/jkflipflop/JKSimulator.jsx';
import JKExperiment from './pages/jkflipflop/JKExperiment.jsx';
import RaceAround from './pages/jkflipflop/RaceAround.jsx';
import MasterSlave from './pages/jkflipflop/MasterSlave.jsx';
import CharExplorer from './pages/charcodes/CharExplorer.jsx';
import ASCIIExplorer from './pages/charcodes/ASCIIExplorer.jsx';
import UnicodeExplorer from './pages/charcodes/UnicodeExplorer.jsx';
import UTF8Visualizer from './pages/charcodes/UTF8Visualizer.jsx';
import Converter from './pages/charcodes/Converter.jsx';
import ComparisonLab from './pages/charcodes/ComparisonLab.jsx';

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Lab />} />

        {/* JK Flip-Flop Labs */}
        <Route path="/lab/jk-simulator" element={<JKSimulator />} />
        <Route path="/lab/jk-experiment" element={<JKExperiment />} />
        <Route path="/lab/race-around" element={<RaceAround />} />
        <Route path="/lab/master-slave" element={<MasterSlave />} />

        {/* Character Codes Labs */}
        <Route path="/lab/char-explorer" element={<CharExplorer />} />
        <Route path="/lab/ascii-explorer" element={<ASCIIExplorer />} />
        <Route path="/lab/unicode-explorer" element={<UnicodeExplorer />} />
        <Route path="/lab/utf8-visualizer" element={<UTF8Visualizer />} />
        <Route path="/lab/converter" element={<Converter />} />
        <Route path="/lab/comparison" element={<ComparisonLab />} />
      </Route>
    </Routes>
  );
};

export default App;
