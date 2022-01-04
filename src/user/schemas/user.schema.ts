import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { userRegex } from "../user.regex";

export type UserDocument = User & Document;

@Schema({
    timestamps: true,
})
export class User {
    @Prop({
        required: true,
        validate: userRegex.usernameRegex,
    })
    username: string;

    @Prop({
        required: true,
    })
    password: string;

    @Prop({
        required: true,
        validate: userRegex.nameRegex,
    })
    name: string;

    @Prop()
    avatar: string;

    @Prop({
        required: true,
        validate: userRegex.emailRegex,
    })
    email: string;
    
    @Prop({
        required: true,
        validate: userRegex.rolesRegex,
    })
    role: string;

    @Prop({
        required: true,
        validate: userRegex.phoneRegex,
    })
    phone: string;
}

export const UserSchema = SchemaFactory.createForClass(User);