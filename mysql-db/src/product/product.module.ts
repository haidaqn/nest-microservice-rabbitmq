import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./product.entity";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [TypeOrmModule.forFeature([Product]), ClientsModule.register([{
    name: "PRODUCT_SERVICE", transport: Transport.RMQ, options: {
      urls: ["amqps://bcdhsuuj:olfeMl4yZ0LlCe2jxHmw_5yJHmjZQRiy@sparrow.rmq.cloudamqp.com/bcdhsuuj"],
      queue: "main_queue",
      queueOptions: {
        durable: true
      }
    }
  }])], controllers: [ProductController], providers: [ProductService]
})
export class ProductModule {
}
