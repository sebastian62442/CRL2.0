import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseCard from './CourseCard';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function CoursesGrid() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await axios.get('/api/courses'); // Update with correct API endpoint
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses', error);
        // Handle error appropriately
      }
    }

    fetchCourses();
  }, []);

  return (
    <Grid container spacing={3}>
      {courses.map((course) => (
        <Grid item key={course.id} xs={12} sm={6} md={4}>
          <CourseCard 
            title={course.title} 
            code={course.code} 
            onClick={() => navigate(`/courses/${course.id}`)} // Navigate to course detail on click
          />
        </Grid>
      ))}
    </Grid>
  );
}
export default CoursesGrid;
