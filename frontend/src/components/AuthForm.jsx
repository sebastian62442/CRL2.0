import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { TextField, Button, Typography, Container, Tab, Tabs, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import backgroundImage from '../assets/image.png'; // Replace with the path to your image
import purdueLogo from '../assets/download.png';

function AuthForm() {
    const { user } = useAuth(); // Retrieve the user object from AuthContext

    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'instructor'  // Default role set to 'instructor'
    });
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    // Redirect if already logged in
    useEffect(() => {
        if (user) {
            navigate('/courses'); // or another route based on user role
        }
    }, [user, navigate]);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const endpoint = isLogin ? 'login' : 'signup';
        try {
            const response = await axios.post(`https://course-management-system-tu20.onrender.com/api/users/${endpoint}`, formData);
            login(response.data.token, response.data.role, response.data.username);
            // Direct users based on their role
            if (response.data.role === "admin") {
                navigate('/courses');
            } else if (response.data.role === "instructor") {
                navigate('/courses');
            } else {
                navigate('/'); // Default route if role is undefined or unexpected
            }
        } catch (error) {
            console.error('Authentication failed:', error);
            alert(error.response.data.message); // Display backend error message
        }
    };

    return (
        <div >
            <Container component="main" maxWidth="xs">
                <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src={purdueLogo} alt="Purdue University Logo" style={{ width: '100px', height: '100px' }} />
                    <Typography component="h1" variant="h5" style={{ fontWeight: 'bold', fontSize: '40px' }}>
    Purdue University
</Typography>


                    <Typography component="h1" variant="h5" style={{ color: '#cfb991', fontWeight: 'bold', textShadow: '2px 2px #000' }}>
                        Fort Wayne
                    </Typography>
                    <Typography component="h1" variant="h5" style={{ fontWeight: 'bold', fontSize: '60px' }}>
    CAMS
</Typography>
                    <Tabs value={isLogin ? 0 : 1} onChange={() => setIsLogin(!isLogin)} aria-label="Login or Register">
                        <Tab label="Login" />
                        <Tab label="Register" />
                    </Tabs>
                    <Typography component="h1" variant="h5">
                        {isLogin ? 'Login' : 'Register'}
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        {!isLogin && (
                            <>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Name"
                                    name="username"
                                    autoComplete="username"
                                    autoFocus
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                            </>
                        )}
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="role-label">Role</InputLabel>
                            <Select
                                labelId="role-label"
                                id="role"
                                name="role"
                                value={formData.role}
                                label="Role"
                                onChange={handleChange}
                            >
                                <MenuItem value="instructor">Instructor</MenuItem>
                                <MenuItem value="admin">Admin</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {isLogin ? 'Login' : 'Register'}
                        </Button>
                    </Box>
                </Box>
            </Container>
        </div>
    );
}

export default AuthForm;