import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.model';
import { RolesService } from './roles.service';

@ApiTags('Roles Endpoint')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @ApiResponse({ status: 200, type: Role })
  @ApiOperation({ summary: 'Creates Role' })
  @Post()
  async create(@Body() rolesDto: CreateRoleDto) {
    return this.rolesService.createRole(rolesDto);
  }

  @ApiResponse({ status: 200, type: Role })
  @ApiOperation({ summary: 'Get Role By Value' })
  @Get('/:value')
  async getByValue(@Param('value') value: string) {
    return this.rolesService.getRoleByValue(value);
  }
}
