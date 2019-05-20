// This class will represent the gif display area. It keeps track of which gif
// is being shown and can select a new random gif to be shown.
// 
// See HW4 writeup for more hints and details.
class GifDisplay {
  constructor(gifURL) {
    // TODO(you): Implement the constructor and add fields as necessary.
    this.fore = document.querySelector('#foreground');
    this.back = document.querySelector('#background');
    //console.log(this.fore.style.zIndex);
    this.fore.style.zIndex = 2;
    this.back.style.zIndex = 1;
    console.log(this.fore.style.zIndex);
    this.gifURL = gifURL;
    //console.log(this.gifURL.length);
    this.showGIF = this.showGIF.bind(this);
    this.preload = this.preload.bind(this);
    this.next = this.next.bind(this);
    this.showGIF();
  }
  // TODO(you): Add methods as necessary.
  showGIF() {
    this.rand = Math.floor(Math.random() * this.gifURL.length);
    this.fore.style.backgroundImage = "url(" + this.gifURL[this.rand] + ")";
    this.preload();
  }
  preload() {
    this.newrand = Math.floor(Math.random() * this.gifURL.length);
    while(this.newrand == this.rand) {
      this.newrand =  Math.floor(Math.random() * this.gifURL.length);
    }
    if(this.back.style.zIndex === 1) {
      this.back.style.backgroundImage = "url(" + this.gifURL[this.newrand] + ")";
    }
    else{
      this.fore.style.backgroundImage = "url(" + this.gifURL[this.newrand] + ")";
    }
  }
  next() {
    if(this.back.style.zIndex === 1) {
      this.back.style.zIndex = 2;  
      this.fore.style.zIndex = 1;  
    }
    else {
      this.fore.style.zIndex = 2;
      this.back.style.zIndex = 1;  
    }
    this.rand = this.newrand;
    this.preload();
  }
}
