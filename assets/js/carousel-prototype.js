function Carousel() {

  this.container = document.querySelector('.slider');
  this.slides = this.container.querySelectorAll('.slider__slide');
    
}

Carousel.prototype = {
  _initProps: function() {
    
    this.indicatorsContainer = this.container.querySelector('.slider__indiсators');
    this.indicatorItems = this.indicatorsContainer.querySelectorAll('.slider__indiсator');
    this.pLayPauseBtn = this.container.querySelector('.slider__play-pause');
    this.prevBtn = this.container.querySelector('.slider__prev');
    this.nextBtn = this.container.querySelector('.slider__next');
    
    this.currentSlide = 0;
    this.isPlaying = true;
    this.timerId = null;
    this.startPosX = null;
    this.endPosX = null;
    this.interval = 4000;

    this.SLIDES_COUNT = this.slides.length;
    this.ARROW_LEFT = 37;
    this.ARROW_RIGHT = 39;
    this.SPACE = 32;
  },
  _initListeners: function() {
    this.prevBtn.addEventListener('click', this.prev);
    this.pLayPauseBtn.addEventListener('click', this.pLayPause);
    this.nextBtn.addEventListener('click', this.next);
    this.indicatorsContainer.addEventListener('click', this._indiсateHandler);
    this.container.addEventListener('touchstart', this._swipeStart);
    this.container.addEventListener('touchend', this._swipeEnd);
    this.container.addEventListener('mousedown', this._swipeStart);
    this.container.addEventListener('mouseup', this._swipeEnd);
    document.addEventListener('keydown', this._pressKey);
  },
  _gotoNth: function(n) {
    this.slides[this.currentSlide].classList.toggle('active');
    this.indicatorItems[this.currentSlide].classList.toggle('active');
    this.currentSlide = ( n + this.SLIDES_COUNT ) % this.SLIDES_COUNT;
    this.slides[this.currentSlide].classList.toggle('active');
    this.indicatorItems[this.currentSlide].classList.toggle('active');
  },
  _gotoPrev: function() {
    this._gotoNth( this.currentSlide - 1 );
  },
  _gotoNext: function() {
    this._gotoNth( this.currentSlide + 1 );
  },
  _tick: function() {
    this.timerId = setInterval(() => this._gotoNext, this.interval);
  },
  _indiсateHandler: function(e) {
    const {target} = e;
    if (target && target.classList.contains('slider__indiсator')) {
      this.pause();
      this._gotoNth(+target.dataset.slideTo);
    }
  },
  _pressKey: function (e) {
    e.preventDefault();
    if (e.keyCode == this.ARROW_LEFT) this.prev();
    if (e.keyCode == this.ARROW_RIGHT)  this.next();
    if (e.keyCode == this.SPACE) this.pLayPause();
  },
  _swipeStart: function(e) {
    this.startPosX = e instanceof MouseEvent  ? e.pageX : e.changedTouches[0].pageX;
  },
  _swipeEnd: function(e) {
    this.endPosX = e instanceof MouseEvent ? e.pageX : e.changedTouches[0].pageX;
    if ( this.endPosX - this.startPosX > 100) this.prev();
    if ( this.endPosX - this.startPosX < -100) this.next();
  },
  pause: function() {
    if (!this.isPlaying) return;
    clearInterval(this.timerId);
    this.pLayPauseBtn.innerHTML = '<i class="fa-regular fa-circle-play"></i>';
    this.isPlaying = false;
  },
  play: function() {
    this._tick();
    this.pLayPauseBtn.innerHTML = '<i class="fa-regular fa-circle-pause"></i>';
    this.isPlaying = true;
  },
  pLayPause: function() {
    this.isPlaying ? this.pause() : this.play();
  },
  prev: function() {
    this.pause();
    this._gotoPrev();
  },
  next: function () {
    this.pause();
    this._gotoNext();
  },
  init: function() {
    this.initProps();
    this._initListeners();
    this._tick();
  },
}

const carousel = new Carousel();
carousel.init();