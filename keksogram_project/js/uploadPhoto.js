import{photosPromise} from './main.js';

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
    let photoData = {
        id: photosPromise.length + 1,
        filter: imgUploadPreview.style.filter,
        scale: scaleValue.value,
        url: img.src, 
        description: textDescription.value,
        likes: 0,
        comments: [],
        hashtags: textHashtag.value,
    }

const photoInfo = JSON.stringify(photoData);

sendData('http://localhost:8000/newphoto', photoData)
    .then(()=>{
    showSuccessMessage()
    }).catch((err)=>{
    showErrorMessage(err)
    });

    imgForm.reset()
    imgUploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open')
    }); 
};

function showSuccessMessage(){
    const successTmpl = document.querySelector('#success');
    const cloneSuccessTmpl = successTmpl.content.cloneNode(true);
   
    document.body.appendChild(cloneSuccessTmpl);
    const successBtn = cloneSuccessTmpl.querySelector('.success__button');
    successBtn.addEventListener('click', ()=>{
        location.reload()
    })
}; 

function showErrorMessage(err){
    const errorTmpl = document.querySelector('#error');
    const cloneErrorTmpl = errorTmpl.content.cloneNode(true);
    const errorBtn = cloneErrorTmpl.querySelector('.error__button');
    document.body.appendChild(cloneErrorTmpl);
    errorBtn.addEventListener('click', ()=>{
        location.reload();
    })
}