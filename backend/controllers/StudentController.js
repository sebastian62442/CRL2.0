const Student = require('../models/Student'); // Path to your Student model

exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find({});
        res.json(students);
    } catch (error) {
        res.status(500).send({ message: 'Failed to fetch students', error: error.message });
    }
};

exports.addStudentsToCourse = async (req, res) => {
    const { courseId } = req.params;
    const { studentIds } = req.body;

    try {
        const Course = require('../models/Course'); // Assume Course model is this path
        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Filter out any student IDs already in the course
        const updatedStudentIds = studentIds.filter(id => !course.students.includes(id));
        course.students.push(...updatedStudentIds); // Add new student IDs
        await course.save();

        res.status(200).json({ message: "Students added successfully", course });
    } catch (error) {
        res.status(500).json({ message: "Failed to add students to the course", error: error.message });
    }
};
