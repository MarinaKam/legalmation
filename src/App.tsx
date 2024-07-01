import { Routes, Route } from 'react-router-dom';
import { Layout } from './components';
import { Dashboard, NoMatch } from './dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

export default App;
