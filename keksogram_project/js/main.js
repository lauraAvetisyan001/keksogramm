import {showPopup} from './bigPicture.js';
import {validateHashtagInput} from './validate.js';


const photosPromise = await fetch('http://localhost:8000/photos')
    .then(function (resp) {
        return resp.json() 
    })  
      .catch((error) => {
        return `${error}`;        
      });
    
const commentsPromise = await fetch('http://localhost:8000/comments')
    .then(function (resp) {
        return resp.json() 
    })  
      .catch((error) => {
        return `${error}`;
      });

const countOfComments = 25;
const commentsArr = new Array(countOfComments).fill(null).map((e, index) => getComment(e, index));


function getComment(e, index){
    return{        
     id: commentsPromise[index].id,
     avatar: commentsPromise[index].avatar,        
     message: commentsPromise[index].message,
     name:  commentsPromise[index].name,
     
    } 
} 

const countOfPosts = 25;
const data = new Array(countOfPosts).fill(null).map((e, index) => getPost(index));


function getRandomNumber(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}

function getPost(index){
    const commentsNumber = getRandomNumber(3, 25);

    return {
    id: photosPromise[index].id,
    url: photosPromise[index].url,
    description: photosPromise[index].description,
    likes: photosPromise[index].likes,
    comments: shuffle(commentsArr).slice(0, commentsNumber),
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