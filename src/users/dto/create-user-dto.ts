import { IsDefined, IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto{

    @IsString()
    @IsDefined()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsEnum(["INTERN", "ENGINEER" ,"ADMIN"], {
        message: "Valid Role required"
    })
    role: "INTERN"| "ENGINEER" | "ADMIN";
}