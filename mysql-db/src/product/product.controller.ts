import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ProductService } from "./product.service";

@Controller("product")
export class ProductController {

  constructor(private readonly productService: ProductService) {
  }

  @Get()
  async all() {
    return await this.productService.all();
  }

  @Post()
  async create(@Body() body: {
    title: string, image: string
  }) {
    const { title, image } = body;
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
    const { title, image,likes } = body;
    return await this.productService.update(id,title, image,likes);
  }


  @Delete(":id")
  async delete(@Param("id") id: string) {
    return await this.productService.delete(id);
  }

}
