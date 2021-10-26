import React, { Component } from "react"
import ReactAvatar from "react-avatar"
import { connect } from "react-redux"

const AVATAR_URL = "https://api-parcel-1.purwadhikafs2.com/uploads/avatars"

class Avatar extends Component {
  render() {
    const { name, avatar } = this.props
    return (
      <>
        {avatar ? (
          <>
            <ReactAvatar
              src={`${AVATAR_URL}/${avatar}`}
              size={40}
              round
              className="d-none d-md-block me-3"
            />
          </>
        ) : (
          <>
            <ReactAvatar name={name} size={40} round className="d-none d-md-block me-3" />
          </>
        )}
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  name: state.userReducer.name,
  avatar: state.userReducer.avatar,
})

export default connect(mapStateToProps, {})(Avatar)
