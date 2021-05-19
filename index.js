const mainImgBtn = document.getElementById("main-img-btn");
const secImgBtn = document.getElementById("sec-img-btn");

const albumRow = document.querySelector(".album .row")

const modalImg = document.getElementById("modal-img");

mainImgBtn.addEventListener("click", () => {
    fetchImgs("beaches");
} );

secImgBtn.addEventListener("click", () => {
    fetchImgs("forest")
} );

const fetchImgs = query => {
    fetch(`http://www.splashbase.co/api/v1/images/search?query=${query}`).then((response) => response.json()).then((data) => renderImg(data.images) );
}



const renderImg = imgArray => {
    albumRow.innerHTML = "";
    imgArray.forEach(img => {
        albumRow.innerHTML +=
        `
        <div class="col-md-4">
              <div class="card mb-4 shadow-sm">
                <img src="${img.url}">
                <div class="card-body">
                  <p class="card-text">
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                  </p>
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <div class="btn-group">
                      <button
                        type="button"
                        class="btn btn-sm btn-outline-secondary view-btn"
                        data-toggle="modal" data-target="#img-modal"

                      >
                        View
                      </button>
                      <button
                        type="button"
                        class="btn btn-sm btn-outline-secondary"
                      >
                        Hide
                      </button>
                    </div>
                    <small class="text-muted">id: ${img.id}</small>
                  </div>
                </div>
              </div>
            </div>
        `
    });

    const viewBtns = document.querySelectorAll(".view-btn");
    viewBtns.forEach(viewBtn => {
        viewBtn.addEventListener("click",(event) => {
            const clickedBtn = event.currentTarget;
            // console.log(clickedBtn);
            const currentCard = clickedBtn.closest(".card");
            // console.log(currentCard)
            const imgSrc = currentCard.querySelector("img").src;
            // console.log(imgSrc);
            showModal(imgSrc);
        } )
    })
}

const showModal = imgSrc => {
    modalImg.src = imgSrc;
}

