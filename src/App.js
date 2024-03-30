import { Route, Routes } from 'react-router-dom';
import './App.css';
import StudentForm from './component/StudentForm';
import Studentist from './component/StudentList';
import NavbarComponent from './component/NavbarComponent';


function App() {
  return (
    <div>
      <NavbarComponent />
      {/* <StudentForm /> */}
      <Routes>
        <Route path='/studentform' element={<StudentForm />} />
        <Route path='/studentlist' element={<Studentist />} />
      </Routes>

    </div>
  );
}

export default App;
