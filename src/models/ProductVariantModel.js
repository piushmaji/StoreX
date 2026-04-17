// models/ProductVariant.js

export class ProductVariant {
  constructor({
    id,
    product_id,
    size,
    color,
    stock,
    price,
    discount_price
  }) {
    this.id = id;
    this.product_id = product_id || null;
    this.size = size || null;
    this.color = color || null;
    this.stock = stock ? Number(stock) : 0;
    this.price = Number(price);
    this.discount_price = discount_price ? Number(discount_price) : null;
  }

  // optional helper
  get finalPrice() {
    return this.discount_price || this.price;
  }

  get isInStock() {
    return this.stock > 0;
  }
}