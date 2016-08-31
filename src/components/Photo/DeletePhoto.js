import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import UserActions from '../../actions/UserActions';

export default class DeletePhoto extends Component {
  constructor(props) {
    super(props);

    this._deletePhoto = this._deletePhoto.bind(this);
  }

  _deletePhoto(e) {
    e.preventDefault()
    UserActions.deletePhoto(this.props.id);
    browserHistory.push('/');
  }

  render() {
    return (
      <div>
        <button onClick={this._deletePhoto} className="btn btn-danger">Delete</button>
      </div>
    )
  }
}
