"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateJobSettings = exports.getJobSettings = exports.deleteJob = exports.updateJob = exports.createJob = exports.getJobById = exports.getAllJobs = void 0;
const Job_1 = __importDefault(require("../models/Job"));
const JobSettings_1 = __importDefault(require("../models/JobSettings"));
// --- Job Controllers --- //
const getAllJobs = async (req, res) => {
    try {
        const { department, active, sort = 'order -createdAt' } = req.query;
        const query = {};
        if (department)
            query.department = department;
        if (active !== undefined)
            query.active = active === 'true';
        const jobs = await Job_1.default.find(query).sort(sort);
        const total = await Job_1.default.countDocuments(query);
        res.status(200).json({ success: true, jobs, total });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getAllJobs = getAllJobs;
const getJobById = async (req, res) => {
    try {
        const job = await Job_1.default.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ success: false, error: 'Job not found' });
        }
        res.status(200).json({ success: true, job });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getJobById = getJobById;
const createJob = async (req, res) => {
    try {
        const job = await Job_1.default.create(req.body);
        res.status(201).json({ success: true, job });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.createJob = createJob;
const updateJob = async (req, res) => {
    try {
        const job = await Job_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!job) {
            return res.status(404).json({ success: false, error: 'Job not found' });
        }
        res.status(200).json({ success: true, job });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.updateJob = updateJob;
const deleteJob = async (req, res) => {
    try {
        const job = await Job_1.default.findByIdAndDelete(req.params.id);
        if (!job) {
            return res.status(404).json({ success: false, error: 'Job not found' });
        }
        res.status(200).json({ success: true, message: 'Job deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.deleteJob = deleteJob;
// --- Job Settings Controllers --- //
const getJobSettings = async (req, res) => {
    try {
        let settings = await JobSettings_1.default.findOne();
        if (!settings) {
            settings = await JobSettings_1.default.create({ visible: true });
        }
        res.status(200).json({ success: true, settings });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getJobSettings = getJobSettings;
const updateJobSettings = async (req, res) => {
    try {
        let settings = await JobSettings_1.default.findOne();
        if (!settings) {
            settings = await JobSettings_1.default.create(req.body);
        }
        else {
            settings = await JobSettings_1.default.findByIdAndUpdate(settings._id, req.body, {
                new: true,
                runValidators: true
            });
        }
        res.status(200).json({ success: true, settings });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.updateJobSettings = updateJobSettings;
