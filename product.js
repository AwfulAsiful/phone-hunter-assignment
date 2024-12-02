const searchBar = document.getElementById('search-bar');
const searchBtn = document.getElementById('search-btn');
const phoneContainer = document.querySelector('.phone-container');
const showAllBtn = document.getElementById('show-all-btn');
const showAllBtnContainer=document.querySelector('.show-all-btn');
const skeletonLoader = document.querySelector('.skeleton-container');


const limit = 6;
let allPhones = [], limitedPhones = [];

const reset = (inputField) => inputField.value = '';

const loadPhones = (searchText) => {
    skeletonLoader.classList.remove('hidden');
    skeletonLoader.classList.add('grid', 'grid-cols-1', 'gap-4', 'place-items-center', 'md:grid-cols-2', 'lg:grid-cols-3');
    phoneContainer.classList.add('hidden');

    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
        .then(res => res.json())
        .then(phones => {
            allPhones = phones.data.slice(limit + 1);
            limitedPhones = phones.data.slice(0, limit);
            skeletonLoader.classList.add('hidden');
            skeletonLoader.classList.remove('grid', 'grid-cols-1', 'gap-4', 'place-items-center', 'md:grid-cols-2', 'lg:grid-cols-3');
            phoneContainer.classList.remove('hidden');

            displayPhones(limitedPhones);
        });
}

const loadPhoneDetails = (slug) => {
    let url = `https://openapi.programming-hero.com/api/phone/${slug}`;
    console.log(url);

    fetch(url)
        .then(res => res.json())
        .then(details => {
            const phone = details.data;
            // const modal = document.getElementById('details-modal');

            // Update modal content
            document.getElementById('modal-img').src = phone.image;
            document.getElementById('modal-name').textContent = phone.name;
            document.getElementById('modal-description').textContent = 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.';
            document.getElementById('modal-storage').textContent = phone.mainFeatures.storage;
            document.getElementById('modal-display-size').textContent = phone.mainFeatures.displaySize;
            document.getElementById('modal-chipset').textContent = phone.mainFeatures.chipSet;
            document.getElementById('modal-memory').textContent = phone.mainFeatures.memory;
            document.getElementById('modal-release-date').textContent = phone.releaseDate;
            document.getElementById('modal-brand').textContent = phone.brand;
            document.getElementById('modal-gps').textContent = phone.gps || 'Not Available';


        });
}


const displayPhones = (phones) => {
    phones.forEach((phone) => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = 'card w-[20rem] border-2';
        phoneCard.id = `${phone.slug}`;
        phoneCard.innerHTML = `
            <figure class="bg-[var(--banner-bg)] mt-[1.5rem] mx-[1.5rem] p-[3rem]">
                <img src=${phone.image} alt="" class="w-[10rem]">
            </figure>
            <div class="card-body flex flex-col items-center text-center">
                <h2 class="text-[1.5rem] font-bold text-black mb-[1.25rem]">${phone.phone_name}</h2>
                <p class="text-[1.125rem]">There are many variations of passages of available, but the majority have suffered</p>
                <p id=${phone.slug} class="hidden">${phone.slug}</p>
                <p class="text-[1.5rem] font-bold text-black">$199</p>
                <div class="card-actions mt-4">
                    <button class="btn-tertiary text-white" id="show-details-btn" onclick="details_modal.showModal()">Show details</button>
                </div>
            </div>
        `;
        phoneContainer.appendChild(phoneCard);
    });

    const showDetailsBtns = document.querySelectorAll('#show-details-btn');
    showDetailsBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const slug = e.target.closest('.card').id;
            loadPhoneDetails(slug);
        });
    });
}

searchBtn.addEventListener('click', () => {

    const searchText = searchBar.value;
    phoneContainer.innerHTML = '';
    loadPhones(searchText);
    showAllBtnContainer.classList = 'show-all-btn flex flex-col items-center mt-[3rem]'
    reset(searchBar);

});

showAllBtn.addEventListener('click', () => {
    if (allPhones.length) { displayPhones(allPhones); allPhones = []; }
    else {
        alert("There are no products available at the moment.");
        showAllBtnContainer.classList = 'show-all-btn hidden'
    }

});

// Select all images in the banner
const images = document.querySelectorAll('.banner-img .img-1, .banner-img .img-2, .banner-img .img-3');

// Create an intersection observer
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // When the image enters the viewport, add the 'img-visible' class for animation
            entry.target.classList.add('img-visible');
        } else {
            
            entry.target.classList.remove('img-visible');
        }
    });
}, {
    threshold: (window.innerWidth>=1024?0.3:0.7) 
});

// Observe each image
images.forEach(image => observer.observe(image));

