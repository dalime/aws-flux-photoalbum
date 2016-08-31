import AppDispatcher from '../AppDispatcher';

const ServerActions = {
  receiveAlbums(albums) {
    AppDispatcher.dispatch({
      type: 'RECEIVE_ALBUMS',
      albums
    })
  },
  receiveAlbum(album) {
    AppDispatcher.dispatch({
      type: 'RECEIVE_ALBUM',
      album
    })
  },
  receivePhoto(photo) {
    AppDispatcher.dispatch({
      type: 'RECEIVE_PHOTO',
      photo
    })
  },
  receiveEditPhotos(photos) {
    AppDispatcher.dispatch({
      type: 'EDIT_PHOTO',
      photos
    })
  },
  receiveDeletePhoto(id) {
    AppDispatcher.dispatch({
      type: 'DELETE_PHOTO',
      id
    })
  },
  receiveNewAlbum(album) {
    AppDispatcher.dispatch({
      type: 'RECEIVE_NEW_ALBUM',
      album
    })
  },
  receiveDeleteAlbum(album) {
    AppDispatcher.dispatch({
      type: 'RECEIVE_DELETE_ALBUM',
      album
    })
  },
  receiveEditAlbum(album) {
    AppDispatcher.dispatch({
      type: 'RECEIVE_EDIT_ALBUM',
      album
    })
  }
}

export default ServerActions;
