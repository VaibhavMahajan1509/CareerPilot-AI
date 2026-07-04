import Resume from "../models/Resume.js";

export const createOrUpdateResume = async (req, res) => {
  try {
    const { title, summary, skills, experience, education, projects } = req.body;

    const resume = await Resume.findOneAndUpdate(
      { user: req.user._id },
      {
        user: req.user._id,
        title,
        summary,
        skills,
        experience,
        education,
        projects,
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Resume saved successfully",
      data: { resume },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to save resume",
      error: error.message,
    });
  }
};

export const getResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ user: req.user._id });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Resume fetched successfully",
      data: { resume },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch resume",
      error: error.message,
    });
  }
};

export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ user: req.user._id });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    await resume.deleteOne();

    res.status(200).json({
      success: true,
      message: "Resume deleted successfully",
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete resume",
      error: error.message,
    });
  }
};