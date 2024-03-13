import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrpcModule } from '@server/trpc/trpc.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';

@Module({
  imports: [TrpcModule, UserModule, BookmarkModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
