import {data, pictures} from './main.js';

const bigPicture = document.querySelector('.big-picture'),
      bigPictureImg = document.querySelector('.big-picture__img img'),
      likesCount = document.querySelector('.likes-count'),
      commentsCount = document.querySelector('.comments-count'),
      imgDescription = document.querySelector('.social__caption'),
      socialComment = document.querySelector('.social__comment'),
      socialComments = document.querySelector('.social__comments'),     
      socialCommentsCount = document.querySelector('.social__comment-count'), 
      commentsBtn = document.querySelector('.social__comments-loader'),    
      pictureCancelButton = document.querySelector('#picture-cancel');


let post;  
let currentCommentsCount = 5;
let comSlice;

export function showPopup(){
  pictures.addEventListener('click', (evt)=>{
    document.body.classList.add('modal-open');
    const photoId = +evt.target.dataset.id;
    post = data.find(data => data.id === photoId);
    showComments();
    showBigImg(); 

  })};  


  function showCurrentComments(){ 
    if(data.comments.length - currentCommentsCount > 5){
      currentCommentsCount = currentCommentsCount + 5
    } else {
      currentCommentsCount = data.comments.length
    }
  }
 
  

  function addComments(){
    comSlice = post.comments.slice(0, currentCommentsCount);
    socialCommentsCount.textContent = `${comSlice.length} из ${post.comments.length} комментарів`
    console.log(comSlice)
  }



  commentsBtn.addEventListener('click', () => {
    showCurrentComments()
    addComments()

  });



function showBigImg(){
  bigPicture.classList.remove('hidden');
  bigPictureImg.src = post.url;
  likesCount.textContent = post.likes;
  commentsCount.textContent = post.comments.length;
  imgDescription.textContent = post.description;

}


const commentsFragment = new DocumentFragment();

function showComments(){
  post.comments.forEach((comment)=>{
    const socialCommentClone = socialComment.cloneNode(true);
    socialCommentClone.querySelector('.social__text').textContent = comment.message
    socialCommentClone.querySelector('.social__picture').alt = comment.name
    socialCommentClone.querySelector('.social__picture').src = comment.avatar
    commentsFragment.append(socialCommentClone); 
  })
  socialComments.textContent = '';
  
  socialComments.append(commentsFragment);
}



      






pictureCancelButton.addEventListener('click', ()=>{
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
})


function escBigPhoto(e){
  if(e.keyCode === 27){
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
} 



document.addEventListener('keydown', escBigPhoto);

export{post};

