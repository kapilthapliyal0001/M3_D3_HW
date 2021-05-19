// Main Button : Blue load Images button;
const mainImgBtn = document.getElementById("main-img-btn");
// SecImgBtn: Grey secondary Image button;
const secImgBtn = document.getElementById("sec-img-btn");

const albumRow = document.querySelector(".album .row");

const modalImg = document.getElementById("modal-img");

// const searchBarVal = document.getElementById("search-bar").value;
// console.log(searchBarVal);

mainImgBtn.addEventListener("click", () => {
  const searchBarVal = document.getElementById("search-bar").value; // grabbing the text from the input field
  fetchImgs(searchBarVal);
});

secImgBtn.addEventListener("click", () => {
  const searchBarVal = document.getElementById("search-bar").value; // grabbing the text from the input field
  fetchImgs(searchBarVal);
});

const fetchImgs = (query) => {
  fetch(`http://www.splashbase.co/api/v1/images/search?query=${query}`)
    .then((response) => response.json())
    // .then((newData) => {
    //   console.log(newData);
    //   return newData;
    // })
    .then((data) => renderImg(data.images));
};

const renderImg = (imgArray) => {
  albumRow.innerHTML = "";
  imgArray.forEach((img) => {
    albumRow.innerHTML += `
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
                        class="btn btn-sm btn-outline-secondary hide-btn"
                      >
                        Hide
                      </button>
                    </div>
                    <small class="text-muted">id: ${img.id}</small>
                  </div>
                </div>
              </div>
            </div>
        `;
  });

  // adding event listeners to view buttons;

  const viewBtns = document.querySelectorAll(".view-btn");
  viewBtns.forEach((viewBtn) => {
    viewBtn.addEventListener("click", (event) => {
      showModal(event);
    });
  });

  // adding event listeners to hide buttons;

  const hideBtns = document.querySelectorAll(".hide-btn");
  hideBtns.forEach((hideBtn) => {
    hideBtn.addEventListener("click", (event) => {
      removeCard(event);
    });
  });
};

// function to show the modal when the view button has been chlicked;
const showModal = (event) => {
  const clickedBtn = event.currentTarget;
  // console.log(clickedBtn);
  const currentCard = clickedBtn.closest(".card"); // will choose the closest html element having the class "card"
  // console.log(currentCard)
  const imgSrc = currentCard.querySelector("img").src; // to grab the img-source;
  // console.log(imgSrc);

  modalImg.src = imgSrc;
};

// function to remove the card when the hide button has been clicked;
const removeCard = (event) => {
  const clickedBtn = event.currentTarget;
  const currentCard = clickedBtn.closest(".card");
  const currentParent = currentCard.parentElement; // to grab the nearest parent to be deleted;
  currentParent.remove();
};
