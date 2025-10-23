import User from "../models/User.js";
import Submission from "../models/Submission.js";

// Get all submissions for the logged-in user
export const getSubmissions = async (req, res, next) => {
  try {
    const userId = req.user;

    // Populate submissions
    const user = await User.findById(userId).populate({
      path: "submissions",
      options: { sort: { createdAt: -1 } } // newest first
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ submissions: user.submissions });
  } catch (err) {
    next(err);
  }
};

// Get a single submission by ID
export const getSubmissionById = async (req, res, next) => {
  try {
    const userId = req.user;
    const submissionId = req.params.id;

    const submission = await Submission.findOne({
      _id: submissionId,
      user: userId
    });

    if (!submission)
      return res.status(404).json({ message: "Submission not found" });

    res.json({ submission });
  } catch (err) {
    next(err);
  }
};
