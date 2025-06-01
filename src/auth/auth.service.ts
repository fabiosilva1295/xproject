import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedError } from 'src/auth/errors/unauthorized.error';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { JwtToken } from './models/jwt-token.interface';
import { UserPayload } from './models/user-payload.interface';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ){}

  login(user: User): JwtToken {
    const payload: UserPayload = {
      sub: user.id, 
      email: user.email, 
      name: user.name
    }
    return {
      accessToken: this.jwtService.sign(payload)
    }
  }

  async validateUser(login: string, password: string): Promise<any> {
    const user: User | null = await this.userService.findOne(login);

    if(user && await this.validPassword(user, password)){
      const {password: _, ...response} = user;
      return response;
    }

    throw new UnauthorizedError('Usuário ou senha inválidos')
  }

  async validPassword(user: User, password: string): Promise<boolean> {
    return await bcrypt.compare(password, user.password);
  }
}
