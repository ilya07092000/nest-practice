import { Role } from 'src/roles/roles.model';

export class GenerateTokensDto {
  readonly id: number;
  readonly email: string;
  readonly roles: Role[];
}
