const Grade = require('../models/Grade'); // Ensure the model path is correct

const GradeController = {
    recordGrade: async (req, res) => {
        try {
            const { studentId, courseId, score } = req.body;
            const newGrade = new Grade({
                studentId,
                courseId,
                score
            });
            await newGrade.save();
            res.status(201).json({ message: "Grade recorded successfully", grade: newGrade });
        } catch (error) {
            console.log(error)
            res.status(500).send({ message: "Error recording grade", error: error.message });
        }
    },

    viewGradesForAssessment: async (req, res) => {
        try {
            const assessmentId = req.query.assessmentId; // Assuming assessmentId is passed as a query parameter
            const grades = await Grade.find({ assessmentId }).populate('studentId', 'name');
            res.json(grades);
        } catch (error) {
            res.status(500).send({ message: "Error retrieving grades", error: error.message });
        }
    },

    getGradeById: async (req, res) => {
        try {
            const grade = await Grade.findById(req.params.id).populate('studentId', 'name');
            if (!grade) {
                return res.status(404).send({ message: "Grade not found" });
            }
            res.json(grade);
        } catch (error) {
            res.status(500).send({ message: "Error retrieving grade", error: error.message });
        }
    },

    updateGrade: async (req, res) => {
        try {
            const { score } = req.body;
            const grade = await Grade.findByIdAndUpdate(req.params.id, {
                score
            }, { new: true, runValidators: true });
            if (!grade) {
                return res.status(404).send({ message: "Grade not found" });
            }
            res.json({ message: "Grade updated successfully", grade });
        } catch (error) {
            res.status(500).send({ message: "Error updating grade", error: error.message });
        }
    },

    deleteGrade: async (req, res) => {
        try {
            const grade = await Grade.findByIdAndDelete(req.params.id);
            if (!grade) {
                return res.status(404).send({ message: "Grade not found" });
            }
            res.send({ message: "Grade deleted successfully" });
        } catch (error) {
            res.status(500).send({ message: "Error deleting grade", error: error.message });
        }
    },

    getGradesForCourse : async (req, res) => {
        const { courseId } = req.params;
        try {
            const grades = await Grade.find({ courseId }).populate('studentId');
            res.json(grades);
        } catch (error) {
            res.status(500).json({ message: "Failed to fetch grades", error: error.message });
        }
},
}
module.exports = GradeController;
