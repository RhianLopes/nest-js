import { Controller, Get } from '@nestjs/common';
import { HelloService } from '../services/hello.service';

@Controller()
export class HelloController {
  constructor(private readonly appService: HelloService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
