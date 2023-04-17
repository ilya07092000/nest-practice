import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRespository: typeof User,
    private roleService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRespository.create(dto);
    const role = await this.roleService.getRoleByValue('user');
    await user.$set('roles', [role.id]);
    user.roles = [role];

    return user;
  }

  async getAllUsers() {
    const users = await this.userRespository.findAll({
      include: { all: true },
    });
    return users;
  }

  async getUserByEmail(email: string) {
    return await this.userRespository.findOne({
      where: { email },
      include: { all: true },
    });
  }

  async addRole(dto: AddRoleDto) {
    const currUser = await this.userRespository.findByPk(dto.userId);
    if (!currUser) {
      throw new BadRequestException({ message: 'User Does Not Exist' });
    }

    const role = await this.roleService.getRoleByValue(dto.value);
    if (!role) {
      throw new BadRequestException({ message: 'Role Does Not Exist' });
    }

    await currUser.$add('role', role);
    return dto;
  }

  async ban(dto: BanUserDto) {
    const currUser = await this.userRespository.findByPk(dto.userId);

    if (!currUser) {
      throw new BadRequestException({ message: 'User Does Not Exist' });
    }

    currUser.banned = true;
    currUser.banReason = dto.banReason;
    await currUser.save();
    return currUser;
  }
}
