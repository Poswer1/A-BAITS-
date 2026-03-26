import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class RolesGuard implements CanActivate { // CanActivate возрощает true или false если true тогда дейсвтия в контролере выполняеться
    canActivate(context: ExecutionContext): boolean { // context содержит всю информацию запроса request, response тд...
        const req = context.switchToHttp().getRequest()
        const user = req.user
    }
}