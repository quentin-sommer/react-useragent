import React from 'react'
import PropTypes from 'prop-types'

const UserAgent = ({children}, {ua}) => {
  if (typeof children === 'function') {
    return children(ua)
  }
  if (process.env.NODE_ENV !== 'production') {
    throw new Error('UserAgent should be used with a function as child')
  }
  return null
}

UserAgent.contextTypes = {
  ua: PropTypes.object,
}

export default UserAgent
