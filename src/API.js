import ServerActions from './actions/ServerActions';
import axios from 'axios';

const API = {
  getAlbums() {
    axios.get('/api/albums')
      .then(res => ServerActions.receiveAlbums(res.data))
      .catch(console.error);
  },
  getAlbum(id) {
    axios.get(`/api/albums/${id}`)
      .then(res => ServerActions.receiveAlbum(res.data))
      .catch(console.error);
  },
  addPhoto(albumId, file) {
    let data = new FormData();
    data.append('photo', file);
    axios.post('/api/photos', data)
      .then(res => {
        ServerActions.receivePhoto(res.data)
        this.addPhotoToAlbum(albumId, res.data._id)
      })
      .catch(console.error);
  },
  addPhotoToAlbum(albumId, photoId) {
    axios.put(`/api/albums/${albumId}/addPhoto/${photoId}`)
      .then(res => ServerActions.receiveAlbum(res.data))
      .catch(console.error);
  },
  getPhoto(id) {
    axios.get(`/api/photos/${id}`)
      .then(res => ServerActions.receivePhoto(res.data))
      .catch(console.error);
  },
  editPhoto(id, url) {
    let editBody = { url };
    axios.put(`/api/photos/${id}`, url)
      .then(res => ServerActions.receiveEditPhotos(res.data))
      .catch(console.error);
  },
  deletePhoto(id) {
    axios.delete(`/api/photos/${id}`)
      .then(res => ServerActions.receiveDeletePhoto(res.data))
      .catch(console.error);
  },
  addAlbum(name) {
    let newAlbum = { name }
    axios.post(`/api/albums`, newAlbum)
      .then(res => ServerActions.receiveNewAlbum(res.data))
      .catch(console.error);
  },
  editAlbum(id, name) {
    let editAlbum = { name };
    axios.put(`/api/albums/${id}`, editAlbum)
      .then(res => ServerActions.receiveEditAlbum(res.data))
      .catch(console.error);
  },
  deleteAlbum(id) {
    axios.delete(`/api/albums/${id}`)
      .then(res => ServerActions.receiveDeleteAlbum(res.data))
      .catch(console.error);
  }
}

export default API;
