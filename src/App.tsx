import { Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import MortgageCalculator from './pages/MortgageCalculator';
import CompoundInterest from './pages/CompoundInterest';
import PercentageFinder from './pages/PercentageFinder';
import UnitConverter from './pages/UnitConverter';
import Insights from './pages/Insights';
import Article from './pages/Article';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="mortgage-calculator" element={<MortgageCalculator />} />
        <Route path="compound-interest" element={<CompoundInterest />} />
        <Route path="percentage" element={<PercentageFinder />} />
        <Route path="unit-converter" element={<UnitConverter />} />
        <Route path="insights" element={<Insights />} />
        <Route path="insights/:slug" element={<Article />} />
      </Route>
    </Routes>
  );
}

export default App;
