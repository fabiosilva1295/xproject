import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmail, isUUID } from 'class-validator';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(data: CreateUserDto): Promise<User> {
    const user: User = this.userRepository.create(data);
    try {
      return await this.userRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException('Não foi possível realizar o cadastro. Verifique os dados informados.');
      }
      throw new InternalServerErrorException('Erro ao processar sua solicitação.');
    }
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(indentifier: string):  Promise<User | null>{
    const where: Object[] = [];

    if(isUUID(indentifier)) where.push({id: indentifier});
    if(isEmail(indentifier)) where.push({email: indentifier});

    return await this.userRepository.findOne({where});
  }

  async update(id: string, data: UpdateUserDto) {
    return await this.userRepository.update(id, data);
  }

  remove(id: string) {
    return this.userRepository.delete(id);
  }
}
