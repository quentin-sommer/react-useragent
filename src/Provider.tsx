import React from 'react'
import PropTypes from 'prop-types'
import {UAParser} from 'ua-parser-js'

type UAResults = {
  android: boolean
  ios: boolean
  mobile: boolean
  tablet: boolean
  windows: boolean
  mac: boolean
  linux: boolean
  computer: boolean
  firefox: boolean
  chrome: boolean
  edge: boolean
  safari: boolean
}

type Props = {
  ua: string
}

class UAProvider extends React.Component<Props> {
  uaParser: UAParser
  uaResults: UAResults

  static propTypes = {
    ua: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
  }

  static childContextTypes = {
    ua: PropTypes.object.isRequired,
  }

  constructor(props: Props, context: any) {
    super(props, context)
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

    uaParser.setUA(props.ua)
    uaResults.android = uaParser.getOS().name === 'Android'
    uaResults.ios = uaParser.getOS().name === 'iOS'
    uaResults.mobile = uaParser.getDevice().type === 'mobile'

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

    this.uaParser = uaParser
    this.uaResults = uaResults
  }

  getChildContext() {
    return {
      ua: {
        parser: this.uaParser,
        uaResults: this.uaResults,
      },
    }
  }

  render() {
    return React.Children.only(this.props.children)
  }
}

export default UAProvider
