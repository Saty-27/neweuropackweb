"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskStatus = exports.createTask = exports.getTasks = void 0;
const Task_1 = __importDefault(require("../models/Task"));
const getTasks = async (req, res) => {
    try {
        const tasks = await Task_1.default.find()
            .populate('assignedTo', 'name email role')
            .populate('assignedBy', 'name email role')
            .sort({ deadline: 1 });
        // Auto mark overdue tasks if deadline passed and not completed
        const now = new Date();
        for (let task of tasks) {
            if (new Date(task.deadline) < now &&
                task.status !== 'Completed' &&
                task.status !== 'Overdue') {
                task.status = 'Overdue';
                await task.save();
            }
        }
        res.status(200).json({ success: true, data: tasks });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getTasks = getTasks;
const createTask = async (req, res) => {
    try {
        const { title, description, assignedTo, deadline, priority } = req.body;
        const task = await Task_1.default.create({
            title,
            description,
            assignedTo,
            assignedBy: req.user?._id, // Set by auth middleware
            deadline,
            priority,
            status: 'Not Started'
        });
        const populatedTask = await Task_1.default.findById(task._id)
            .populate('assignedTo', 'name email')
            .populate('assignedBy', 'name email');
        res.status(201).json({ success: true, data: populatedTask });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.createTask = createTask;
const updateTaskStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const task = await Task_1.default.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!task)
            return res.status(404).json({ success: false, error: 'Task not found' });
        res.status(200).json({ success: true, data: task });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.updateTaskStatus = updateTaskStatus;
