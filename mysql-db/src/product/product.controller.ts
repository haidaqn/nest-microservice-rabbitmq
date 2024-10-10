import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ClientProxy } from "@nestjs/microservices";

@Controller("product")
export class ProductController {

  constructor(
    private readonly productService: ProductService,
    @Inject("PRODUCT_SERVICE") private readonly client: ClientProxy) {
  }

  @Get()
  async all() {
    this.client.emit("hello", "Hello form rabbitmq");
    return await this.productService.all();
  }

  @Post()
  async create(@Body() body: {
    title: string, image: string
  }) {
    const { title, image } = body;
    this.client.emit("created_product", body);
    return await this.productService.create(title, image);
  }

  @Get(":id")
  async get(@Param("id") id: string) {
    return await this.productService.get(id);
  }


  @Patch(":id")
  async update(@Param("id") id: string, @Body() body: {
    title?: string, image?: string
    likes?: number
  }) {
    const { title, image, likes } = body;
    this.client.emit("updated_product", { id, ...body });
    return await this.productService.update(id, title, image, likes);
  }


  @Delete(":id")
  async delete(@Param("id") id: string) {
    this.client.emit("deleted_product", { id });
    return await this.productService.delete(id);
  }

}
