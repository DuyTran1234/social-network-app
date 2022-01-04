import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "../dto/createUserDto";
import { User, UserDocument } from "../schemas/user.schema";
import * as bcrypt from "bcrypt";
import { ROLE } from "src/shared/role/role";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) { }

    // CREATE USER
    async createUser(createUserDto: CreateUserDto): Promise<string> {
        const findUser = await this.findUserByUsernameOrEmailOrPhone({
            username: createUserDto.username,
            email: createUserDto.email,
            phone: createUserDto.phone,
        });
        if (findUser) {
            throw new HttpException("(service) user exists", HttpStatus.BAD_REQUEST);
        }
        try {
            createUserDto.role = ROLE.USER;
            const hashPassword = await this.hashPassword(createUserDto.password);
            createUserDto.password = hashPassword;
            const createUser = await new this.userModel(createUserDto).save();
            if (createUser) {
                return "(service) create user successfully";
            }
        } catch (error) {
            throw new HttpException("(service) create user failed", HttpStatus.BAD_REQUEST);
        }
    }

    // Find user with username, email or phone.
    async findUserByUsernameOrEmailOrPhone({ username, email, phone }: any): Promise<User> {
        try {
            const rs = await this.userModel.findOne(
                {
                    $or: [
                        { username: username },
                        { email: email },
                        { phone: phone },
                    ],
                }
            ).exec();
            if (rs) {
                return rs;
            }
        } catch (error) {
            throw new BadRequestException("(service) user not found");
        }
    }

    // hash and compare password
    async hashPassword(password: string): Promise<string> {
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);
        return hash;
    }
    async comparePassword(hashPassword: string, password: string): Promise<boolean> {
        const result = await bcrypt.compare(password, hashPassword);
        return result;
    }
}