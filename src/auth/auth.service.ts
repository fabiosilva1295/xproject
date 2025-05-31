import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService
  ){}

  login(createAuthDto: AuthDto) {
    return 'Login its works';
  }

  async validateUser(login: string, password: string): Promise<any> {
    const user: User | null = await this.userService.findOne(login);

    if(user && await this.validPassword(user, password)){
      const {password: _, ...response} = user;
      return response;
    }

    return null
  }

  async validPassword(user: User, password: string): Promise<boolean> {
    return await bcrypt.compare(password, user.password);
  }
}
