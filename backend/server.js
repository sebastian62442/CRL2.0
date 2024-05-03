const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors')
const UserRoutes = require('./routes/UserRoutes');
const CourseRoutes = require('./routes/CourseRoutes');
const AssessmentRoutes = require('./routes/AssessmentRoutes');
const GradeRoutes = require('./routes/GradeRoutes');
const studentRoutes = require('./routes/studentRoutes'); // Ensure the path is correct

require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())

// MongoDB connection
mongoose.connect(process.env.mongo_uri).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Could not connect to MongoDB', err);
});

// Routes
app.use('/api/users', UserRoutes);
app.use('/api/courses', CourseRoutes);
app.use('/api/assessments', AssessmentRoutes);
app.use('/api/grades', GradeRoutes);
app.use('/api/students', studentRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
