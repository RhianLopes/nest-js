import { Module } from '@nestjs/common';
import { HelloModule } from './modules/hello.module';

@Module({
  imports: [HelloModule],
  providers: [],
})
export class AppModule {}