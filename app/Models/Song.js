export default class Song {
  constructor(data) {
    this.title = data.trackName || data.title;
    this.albumArt =
      data.albumArt || data.artworkUrl100.replace(/100x100/g, "300x300");
    this.artist = data.artistName || data.artist;
    this.album = data.collectionName || data.album;
    this.price = data.trackPrice || data.price;
    this.preview = data.previewUrl || data.preview;
    this.id = data.trackId?.toString() || data.id;
  }

  get Template() {
    return `
    <p onclick="app.songsController.setActive('${this.id}')" class="selectable"> ${this.title} | ${this.artist} | ${this.album}<i class="mdi mdi-share-circle"></i></p>
        `;
  }

  get playlistTemplate() {
    return `
    <div class="card"  onclick="app.songsController.setActive('${this.id}')">
    <div class="row card-body>
      <div class="col-10">
        <div class="row">
          <p class=" col-12">${this.title}</p>
         <p class=" col-12">${this.artist}</p>
          <p class=" col-12">${this.album}</p>
         </div>
         </div>
      <div class="col-2">
      <i onclick="app.songsController.removeSong('${this.id}')" class=" mdi mdi-trash-can"></i>
      </div>     
  </div>
        `;
  }
  
  get activeSongTemplate(){
    return`
    <div class="card elevation-2 text-center">
    <img class="card-img-top" src="${this.albumArt}" alt="">
    <div class="card-body">
      <h4 class="card-title">${this.title} | ${this.artist} | ${this.album}</h4>
      <p class="card-text">${this.price}</p>
      <audio controls>
      <source src="${this.preview}" >
      </audio>
      <div class="row pt-3 justify-content-end">
      <button type="button" class="btn rounded-pill  btn-primary" onclick="app.songsController.addSong()">Add Playlist</button>
      </div>
    </div>
  </div>
    `
  }
}










