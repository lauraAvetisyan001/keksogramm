import {data, pictures} from './main.js';

const bigPicture = document.querySelector('.big-picture'),
      bigPictureImg = document.querySelector('.big-picture__img img'),
      likesCount = document.querySelector('.likes-count'),
      imgDescription = document.querySelector('.social__caption'),
      socialComment = document.querySelector('.social__comment'),
      socialComments = document.querySelector('.social__comments'),     
      socialCommentsCount = document.querySelector('.social__comment-count'), 
      commentsBtn = document.querySelector('.social__comments-loader'),    
      pictureCancelButton = document.querySelector('#picture-cancel');

let post;  
let currentCommentsCount;


export function showPopup(){
  pictures.addEventListener('click', (evt)=>{
    currentCommentsCount = 5;
    commentsBtn.classList.remove('hidden');
    const photoId = +evt.target.dataset.id;
    post = data.find(data => data.id === photoId); 
    showComments()
    showBigImg(); 
    hiddenCommentsBtn();
    addComments();
  })};  

  function showComments(){
    post.comments.forEach((comment)=>{
      const socialCommentClone = socialComment.cloneNode(true);
      socialCommentClone.querySelector('.social__text').textContent = comment.message
      socialCommentClone.querySelector('.social__picture').alt = comment.name
      socialCommentClone.querySelector('.social__picture').src = comment.avatar
      commentsFragment.append(socialCommentClone)
    })
    socialComments.textContent = '';
    
    socialComments.append(commentsFragment)
  }

  
function showCommentsCount(){ 
    if(post.comments.length - currentCommentsCount > 5){
      currentCommentsCount += 5;
    } else {
      currentCommentsCount = post.comments.length;
    }  
  }
  
function hiddenCommentsBtn(){
  switch(post.comments.length){
    case 3:
      socialCommentsCount.textContent = `${post.comments.length} коментаря`;
      commentsBtn.classList.add('hidden');
      break;
    case 4:
      socialCommentsCount.textContent = `${post.comments.length} коментаря`;
      commentsBtn.classList.add('hidden');
      break;
    case 5:
      socialCommentsCount.textContent = `${post.comments.length} коментарів`;
      commentsBtn.classList.add('hidden');
    break;     
    case currentCommentsCount:
      commentsBtn.classList.add('hidden');
      break;
  }
}

function showBigImg(){
  bigPicture.classList.remove('hidden');
  bigPictureImg.src = post.url;
  likesCount.textContent = post.likes;
  imgDescription.textContent = post.description; 
  socialCommentsCount.textContent = `${currentCommentsCount} из ${post.comments.length} комментарів`;
}

const commentsFragment = new DocumentFragment();

function addComments(){
  
  const commentSlice = post.comments.slice(0, currentCommentsCount);   
    commentSlice.forEach((comment)=>{
    const socialCommentClone = socialComment.cloneNode(true);
      socialCommentClone.querySelector('.social__text').textContent = comment.message
      socialCommentClone.querySelector('.social__picture').alt = comment.name
      socialCommentClone.querySelector('.social__picture').src = comment.avatar
      commentsFragment.append(socialCommentClone); 
    })
    socialComments.textContent = '';
    
    socialComments.append(commentsFragment);
}


commentsBtn.addEventListener('click', ()=> {
  showCommentsCount();
  addComments();
  hiddenCommentsBtn();
  showBigImg();
});


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