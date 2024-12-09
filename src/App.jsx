import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CVGeneratorLanding from './components/CVGeneratorLanding';
import CVGenerator from './components/CVGenerator';
import { Toaster } from "@/components/ui/toaster"

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<CVGeneratorLanding />} />
          <Route path="/cv-generator" element={<CVGenerator />} />
        </Routes>
      </Router>
      <Toaster />
    </>
  );
};

export default App;
