const hashtagText = document.querySelector('.text__hashtags'),
      descriptionText = document.querySelector('.text__description'),
      submitBtn = document.querySelector('.img-upload__submit'),
      imgUploadOverlay = document.querySelector('.img-upload__overlay'),
      cancelBtn = document.querySelector('#upload-cancel');

hashtagText.addEventListener('input', (evt)=>{
    validate(evt);
});

function validate(evt, index){
    const valueHashtagText = hashtagText.value;
    if(valueHashtagText.length > 0){
        const re = /(?=#)/g;
        const hashtags = valueHashtagText.split(re); 
        let duplicateFound = true;
        let regis = true;

        const duplicates = hashtags.filter((element, index, elements)=>{
            if(elements.indexOf(element) !== index){
                duplicateFound = false;
            };
        });
        // for(let hashtag of hashtags){
        //     for(let i = 0; i < hashtag.length; i++){
        //             if(hashtags[i] === hashtags[i]){
        //                 regis = false;
        //             }
        //         }
        //     }             




        if(hashtags.length > 5){
            hashtagText.setCustomValidity('Можно ввести минимум 5 хэштегов!');
            hashtagText.reportValidity();
        } else if(!duplicateFound){
            hashtagText.setCustomValidity('Хэштеги не должны повторяться!');
            hashtagText.reportValidity();
        } else if(regis = false){
            hashtagText.setCustomValidity('Reg');
            hashtagText.reportValidity();
        }
        chekHashtag(hashtags, evt);
    }
}

function chekHashtag(tagsArray, evt){
    const regNameSymbols = /[0-9a-z]+/ig;
    let result = true;

tagsArray.forEach((elem, index, array)=>{
    const elemArray = elem.split('');

    if(regNameSymbols.test(elemArray.slice(1)) === true){
        result = false
    }
  console.log(elemArray[elemArray.length - 1])
    
    if(elemArray[0] !== '#'){
        evt.target.setCustomValidity('Первым элементом должна быть решетка!');
    } else if (elemArray.length < 1){
        evt.target.setCustomValidity('Минимальное кол-во символов: 2!');
    } else if(elemArray.length > 20){
        evt.target.setCustomValidity('Максимальное кол-во символов: 20!');
    } else if(result = false){
        evt.target.setCustomValidity('Вы ввели недопустимый формат!');
    }   
    evt.target.reportValidity();
})
}



function onCloseUpload(){
    imgUploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
};


function escapeUpload(e){
    if(e.keyCode === 27){
        onCloseUpload();
    }
}

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