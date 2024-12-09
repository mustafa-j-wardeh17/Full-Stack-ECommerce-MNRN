import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles, ROLES_KEY } from './role.decorator';
import { userTypes } from 'src/shared/schema/users';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<userTypes[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()],
        );
        if (!requiredRoles) {
            return true;
        }
        const { user } = await context.switchToHttp().getRequest();
        return requiredRoles.some((role) => user.type?.includes(role));
    }
}
