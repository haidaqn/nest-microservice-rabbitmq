import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductModule } from './product/product.module';

@Module({
  imports: [MongooseModule.forRoot("mongodb://mongo:123456x@localhost:27017/mongo?authSource=admin"), ProductModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
