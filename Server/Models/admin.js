import mongoose, { Schema } from mongoose;

const AdminSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true
    },
    profile_pic:{
        type: String
    },
    refreshToken: {
        type: String
    }
},{
    timestamps: true
});

export const Admin = mongoose.model('Admin', AdminSchema);