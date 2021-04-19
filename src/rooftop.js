class Rooftop {

  constructor(rooftop, rooftopAttributes) {
    this.id = rooftop.id;
    this.name = rooftopAttributes.name;
    this.address = rooftopAttributes.address;
    this.image_url = rooftopAttributes.image_url;
    this.website_url = rooftopAttributes.website_url;
    this.description = rooftopAttributes.description;
    this.neighborhood = rooftopAttributes.neighborhood;
    Rooftop.all.push(this)
  }

  render() {
    return `
    <div id="card${this.id}" data-id=${this.id}>
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
          <button data-id=${this.id} id="editBtn${this.id}" class="btn btn-primary ml-auto">Edit</button>
          </div>
        </div>
      </div>
    </div><br><br><br>`;
  }

  renderUpdateForm() {
    return `
    <div class="center intro-button mx-auto" style="margin-bottom: 5rem;">
      <div class="container">
        <div class="about-heading-content col-xl-10 col-lg-10 mx-auto bg-faded rounded p-5 white" id="rooftop-form">
          <h2 class="section-heading mb-4" id="rt-head"><span class="center section-heading-lower">Edit a Rooftop</span></h2>
          <form data-id=${this.id} >
          <div class="form-group">
              <label for="rt-name"><p>Rooftop Name</p></label>
              <input type="text" class="form-control" value="${this.name}" id="rt-name">
            </div>
            <div class="form-group">
              <label for="rt-address"><p>Address</p></label>
              <input type="text" class="form-control" value = "${this.address}" id="rt-address">
            </div>
            <div class="form-group">
              <label for="rt-image">Image Url</label>
              <input type="text" class="form-control" value = "${this.image_url}" id="rt-image">
            </div>
            <div class="form-group">
              <label for="rt-website">Website Link</label>
              <input type="text" class="form-control" value = "${this.website_url}" id="rt-website">
            </div>
            <div class="form-group">
              <label for="rt-description">Description</label>
              <textarea class="form-control" id="rt-description" value = "${this.description}" rows="2">${this.description}</textarea>
            </div>
            <div class="form-group">
              <select class="form-control" id="neighborhoods" value = "$this.neighborhood.name" name="neighborhoods">
                <option selected>Neighborhood</option>
                <option value="1">Lincoln Park</option>
                <option value="2">Logan Square</option>
                <option value="3">Loop</option>
                <option value="4">River North</option>
                <option value="5">South Loop</option>
                <option value="6">West Loop</option>
                <option value="7">Wicker Park</option>
              </select>              
            </div><br>
            <input id='create-button' type="submit" name="submit" value="Edit Rooftop" class="btn  submit">
          </form>
        </div>
      </div>
    </div>`;  
  }

  static findById(id) {
    return this.all.find(rooftop => rooftop.id === id);
  }

}

Rooftop.all = []