class Rooftop {

  constructor(rooftop, rooftopAttributes) {
    this.id = rooftop.id;
    this.name = rooftopAttributes.name;
    this.address = rooftopAttributes.address;
    this.image_url = rooftopAttributes.image_url;
    this.website_url = rooftopAttributes.website_url;
    this.description = rooftopAttributes.description;
    this.neighborhood = rooftopAttributes.neighborhood;
    this.user_id = rooftopAttributes.user_id 
    Rooftop.all.push(this)
  }

  render() {
    debugger
    return `<div data-id=${this.id}>
      <div class="product-item-title d-flex">
        <div class="bg-faded p-5 d-flex mr-auto rounded">
          <a class="p-link" href="${this.website_url}" target="_blank">
            <h2 class="section-heading mb-0">
              <span class="section-heading-lower center">${this.name}</span>
              <span class="center section-heading-upper">${this.address}</span>
            </h2>
          </a>
        </div>
      </div>
      <img class="product-item-img mx-auto d-flex rounded img-fluid mb-3 mb-lg-0" src="${this.image_url}" alt="Chicago Rooftop">
      <div class="product-item-description d-flex ml-auto">
        <div class="bg-faded p-5 rounded">
          <p class="mb-0">${this.description}</p><br>
          <div class="row">
          <p class="mb-0 neighborhood">Neighborhood: ${this.neighborhood.name}</p>
          <button data-id=${this.id} class="btn btn-primary ml-auto">Edit</button>
          </div>
        </div>
      </div>
    </div><br><br><br>`;
  }

}

Rooftop.all = []