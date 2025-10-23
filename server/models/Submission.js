// models/Submission.js
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  score: { type: Number, required: true },
  explanation: { type: String, required: true }
});

const submissionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  questionTitle: {
    type: String,
    required: true,
    trim: true
  },
  language: {
    type: String,
    enum: ["cpp", "java", "python", "javascript"],
    required: true
  },
  code: {
    type: String,
    required: true
  },
  analysis: {
    overallScore: { type: Number, required: true },

    timeComplexity: categorySchema,
    spaceComplexity: categorySchema,
    edgeCases: categorySchema,
    codeStructure: categorySchema,
    variableNaming: categorySchema,
    readability: categorySchema,
    algorithmChoice: categorySchema,
    problemUnderstanding: categorySchema,

    suggestedImprovements: {
      improvedCode: { type: String },
      explanation: { type: String }
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Submission = mongoose.model("Submission", submissionSchema);
export default Submission;
