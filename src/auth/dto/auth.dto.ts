import { IsEmail, IsString, MinLength } from "class-validator";

export class AuthDto {
    @IsEmail({}, { message: 'Por favor, insira um e-mail válido.' })
    email: string;

    @IsString({ message: 'A senha deve ser uma string.' })
    @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres.' })
    password: string;
}
