import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import CourseCard from './CourseCard'; // Import the CourseCard component
import { useAxiosWithAuth } from '../hooks/useAxiosWithAuth'; // Import the hook

function CourseManagement() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const axiosWithAuth = useAxiosWithAuth(); // Use the hook to get axios instance

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axiosWithAuth.get('https://course-management-system-tu20.onrender.com/api/courses'); // Replace '/api/courses' with the actual backend endpoint
                setCourses(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Courses</h1>
            <Grid container spacing={3}>
                {Array.isArray(courses) && courses.map((course) => (
                    <Grid item key={course.id} xs={12} sm={6} md={4}>
                        <Link to={`/courses/${course.id}`}>
                            {/* Pass course data as props to CourseCard component */}
                            <CourseCard title={course.courseName} code={course.courseCode} id={course.id} />
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default CourseManagement;