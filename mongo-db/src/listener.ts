import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Transport } from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ, options: {
      urls: ["amqps://bcdhsuuj:olfeMl4yZ0LlCe2jxHmw_5yJHmjZQRiy@sparrow.rmq.cloudamqp.com/bcdhsuuj"], // Địa chỉ RabbitMQ
      queue: "main_queue", // Tên hàng đợi mà microservice sẽ sử dụng
      queueOptions: {
        durable: true // Hàng đợi sẽ giữ lại các tin nhắn khi không có consumer
      }
    }
  });

  await app.listen();

  console.log("Microservice is listening");
}

bootstrap();
