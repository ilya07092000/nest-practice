import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[1];

      if (!bearer) {
        throw new UnauthorizedException({ message: 'Not Authorized' });
      }

      const user = this.jwtService.verify(bearer, {
        secret: process.env.JWT_ACCESS_SECRET,
      });
      req.user = user;

      return true;
    } catch (e) {
      throw new UnauthorizedException({ message: 'Not Authorized' });
    }
  }
}
