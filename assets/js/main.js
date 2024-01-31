(function() {
  const container = document.querySelector('.slider');
  const slides = container.querySelectorAll('.slider__slide');
  const indicatorsContainer = container.querySelector('.slider__indiсators');
  const indicatorItems = indicatorsContainer.querySelectorAll('.slider__indiсator');
  const prevBtn = container.querySelector('.slider__prev-btn');
  const pLayPauseBtn = container.querySelector('.slider__play-pause-btn');
  const nextBtn = container.querySelector('.slider__next-btn');

  let currentSlide = 0;
  let timerId = null;
  let isPlaying = true;
  let startPosX = null;
  let endPosX = null;
  let interval = 4000;

  const SLIDES_COUNT = slides.length;
  const ARROW_LEFT = 37;
  const ARROW_RIGHT = 39;
  const SPACE = 32;

  function tick() {
    timerId = setInterval(gotoNext, interval);
  }

  // GO TO NTH SLIDE
  function gotoNth(n) {
    slides[currentSlide].classList.toggle('active');
    indicatorItems[currentSlide].classList.toggle('active');
    currentSlide = ( n + SLIDES_COUNT ) % SLIDES_COUNT;
    slides[currentSlide].classList.toggle('active');
    indicatorItems[currentSlide].classList.toggle('active');
  }

  // GO TO PREV SLIDE
  function gotoPrev() {
    gotoNth( currentSlide - 1 );
  }

  // GO TO NEXT SLIDE
  function gotoNext() {
    gotoNth( currentSlide + 1 );
  }

  // PAUSE HANDLER
  function pauseHandler() {
    if (!isPlaying) return;
    clearInterval(timerId);
    pLayPauseBtn.innerHTML = '<i class="fa-regular fa-circle-play"></i>';
    isPlaying = false;
  }

  // PLAY HANDLER
  function playHandler() {
    tick();
    pLayPauseBtn.innerHTML = '<i class="fa-regular fa-circle-pause"></i>';
    isPlaying = true;
  }

  // PAUSE || PLAY  HANDLER
  function pLayPauseHandler() {
    isPlaying ? pauseHandler() : playHandler();
  }

  // PREV HANDLER
  function prevHandler() {
    pauseHandler();
    gotoPrev();
  }

  // NEXT HANDLER
  function nextHandler() {
    pauseHandler();
    gotoNext();
  }

  // INDIKATE HANDLER
  function indiсateHandler(e) {
    const {target} = e;
    if (target && target.classList.contains('slider__indiсator')) {
      pauseHandler();
      gotoNth(+target.dataset.slideTo);
    }
  }

  // KEY
  function pressKey(e) {
    e.preventDefault();
    if (e.keyCode == ARROW_LEFT) prevHandler();
    if (e.keyCode == ARROW_RIGHT)  nextHandler();
    if (e.keyCode == SPACE) pLayPauseHandler();
  }

  // SWIPE
  function swipeStart(e) {
    startPosX = e instanceof MouseEvent  ? e.pageX : e.changedTouches[0].pageX;
  }

  function swipeEnd(e) {
    endPosX = e instanceof MouseEvent ? e.pageX : e.changedTouches[0].pageX;
    if ( endPosX - startPosX > 100) prevHandler();
    if ( endPosX - startPosX < -100) nextHandler();
  }

  // INITIALIZATION EVENTS
  function initListeners() {
    prevBtn.addEventListener('click', prevHandler);
    pLayPauseBtn.addEventListener('click', pLayPauseHandler);
    nextBtn.addEventListener('click', nextHandler);
    indicatorsContainer.addEventListener('click', indiсateHandler);
    container.addEventListener('touchstart', swipeStart);
    container.addEventListener('touchend', swipeEnd);
    container.addEventListener('mousedown', swipeStart);
    container.addEventListener('mouseup', swipeEnd);
    document.addEventListener('keydown', pressKey);
  } 
  // 

  function init() {
    initListeners();
    tick();
  }

  init();
}())