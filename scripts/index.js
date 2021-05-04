import{Card} from './card.js'


const showEditProfile = document.querySelector('.profile-info__edit');
const popup = document.querySelector('.popup');

const popupEdit = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupImage = document.querySelector('.popup_type_image');

const popupClose = document.querySelector('.popup__close');


const profileName = document.getElementById('name'); //берем имя из профиля страницы
const profileJob = document.getElementById('job'); //берем профессию из профиля страницы

const inputName = document.getElementById('inputName'); //берем имя из инпут-формы
const inputJob = document.getElementById('inputJob'); //берем профессию из инпут-формы

const formElement = document.querySelector('.popup__form');

//modals
const editModal = document.querySelector('.popup_type_edit')
const addCardModal = document.querySelector('.popup_type_add-card')
const imageModal = document.querySelector('.popup_type_image')

//open modal buttons
const openEditModalButton= document.querySelector('.profile-info__edit')
const openAddCardModalButton= document.querySelector('.profile__add')

//toggle


//close modal buttons
const closeEditModalButton= editModal.querySelector('.popup__close')
const closeAddCardModalButton= addCardModal.querySelector('.popup__close')
const closeImageModalButton= imageModal.querySelector('.popup__close')

//popup добавления фоток
const popupAdd = document.querySelector('.popup-add');
const formElementAdd = document.querySelector('#popup-add__form');
const showImageAdd = document.querySelector('.profile__add');
const list = document.querySelector('.list');
const initialCards = [
    {
      title: 'Озеро Вёртер',
      src: './images/worther-see-min.jpg'
    },
    {
      title: 'Будапешт',
      src: './images/budapest-min.jpg'
    },
    {
      title: 'Озеро в Альпах',
      src: './images/lake-alps-min.jpg'
    },
    {
      title: 'Стельвио',
      src: './images/stelvio-min.jpg'
    },
    {
      title: 'Чески Крумлов',
      src: './images/krumlov-min.jpg'
    },
    {
      title: 'Прага, панорамный вид',
      src: './images/Praha-min.jpg'
    }
  ];
const listElementTemplate = document.querySelector('.list-element-template').content 

const formAdd = document.querySelector('#popup-add__form');
const formAddItemInputName = document.getElementById('formAddInputName');
const formAddItemInputLink = document.getElementById('formAddInputLink');
const like = document.querySelector('.list__like');

const popupImgPic = document.querySelector('.popup__imgPic')
const popupImgText = document.querySelector('.popup__imgText')


function openPopup(modal) {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keyup', handleEsc);
}

function imgClickHandler(image, title) {
  popupImgPic.src = image
  popupImgText.textContent = title
  openPopup(imageModal)
}

function createCard(src, title) {
	const card = new Card({ src, title }, '.list-element-template', imgClickHandler)
	const cardElement = card.generateCard()
	return cardElement
}


initialCards.forEach((item) => {
  const cardElement = createCard(item.src, item.title);
  list.prepend(cardElement);
});


//----отправка редактирование профиля
formElement.addEventListener('submit', function(evt) {
  evt.preventDefault();
  closeModal(editModal);

  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  
  formElement.reset();
}); 
// ------отправка добавления карточек

function addNewCard() {
	list.prepend(createCard(formAddItemInputLink.value, formAddItemInputName.value))
}
formElementAdd.addEventListener('submit', function(ev) {
  ev.preventDefault();
  closeModal(addCardModal);

  addNewCard()
  formElementAdd.reset();
  const button = addCardModal.querySelector('.popup__submit')
  button.setAttribute("disabled", true);
  button.classList.add('popup__submit_inactive');
}); 



//------------------------
function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keyup', handleEsc);
}

//----------------------------------
function handleEsc (event){
  if (event.key === 'Escape'){
    const activePopup = document.querySelector('.popup_is-opened');
    closeModal(activePopup);
  }
}

popupEdit.addEventListener('click', function(evt){
  if (evt.target.classList.contains('popup_type_edit') || evt.target.classList.contains('popup__close')){
    const popupOpened = document.querySelector('.popup_is-opened');
    closeModal(popupOpened);
  }
})
popupAddCard.addEventListener('click', function(evt){
  if (evt.target.classList.contains('popup_type_add-card') || evt.target.classList.contains('popup__close')){
    const popupOpened = document.querySelector('.popup_is-opened');
    closeModal(popupOpened);
  }
})
popupImage.addEventListener('click', function(evt){
  if (evt.target.classList.contains('popup_type_image') || evt.target.classList.contains('popup__close')){
    const popupOpened = document.querySelector('.popup_is-opened');
    closeModal(popupOpened);
  }
})

//-----------------------

//----открытие редактирования профиля
openEditModalButton.addEventListener('click', () => {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  openPopup(editModal);
})


//-----открытие добавления карточек
openAddCardModalButton.addEventListener('click', () => {
  openPopup(addCardModal);
})
