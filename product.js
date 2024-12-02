const searchBar = document.getElementById('search-bar');
const searchBtn = document.getElementById('search-btn');
const phoneContainer = document.querySelector('.phone-container');
const showAllBtn=document.getElementById('show-all-btn');
const skeletonLoader=document.querySelector('.skeleton-container');

const limit=6;
let allPhones=[],limitedPhones=[];
// const isShowAllBtnClicked=false;
// console.log(searchBtn);

const reset = (inputField) => inputField.value = '';

const loadPhones = (searchText) => {
    skeletonLoader.classList.remove('hidden');
    skeletonLoader.classList.add('grid','grid-cols-1','gap-4','place-items-center','md:grid-cols-2','lg:grid-cols-3');
    phoneContainer.classList.add('hidden');

    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    .then(res => res.json())
    .then(phones =>{
        allPhones=phones.data.slice(limit+1);
        limitedPhones=phones.data.slice(0,limit);
        skeletonLoader.classList.add('hidden');
        skeletonLoader.classList.remove('grid','grid-cols-1','gap-4','place-items-center','md:grid-cols-2','lg:grid-cols-3');
        phoneContainer.classList.remove('hidden');
    
        displayPhones(limitedPhones);
        // (isShowAllBtnClicked?displayPhones(allPhones):displayPhones(allPhones.slice(0,limit)));
    });

}


// const displayLimitedPhones=(searchText)=>{

// }

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
    showAllBtn.classList.remove('hidden');
    const searchText = searchBar.value;
    phoneContainer.innerHTML='';
    loadPhones(searchText);
    
    reset(searchBar);
})
showAllBtn.addEventListener('click', () => {
    // console.log("clicked");
    
    // const searchText = searchBar.value;
    // phoneContainer.innerHTML='';
    // loadPhones(searchText,true);
    displayPhones(allPhones);
    // reset(searchBar);
})

