import {photosPromise, getPictureInfo} from "./main.js";

const imgFiltersBlock = document.querySelector('.img-filters--inactive'),
      imgFiltersBtn = document.querySelectorAll('.img-filters__button'),
      imgFilterForm = document.querySelector('.img-filters__form'),
      filterDiscussed = document.querySelector('#filter-discussed'),
      filterDefault = document.querySelector('#filter-default'),
      filterRandom = document.querySelector('#filter-random');


export function showImgFiltersBlock(){
    imgFiltersBlock.style.opacity = '1';
}

imgFilterForm.addEventListener('click', (e)=>{
    for(let i = 0; i < imgFiltersBtn.length; i++){      
            imgFiltersBtn[i].classList.remove('img-filters__button--active')                          
    }
    e.target.classList.add('img-filters__button--active')
})


function clearPhotos(){
    let pictures = document.querySelectorAll('.picture');
    for(let i = 0; i < pictures.length; i++){
        pictures[i].remove()
    }
}


function addDefaultPhotos(){
    clearPhotos();
    photosPromise.sort((a,b)=> a.id - b.id)

    const defaultPhotos = photosPromise.map((e) => getPictureInfo(e))
}


function addPopularPhotos(){
    clearPhotos();
    photosPromise.sort((a,b)=> b.comments.length - a.comments.length)
    const popularPhotos = photosPromise.map((e) => getPictureInfo(e))   
}; 

function addRandomPhotos(){
    clearPhotos();
    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
      }
      shuffle(photosPromise)
      const randomPhotos = photosPromise.slice(0, 10).map((e) => getPictureInfo(e))
}


function debounce(callee, timeoutMs) {
    return function perform(...args) {
      let previousCall = this.lastCall  
      this.lastCall = Date.now()
      if (previousCall && this.lastCall - previousCall <= timeoutMs) {
        clearTimeout(this.lastCallTimer)
      }
      this.lastCallTimer = setTimeout(() => callee(...args), timeoutMs) 
    }
  }
  

  const debouncedPopularPhotos = debounce(addPopularPhotos, 500);
  const debouncedRandomPhotos = debounce(addRandomPhotos, 500);
  const debouncedDefaultPhotos = debounce(addDefaultPhotos, 500);

  filterRandom.addEventListener('click', debouncedRandomPhotos);

  filterDiscussed.addEventListener('click', debouncedPopularPhotos);
  
  filterDefault.addEventListener('click', debouncedDefaultPhotos);