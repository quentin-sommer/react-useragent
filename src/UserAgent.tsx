import PropTypes from 'prop-types'
import availableProps from './availableProps'
import * as React from 'react'
import {UAContext} from './Provider'

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

class UserAgent extends React.Component<Props> {
  static contextType = UAContext
  static defaultProps = {
    returnFullParser: false,
  }
  static propTypes = {
    ...availableProps.reduce(
      (acc, cur) => ({...acc, [cur]: PropTypes.bool}),
      {}
    ),
    returnFullParser: PropTypes.bool,
  }

  render(): React.ReactNode {
    const {children, returnFullParser} = this.props
    const ua = this.context

    const validProps = Object.keys(this.props).filter(
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
}

export default UserAgent
