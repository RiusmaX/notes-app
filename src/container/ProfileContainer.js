import React from 'react'

import { getProfile } from '../service/Api'

class ProfileContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      profile: {}
    }
  }

  componentDidMount() {
    getProfile()
    .then(profile => {
        this.setState({profile: profile})
    })
  }

  render() {
    return (
        <div>
            <span>{JSON.stringify(this.state.profile)}</span>
        </div>
    )
  }
}

export default ProfileContainer
