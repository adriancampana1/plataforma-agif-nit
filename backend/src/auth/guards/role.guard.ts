import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Role } from '@prisma/client';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly roles: Role[]) {}
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const role = request.user.role;

    if (this.roles.includes(role)) {
      return true;
    }
    throw new UnauthorizedException('You do not have permission to access');
  }
}
