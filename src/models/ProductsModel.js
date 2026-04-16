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
    image_urls
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.category_id = category_id;
    this.created_at = created_at;
    this.is_visible = is_visible;
    this.rating = rating;
    this.reviews = reviews;
    this.image_urls = image_urls || [];
  }
}