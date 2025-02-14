import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { SigninUserDto } from '../dto/signin-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/entities/user.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const {
      email,
      password,
      firstName,
      lastName,
      avatar,
      phoneNumber,
      roleId,
    } = createUserDto;

    const userExists = await this.userRepository.findOne({ where: { email } });
    if (userExists) {
      throw new Error('Email Already Exists');
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      avatar,
      phoneNumber,
      roleId,
    });
    try {
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async findOne(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error(`UserEntity with email ${email} not found`);
    }
    return user;
  }
  async findAll(): Promise<UserEntity[]> {
    const users = await this.userRepository.find();
    if (!users) {
      throw new Error('No Users Found');
    }
    return users;
  }

  async signin(signinUserDto: SigninUserDto) {
    const { email, password } = signinUserDto;
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Email Does Not exist');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid Password');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }
  async findById(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error(`UserEntity with email ${id} not found`);
    }
    return user;
  }
}
