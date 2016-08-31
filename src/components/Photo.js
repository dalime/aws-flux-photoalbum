import React, { Component } from 'react';

import UserActions from '../actions/UserActions';
import PhotoStore from '../stores/PhotoStore';
import EditPhoto from './Photo/EditPhoto';
import DeletePhoto from './Photo/DeletePhoto';

export default class Photo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photo: PhotoStore.getPhoto()
    }

    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    UserActions.getPhoto(this.props.params.id);
    PhotoStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    PhotoStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({
      photo: PhotoStore.getPhoto()
    })
  }

  render() {
    if (this.state.photo) {
      return (
        <div key={this.state.photo._id}>
          <img src={this.state.photo.url} width="300px"/>
          <p>Created At: {this.state.photo.createdAt}</p>
          <EditPhoto id={this.props.params.id}/>
          <DeletePhoto id={this.props.params.id}/>
        </div>
      )
    } else {
      return (
        <h1>Loading...</h1>
      )
    }

  }
}
