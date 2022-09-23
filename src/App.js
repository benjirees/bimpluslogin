import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import ProjectSelect from './components/ProjectSelect/ProjectSelect';

function App() {

  const token = localStorage.getItem('access_token');
  // console.log(token);
  if (!token) {
    return <Login />
  }
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route exact path="/projectselect" element={<ProjectSelect />} />
          <Route exact path="/bimpluslogin" element={<ProjectSelect />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
