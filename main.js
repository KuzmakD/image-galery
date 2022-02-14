console.log(
 `1. Вёрстка (+10)
    - на странице есть несколько фото и строка поиска. 
    - в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс
  2. При загрузке приложения на странице отображаются полученные от API изображения (+10)
  3. Если в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся изображения соответствующей тематики, если такие данные предоставляет API (+10)
  4. Поиск +30
    - при открытии приложения курсор находится в поле ввода 
    - есть placeholder 
    - нет выпадающего списка с предыдущими запросами 
    - поисковый запрос можно отправить нажатием клавиши Enter 
    - после отправки поискового запроса и отображения результатов поиска, поисковый запрос продолжает отображаться в поле ввода 
    - в поле ввода есть крестик при клике по которому поисковый запрос из поля ввода удаляется и отображается placeholder 
  5. Есть дополнительный функционал (local Storage) не предусмотренный в задании, улучшающий качество приложения (+10)
    
  Суммарная оценка: 70 баллов (max 60)`
 );

const galleryContainer = document.querySelector('.galery-images');
const button = document.querySelector('#input');
const search = document.querySelector('#search');
const clearSearch = document.querySelector('.clear-search');
let lastSearch = "Search";
let url = `https://api.unsplash.com/search/photos?query=${lastSearch}&per_page=12&orientation=landscape&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo`;
button.focus();

const showImage = (info) => {
  galleryContainer.innerHTML = '';
  info.map((elem) => {
    const img = document.createElement('img');
    img.classList.add('image');
    img.src = elem.urls.full;
    img.alt = elem.alt_description;
    galleryContainer.append(img);     
  });
}

async function getData() {
  const res = await fetch(url);
  const data = await res.json();
  showImage(data.results);
}

button.addEventListener('keydown', (event) => {
  if (event.key == "Enter") {
    url = `https://api.unsplash.com/search/photos?query=${button.value}&per_page=12&orientation=landscape&client_id=q25RX-2wqi_J2Cy8wwojaW94lTYMDYJJEVJikiHIiUA`;
    lastSearch = button.value;
    getData();
  }
})

search.addEventListener('click', () => {
  console.log(button.value);
  url = `https://api.unsplash.com/search/photos?query=${button.value}&per_page=12&orientation=landscape&client_id=q25RX-2wqi_J2Cy8wwojaW94lTYMDYJJEVJikiHIiUA`;
  lastSearch = button.value;
  getData();
})

clearSearch.addEventListener('click', () => {
  button.value = '';
  button.focus();
})


function setLocalStorage() {
  localStorage.setItem("lastSearch", lastSearch);
}
window.addEventListener("beforeunload", setLocalStorage);


function getLocalStorage() {
  if (localStorage.getItem("lastSearch")) {
    lastSearch = localStorage.getItem("lastSearch");
  }
  url = `https://api.unsplash.com/search/photos?query=${lastSearch}&per_page=12&orientation=landscape&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo`;
  getData();
}
window.addEventListener("load", getLocalStorage);
