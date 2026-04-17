export class Product {
  constructor({
    id,
    name,
    description,
    category_id,
    created_at,
    is_visible,
    rating,
    reviews,
    image_urls,
    
    // Virtual or nested fields from SELECT queries
    product_variants,
    categories,
    product_reviews
  }) {
    this.id = id;
    this.name = name;
    this.description = description || null;
    this.category_id = category_id || null;
    this.created_at = created_at || null;
    this.is_visible = is_visible ?? true;
    this.rating = rating ? Number(rating) : 0.0;
    this.reviews = reviews ? Number(reviews) : 0;
    this.image_urls = image_urls || [];
    
    // Attach nested relational schemas if requested
    this.variants = product_variants || [];
    this.category = categories || null;
    this.product_reviews = product_reviews || [];
  }
}