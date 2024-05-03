import React from 'react';
import backgroundImage from '../assets/bg.jpg'; // Background image for the hero section
import universityLogo from '../assets/download.png'; // Logo image path
import { Button, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook

const Home = () => {
  const { username } = useAuth(); // Access user details from the context
console.log(username)
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      color: '#333',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px',
      backgroundColor: 'rgba(255, 255, 255, 0.85)',
    },
    logo: {
      fontWeight: 'bold',
      fontSize: '24px',
    },
    leftSection: {
      display: 'flex',
      alignItems: 'center',
    },
    logoImage: {
      width: '50px',
      height: '50px',
      marginRight: '10px',
    },
    universityName: {
      fontWeight: 'bold',
      fontSize: '24px',
      color: '#0056b3',
    },
    nav: {
      '& a': {
        textDecoration: 'none',
        color: '#0056b3',
        padding: '10px 20px',
        borderRadius: '5px',
        border: '1px solid #0056b3',
        margin: '0 10px',
        display: 'inline-block',
      },
    },
    main: {
      textAlign: 'center',
      flex: '1',
      paddingTop: '50px',
      paddingBottom: '50px',
    },
    title: {
      fontSize: '42px',
      color: 'white',
      fontWeight: 'bold',
    },
    button: {
      padding: '10px 20px',
      fontSize: '18px',
      backgroundColor: '#8e44ad',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      marginTop: '20px',
    },
    sections: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      padding: '20px',
    },
    section: {
      margin: '15px',
      padding: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      borderRadius: '5px',
      backgroundColor: 'rgba(255, 255, 255, 0.85)',
      width: '300px',
    },
    footer: {
      textAlign: 'center',
      padding: '10px 0',
      backgroundColor: 'rgba(255, 255, 255, 0.85)',
      color: '#333',
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.leftSection}>
          <img src={universityLogo} alt="University Logo" style={styles.logoImage} />
          <div>
            <div style={styles.universityName}>Course Assessment Management System</div>
          </div>
        </div>
        <nav style={styles.nav}>
          {username ? (
            <div>
              <Typography variant="h6" color="primary">Hi, {username}</Typography> {/* Adjust based on how you store username */}
            </div>
          ) : (
            <>
              <Button href="/login" color="primary" variant="contained" style={{ marginRight: '5px' }}>Login</Button>
              <Button href="/register" color="primary" variant="contained">Register</Button>
            </>
          )}
        </nav>
      </header>
      
      <main style={styles.main}>
        <h1 style={styles.title}>Enhance Your Learning Experience</h1>
        <button style={styles.button} href="/login">Get Started</button>
        <div style={styles.sections}>
          <div style={styles.section}>
            <h2>Our Mission</h2>
            <p>To enhance the educational outcomes through efficient course assessment.</p>
          </div>
          <div style={styles.section}>
            <h2>How It Works</h2>
            <p>Instructors and students interact seamlessly to foster an environment of continuous improvement.</p>
          </div>
          <div style={styles.section}>
            <h2>Join Us</h2>
            <p>Start managing and assessing courses effectively today.</p>
          </div>
        </div>
      </main>
      
      <footer style={styles.footer}>
        © 2024 Course Assessment Management System. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
