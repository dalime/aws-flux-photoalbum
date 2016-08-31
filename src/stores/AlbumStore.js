import { EventEmitter } from 'events';
import AppDispatcher from '../AppDispatcher';

let _albums;
let _albumName;
let _photos;

class AlbumStore extends EventEmitter {
  constructor() {
    super();

    AppDispatcher.register(action => {
      switch(action.type) {
        case 'RECEIVE_ALBUMS':
          _albums = action.albums;
          this.emit('CHANGE');
          break;
        case 'RECEIVE_ALBUM':
          _albumName = action.album.name;
          let photos = action.album.photos;
          _photos = photos;
          this.emit('CHANGE');
          break;
        case 'RECEIVE_NEW_ALBUM':
          _albums.push(action.album);
          this.emit('CHANGE');
          break;
        case 'RECEIVE_DELETE_ALBUM':
          let newAlbums = _albums.filter(album => {
            if (album._id === action.album._id) return false;
            return true;
          })
          _albums = newAlbums;
          this.emit('CHANGE');
          break;
        case 'RECEIVE_EDIT_ALBUM':
          let editAlbums = _albums.filter(album => {
            if (album._id === action.album._id) return action.album;
            return album;
          })
          _albums = editAlbums;
          _albumName = action.album.name;
          _photos = action.albums.photos;
          this.emit('CHANGE');
          break;
        case 'RECEIVE_EDIT_PHOTOS':
          let editPhotos = action.photos;
          _photos = editPhotos;
          this.emit('CHANGE');
          break;
      }
    });
  }

  startListening(cb) {
    this.on('CHANGE', cb);
  }

  stopListening(cb) {
    this.removeListener('CHANGE', cb);
  }

  getAll() {
    return _albums;
  }

  getName() {
    return _albumName;
  }

  getPhotos() {
    return _photos;
  }
}

export default new AlbumStore();
