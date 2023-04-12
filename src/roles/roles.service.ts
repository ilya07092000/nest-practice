import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async createRole(role: CreateRoleDto) {
    const result = await this.roleRepository.create(role);
    return result;
  }

  async getRoleByValue(value: string) {
    const result = await this.roleRepository.findOne({ where: { value } });
    return result;
  }
}
