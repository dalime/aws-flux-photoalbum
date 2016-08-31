import { EventEmitter } from 'events';
import AppDispatcher from '../AppDispatcher';

let _photos = [];
let _photo;

class PhotoStore extends EventEmitter {
  constructor() {
    super();

    AppDispatcher.register(action => {
      switch(action.type) {
        case 'RECEIVE_PHOTO':
          _photo = action.photo;
          this.emit('CHANGE');
          break;
        case 'ADD_PHOTO':
          _photos.push(action.photo);
          this.emit('CHANGE');
          break;
        case 'DELETE_PHOTO':
          _photo = {}
          let newPhotos = _photos.filter(photo => {
            if (photo._id === action.id) return false;
            return true;
          })
          _photos = newPhotos;
          this.emit('CHANGE');
          break;
        case 'EDIT_PHOTO':
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

  getPhoto() {
    return _photo;
  }
}

export default new PhotoStore();
