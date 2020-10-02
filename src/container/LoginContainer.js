import React from 'react';

import { login } from '../service/Api'

class LoginContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      email: 'tata@gmail.com',
      password: 'tatatoto1'
    }
  }
  
  handleChange = (event) => {
    this.setState({
        [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    login(this.state)
    .then((response) => console.log(response))
    .catch((error) => console.error(error))
  }

  render() {
    const { email, password } = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Email : </label>
        <input type="email" name="email" onChange={this.handleChange} value={email} />
        <label>Mot de passe : </label>
        <input type="password" name="password" onChange={this.handleChange} value={password} />
        <span>{localStorage.getItem('token')}</span>
        <button type='submit'>SE CONNECTER</button>
      </form>
    )
  }
}

export default LoginContainer;
