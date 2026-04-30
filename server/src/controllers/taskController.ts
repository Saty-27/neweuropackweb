import { Response } from 'express';
import Task from '../models/Task';
import { AuthRequest } from '../middleware/auth';

export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const tasks = await Task.find()
                            .populate('assignedTo', 'name email role')
                            .populate('assignedBy', 'name email role')
                            .sort({ deadline: 1 });
    
    // Auto mark overdue tasks if deadline passed and not completed
    const now = new Date();
    for (let task of tasks) {
      if (
        new Date(task.deadline) < now && 
        task.status !== 'Completed' && 
        task.status !== 'Overdue'
      ) {
        task.status = 'Overdue';
        await task.save();
      }
    }

    res.status(200).json({ success: true, data: tasks });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, assignedTo, deadline, priority } = req.body;
    
    const task = await Task.create({
      title,
      description,
      assignedTo,
      assignedBy: req.user?._id, // Set by auth middleware
      deadline,
      priority,
      status: 'Not Started'
    });

    const populatedTask = await Task.findById(task._id)
                                    .populate('assignedTo', 'name email')
                                    .populate('assignedBy', 'name email');

    res.status(201).json({ success: true, data: populatedTask });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateTaskStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.body;
    const task = await Task.findByIdAndUpdate(req.params.id, { status }, { new: true });
    
    if (!task) return res.status(404).json({ success: false, error: 'Task not found' });
    
    res.status(200).json({ success: true, data: task });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
