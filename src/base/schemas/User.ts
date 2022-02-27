import mongoose, { Schema, ObjectId } from "mongoose";

export interface User {
    id: ObjectId;
    discordId: string,
    accesToken: string,
    refreshToken: string
}

const UserSchema = new Schema<User>({
    discordId: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    accesToken: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    refreshToken: {
        type: mongoose.SchemaTypes.String,
        required: true
    }
});

export default mongoose.model("users", UserSchema);