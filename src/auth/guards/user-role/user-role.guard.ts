import { Reflector } from '@nestjs/core';
import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { META_ROLES } from 'src/auth/decorators/role-protected.decorator';
import { User } from 'src/users/entities/user.entity';
import { ValidRoles as roles } from 'src/auth/interfaces';

@Injectable()
export class UserRoleGuard implements CanActivate {
 
  constructor(
    private readonly reflector: Reflector,
  ) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const validRoles: string[]= this.reflector.get(META_ROLES, context.getHandler());
    
    if (!validRoles) return true;
    if (validRoles.length === 0 ) return true;

    const req = context.switchToHttp().getRequest();
    const user = req.user as User;
    if (!user) throw new BadRequestException('User not found');
    if(user.roles.includes(roles.SUPERADMIN) || user.roles.some(role => validRoles.includes(role))) {
      return true;
    };

    throw new ForbiddenException(`User ${user.name} need a valid need a valid role to access this resource`);
  };
};
