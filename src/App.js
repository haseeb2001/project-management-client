import { Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import PrivateRoute from './components/common/PrivateRoute';
import Authentication from './components/pages/auth/Authentication';
import { Dashboard } from './components/pages/dashboard/Dashboard';
import { Project } from './components/pages/project/Project';

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route
          exact
          path='/'
          element={<PrivateRoute component={Dashboard} />}
        />
        <Route path='/auth' element={<Authentication />} />
        <Route
          path='/project-board/:projectId'
          element={<PrivateRoute component={Project} />}
        />
      </Routes>
    </div>
  );
}

export default App;
