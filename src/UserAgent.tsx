import PropTypes from 'prop-types'
import availableProps from './availableProps'
import * as React from 'react'

export type UserAgentProps = {
  computer?: boolean
  windows?: boolean
  linux?: boolean
  mac?: boolean
  mobile?: boolean
  tablet?: boolean
  android?: boolean
  ios?: boolean
  firefox?: boolean
  chrome?: boolean
  edge?: boolean
  safari?: boolean
}

type Props = {
  returnFullParser?: boolean
  children?: any
} & UserAgentProps

const UserAgent: React.FunctionComponent<Props> = (
  {children, returnFullParser, ...props},
  {ua}
) => {
  const validProps = Object.keys(props).filter(
    prop => availableProps.indexOf(prop) !== -1
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
    if (returnFullParser) {
      return children(ua.parser)
    }
    return children(ua.uaResults)
  }

  if (__DEV__) {
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
    returnFullParser: PropTypes.bool,
  }
}

UserAgent.defaultProps = {
  returnFullParser: false,
}

UserAgent.contextTypes = {
  ua: PropTypes.object,
}

export default UserAgent
