import { Injectable } from "@nestjs/common";
import { classToClassFromExist, plainToClass, plainToInstance } from "class-transformer";

import { User } from "src/user/schemas/user.schema";
import { UserService } from "src/user/services/user.service";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findUserByUsernameOrEmailOrPhone({username: username});
        if(user) {
            const isMatchPassword = await this.userService.comparePassword(user.password, password);
            if(isMatchPassword) {
                const newUser = plainToInstance(User, user);
                const {password, ...res} = newUser;
                return res;
            }
        }
        return null;
    }
}