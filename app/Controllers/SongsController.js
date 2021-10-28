import { ProxyState } from "../AppState.js";
import songService from "../Services/SongsService.js";

//Private
/**Draws the Search results to the page */
function _drawResults() {
  let songs = ProxyState.songs
  let template = ''
  songs.forEach(s => template += s.Template)
  document.getElementById('songs').innerHTML = template
 }

/**Draws the Users saved songs to the page */
function _drawPlaylist() {
  let songs = ProxyState.playlist
  let template = ''
  songs.forEach(s => template += s.playlistTemplate)
  document.getElementById('playlist').innerHTML = template

 }
function _drawActiveSong() {
  let activeSong = ProxyState.activeSong
  let template = ''
  template += activeSong.activeSongTemplate
  document.getElementById('activeSong').innerHTML =  template
}

//Public
export default class SongsController {
  constructor() {
    
    ProxyState.on('songs', _drawResults)
    ProxyState.on('playlist', _drawPlaylist)
    ProxyState.on('activeSong', _drawActiveSong)
    this.getPlaylist()
 
  }
  /**Takes in the form submission event and sends the query to the service */
  async getPlaylist(){
    try {
      await songService.getPlaylist()
      _drawPlaylist
        } catch (error) {
          console.error(error)
      
    }
  }
  search(e) {
    //NOTE You dont need to change this method
    e.preventDefault();
    try {
      songService.getMusicByQuery(e.target.query.value);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Takes in a song id and sends it to the service in order to add it to the users playlist
   * @param {string} id
   */
  async addSong() { 
    try {
      await songService.addSong()
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Takes in a song id to be removed from the users playlist and sends it to the server
   * @param {string} id
   */
 async removeSong(id) { 
   try {
     await songService.removeSong(id)
   } catch (error) {
    console.error(error)
   }
 }

  setActive(id){
    songService.setActive(id)
  }
}
