import {
  BadGatewayException,
  CallHandler,
  ConflictException,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        const code = err.code;
        const parameters = Object.keys(err);

        console.log('------ ERROR ---');
        console.log('code', code);
        for (const parameter of parameters) {
          console.log(parameter, err[parameter]);
        }

        if (err.name.includes('NotFoundError'))
          throw new NotFoundException('This record does not exist.');

        if (err.response?.message) {
          throw err;
        }

        switch (code) {
          case 'P2002':
            if (err.message.includes('email')) {
              throw new ConflictException('This email is already registered.');
            }
          case 'P2025':
            throw new NotFoundException('This record does not exist.');
          case 'P2003':
            if (context.getArgs()[0].method == 'DELETE') {
              throw new NotFoundException('Registro em uso.');
            } else {
              throw new NotFoundException('Registro externo não encontrado.');
            }
          default:
            throw new BadGatewayException();
        }
      }),
    );
  }
}
