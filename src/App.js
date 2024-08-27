import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import OtpVerify from './pages/OtpVerify';
import SignIn from './pages/SignIn';
import Resume from './pages/Resume';
import AllResumes from './pages/AllResumes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp/>} />
        <Route path="/Verify" element={<OtpVerify/>} />
        <Route path="/Signin" element={<SignIn/>} />
        <Route path="/ResumeManager" element={<Resume/>} />
        <Route path="/Resumes" element={<AllResumes/>} />
      </Routes>
    </Router>
  );
}

export default App;
