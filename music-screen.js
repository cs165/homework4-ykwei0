// This class will represent the music visualizer screen, i.e. the screen that
// you see after you select a song.
//
// This class should create and own:
//   - 1 AudioPlayer
//   - 1 GifDisplay
//   - 1 PlayButton
//
// See HW4 writeup for more hints and details.
class MusicScreen {
  constructor(containerElement) {
    // TODO(you): Implement the constructor and add fields as necessary.
    this.containerElement = containerElement;
    this.status = true;
    //this.playButton = new PlayButton(this.audioPlayer);
    this.playButton = new PlayButton();
    this.show = this.show.bind(this);
    this.onKick = this.onKick.bind(this);
    this.onclick = this.onclick.bind(this);

    document.querySelector('#button').addEventListener('click',this.onclick);
  }
  // TODO(you): Add methods as necessary.
  show(songURL,gifURL) {
    this.containerElement.classList.remove('inactive');
    //console.log(songURL);
    //console.log(gifs);
    this.gifDisplay = new GifDisplay(gifURL);
    this.audioPlayer = new AudioPlayer();
    this.audioPlayer.pause();
    this.audioPlayer.setSong(songURL);
    this.audioPlayer.setKickCallback(this.onKick);
    this.audioPlayer.play();
  }
  onKick() {
    console.log('Kick');
    this.gifDisplay.next();
  }
  onclick() {
    if(this.status === true) {
      console.log('audioPlayer pause');
      this.playButton.pause();
      this.audioPlayer.pause();
      this.status = false;
    }
    else {
      console.log('audioPlayer continue');
      this.playButton.play();
      this.audioPlayer.play();
      this.status = true;
    }
  }
}
