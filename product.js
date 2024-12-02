const searchBar = document.getElementById('search-bar');
const searchBtn = document.getElementById('search-btn');
const phoneContainer = document.querySelector('.phone-container');

// console.log(searchBtn);

const reset = (inputField) => inputField.value = '';

const loadPhones = (searchText) => {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    .then(res => res.json())
    .then(phones =>displayPhones(phones.data));

}
const displayPhones=(phones)=>{
    phones.forEach((phone)=>{
        const phoneCard=document.createElement('div');
        phoneCard.classList='card w-[20rem] border-2';
        phoneCard.innerHTML=`
                     <figure class="bg-[var(--banner-bg)] mt-[1.5rem] mx-[1.5rem] p-[3rem]">
                        <img src=${phone.image} alt="" class="w-[10rem]">
                    </figure>
                    <div class="card-body flex flex-col items-center text-center">
                        <h2 class="text-[1.5rem] font-bold text-black mb-[1.25rem]">${phone.phone_name}</h2>
                        <p class="text-[1.125rem]">There are many variations of passages of available, but the majority
                            have suffered</p>
                        <p class="text-[1.5rem] font-bold text-black">$199</p>
                        <div class="card-actions mt-4">
                            <button class="btn-tertiary text-white" >Show details</button>
                        </div>
                    </div>
        `
        phoneContainer.appendChild(phoneCard);
    })
}

searchBtn.addEventListener('click', () => {
    const searchText = searchBar.value;
    phoneContainer.innerHTML='';
    loadPhones(searchText);
    reset(searchBar);
})