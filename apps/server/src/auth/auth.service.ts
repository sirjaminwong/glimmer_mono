import { JwtService } from '@nestjs/jwt';
import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { omit } from 'lodash';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.screenName };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validateUser(userScreenName: string, pass: string) {
    const user = await this.usersService.findOne(userScreenName);
    // if (user && bcrypt.compareSync(pass, user.password)) {
    if (user) {
      const result: Omit<typeof user, 'password'> & {
        password?: string;
      } = { ...user };
      delete result.password;
      return omit(result, 'password');
    }
    return null;
  }

  async login(user: { screenName: string; userId: string }) {
    const payload = { screenName: user.screenName, userId: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(username: string, pass: string): Promise<any> {
    const existingUser = await this.usersService.findOne(username);
    if (existingUser) {
      throw new ConflictException('用户名已存在');
    }

    const hashedPassword = bcrypt.hashSync(pass, 10);
    console.log('register', hashedPassword);
    return this.usersService.create({
      username,
      password: hashedPassword,
    });
  }
}
