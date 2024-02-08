import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class TokenGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return request.headers['x-api-key'];
  }
}
