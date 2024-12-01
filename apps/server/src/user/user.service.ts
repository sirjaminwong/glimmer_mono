import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createUserDto: CreateUserDto) {
    return this.prismaService.user.create({
      data: {
        name: createUserDto.username,
        screenName: createUserDto.username,
        password: createUserDto.password,
      },
    });
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(screenName: string) {
    return this.prismaService.user.findUnique({
      where: { screenName },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
