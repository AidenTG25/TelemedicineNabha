import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase/config';
import { doc, getDoc } from 'firebase/firestore';

import Login from './components/Login';
import AadhaarLogin from './components/AadhaarLogin';
import PatientDashboard from './components/PatientDashboard';
import DoctorDashboard from './components/DoctorDashboard';
import PharmacistDashboard from './components/PharmacistDashboard';
import LoadingScreen from './components/LoadingScreen';
import './i18n';

const theme = createTheme({
  palette: {
    primary: { main: '#1a3145ff', light: '#64b5f6', dark: '#1976d2' },
    secondary: { main: '#4caf50', light: '#81c784', dark: '#388e3c' },
    background: { default: '#f5f5f5', paper: '#ffffff' },
    text: { primary: '#333333', secondary: '#666666' },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: { fontWeight: 600, color: '#2196f3' },
    h5: { fontWeight: 500 },
    body1: { fontSize: '1rem', lineHeight: 1.6 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: { styleOverrides: { root: { textTransform: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 500 } } },
    MuiCard: { styleOverrides: { root: { boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: 16 } } },
  },
});

function App() {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            setUserRole(userDoc.data().role || 'patient');
          } else {
            setUserRole('patient');
          }
        } catch {
          setUserRole('patient');
        }
      } else {
        setUser(null);
        setUserRole(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  const getDashboardComponent = () => {
    switch (userRole) {
      case 'doctor':
        return <DoctorDashboard />;
      case 'pharmacist':
        return <PharmacistDashboard />;
      default:
        return <PatientDashboard />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" replace />} />
          <Route path="/aadhaar-login" element={!user ? <AadhaarLogin /> : <Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={user ? getDashboardComponent() : <Navigate to="/login" replace />} />
          <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;













// import { doc, getDoc } from 'firebase/firestore';
// import { db } from './firebase/config';

// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from './firebase/config';
// import Login from './components/Login';
// import PatientDashboard from './components/PatientDashboard';
// import DoctorDashboard from './components/DoctorDashboard';
// import PharmacistDashboard from './components/PharmacistDashboard';
// import LoadingScreen from './components/LoadingScreen';
// import './i18n';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#1a3145ff',
//       light: '#64b5f6',
//       dark: '#1976d2',
//     },
//     secondary: {
//       main: '#4caf50',
//       light: '#81c784',
//       dark: '#388e3c',
//     },
//     background: {
//       default: '#f5f5f5',
//       paper: '#ffffff',
//     },
//     text: {
//       primary: '#333333',
//       secondary: '#666666',
//     },
//   },
//   typography: {
//     fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
//     h4: {
//       fontWeight: 600,
//       color: '#2196f3',
//     },
//     h5: {
//       fontWeight: 500,
//     },
//     body1: {
//       fontSize: '1rem',
//       lineHeight: 1.6,
//     },
//   },
//   shape: {
//     borderRadius: 12,
//   },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           textTransform: 'none',
//           borderRadius: 8,
//           padding: '10px 24px',
//           fontWeight: 500,
//         },
//       },
//     },
//     MuiCard: {
//       styleOverrides: {
//         root: {
//           boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//           borderRadius: 16,
//         },
//       },
//     },
//   },
// });

// function App() {
//   const [user, setUser] = useState(null);
//   const [userRole, setUserRole] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//   const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//     if (currentUser) {
//       setUser(currentUser);
//       // Get user role from Firestore document
//       try {
//         const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
//         if (userDoc.exists()) {
//           const userData = userDoc.data();
//           setUserRole(userData.role || 'patient');
//           console.log('User role loaded:', userData.role);
//         } else {
//           console.log('No user document found, defaulting to patient');
//           setUserRole('patient');
//         }
//       } catch (error) {
//         console.error('Error getting user role:', error);
//         setUserRole('patient');
//       }
//     } else {
//       setUser(null);
//       setUserRole(null);
//     }
//     setLoading(false);
//   });
//   return () => unsubscribe();
// }, []);


//   if (loading) {
//     return <LoadingScreen />;
//   }

//   const getDashboardComponent = () => {
//     switch (userRole) {
//       case 'doctor':
//         return <DoctorDashboard />;
//       case 'pharmacist':
//         return <PharmacistDashboard />;
//       default:
//         return <PatientDashboard />;
//     }
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Router>
//         <Routes>
//           <Route 
//             path="/login" 
//             element={!user ? <Login /> : <Navigate to="/dashboard" />} 
//           />
//           <Route 
//             path="/dashboard" 
//             element={user ? getDashboardComponent() : <Navigate to="/login" />} 
//           />
//           <Route 
//             path="/" 
//             element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} 
//           />
//         </Routes>
//       </Router>
//     </ThemeProvider>
//   );
// }

// export default App;