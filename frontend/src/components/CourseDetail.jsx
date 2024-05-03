import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosWithAuth from './axiosWithAuth';
import StudentList from './StudentList';
import StudentSelector from './StudentSelector';
import { Typography, Container, Button } from '@mui/material';

const CourseDetail = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState({});
    const [grades, setGrades] = useState({});
    const [students, setStudents] = useState([]);
    const [allStudents, setAllStudents] = useState([]);
    const [showSelector, setShowSelector] = useState(false);
const [average, setAverage] = useState(0);
    // Define fetchCourseDetails as a standalone function so it can be called from multiple places
    const fetchCourseDetails = async () => {
        try {
            const responseCourse = await axiosWithAuth.get(`/courses/${courseId}`);
            setCourse(responseCourse.data);

            const responseStudents = await axiosWithAuth.get(`/courses/${courseId}/students`);
            setStudents(responseStudents.data);

            // Fetch grades for the course
            const responseGrades = await axiosWithAuth.get(`/grades/course/${courseId}`);
            const gradesMap = responseGrades.data.reduce((acc, grade) => {
                acc[grade.studentId._id] = grade.score;  // Assuming grade.studentId is populated with student details
                return acc;
            }, {});
            setGrades(gradesMap);

            // Fetch all students (assuming the endpoint is `/students`)
            const responseAllStudents = await axiosWithAuth.get('/students');
            setAllStudents(responseAllStudents.data);
            // Fetch all students (assuming the endpoint is `/students`)
            const responseAverage = await axiosWithAuth.get(`/courses/${courseId}/average`);
            setAverage(responseAverage.data.averageGrade);
        } catch (error) {
            console.error('Failed to fetch course or students:', error);
        }
    };

    useEffect(() => {
        fetchCourseDetails();
    }, [courseId, average]);  // Ensure fetchCourseDetails is only called when courseId changes

    const handleStudentsAdded = () => {
        // Refetch students to update the list after adding new ones
        fetchCourseDetails();
    };

    const toggleStudentSelector = () => {
        setShowSelector(!showSelector);
    };

    return (
        <Container>
            <Typography variant="h4" sx={{ mb: 4 }}>
                Course Detail: {course.courseName} ({course.courseCode})
            </Typography>
            <Typography variant="h4" sx={{ mb: 4 }}>
               Average: {average}
            </Typography>
            <Button variant="outlined" onClick={toggleStudentSelector} sx={{ mb: 2 }}>
                {showSelector ? 'Hide Student Selector' : 'Add Students to Course'}
            </Button>
            {showSelector && <StudentSelector allStudents={allStudents} courseId={courseId} onStudentsAdded={handleStudentsAdded} />}
            <StudentList students={students} courseId={courseId} initialGrades={grades} />
        </Container>
    );
};

export default CourseDetail;
