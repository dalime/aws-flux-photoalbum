import React, { Component } from 'react';
import { Link } from 'react-router';

import AlbumStore from '../stores/AlbumStore';
import UserActions from '../actions/UserActions';

import FileUploader from './Photo/FileUploader';
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
    console.log ('this.state.photos:', this.state.photos);
  }

  _onInputChange(e) {
    this.setState({newPhotoURL: e.target.value})
  }

  _addPhoto(file) {
    UserActions.addPhoto(this.props.params.id, file);
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
            <FileUploader addPhoto={this._addPhoto}/>
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
