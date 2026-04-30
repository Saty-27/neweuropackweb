"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteServicePage = exports.updateServicePage = exports.createServicePage = exports.getServiceBySlug = exports.getServicePages = void 0;
const ServicePage_1 = __importDefault(require("../models/ServicePage"));
const getServicePages = async (req, res) => {
    try {
        const isAdmin = req.query.admin === 'true';
        const query = isAdmin ? {} : { visible: true, status: 'published' };
        const pages = await ServicePage_1.default.find(query).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: pages });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getServicePages = getServicePages;
const getServiceBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const page = await ServicePage_1.default.findOne({ slug, visible: true, status: 'published' });
        if (!page)
            return res.status(404).json({ success: false, error: 'Service page not found' });
        res.status(200).json({ success: true, data: page });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getServiceBySlug = getServiceBySlug;
const createServicePage = async (req, res) => {
    try {
        const page = await ServicePage_1.default.create(req.body);
        res.status(201).json({ success: true, data: page });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
exports.createServicePage = createServicePage;
const updateServicePage = async (req, res) => {
    try {
        const { id } = req.params;
        const page = await ServicePage_1.default.findByIdAndUpdate(id, req.body, { new: true });
        if (!page)
            return res.status(404).json({ success: false, error: 'Service page not found' });
        res.status(200).json({ success: true, data: page });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
exports.updateServicePage = updateServicePage;
const deleteServicePage = async (req, res) => {
    try {
        const { id } = req.params;
        const page = await ServicePage_1.default.findByIdAndDelete(id);
        if (!page)
            return res.status(404).json({ success: false, error: 'Service page not found' });
        res.status(200).json({ success: true, message: 'Service page deleted' });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.deleteServicePage = deleteServicePage;
