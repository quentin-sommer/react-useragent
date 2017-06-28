import React from 'react'
import PropTypes from 'prop-types'
import availableProps from './availableProps'

const UserAgent = ({children, returnfullParser, ...props}, {ua}) => {
  const validProps = Object.keys(props).filter(prop =>
    availableProps.includes(prop)
  )
  const ret = validProps.some(prop => ua.uaResults[prop])
  const funcChildren = typeof children === 'function'

  if (validProps.length !== 0) {
    if (funcChildren) {
      return children(ret)
    }
    if (ret) {
      return children
    }
    return null
  }
  if (funcChildren) {
    if (returnfullParser) {
      return children(ua.parser)
    }
    return children(ua.uaResults)
  }

  if (process.env.NODE_ENV !== 'production') {
    throw new Error(
      'UserAgent should be used with a function as a child when used without any props'
    )
  }
  return null
}

if (process.env.NODE_ENV !== 'production') {
  UserAgent.propTypes = {
    ...availableProps.reduce(
      (acc, cur) => ({...acc, [cur]: PropTypes.bool}),
      {}
    ),
    returnfullParser: PropTypes.bool,
  }
}

UserAgent.defaultProps = {
  returnfullParser: false,
}

UserAgent.contextTypes = {
  ua: PropTypes.object,
}

export default UserAgent
