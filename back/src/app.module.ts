import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
  imports: [AuthModule, PostsModule, FirebaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
