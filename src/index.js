const endPoint = "https://windycityrooftops-api.herokuapp.com/api/v1/rooftops"
const createRooftopForm = document.querySelector('#rt');

document.addEventListener('DOMContentLoaded', () => {
  const aboutLink = document.querySelector('#about');
  aboutLink.addEventListener('click', (e) => renderAbout(e))

  getRooftops()

  createRooftopForm.addEventListener('submit', (e) => createFormHandler(e))

  editRooftop()
})

// loads edit rooftop form and rooftop information
function editRooftop() {
  document.addEventListener('click', function(e) {

    for(i = 1; i <= Rooftop.all.length; i++) {
      id = i + ""
      if (e.target.id === ("editBtn" + id)) {
        rooftop = Rooftop.findById(id)
        document.querySelector('#main-bod').innerHTML = rooftop.renderUpdateForm()

        const editForm = document.querySelector('#main-bod')
        editForm.addEventListener('submit', e => updateFormHandler(e))
      }
    }
  });
}

// get all rooftops from API
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

// set values for add rooftop form
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

// post new rooftop to API
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
    console.log(rooftopData)

    const newRooftop = new Rooftop(rooftopData, rooftopData.attributes)
    console.log(newRooftop)

    document.querySelector('#rooftop-container').innerHTML += newRooftop.render()

    createRooftopForm.reset();
    slowScroll()
  })
}

// set values for edit rooftop form
function updateFormHandler(e) {
  e.preventDefault();

  const rooftop = Rooftop.findById(e.target.id);
  const id = rooftop.id
  const name = e.target.querySelector('#rt-name').value;
  const address = e.target.querySelector('#rt-address').value;
  const image = e.target.querySelector('#rt-image').value;
  const website = e.target.querySelector('#rt-website').value;
  const description = e.target.querySelector('#rt-description').value;
  const neighborhoodID = parseInt(e.target.querySelector('#neighborhoods').value);

  patchRooftop(id, name, address, image, website, description, neighborhoodID)
}

// edit rooftop in API
function patchRooftop(id, name, address, image_url, website_url, description, neighborhood_id) {
  const bodyData = {name, address, image_url, website_url, description, neighborhood_id}

  fetch(`${endPoint}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(bodyData),
  })
    .then(response => response.json())
    .then(updatedRooftop => {
      
      console.log(updatedRooftop)

      window.location.assign("index.html");
    })
}

// scroll slow to top of page, used after rooftop is added
function slowScroll() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// render the About page
function renderAbout(e) {
  e.preventDefault()

  const aboutMarkup =  `<section class="page-section about-heading" style="margin-bottom:5rem">
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