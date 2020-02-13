import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { initSessionFromCallbackURI } from '../actions/session'
import appConfig from '../config/app-config.json'

function mapStateToProps (state) {
  return { session: state.session }
}
function mapDispatchToProps (dispatch) {
  return {
    initSessionFromCallbackURI: href => dispatch(initSessionFromCallbackURI(href))
  }
}

/**
  Callback route used after a successful Cognito sign-in. The window URL will contain the code we can
  use to get a Cognito session, which includes JWT tokens etc
 */
class Callback extends Component {
  // If a Cognito auth code is in the URL (could be a hash or query component), init the new session
  componentDidMount () {
    if (this.props.location.hash || this.props.location.search) {
      this.props.initSessionFromCallbackURI(window.location.href).then(() => {
        let url = appConfig.metabaseUri + "/auth/sso?jwt=" + this.props.session.jwt + "&return_to=/";
        window.location.assign(url);
      })
    }
  }

  render () {
    // If there's no auth code in the URL or we're now logged into, redirect to the root page
    if ((!this.props.location.hash && !this.props.location.search) || this.props.session.isLoggedIn) {
      return <Redirect to="/" />
    }

    return <div />
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Callback)
