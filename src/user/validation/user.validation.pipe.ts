import { ArgumentMetadata, BadRequestException, HttpException, Injectable, PipeTransform } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { CreateUserDto } from "../dto/createUserDto";
import { validate } from "class-validator";

@Injectable()
export class UserValidation implements PipeTransform {
    async transform(value: any, metadata: ArgumentMetadata) {
        try {
            const userObject = plainToInstance(CreateUserDto, value);
            const errors = await validate(userObject, {skipMissingProperties: true});
            if(errors.length > 0) {
                throw new BadRequestException("(validation) validation create user failed");
            }
            return value;

        } catch (error) {
            throw new BadRequestException("(validation) validation create user failed");
        }
    }
}