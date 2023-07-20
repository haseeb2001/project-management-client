import { Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Authentication from './components/pages/auth/Authentication';
import { Project } from './components/pages/project/Project';

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/auth' element={<Authentication />} />
        <Route path='/project-board' element={<Project />} />
      </Routes>
    </div>
  );
}

export default App;
