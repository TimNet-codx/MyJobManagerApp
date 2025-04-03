import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    lastName: {
        type: String,
        default: 'lastName'
    },
    location: {
        type: String,
        default: 'logos',
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'users'],
        default: 'user'
    },
    avatar: String,
    avatarPublicId: String,
});

// Returning Current User Without the password
UserSchema.methods.toJSON= function () {
    let obj = this.toObject();
    delete obj.password;
    return obj;
}

export default mongoose.model('User', UserSchema);