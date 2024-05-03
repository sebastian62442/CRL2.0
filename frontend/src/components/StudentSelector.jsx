// Add functionality to show all students and select some to add to the course
import React, {useState} from 'react';
import { Checkbox, List, ListItem, ListItemText, Button } from '@mui/material';
import axiosWithAuth from './axiosWithAuth';

const StudentSelector = ({ allStudents, courseId, onStudentsAdded }) => {
    const [selectedStudents, setSelectedStudents] = useState([]);

    const handleToggle = (studentId) => {
        const currentIndex = selectedStudents.indexOf(studentId);
        const newChecked = [...selectedStudents];
        if (currentIndex === -1) {
            newChecked.push(studentId);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setSelectedStudents(newChecked);
    };

    const handleSubmit = async () => {
        try {
            await axiosWithAuth.put(`/courses/${courseId}/add-students`, {
                studentIds: selectedStudents
            });
            onStudentsAdded();
        } catch (error) {
            console.error('Failed to add students:', error);
        }
    };

    return (
        <List>
            {allStudents.map((student) => (
                <ListItem key={student._id} button onClick={() => handleToggle(student._id)}>
                    <Checkbox
                        checked={selectedStudents.indexOf(student._id) !== -1}
                        disableRipple
                    />
                    <ListItemText primary={student.name} secondary={student.studentId} />
                </ListItem>
            ))}
            <Button onClick={handleSubmit} color="primary" variant="contained">
                Add Selected Students
            </Button>
        </List>
    );
};

export default StudentSelector;
