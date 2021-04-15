class Rooftop {

  constructor(rooftop, rooftopAttributes) {
    this.id = rooftop.id;
    this.name = rooftopAttributes.name;
    this.address = rooftopAttributes.address;
    this.image_url = rooftopAttributes.image_url;
    this.website_url = rooftopAttributes.website_url;
    this.neighborhood_id = rooftopAttributes.neighborhood_id;
    this.user_id = rooftopAttributes.user_id 
    Rooftop.all.push(this)
  }

}

Rooftop.all = []