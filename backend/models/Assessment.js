const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  title: { type: String, required: true },
  maxPoints: { type: Number, required: true },
  assessmentDate: { type: Date, required: true }
});

const Assessment = mongoose.model('Assessment', assessmentSchema);
module.exports = Assessment;
