import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  login(createAuthDto: AuthDto) {
    return 'Login its works';
  }

  validateUser(login, password): boolean {
    return true
  }
}
