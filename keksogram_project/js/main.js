import {showPopup} from './bigPicture.js';
import {validateHashtagInput} from './validate.js'


const countOfComments = 25;

const comments = new Array(countOfComments).fill(null).map((e, index) => getComment(e, index));

function getRandomMessage(){
    const messages = ['Все відмінно!', 'Загалом все непогано. Але не всі.', 'Коли ви робите фотографію, добре б прибирати палець із кадру. Зрештою, це просто непрофесійно.', 'Моя бабуся випадково чхнула з фотоапаратом у руках і у неї вийшла фотографія краща.', 'Я послизнувся на банановій шкірці і впустив фотоапарат на кота і у мене вийшла фотографія краще.', 'Обличчя людей на фотці перекошені, ніби їх побивають. Як можна було зловити такий невдалий момент?', 'Супер фото!', 'Вау!', 'Прекрасно!'];
    const randomArrayMessage = getRandomNumber(0, messages.length);
    return messages[randomArrayMessage];
} 

function getRandomName(){
    const name = ['Артем', 'Олена', 'Ігор', 'Ксенія', 'Володимир', 'Катя', 'Олексій', 'Тетяна', 'Саша', 'Вікторія', 'Тімур', 'Влада', 'Михайло'];
    const randomName = getRandomNumber(0, name.length);
    return name[randomName];
}

function getComment(e, index){
    return{        
     id: index+1,
     avatar: `img/avatar-${getRandomNumber(1, 7)}.svg`,         
     message: getRandomMessage(),
     name: getRandomName(),   
     
    } 
} 

const countOfPosts = 25;

const data = new Array(countOfPosts).fill(null).map((e, index) => getPost(index));

function getRandomNumber(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}

function getRandomDescription(){
  const descriptions = ['Дивись як гарно!', 'Мені подобається ця фотка', 'Трішки естетики', 'Good vibes only', 'My inspiration', 'Mood of day', 'Satisfaction', 'Nice one pic', 'Done', 'Chilling', 'Have a nice day', 'Мені сьогодні 21!', 'Дуже гарно', 'Як вам?', 'Коли радості немає меж.', 'Сум, я тебе не боюся', 'Піднімаю настрій міні–фотосесією', 'Кохання у кожному пікселі', 'Усміхаюся до нового дня', 'Як мало потрібно для щастя.', 'Впіймав дзен.', 'Прикро, але добре.', 'Насолоджуюсь!', 'Найкраще фото', 'Як ваш настрій?'];
  const randomArrayNumber = getRandomNumber(0, descriptions.length);
  return descriptions[randomArrayNumber];
}

function getPost(index){
    const commentsNumber = getRandomNumber(3, 25);

    return {
    id: index,
    url: `photos/${index +1}.jpg`,
    description: getRandomDescription(),
    likes: getRandomNumber(15, 201),
    comments: shuffle(comments).slice(0, commentsNumber),
    }       
} 

function shuffle(array) {   
    return array.sort(() => Math.random() - 0.5);
}
  
const pictureTemplate = document.querySelector('#picture'),
      pictureImg = pictureTemplate.content.querySelector('.picture__img'),
      pictures = document.querySelector('.pictures'),
      pictureComment = pictureTemplate.content.querySelector('.picture__comments'),
      pictureLikes = pictureTemplate.content.querySelector('.picture__likes'),
      uploadFile = document.querySelector('#upload-file'),
      imgUploadOverlay = document.querySelector('.img-upload__overlay');

uploadFile.addEventListener('change', (e)=>{
    if(e.target.name === 'filename'){
        imgUploadOverlay.classList.remove('hidden');
    }
});

const pictureInfo = data.map((e, index) => getPictureInfo(e,index));

function getPictureInfo(e,index){    

    pictureImg.src = e.url;
    pictureImg.dataset.id = e.id;
    pictureComment.textContent = e.comments.length;
    pictureLikes.textContent = e.likes;
    const cloneTemplate = pictureTemplate.content.cloneNode(true);
    pictures.appendChild(cloneTemplate);
};

showPopup();

validateHashtagInput();

export {data, pictures};