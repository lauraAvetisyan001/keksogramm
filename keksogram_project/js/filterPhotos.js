const scaleSmoller = document.querySelector('.scale__control--smaller'),
      scaleBigger = document.querySelector('.scale__control--bigger'),
      scaleValue = document.querySelector('.scale__control--value'),
      imgUploadPreview  = document.querySelector('.img-upload__preview'),
      imgEffectLevel = document.querySelector('.img-upload__effect-level'),
      marvinEff = document.querySelector('.effects__preview--marvin'),
      phobosEff = document.querySelector('.effects__preview--phobos'),
      heatEff = document.querySelector('.effects__preview--heat');


let scaleValueStep = 25   

scaleValue.value = parseInt(scaleValue.value.match(/\d+/));

function scaleDown(){
    if(scaleValue.value > 25){
        scaleValue.value = `${scaleValue.value - scaleValueStep}`;

        imgUploadPreview.style.transform = `scale(${scaleValue.value / 100})`
    }
}

function increaseScale(){
    if(scaleValue.value < 100){
    scaleValue.value = Number(scaleValue.value) + Number(scaleValueStep)
    
    imgUploadPreview.style.transform = `scale(${scaleValue.value / 100})`
    }
}

const effectsList = document.querySelector('.effects__list');

effectsList.addEventListener('click', (e)=>{ 
    const effectsItemWrapper = e.target.closest('.effects__item');
    const effectsRadio = effectsItemWrapper.querySelector('.effects__radio');

    imgUploadPreview.classList = 'img-upload__preview';
    imgUploadPreview.classList.add(`effects__preview--${effectsRadio.value}`);
    imgEffectLevel.noUiSlider.reset()
})


export function changeEffect(value){
    if(imgUploadPreview.classList.contains('effects__preview--chrome')){
        imgUploadPreview.style.filter = `grayscale(${value})`
      } else if(imgUploadPreview.classList.contains('effects__preview--phobos')){
         imgUploadPreview.style.filter = `blur(${value}px)`
      } else if(imgUploadPreview.classList.contains('effects__preview--none')){        
        imgUploadPreview.style.filter = 'none'       
      } else if(imgUploadPreview.classList.contains('effects__preview--marvin')){
        imgUploadPreview.style.filter = `invert(${value}%)`
      } else if(imgUploadPreview.classList.contains('effects__preview--heat')){
        imgUploadPreview.style.filter = `brightness(${value})`
      } else if(imgUploadPreview.classList.contains('effects__preview--sepia')){
        imgUploadPreview.style.filter = `sepia(${value})`
      }
}

noUiSlider.create(imgEffectLevel, {
    start: 100,
    range: {
        'min': 0,
        'max': 1
    },
    step: 0.1,
});


heatEff.addEventListener('click', ()=>{
    imgEffectLevel.noUiSlider.updateOptions({
        range: {
            'min': 1,
            'max': 3
        },
        step: 0.1,
    });
})


phobosEff.addEventListener('click', ()=>{
    imgEffectLevel.noUiSlider.updateOptions({
        range: {
            'min': 0,
            'max': 3
        },
        step: 0.1,
    });
})


marvinEff.addEventListener('click', ()=>{
    imgEffectLevel.noUiSlider.updateOptions({
        range: {
            'min': 0,
            'max': 100
        },
        step: 1
    });
})

imgEffectLevel.noUiSlider.on('update', changeEffect)

scaleSmoller.addEventListener('click', scaleDown);

scaleBigger.addEventListener('click', increaseScale);