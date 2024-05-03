import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, TextField, Button, CircularProgress } from '@mui/material';
import axiosWithAuth from './axiosWithAuth';

const StudentList = ({ students, courseId, initialGrades }) => {
    const [grades, setGrades] = useState({});
    const [loading, setLoading] = useState(false);
// console.log(grades)
    // Initialize grades from props
    useEffect(() => {
        setGrades(initialGrades || {});
    }, [initialGrades]);

    const handleGradeChange = (studentId, value) => {
        setGrades(prevGrades => ({ ...prevGrades, [studentId]: value }));
    };

    const handleGradeSubmit = async (studentId) => {
        setLoading(true);
        try {
            const grade = grades[studentId];
            await axiosWithAuth.post(`/grades`, {
                studentId,
                courseId,
                score: grade
            });
            alert('Grade submitted successfully');
        } catch (error) {
            console.error('Failed to submit grade:', error);
            alert('Failed to submit grade');
        }
        setLoading(false);
    };

    return (
        <List>
            {students.map((student) => (
                <ListItem key={student._id} divider>
                    <ListItemText primary={`${student.name} (${student.studentId})`} />
                    <TextField
                        label="Grade"
                        variant="outlined"
                        size="small"
                        type="number"
                        value={grades[student._id] || ''}
                        onChange={(e) => handleGradeChange(student._id, e.target.value)}
                        sx={{ mr: 2 }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleGradeSubmit(student._id)}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Submit Grade'}
                    </Button>
                </ListItem>
            ))}
        </List>
    );
};

export default StudentList;
