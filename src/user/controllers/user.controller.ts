import { Body, Controller, HttpException, HttpStatus, Post, UsePipes } from "@nestjs/common";
import { CreateUserDto } from "../dto/createUserDto";
import { UserService } from "../services/user.service";
import { UserValidation } from "../validation/user.validation.pipe";

@Controller("users")
export class UserController {
    constructor(
        private userService: UserService,
    ) { }

    @Post("create-user")
    @UsePipes(new UserValidation())
    async createUserForAdmin(
        @Body("createUser") createUserDto: CreateUserDto
    ): Promise<string> {
        const rs = await this.userService.createUser(createUserDto);
        return rs;
    }
}