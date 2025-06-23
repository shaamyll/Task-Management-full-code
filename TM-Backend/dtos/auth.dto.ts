import { IsEmail, IsString, Length } from "class-validator";

export class SignUpDto {
[x: string]: string;

@IsEmail()
email: string;

@IsString()
username: string;

@IsString()
@Length(5)
password: string;

}

export class LoginDTO {

@IsEmail()
email: string;

@IsString()
@Length(5)
password: string;


}