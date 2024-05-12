let cardData = [];

function loadCardData() {
    const storedData = localStorage.getItem("cardData");
    if (storedData) {
        cardData = JSON.parse(storedData);
    }
}


/*function renderCards(cards) {
    const cardList = document.getElementById("card-list");
    cardList.innerHTML = "";
    cards.forEach(card => {
        const cardHtml = `
            <div class="card mb-3 ${getCardThemeClass()}">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <h5 class="card-title font-weight-bold">${card.title}</h5>
                        <input type="checkbox" class="card-checkbox" name="cardCheckbox" value="${card.id}">
                    </div>
                   
                    <p class="card-subtitle mb-2 text-muted">
                        <span>${card.event}</span> | 
                        <span class="small">${card.date} / ${card.time}</span>
                        ${card.place ? ' | ' + card.place : ''}
                    </p>
                    <div>
                        <p class="card-description">${card.description}</p>
                        ${card.image ? `<a href="${card.image}" target="_blank">View Image</a>` : ''}
                    </div>
                    <div class="btn-group mt-3">
                        <button class="btn btn-info edit-btn" data-id="${card.id}" data-toggle="modal" data-target="#editCardModal">
                            Edit
                        </button>
                        <button style="margin-left: 5px" class="btn btn-success export-pdf-btn" data-title="${card.title}" data-description="${card.description}" data-date="${card.date}" data-time="${card.time}" data-location="${card.location}">
                            Export to PDF
                        </button>
                    </div>
                </div>
            </div>
        `;
        cardList.insertAdjacentHTML("beforeend", cardHtml);
    });

    const editButtons = document.querySelectorAll(".edit-btn");
    editButtons.forEach(button => {
        button.addEventListener("click", handleEditButtonClick);
    });

    const pdfExportButtons = document.querySelectorAll(".export-pdf-btn");
    pdfExportButtons.forEach(button => {
        button.addEventListener("click", handlePdfExportButtonClick);
    });
}*/

function renderCards(cards) {
    const cardList = document.getElementById("card-list");
    cardList.innerHTML = ""; 
    cards.forEach(card => {
        const cardHtml = `
            <div class="card mb-3 ${getCardThemeClass()}">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <h5 class="card-title font-weight-bold">${card.title}</h5>
                        <input type="checkbox" class="card-checkbox" name="cardCheckbox" value="${card.id}">
                    </div>
                   
                    <p class="card-subtitle mb-2 text-muted">
                        <span>${card.event}</span> | 
                        <span class="small">${card.date} / ${card.time}</span>
                        ${card.place ? ' | ' + card.place : ''}
                    </p>
                    <div>
                        <p class="card-description">${card.description}</p>
                        ${card.image ? `<a href="${card.image}" target="_blank">View Image</a>` : ''}
                    </div>
                    <div class="btn-group mt-3">
                        <button class="btn btn-info edit-btn" data-id="${card.id}" data-toggle="modal" data-target="#editCardModal">
                            Edit
                        </button>
                        <button style="margin-left: 15px" class="btn btn-success export-pdf-btn" data-title="${card.title}" data-description="${card.description}" data-date="${card.date}" data-time="${card.time}" data-location="${card.location}">
                            Export to PDF
                        </button>
                    </div>
                </div>
            </div>
        `;
        cardList.insertAdjacentHTML("beforeend", cardHtml);
    });

    const editButtons = document.querySelectorAll(".edit-btn");
    editButtons.forEach(button => {
        button.addEventListener("click", handleEditButtonClick);
    });

    const pdfExportButtons = document.querySelectorAll(".export-pdf-btn");
    pdfExportButtons.forEach(button => {
        button.addEventListener("click", handlePdfExportButtonClick);
    });
}

/*function handleEditButtonClick(event) {
    const cardId = parseInt(event.target.dataset.id);
    const card = cardData.find(card => card.id === cardId);
    document.getElementById("editTitleInput").value = card.title;
    document.getElementById("editDescriptionInput").value = card.description;
    document.getElementById("editDateInput").value = card.date;
    document.getElementById("editTimeInput").value = card.time;
    document.getElementById("editEventInput").value = card.event;
    document.getElementById("editPlaceInput").value = card.place;
    document.getElementById("editimageInput").value = card.image;
    document.getElementById("editCardId").value = cardId;
}*/

document.getElementById("editCardForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const cardId = parseInt(document.getElementById("editCardId").value);
    const updatedCard = {
        id: cardId,
        title: document.getElementById("editTitleInput").value.trim(),
        description: document.getElementById("editDescriptionInput").value.trim(),
        date: document.getElementById("editDateInput").value,
        time: document.getElementById("editTimeInput").value,
        event: document.getElementById("editEventInput").value.trim(),
        place: document.getElementById("editPlaceInput").value.trim(),
        image: document.getElementById("editImageInput").value,
    };
    
    const index = cardData.findIndex(card => card.id === cardId);
    if (index !== -1) {
        cardData[index] = updatedCard;
        localStorage.setItem("cardData", JSON.stringify(cardData));
        renderCards(cardData);
        $('#editCardModal').modal('hide');
    }
});

document.getElementById("deleteAllBtn").addEventListener("click", deleteAllCards);
document.getElementById("deleteSelectedBtn").addEventListener("click", deleteSelectedCard);

loadTheme();
loadCardData();
renderCards(cardData);

function getCardThemeClass() {
    const selectedTheme = localStorage.getItem("selectedTheme");
    switch (selectedTheme) {
        case "cool":
            return "cool-card";
        case "dark":
            return "dark-card";
        case "happy":
            return "happy-card";
        default:
            return ""; 
    }
}

function addCard(event) {
    event.preventDefault(); 

    const title = document.getElementById("titleInput").value.trim();
    const description = document.getElementById("descriptionInput").value.trim();
    const date = document.getElementById("dateInput").value;
    const time = document.getElementById("timeInput").value;
    const eventValue = document.getElementById("eventInput").value.trim();
    const place = document.getElementById("placeInput").value.trim();
    const image = document.getElementById("imageInput").value; 

    const newCard = {
        id: Date.now(), 
        title: title,
        description: description,
        date: date,
        time: time,
        event: eventValue,
        place: place,
        image: image,
    };

    cardData.push(newCard);
    localStorage.setItem("cardData", JSON.stringify(cardData));
    renderCards(cardData);
    document.getElementById("addCardForm").reset();
}

function handleEditButtonClick(event) {
    const cardId = parseInt(event.target.dataset.id);
    const card = cardData.find(card => card.id === cardId);
  
    document.getElementById("editTitleInput").value = card.title;
    document.getElementById("editDescriptionInput").value = card.description;
    document.getElementById("editDateInput").value = card.date;
    document.getElementById("editTimeInput").value = card.time;
    document.getElementById("editEventInput").value = card.event;
    document.getElementById("editPlaceInput").value = card.place;
    document.getElementById("editImageInput").value = card.image || ''; 
    document.getElementById("editCardId").value = cardId;
}

document.getElementById("editCardForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const cardId = parseInt(document.getElementById("editCardId").value);
    const updatedCard = {
        id: cardId,
        title: document.getElementById("editTitleInput").value.trim(),
        description: document.getElementById("editDescriptionInput").value.trim(),
        date: document.getElementById("editDateInput").value,
        time: document.getElementById("editTimeInput").value,
        event: document.getElementById("editEventInput").value.trim(),
        place: document.getElementById("editPlaceInput").value.trim(),
        image: document.getElementById("editImageInput").value, 
    };

    const index = cardData.findIndex(card => card.id === cardId);
    if (index !== -1) {
        cardData[index] = updatedCard;
        localStorage.setItem("cardData", JSON.stringify(cardData));
        renderCards(cardData);
        $('#editCardModal').modal('hide');
    }
});

document.getElementById("addCardForm").addEventListener("submit", addCard);

function deleteAllCards() {
   
    if (confirm("Are you sure you want to delete all cards?")) {
        cardData.length = 0;
        localStorage.setItem("cardData", JSON.stringify(cardData));
        renderCards(cardData);
    }
}

function deleteSelectedCard() {
    const selectedCards = document.querySelectorAll('input[name="cardCheckbox"]:checked');
    selectedCards.forEach(cardInput => {
        const cardId = parseInt(cardInput.value);

        const index = cardData.findIndex(card => card.id === cardId);
        if (index !== -1) {
            cardData.splice(index, 1);
        }
    });

    localStorage.setItem("cardData", JSON.stringify(cardData));

    renderCards(cardData);
}

document.getElementById("deleteAllBtn").addEventListener("click", deleteAllCards);

document.getElementById("deleteSelectedBtn").addEventListener("click", deleteSelectedCard);

document.getElementById("searchInput").addEventListener("input", function (event) {
    const searchTerm = event.target.value.trim().toLowerCase();
    const filterOption = document.getElementById("filterOption").value;
    let filteredCards;
    if (filterOption === "general") {
        filteredCards = cardData.filter(card =>
            Object.values(card).some(value =>
                typeof value === "string" && value.toLowerCase().includes(searchTerm)
            )
        );
    } else {
        filteredCards = cardData.filter(card =>
            card[filterOption].toLowerCase().includes(searchTerm)
        );
    }
    renderCards(filteredCards);
});

function applyTheme(theme) {
    document.body.classList.remove("cool", "dark", "happy");
    document.body.classList.add(theme);
    localStorage.setItem("selectedTheme", theme);
    renderCards(cardData);
}

function loadTheme() {
    const selectedTheme = localStorage.getItem("selectedTheme");
    if (selectedTheme) {
        applyTheme(selectedTheme);
    } else {
        applyTheme("cool");
    }
}

document.getElementById("coolThemeBtn").addEventListener("click", function () {
    applyTheme("cool");
});

document.getElementById("darkThemeBtn").addEventListener("click", function () {
    applyTheme("dark");
});

document.getElementById("happyThemeBtn").addEventListener("click", function () {
    applyTheme("happy");
});

function toggleAddCardForm() {
    const addCardForm = document.querySelector("#add-card-form .card-body");
    if (addCardForm.style.display === "none") {
        addCardForm.style.display = "block";
    } else {
        addCardForm.style.display = "none";
    }
}

document.querySelector('.btn-floating').addEventListener('click', toggleAddCardForm);

document.getElementById("sortBtn").addEventListener("click", function () {
    cardData.sort((a, b) => a.title.localeCompare(b.title));
    renderCards(cardData);
});

loadTheme();

document.querySelectorAll(".export-pdf-btn").forEach(button => {
    button.addEventListener("click", exportToPdf);
});

function handlePdfExportButtonClick(event) {
    const title = event.target.dataset.title;
    const description = event.target.dataset.description;
    const date = event.target.dataset.date;
    const time = event.target.dataset.time;
    const location = event.target.dataset.location;

    // Call the exportToPdf function with the necessary data
    exportToPdf(title, description, date, time, location);
}

function exportToPdf(title, description, date, time, location) {
    console.log("Exporting PDF...");
    const doc = new jsPDF();
    doc.text("Title: " + title, 10, 10);
    doc.text("Description: " + description, 10, 20);
    doc.text("Date: " + date, 10, 30);
    doc.text("Time: " + time, 10, 40);
    doc.text("Location: " + location, 10, 50);
    doc.save("card.pdf");
}




