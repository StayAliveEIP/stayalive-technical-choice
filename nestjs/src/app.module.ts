import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MessageModule} from "./message/message.module";
import {PrivateModule} from "./private/private.module";

@Module({
  imports: [
    MessageModule,
    PrivateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
