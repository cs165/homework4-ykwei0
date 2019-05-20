// This class will represent the music visualizer as a whole, similar to the
// role that the `App` class played in HW3.
//
// See HW4 writeup for more hints and details.
class App {
  constructor() {
    // TODO(you): Implement the constructor and add fields as necessary.
    const menuElement = document.querySelector('#menu');
    this.menuScreen = new MenuScreen(menuElement);
    const musicElement = document.querySelector('#music');
    this.musicScreen = new MusicScreen(musicElement);

    this.toMusic = this.toMusic.bind(this);
    document.addEventListener('endMenu',this.toMusic);
  }
  // TODO(you): Add methods as necessary.
  toMusic(event) {
    this.menuScreen.hide();
    let songURL = event.detail.songValue;
    let gifURL = event.detail.gifData;
    //console.log(gifURL);
    this.musicScreen.show(songURL,gifURL);
  }
}
