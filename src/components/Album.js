import React, { Component } from 'react';
import { Link } from 'react-router';

import AlbumStore from '../stores/AlbumStore';
import UserActions from '../actions/UserActions';

import EditAlbum from './Album/EditAlbum';
import DeleteAlbum from './Album/DeleteAlbum';

export default class Album extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: AlbumStore.getName(),
      photos: AlbumStore.getPhotos(),
      newPhotoURL: ""
    }

    this._onChange = this._onChange.bind(this);
    this._onInputChange = this._onInputChange.bind(this);
    this._addPhoto = this._addPhoto.bind(this);
    this._editPhoto = this._editPhoto.bind(this);
    this._deletePhoto = this._deletePhoto.bind(this);
  }

  componentDidMount() {
    UserActions.getAlbum(this.props.params.id);
    AlbumStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    AlbumStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({
      name: AlbumStore.getName(),
      photos: AlbumStore.getPhotos()
    })
  }

  _onInputChange(e) {
    this.setState({newPhotoURL: e.target.value})
  }

  _addPhoto(e) {
    e.preventDefault();
    UserActions.addPhoto(this.props.params.id, this.state.newPhotoURL);
  }

  _editPhoto(e) {

  }

  _deletePhoto(e) {

  }

  render() {
    if (this.state.name) {
      if (this.state.photos) {
        const Photos = this.state.photos.map(photo => {
          let path = `/photo/${photo._id}`;
          return (
            <div key={photo._id}>
              <Link to={path}><img src={photo.url} width="100px" className="thumbnail"/></Link>
              <p>Created at: {photo.createdAt}</p>
            </div>
          )
        })
        return (
          <div>
            <h1>{this.state.name}</h1>
            <form className="form-group" onSubmit={this._addPhoto}>
              <h3>Add New Photo</h3>
              <label>
                URL:
                <input
                  type="text"
                  className="form-control"
                  onChange={this._onInputChange}
                />
              </label>
              <button className="btn btn-success">Add</button>
            </form>
            <EditAlbum id={this.props.params.id}/>
            <DeleteAlbum id={this.props.params.id}/>
            {Photos}
          </div>
        )
      } else {
        return (
          <div>
            <h1>{this.state.name}</h1>
          </div>
        )
      }

    } else {
      return (
        <h1>Loading...</h1>
      )
    }

  }
}
