"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("../models/User"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../../.env') });
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/europack';
const reactivateAdmin = async () => {
    try {
        await mongoose_1.default.connect(MONGO_URI);
        console.log('Connected to Industrial Database Matrix...');
        const adminEmail = 'admin@europack.in';
        const user = await User_1.default.findOne({ email: adminEmail });
        if (!user) {
            console.log(`❌ Identity Error: User with email ${adminEmail} not found.`);
            process.exit(1);
        }
        console.log(`Current Status for ${adminEmail}: ${user.status}`);
        if (user.status === 'inactive') {
            user.status = 'active';
            await user.save();
            console.log(`✅ Success: Account ${adminEmail} has been reactivated to 'active' status.`);
        }
        else {
            console.log(`ℹ️ Identity Check: Account ${adminEmail} is already ${user.status}.`);
        }
        process.exit(0);
    }
    catch (err) {
        console.error('❌ Database Sync Failure:', err);
        process.exit(1);
    }
};
reactivateAdmin();
