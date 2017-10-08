import React from 'react'
import PropTypes from 'prop-types'
import UAParser from 'ua-parser-js'
import availableProps from './availableProps'

const uaParser = new UAParser()

const uaResults = {
  android: false,
  ios: false,
  mobile: false,
  tablet: false,
  windows: false,
  mac: false,
  linux: false,
  computer: false,
  firefox: false,
  chrome: false,
  edge: false,
  safari: false,
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

    uaResults.tablet = uaParser.getDevice().type === 'tablet'

    uaResults.windows = uaParser.getOS().name === 'Windows'
    uaResults.mac = uaParser.getOS().name === 'Mac OS'
    uaResults.linux = uaParser.getOS().name === 'Linux'
    uaResults.computer =
      uaResults.windows ||
      uaResults.mac ||
      uaResults.linux ||
      uaParser.getDevice().type === undefined

    uaResults.firefox = uaParser.getBrowser().name === 'Firefox'
    uaResults.chrome = uaParser.getBrowser().name === 'Chrome'
    uaResults.edge = uaParser.getBrowser().name === 'Edge'
    uaResults.safari = uaParser.getBrowser().name === 'Safari'
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

if (process.env.NODE_ENV !== 'production') {
  UAProvider.propTypes = {
    ua: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
  }
}

UAProvider.childContextTypes = {
  ua: PropTypes.object.isRequired,
}

export default UAProvider
