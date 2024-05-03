import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, CssBaseline, Toolbar, Drawer } from '@mui/material';
import { styled } from '@mui/material/styles';

import AuthForm from "./components/AuthForm";
import Home from "./components/Home";
import { AuthProvider } from './context/AuthContext';
import Dashboard from './components/Dashboard';
import UserManagement from './components/UserManagement';
import CourseManagement from './components/CourseManagement';
import AssessmentManagement from './components/AssessmentManagement';
import GradeManagement from './components/GradeManagement';
import NotFound from './components/NotFound';
import Sidebar from './components/Sidebar';
import CoursesPage from './components/CoursesPage';
import CourseEdit from './components/CourseEdit';
import CourseDetail from './components/CourseDetail';
import UserList from './components/UserList';
import UserEdit from './components/UserEdit';
import PrivateRoute from './components/PrivateRoute';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,  // Set default margin when sidebar is closed
  ...(open && {
    marginLeft: drawerWidth,  // Adjust marginLeft when sidebar is open
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function App() {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <CssBaseline />
        <Sidebar open={open} onOpen={handleDrawerOpen} onClose={handleDrawerClose} />
        <Main open={open}>
          <Toolbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<AuthForm />} />
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/courses" element={<PrivateRoute><CoursesPage /></PrivateRoute>} />
            <Route path="/courses/create" element={<PrivateRoute><CourseEdit /></PrivateRoute>} />
            <Route path="/courses/edit/:courseId" element={<PrivateRoute><CourseEdit /></PrivateRoute>} />
            <Route path="/courses/:courseId" element={<PrivateRoute><CourseDetail /></PrivateRoute>} />
            <Route path="/courses/:courseId/outcome" element={<PrivateRoute><CourseDetail /></PrivateRoute>} />
            <Route path="/assessments" element={<AssessmentManagement />} />
            <Route path="/grades" element={<GradeManagement />} />
            <Route path="/users/" element={<PrivateRoute><UserList /></PrivateRoute>} />
            <Route path="/users/create" element={<PrivateRoute><UserEdit /></PrivateRoute>} />
            <Route path="/users/edit/:userId" element={<UserEdit />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Main>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
