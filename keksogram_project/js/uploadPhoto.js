import{photosPromise} from './main.js';
import { hashtagText } from './validate.js';
import {showImgFiltersBlock} from './filtration.js';

const imgForm = document.querySelector('#upload-select-image'),
textHashtag = document.querySelector('.text__hashtags'),
textDescription = document.querySelector('.text__description'),
uploadFile = document.querySelector('#upload-file'),
img = document.querySelector('.img-upload__preview img'),
imgUploadOverlay = document.querySelector('.img-upload__overlay'),
scaleValue = document.querySelector('.scale__control--value'),
imgUploadPreview = document.querySelector('.img-upload__preview');


uploadFile.addEventListener('change', (e)=>{
    if(e.target.files[0]){
        const reader = new FileReader();
        reader.onloadend = function(){
            img.src = reader.result
        }
        reader.readAsDataURL(e.target.files[0]);
    } 
});

const sendData = async(url, photoData) =>{
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(photoData)
    })

    if(!response.ok){
        throw new Error('sorry')
    }
    return await response.json()
}     

export function sendPhotos(){   
imgForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const photoData = {
        id: photosPromise.length + 1,
        filter: imgUploadPreview.style.filter,
        scale: scaleValue.value,
        url: img.src, 
        description: textDescription.value,
        likes: 0,
        comments: [],
        hashtags: textHashtag.value,
    }; 
    // showImgFiltersBlock()
const photoInfo = JSON.stringify(photoData);
sendData('http://localhost:8000/newphoto', photoData)
    .then((data)=>{
        
        const objData = JSON.parse(data)
        console.log(objData)
    showSuccessMessage()
    }).catch(()=>{
    showErrorMessage()
    });

    imgForm.reset()
    imgUploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');   
    }); 
};

const successTmpl = document.querySelector('#success');
const cloneSuccessTmpl = successTmpl.content.cloneNode(true);
const successBtn = cloneSuccessTmpl.querySelector('.success__button');
const successInner = cloneSuccessTmpl.querySelector('.success__inner')

function showSuccessMessage(){
    document.body.appendChild(cloneSuccessTmpl);
    if(!e.target.closest('#success')){
        successInner.classList.add('hidden');
    };
}; 

const errorTmpl = document.querySelector('#error');
const cloneErrorTmpl = errorTmpl.content.cloneNode(true);
const errorBtn = cloneErrorTmpl.querySelector('.error__button');
const errorInner = cloneErrorTmpl.querySelector('.error__inner');

function showErrorMessage(){
    document.body.appendChild(cloneErrorTmpl);
      document.addEventListener('click', (e)=>{
            if(!e.target.closest('#error')){
                errorInner.classList.add('hidden');
            }});
}


function emptyHashtagsValue(){
    if(hashtagText.value.length === 0){
        hashtagText.style.border = '3px solid red'
        hashtagText.style.borderStyle = 'dashed'
    } 
}
document.querySelector('.img-upload__submit').addEventListener('click', emptyHashtagsValue)
textHashtag.addEventListener('input', ()=>{
    hashtagText.style.border = 'none'
})

errorBtn.addEventListener('click', ()=>{
    errorInner.classList.add('hidden');
})

document.addEventListener('keydown', (e)=>{
    if(e.keyCode === 27){
        errorInner.classList.add('hidden');
        successInner.classList.add('hidden');
    }
})


successBtn.addEventListener('click', ()=>{
    successInner.classList.add('hidden');
})