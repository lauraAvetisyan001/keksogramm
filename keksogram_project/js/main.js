import {showPopup} from './bigPicture.js';
import {validateHashtagInput} from './validate.js';
import {changeEffect} from './filterPhotos.js';
import {sendPhotos} from './uploadPhoto.js';
import {showImgFiltersBlock} from './filtration.js';

export const photosPromise = await fetch('http://localhost:8000/photos')
    .then(function (resp) {
        return resp.json() 
    })  
      .catch((error) => {
        return `${error}`;        
      }); 

export const commentsPromise = await fetch('http://localhost:8000/comments')
    .then(function (resp) {
        return resp.json() 
    })  
      .catch((error) => {
        return `${error}`;
      });
    
const uploadFile = document.querySelector('#upload-file'),
imgUploadOverlay = document.querySelector('.img-upload__overlay');
      

uploadFile.addEventListener('change', (e)=>{
    if(e.target.name === 'filename'){
        imgUploadOverlay.classList.remove('hidden');
        document.body.classList.add('modal-open')
    }
}); 


const pictureTemplate = document.querySelector('#picture'),
      pictureImg = pictureTemplate.content.querySelector('.picture__img'),
      pictures = document.querySelector('.pictures'),
      pictureComment = pictureTemplate.content.querySelector('.picture__comments'),
      pictureLikes = pictureTemplate.content.querySelector('.picture__likes');

const pictureInfo = photosPromise.map((e) => getPictureInfo(e));

export function getPictureInfo(e){    
    pictureImg.src = e.url;
    pictureImg.dataset.id = e.id;
    pictureComment.textContent = e.comments.length;
    pictureLikes.textContent = e.likes;
    pictureImg.style.scale = `${e.scale}%`;
    pictureImg.style.filter = e.filter;
    const cloneTemplate = pictureTemplate.content.cloneNode(true);
    pictures.appendChild(cloneTemplate);
}; 
showImgFiltersBlock();

showPopup();

validateHashtagInput();

changeEffect();

sendPhotos()

export {pictures};