import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @IsString()
  password: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
