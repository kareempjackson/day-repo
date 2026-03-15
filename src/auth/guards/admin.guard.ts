import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Request } from 'express';

interface AuthenticatedUser {
  id: string;
  role: string;
}

interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
}

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('Authentication required');
    }

    if (user.role !== 'admin') {
      throw new ForbiddenException('Admin access required');
    }

    return true;
  }
}
