import React from 'react'
import PropTypes from 'prop-types'
import UAParser from 'ua-parser-js'

class UAProvider extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.uaParser = new UAParser(props.ua)
  }

  getChildContext() {
    return {ua: this.uaParser}
  }

  render() {
    return React.Children.only(this.props.children)
  }
}

UAProvider.propTypes = {
  ua: PropTypes.element.isRequired,
  children: PropTypes.element.isRequired,
}

UAProvider.childContextTypes = {
  ua: PropTypes.object.isRequired,
}

export default UAProvider
