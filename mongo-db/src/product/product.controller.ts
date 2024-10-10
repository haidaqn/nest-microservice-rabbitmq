import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ProductService } from "./product.service";
import { Product } from "./product.schema";
import { EventPattern } from "@nestjs/microservices";

@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {
  }

  @Get(":id")
  async get(@Param("id") id: string) {
    return this.productService.get(id);
  }

  @Get()
  async all() {
    return this.productService.getList();
  }

  @EventPattern("hello")
  async hello(data: string) {
    console.log("data", data);
  }

  @EventPattern("created_product")
  async create(data: any) {
    return this.productService.create(data);

  }

  @EventPattern("deleted_product")
  async delete(data: { id: string }) {
    return this.productService.delete(data.id);
  }

  @EventPattern("updated_product")
  async update(data: { id: string; product: Product }) {
    return this.productService.update(data.id, data.product);
  }

}
