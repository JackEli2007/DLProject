import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import Home from './pages/Home.jsx';
import Learn from './pages/Learn.jsx';
import Lab from './pages/Lab.jsx';
import Practice from './pages/Practice.jsx';
import Challenges from './pages/Challenges.jsx';
import Quiz from './pages/Quiz.jsx';
import Progress from './pages/Progress.jsx';
import JKLessons from './pages/jkflipflop/JKLessons.jsx';
import JKSimulator from './pages/jkflipflop/JKSimulator.jsx';
import JKExperiment from './pages/jkflipflop/JKExperiment.jsx';
import RaceAround from './pages/jkflipflop/RaceAround.jsx';
import MasterSlave from './pages/jkflipflop/MasterSlave.jsx';
import CharLessons from './pages/charcodes/CharLessons.jsx';
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
        <Route path="/" element={<Home />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/lab" element={<Lab />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/progress" element={<Progress />} />

        {/* JK Flip-Flop Module */}
        <Route path="/learn/jk-flipflop" element={<JKLessons />} />
        <Route path="/lab/jk-simulator" element={<JKSimulator />} />
        <Route path="/lab/jk-experiment" element={<JKExperiment />} />
        <Route path="/lab/race-around" element={<RaceAround />} />
        <Route path="/lab/master-slave" element={<MasterSlave />} />

        {/* Character Codes Module */}
        <Route path="/learn/char-codes" element={<CharLessons />} />
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
