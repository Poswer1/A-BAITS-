import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class RolesGuard implements CanActivate { // CanActivate возрощает true или false если true тогда дейсвтия в контролере выполняеться
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        
    }
}