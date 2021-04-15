const endPoint = "http://localhost:3000/api/v1/rooftops"
const createRooftopForm = document.querySelector('#rt');

document.addEventListener('DOMContentLoaded', () => {
  getRooftops()

  createRooftopForm.addEventListener('submit', (e) =>
    createFormHandler(e))
})

function getRooftops() {
  fetch(endPoint)
  .then(response => response.json())
  .then(rooftops => {
    rooftops.data.forEach(rooftop => {
      render(rooftop)
    })
  })
}

function createFormHandler(e) {
  e.preventDefault()

  const nameInput = document.querySelector('#rt-name').value;
  const addressInput = document.querySelector('#rt-address').value;
  const imgInput = document.querySelector('#rt-image').value;
  const websiteInput = document.querySelector('#rt-website').value;
  const descriptionInput = document.querySelector('#rt-description').value;
  const neighborhoodID = parseInt(document.querySelector('#neighborhoods').value);

  postRooftop(nameInput, addressInput, imgInput, websiteInput, descriptionInput, neighborhoodID)
}

function postRooftop(name, address, image_url, website_url, description, neighborhood_id) {
  const bodyData = {name, address, image_url, website_url, description, neighborhood_id, user_id: 1}

  fetch(endPoint, {
    // POST request
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(bodyData)
  })
  .then(response => response.json())
  .then(rooftop => {
    console.log(rooftop);

    const rooftopData = rooftop.data

    render(rooftopData);

    successMsg();
    createRooftopForm.reset();
    slowScroll();
  })
  .catch((error) => {
    console.error('Error:', error);
  })
}

function slowScroll() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function render(rooftop) {
  const rooftopMarkup = `<div data-id=${rooftop.id}>
    <div class="product-item-title d-flex">
      <div class="bg-faded p-5 d-flex mr-auto rounded">
        <a class="p-link" href="${rooftop.attributes.website_url}" target="_blank">
          <h2 class="section-heading mb-0">
            <span class="section-heading-lower center">${rooftop.attributes.name}</span>
            <span class="center section-heading-upper">${rooftop.attributes.address}</span>
          </h2>
        </a>
      </div>
    </div>
    <img class="product-item-img mx-auto d-flex rounded img-fluid mb-3 mb-lg-0" src="${rooftop.attributes.image_url}" alt="">
    <div class="product-item-description d-flex ml-auto">
      <div class="bg-faded p-5 rounded">
        <p class="mb-0">${rooftop.attributes.description}</p><br>
        <p class="mb-0 neighborhood">Neighborhood: ${rooftop.attributes.neighborhood.name}</p>
      </div>
    </div>
  </div><br><br><br>`;

  document.querySelector('#rooftop-container').innerHTML += rooftopMarkup
}

function successMsg() {
  const msg = `<div class="alert alert-success" role="alert">Rooftop has been added!</div>`
  document.querySelector('#alertMsg').innerHTML += msg
}