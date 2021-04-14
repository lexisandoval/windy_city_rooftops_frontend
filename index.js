const endPoint = "http://localhost:3000/api/v1/rooftops"

document.addEventListener('DOMContentLoaded', () => {
  getRooftops()
})

function getRooftops() {
  fetch(endPoint)
  .then(response => response.json())
  .then(rooftops => {
    rooftops.data.forEach(rooftop => {
      const rooftopMarkup =
        // `<div data-id=${rooftop.id}>
        //   <img class="intro-img img-fluid mb-3 mb-lg-0 rounded" src="${rooftop.attributes.image_url}" alt="">

        //   <div class="intro-text left-0 text-center bg-faded p-5 rounded">
        //     <h2 class="section-heading mb-4"><span class="section-heading-lower">${rooftop.attributes.name}</span></h2>

        //     <span class="section-heading-upper"><b>${rooftop.attributes.address}</b></span><br><br>

        //     <span class="section-heading-upper">${rooftop.attributes.description}</span>

        //     <div class="intro-button mx-auto">
        //       <button data-id=${rooftop.id} class="btn btn-primary btn-xl">Edit</button>
        //     </div>
        //   </div>
        // </div>`;

        `<div data-id=${rooftop.id}>
          <div class="product-item-title d-flex">
            <div class="bg-faded p-5 d-flex ml-auto rounded">
              <h2 class="section-heading mb-0">
                <span class="section-heading-lower">${rooftop.attributes.name}</span>
                <span class="center section-heading-upper">${rooftop.attributes.address}</span>
              </h2>
            </div>
          </div>
          <img class="product-item-img mx-auto d-flex rounded img-fluid mb-3 mb-lg-0" style="width:80%;height:auto;" src="${rooftop.attributes.image_url}" alt="">
          <div class="product-item-description d-flex mr-auto">
            <div class="bg-faded p-5 rounded">
              <p class="mb-0">${rooftop.attributes.description}</p>
            </div
          </div>
        </div>`;

        document.querySelector('#rooftop-container').innerHTML += rooftopMarkup
    })
  })
}