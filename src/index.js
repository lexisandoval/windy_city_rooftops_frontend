const endPoint = "https://windycityrooftops-api.herokuapp.com/api/v1/rooftops"
const createRooftopForm = document.querySelector('#rt');

document.addEventListener('DOMContentLoaded', () => {
  getRooftops()

  createRooftopForm.addEventListener('submit', (e) => createFormHandler(e))

  const aboutLink = document.querySelector('#about');
  aboutLink.addEventListener('click', (e) => renderAbout(e))
})

function getRooftops() {
  fetch(endPoint)
  .then(response => response.json())
  .then(rooftops => {
    rooftops.data.forEach(rooftop => {

      const newRooftop = new Rooftop(rooftop, rooftop.attributes)

      document.querySelector('#rooftop-container').innerHTML += newRooftop.render()

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
  const bodyData = {name, address, image_url, website_url, description, neighborhood_id}

  fetch(endPoint, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(bodyData)
  })
  .then(response => response.json())
  .then(rooftop => {
    console.log(rooftop);

    const rooftopData = rooftop.data

    const newRooftop = new Rooftop(rooftopData, rooftopData.attributes)

    document.querySelector('#rooftop-container').innerHTML += newRooftop.render()

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

function successMsg() {
  const msg = `<div class="alert alert-success" role="alert">Rooftop has been added!</div>`
  document.querySelector('#alertMsg').innerHTML += msg
}

function renderAbout(e) {
  e.preventDefault()

  const aboutMarkup =  `<section class="page-section about-heading">
    <div class="container">
      <img class="img-fluid rounded about-heading-img mb-3 mb-lg-0" style="width:30%; height:auto;" src="public/images/lexi.jpg" alt="">
      <div class="about-heading-content">
        <div class="row">
          <div class="col-xl-9 col-lg-10 mx-auto">
            <div class="bg-faded rounded p-5">
              <h2 class="section-heading mb-4">
                <span class="section-heading-lower">About Windy City Rooftops</span>
              </h2>
              <p>This web application was created by Lexi Sandoval during the Flatiron School Software Development Bootcamp. Lexi is currently searching for work in Chicago and is interested in web development or application development positions.</p>
              <p>Information for this website was obtained from <em><a href="https://www.timeout.com/chicago/bars/rooftop-bars-the-best-outdoor-drinking-patios-in-chicago" class="p-link" target="_blank">timeoutchicago.com</a></em>.</p>
              
              <a href="mailto: lexi.sandoval9@gmail.com"><i class="fas fa-envelope p-link"></i></a>
              <a href="https://github.com/lexisandoval" target="_blank"><i class="fab fa-github p-link"></i></a>
              <a href="https://www.linkedin.com/in/alejandra-sandoval-974871133/" target="_blank"><i class="fab fa-linkedin p-link"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`

  document.querySelector('#main-bod').innerHTML = aboutMarkup
}