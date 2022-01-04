import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { classToClassFromExist, plainToClass, plainToInstance } from "class-transformer";

import { User } from "src/user/schemas/user.schema";
import { UserService } from "src/user/services/user.service";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findUserByUsernameOrEmailOrPhone({username: username}) as any;
        if(user) {
            const isMatchPassword = await this.userService.comparePassword(user.password, password);
            if(isMatchPassword) {
                const newUser = user.toObject();
                const {password, ...res} = newUser;
                return res;
            }
        }
        return null;
    }

    async login(user: any) {
        const payload = {username: user.username, id: user._id, role: user.role};
        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}