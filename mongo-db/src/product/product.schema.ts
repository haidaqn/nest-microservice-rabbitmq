import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

// export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop() id: number;
  @Prop() title: string;
  @Prop() image: string;
}


export const ProductSchema = SchemaFactory.createForClass(Product);