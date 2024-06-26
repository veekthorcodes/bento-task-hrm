import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  index() {
    return {
      message: 'HRM API Root!',
      entities: {
        tasks: '/tasks',
        employees: '/employees',
        payments: '/payments',
      },
    };
  }
}
