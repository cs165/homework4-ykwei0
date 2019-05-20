// This class will represent the menu screen that you see when you first load
// the music visualizer.
//
// See HW4 writeup for more hints and details.
class MenuScreen {
  constructor(containerElement) {
    // TODO(you): Implement the constructor and add fields as necessary.
    this.loadSongs = this.loadSongs.bind(this);
    this.onResponse = this.onResponse.bind(this);
    this.onJsonReady = this.onJsonReady.bind(this);
    this.gifResponse = this.gifResponse.bind(this);
    this.gifJsonReady = this.gifJsonReady.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.hide = this.hide.bind(this);

    this.songs = [];
    this.gif = null;

    this.containerElement = containerElement;
    this.queryInput = this.containerElement.querySelector('#query-input');
    let themes = ['candy', 'charlie brown', 'computers', 'dance', 'donuts','hello kitty', 'flowers', 'nature', 'turtles', 'space'];
    console.log(themes.length+' '+themes);
    let index = Math.floor(Math.random() * themes.length);
    this.queryInput.value = themes[index];

    this.loadSongs();

    let form= containerElement.querySelector('form');
    form.addEventListener('submit',this.onSubmit);
    this.queryInput.addEventListener('input',this.hideError);

  }
  // TODO(you): Add methods as necessary.

  loadSongs() {
    fetch('https://fullstackccu.github.io/homeworks/hw4/songs.json')
      .then(this.onResponse)
      .then(this.onJsonReady);
  }
  onResponse(response) {
    return response.json();
  }
  onJsonReady(json) {
    this.songs = json;
    //console.log(this.songs);
    for(let song in this.songs) {
      //console.log(song);
      this.option = document.createElement('option');
      this.option.value = this.songs[song].songUrl;
      this.option.text = this.songs[song].artist + ': ' + this.songs[song].title;
      //console.log(this.option.text);
      //console.log(this.option.value);
      this.songSelect = document.querySelector('#song-selector');
      this.songSelect.add(this.option);
    } 
  }

  onSubmit() {
    event.preventDefault();
    this.loadGIFs();
  }

  loadGIFs() {
    let theme = this.queryInput.value;
    //console.log(theme);
    //console.log(this.songs);
    let endpoint = 'https://api.giphy.com/v1/gifs/search?q='+ theme + '&api_key=JVCrbVEvPNQVsCLLgD4qd67PSoSzwRJu&limit=25&rating=g';
    fetch(endpoint)
    .then(this.gifResponse)
    .then(this.gifJsonReady);
  }
  gifResponse(response){
    return response.json();
  }
  gifJsonReady(json) {
    //console.log(json.data);
    if(json.data.length < 2) {
      let error = document.querySelector('#error');
      error.classList.remove('inactive');
    }
    else {
      console.log('time to show music screen');
      let gurl = [];
      for(let index in json.data) {
        let url = json.data[index].images.downsized.url;           
        gurl.push(url);
        //console.log(gurl[index]);
      }
      console.log(this.songSelect.value);
      console.log(json.data);
      const eventInfo = {
        songValue: this.songSelect.value,
        gifData: gurl
      };
      document.dispatchEvent(new CustomEvent('endMenu', {detail: eventInfo }));
    }
  }

  hideError() {
    let error = document.querySelector('#error');
    error.classList.add("inactive");
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

}
