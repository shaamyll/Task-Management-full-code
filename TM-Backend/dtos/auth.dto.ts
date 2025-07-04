import { IsEmail, IsString, Length } from "class-validator";

export class SignUpDto {
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


export interface UserFilters {
  searchName?: string;
  searchEmail?: string;
  role?: string;
}