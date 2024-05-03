// src/components/CourseEdit.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Box } from '@mui/material';
import axiosWithAuth from './axiosWithAuth'; // Adjust the path as necessary

const CourseEdit = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState({
        courseName: '',
        courseCode: ''
    });

    useEffect(() => {
        if (courseId) {
            const fetchCourse = async () => {
                try {
                    const response = await axiosWithAuth.get(`/courses/${courseId}`);
                    const { courseName, courseCode } = response.data;
                    setCourse({ courseName, courseCode });
                } catch (error) {
                    console.error('Failed to fetch course:', error);
                }
            };
            fetchCourse();
        }
    }, [courseId]);

    const handleChange = (event) => {
        setCourse({ ...course, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (courseId) {
                await axiosWithAuth.put(`/courses/${courseId}`, course);
            } else {
                await axiosWithAuth.post('/courses', course);
            }
            navigate('/courses');
        } catch (error) {
            console.error('Failed to save course:', error);
        }
    };

    return (
        <Container>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ '& .MuiTextField-root': { m: 1 } }}>
                <TextField label="Course Name" name="courseName" value={course.courseName} onChange={handleChange} fullWidth required />
                <TextField label="Course Code" name="courseCode" value={course.courseCode} onChange={handleChange} fullWidth required />
                <Button type="submit" color="primary" variant="contained" fullWidth>{courseId ? 'Update Course' : 'Create Course'}</Button>
            </Box>
        </Container>
    );
};

export default CourseEdit;
