import {data, pictures} from './main.js';

const bigPicture = document.querySelector('.big-picture'),
      bigPictureImg = document.querySelector('.big-picture__img img'),
      likesCount = document.querySelector('.likes-count'),
      commentsCount = document.querySelector('.comments-count'),
      imgDescription = document.querySelector('.social__caption'),
      socialComment = document.querySelector('.social__comment'),
      socialComments = document.querySelector('.social__comments'),      
      pictureCancelButton = document.querySelector('#picture-cancel');


let post;

pictures.addEventListener('click', (evt)=>{
  document.body.classList.add('modal-open');
  let photoId = +evt.target.dataset.id;
  post = data.find(data => data.id === photoId);
  showComments();
  showBigImg();
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
    commentsFragment.append(socialCommentClone)
  })
  socialComments.textContent = '';
  
  socialComments.append(commentsFragment)
}






// let commentsList; 

// function showComments(data){ 
//     post.comments.forEach((comment)=>{
//    commentsList += `
//     <li class="social__comment">
//     <img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
//     <p class="social__text">${comment.message}</p>
//   </li>
//     `  
//   });
//   socialComments.innerHTML = commentsList;  
// }  

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