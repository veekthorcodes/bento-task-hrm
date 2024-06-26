import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Index' })
  @ApiResponse({ status: 200, description: 'Index' })
  @Get()
  index() {
    return this.appService.index();
  }
}
