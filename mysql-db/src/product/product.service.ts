import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./product.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>) {
  }

  async all() {
    return await this.productRepository.find();
  }

  async create(title: string, image: string) {
    return this.productRepository.save({
      title, image
    });
  }


  async get(id: string) {
    const product = await this.productRepository.findOneBy({ id: +id });

    if (!product) throw new NotFoundException("Product not found");

    return product;

  }


  async update(id: string, title?: string, image?: string, likes?: number) {
    const product = await this.productRepository.findOne({ where: { id: +id } });
    if (!product) throw new NotFoundException("Product not found");

    if (title) product.title = title;
    if (image) product.image = image;
    if (likes) product.likes = likes;

    await this.productRepository.save(product);

    return product;

  }

  async delete(id: string) {
    const product = await this.productRepository.findOne({ where: { id: +id } });
    if (!product) throw new NotFoundException("Product not found");
    await this.productRepository.delete(id);
    return true;
  }
}
