export class ProductReview {
  constructor({
    id,
    product_id,
    user_id,
    rating,
    review_text,
    review_images,
    created_at
  }) {
    this.id = id;
    this.product_id = product_id || null;
    this.user_id = user_id || null;
    this.rating = rating ? Number(rating) : 0;
    this.review_text = review_text || "";
    this.review_images = review_images || [];
    this.created_at = created_at || null;
  }

  // helper
  get hasImages() {
    return this.review_images.length > 0;
  }
}