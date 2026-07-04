import Application from "../models/Application.js";

export const createApplication = async (req, res) => {
  try {
    const { company, role, status, appliedDate, jobLink, notes } = req.body;

    if (!company || !role) {
      return res.status(400).json({
        success: false,
        message: "Company and role are required",
      });
    }

    const application = await Application.create({
      user: req.user._id,
      company,
      role,
      status,
      appliedDate,
      jobLink,
      notes,
    });

    res.status(201).json({
      success: true,
      message: "Application added successfully",
      data: { application },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add application",
      error: error.message,
    });
  }
};

export const getApplications = async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      message: "Applications fetched successfully",
      data: { applications },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch applications",
      error: error.message,
    });
  }
};

export const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Application fetched successfully",
      data: { application },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch application",
      error: error.message,
    });
  }
};

export const updateApplication = async (req, res) => {
  try {
    const application = await Application.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    const { company, role, status, appliedDate, jobLink, notes } = req.body;

    application.company = company || application.company;
    application.role = role || application.role;
    application.status = status || application.status;
    application.appliedDate = appliedDate || application.appliedDate;
    application.jobLink = jobLink ?? application.jobLink;
    application.notes = notes ?? application.notes;

    const updatedApplication = await application.save();

    res.status(200).json({
      success: true,
      message: "Application updated successfully",
      data: { application: updatedApplication },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update application",
      error: error.message,
    });
  }
};

export const deleteApplication = async (req, res) => {
  try {
    const application = await Application.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    await application.deleteOne();

    res.status(200).json({
      success: true,
      message: "Application deleted successfully",
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete application",
      error: error.message,
    });
  }
};
