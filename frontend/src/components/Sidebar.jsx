// src/components/Sidebar.jsx
import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Typography, Box, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ open, onOpen, onClose }) => {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
        onClose();
    };

    const menuItems = [
        { text: 'Home', icon: <HomeIcon />, path: '/' },
        { text: 'Courses', icon: <SchoolIcon />, path: '/courses' },
        { text: 'Users', icon: <MenuIcon />, path: '/users/' }
    ];

    return (
<>
      <IconButton onClick={onOpen} style={{ color: '#007bff' }} aria-label="open drawer">
      <MenuIcon />
  </IconButton>
        <Drawer
            anchor="left"
            open={open}
            onClose={onClose}
            >
            <Box
                sx={{ width: 240 }}
                role="presentation"
                onClick={onClose}
                onKeyDown={onClose}
            >
                <Typography variant="h6" sx={{ my: 2, ml: 1 }}>
                    Menu
                </Typography>
                <List>
                    {menuItems.map((item, index) => (
                        <ListItem button key={index} onClick={() => navigate(item.path)}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                    {isAuthenticated && (
                        <ListItem button onClick={handleLogout}>
                            <ListItemIcon><LogoutIcon /></ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    )}
                </List>
            </Box>
        </Drawer>
                    </>
    );
};

export default Sidebar;
