const Assessment = require('../models/Assessment'); // Ensure the model path is correct

const AssessmentController = {
    createAssessment: async (req, res) => {
        try {
            const { courseId, title, maxPoints, assessmentDate } = req.body;
            const newAssessment = new Assessment({
                courseId,
                title,
                maxPoints,
                assessmentDate
            });
            await newAssessment.save();
            res.status(201).json({ message: "Assessment created successfully", assessment: newAssessment });
        } catch (error) {
            res.status(500).send({ message: "Error creating assessment", error: error.message });
        }
    },

    getAllAssessments: async (req, res) => {
        try {
            const courseId = req.query.courseId; // Assuming courseId is passed as a query parameter
            const assessments = await Assessment.find({ courseId });
            res.json(assessments);
        } catch (error) {
            res.status(500).send({ message: "Error retrieving assessments", error: error.message });
        }
    },

    getAssessmentById: async (req, res) => {
        try {
            const assessment = await Assessment.findById(req.params.id);
            if (!assessment) {
                return res.status(404).send({ message: "Assessment not found" });
            }
            res.json(assessment);
        } catch (error) {
            res.status(500).send({ message: "Error retrieving assessment", error: error.message });
        }
    },

    updateAssessment: async (req, res) => {
        try {
            const { title, maxPoints, assessmentDate } = req.body;
            const assessment = await Assessment.findByIdAndUpdate(req.params.id, {
                title,
                maxPoints,
                assessmentDate
            }, { new: true, runValidators: true });
            if (!assessment) {
                return res.status(404).send({ message: "Assessment not found" });
            }
            res.json({ message: "Assessment updated successfully", assessment });
        } catch (error) {
            res.status(500).send({ message: "Error updating assessment", error: error.message });
        }
    },

    deleteAssessment: async (req, res) => {
        try {
            const assessment = await Assessment.findByIdAndDelete(req.params.id);
            if (!assessment) {
                return res.status(404).send({ message: "Assessment not found" });
            }
            res.send({ message: "Assessment deleted successfully" });
        } catch (error) {
            res.status(500).send({ message: "Error deleting assessment", error: error.message });
        }
    }
};

module.exports = AssessmentController;
