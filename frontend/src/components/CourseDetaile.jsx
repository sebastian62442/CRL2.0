// src/components/CourseDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosWithAuth from '../utils/axiosWithAuth';
import StudentList from './StudentList';
import { Typography, Container } from '@mui/material';

const CourseDetail = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState({});
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                // Fetch the course details
                const responseCourse = await axiosWithAuth.get(`/courses/${courseId}`);
                setCourse(responseCourse.data);

                // Fetch students enrolled in this course
                const responseStudents = await axiosWithAuth.get(`/courses/${courseId}/students`);
                setStudents(responseStudents.data);
            } catch (error) {
                console.error('Failed to fetch course or students:', error);
            }
        };

        fetchCourseDetails();
    }, [courseId]);

    return (
        <Container>
            <Typography variant="h4" sx={{ mb: 4 }}>
                Course Detail: {course.courseName} ({course.courseCode})
            </Typography>
            <StudentList students={students} courseId={courseId} />
        </Container>
    );
};

export default CourseDetail;
