import { Module } from '@nestjs/common';
import { UserController, PostController } from "./app.controller";
import { UserService, PostService } from "./app.service";

@Module({
  imports: [],
  controllers: [UserController, PostController],
  providers: [UserService, PostService],
})
export class AppModule {}
