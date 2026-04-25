export class CartItem {
  constructor({ id, product_id, variant_id, quantity }) {
    this.id = id;
    this.product_id = product_id;
    this.variant_id = variant_id;
    this.quantity = quantity;
  }
}