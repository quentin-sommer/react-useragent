import React from 'react'
import PropTypes from 'prop-types'
import UAParser from 'ua-parser-js'
import availableProps from './availableProps'

const uaParser = new UAParser()

const uaResults = {
  android: false,
  ios: false,
  mobile: false,
  windows: false,
  mac: false,
  linux: false,
  computer: false,
}

class UAProvider extends React.Component {
  constructor(props, context) {
    super(props, context)
    uaParser.setUA(props.ua)

    uaResults.android = uaParser.getOS().name === 'Android'
    uaResults.ios = uaParser.getOS().name === 'iOS'
    uaResults.mobile =
      uaResults.android ||
      uaResults.ios ||
      uaParser.getDevice().type === 'mobile'

    uaResults.windows = uaParser.getOS().name === 'Windows'
    uaResults.mac = uaParser.getOS().name === 'Mac OS'
    uaResults.linux = uaParser.getOS().name === 'Linux'
    uaResults.computer =
      uaResults.window ||
      uaResults.mac ||
      uaResults.linux ||
      uaParser.getDevice().type === 'undefined'
  }

  getChildContext() {
    return {
      ua: {
        parser: uaParser,
        uaResults,
      },
    }
  }

  render() {
    return React.Children.only(this.props.children)
  }
}

UAProvider.propTypes = {
  ua: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
}

UAProvider.childContextTypes = {
  ua: PropTypes.object.isRequired,
}

export default UAProvider
