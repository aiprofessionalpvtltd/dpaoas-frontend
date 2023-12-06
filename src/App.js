import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import '../src/utils/custom.css'
import 'aos/dist/aos.css';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import { NavigationRoutes } from './routes';
import { AuthProvider } from './api/AuthContext';

function App() {
  return <AuthProvider><NavigationRoutes /></AuthProvider>
}

export default App;
