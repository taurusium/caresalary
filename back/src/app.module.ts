import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { FirebaseModule } from './modules/firebase/firebase.module';
import { UsersModule } from './modules/users/users.module';
import { PreAuthMiddleware } from './middleware/pre.auth.middleware';
import { PostsModule } from './modules/posts/posts.module';

@Module({
  imports: [AuthModule, PostsModule, FirebaseModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(PreAuthMiddleware).forRoutes({
      path: '/auth/*',
      method: RequestMethod.ALL,
    });
  }
}
