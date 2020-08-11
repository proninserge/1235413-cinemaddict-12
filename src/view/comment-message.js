import {getReadableDate} from '../utils/utils.js';

export const createCommentMessageTemplate = (comments) => {
  const {author, emotion, text, date} = comments;
  const day = getReadableDate(date.getDate());
  const month = getReadableDate((date.getMonth() + 1));
  const year = date.getFullYear();
  const time = `${date.getHours()}:${date.getMinutes()}`;

  return (
    `<li class="film-details__comment">
     <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
     </span>
     <div>
       <p class="film-details__comment-text">${text}</p>
       <p class="film-details__comment-info">
         <span class="film-details__comment-author">${author}</span>
         <span class="film-details__comment-day">${year}/${month}/${day} ${time}</span>
         <button class="film-details__comment-delete">Delete</button>
       </p>
     </div>
   </li>`
  );
};
