import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import UserActions from '../../actions/UserActions';

export default class DeleteAlbum extends Component {
  constructor(props) {
    super(props);

    this._deleteAlbum = this._deleteAlbum.bind(this);
  }

  _deleteAlbum(e) {
    e.preventDefault()
    UserActions.deleteAlbum(this.props.id);
    browserHistory.push('/');
  }

  render() {
    return (
      <div>
        <button onClick={this._deleteAlbum} className="btn btn-danger">Delete Album</button>
      </div>
    )
  }
}
