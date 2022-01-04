import { IsDefined, IsString, Matches } from "class-validator";
import { userRegex } from "../user.regex";

export class CreateUserDto {
    @IsDefined()
    @Matches(userRegex.usernameRegex)
    username: string;

    @IsDefined()
    @Matches(userRegex.passwordRegex)
    password: string;

    @IsDefined()
    @Matches(userRegex.nameRegex)
    name: string;

    @IsDefined()
    @Matches(userRegex.emailRegex)
    email: string;

    @IsDefined()
    @Matches(userRegex.rolesRegex)
    role: string;

    @IsDefined()
    @Matches(userRegex.phoneRegex)
    phone: string;

    @IsString()
    avatar: string;
}