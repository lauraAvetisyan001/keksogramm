const countOfPhotos = 25;

const data = new Array(countOfPhotos).fill(null).map((e, index) => getPhotos(index));

function getRandomNumber(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}

function getRandomDescription(){
  const descriptions = ['Дивись як гарно!', 'Мені подобається ця фотка', 'Трішки естетики', 'Good vibes only', 'My inspiration', 'Mood of day', 'Satisfaction', 'Nice one pic', 'Done', 'Chilling', 'Have a nice day', 'Мені сьогодні 21!', 'Дуже гарно', 'Як вам?', 'Коли радості немає меж.', 'Сум, я тебе не боюся', 'Піднімаю настрій міні–фотосесією', 'Кохання у кожному пікселі', 'Усміхаюся до нового дня', 'Як мало потрібно для щастя.', 'Впіймав дзен.', 'Прикро, але добре.', 'Насолоджуюсь!', 'Найкраще фото', 'Як ваш настрій?'];
  const randomArrayNumber = getRandomNumber(0, descriptions.length);
  return descriptions[randomArrayNumber];
}

function getPhotos(index){
    return {
    id: index +1,
    url: `photos/${index +1}.jpg`,
    description: getRandomDescription(),
    likes: getRandomNumber(15, 201),
    }

}

const countOfComments = 7;

const comments = new Array(countOfComments).fill(null).map((e) => getComments());

function getRandomMessage(){
    const messages = ['Все відмінно!', 'Загалом все непогано. Але не всі.', 'Коли ви робите фотографію, добре б прибирати палець із кадру. Зрештою, це просто непрофесійно.', 'Моя бабуся випадково чхнула з фотоапаратом у руках і у неї вийшла фотографія краща.', 'Я послизнувся на банановій шкірці і впустив фотоапарат на кота і у мене вийшла фотографія краще.', 'Обличчя людей на фотці перекошені, ніби їх побивають. Як можна було зловити такий невдалий момент?'];
    const randomArrayMessage = getRandomNumber(0, messages.length);
    return messages[randomArrayMessage];
}

function getRandomName(){
    const name = ['Артем', 'Олена', 'Ігор', 'Ксенія', 'Володимир', 'Катя', 'Олексій', 'Тетяна', 'Саша', 'Вікторія', 'Тімур', 'Влада', 'Михайло'];
    const randomName = getRandomNumber(0, name.length);
    return name[randomName];
}

function getComments(){
    return{        
     id: getRandomNumber(100, 900),
     avatar: `img/avatar-${getRandomNumber(1, 7)}.svg`,         
     message: getRandomMessage(),
     name: getRandomName(),         
    } 
}