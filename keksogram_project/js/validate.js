const hashtagText = document.querySelector('.text__hashtags'),
      descriptionText = document.querySelector('.text__description'),
      imgUploadOverlay = document.querySelector('.img-upload__overlay'),
      cancelBtn = document.querySelector('#upload-cancel');


export function validateHashtagInput(){
      hashtagText.addEventListener('input', (evt)=>{
    validate(evt);
})};


function validate(evt){
    evt.target.setCustomValidity('');
    const valueHashtagText = hashtagText.value;

    if(valueHashtagText.length > 0){
    const re = /(?=#)/;
    const hashtags = valueHashtagText.split(re); 
    let duplicateFound = true;

    
    const duplicates = hashtags.map(el => el.toLowerCase()).filter((element, index, elements)=>{ 
        if(elements.indexOf(element) !== index){
                duplicateFound = false;                 
        };
    });
        
    if(hashtags.length > 5){
        hashtagText.setCustomValidity('Можно ввести минимум 5 хэштегов!');           
    } else if(!duplicateFound){
        hashtagText.setCustomValidity('Хэштеги не должны повторяться!');
    }       
        chekHashtag(hashtags, evt);
    }
        hashtagText.reportValidity();
}

function chekHashtag(tagsArray, evt){
    const regNameSymbols = /^[A-Za-z0-9\s]*$/;

tagsArray.forEach((elem, index, array)=>{
    const elemArray = elem.split('');
console.log('index', index); console.log(elemArray, 'ele'); console.log(array, 'array');
    if(elemArray[0] !== '#'){
        evt.target.setCustomValidity('Первым элементом должна быть решетка!');
    } else if (elemArray.length < 2){
        evt.target.setCustomValidity('Минимальное кол-во символов: 2!');
    } else if(elemArray.length > 20){
        evt.target.setCustomValidity('Максимальное кол-во символов: 20!');
    } else if(!regNameSymbols.test(elemArray.slice(1).join(''))){
        evt.target.setCustomValidity('Вы ввели недопустимый формат!');
    } else if(index !== array.length - 1 && elemArray[elemArray.length - 1] !== ' '){
        evt.target.setCustomValidity('Хэштеги должны разделяться пробелом!');
    }
    evt.target.reportValidity();
})
};

function onCloseUpload(){
    imgUploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
};


function escapeUpload(e){
    if(e.keyCode === 27){
        document.querySelector('#upload-file').value = '';
        onCloseUpload();
    }
}

document.addEventListener('keydown', escapeUpload);

hashtagText.addEventListener('focus', ()=>{
    document.removeEventListener('keydown', escapeUpload); 
}, true)

hashtagText.addEventListener('blur', ()=>{
    document.addEventListener('keydown', escapeUpload);
},true);

cancelBtn.addEventListener('click', onCloseUpload);

descriptionText.addEventListener('focus', ()=>{
    document.removeEventListener('keydown', escapeUpload)
}, true);

descriptionText.addEventListener('blur', ()=>{
    document.addEventListener('keydown', escapeUpload)
}, true);