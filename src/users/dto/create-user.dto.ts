import { IsEmail, IsString } from "class-validator";
import { Role } from "src/common/role.enum";

export class CreateUserDto {

    
    id: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsEmail()
    email: string;
    password: string;
    isActive?: boolean;
    role?: Role;
}
