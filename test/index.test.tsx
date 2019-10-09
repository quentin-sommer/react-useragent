import React, {useContext} from 'react'
import {render, unmountComponentAtNode} from 'react-dom'
import {UserAgent, UserAgentProvider, UAContext} from '../src'
import {UAParser} from 'ua-parser-js'

describe('UserAgent', () => {
  const ms10UA =
    'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0'
  let node: HTMLElement

  beforeEach(() => {
    node = document.createElement('div')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })

  it('renders children when the UA matches given prop', () => {
    render(
      <UserAgentProvider ua={ms10UA}>
        <UserAgent computer>
          <p>computer</p>
        </UserAgent>
      </UserAgentProvider>,
      node,
      () => {
        expect(node.innerHTML).toEqual('<p>computer</p>')
      }
    )
  })

  it("doesn't render children when the UA doesn't match given prop", () => {
    render(
      <UserAgentProvider ua={ms10UA}>
        <UserAgent mobile>
          <p>mobile</p>
        </UserAgent>
      </UserAgentProvider>,
      node,
      () => {
        expect(node.innerHTML).toEqual('')
      }
    )
  })

  it('supports func child and pass it the result', () => {
    render(
      <UserAgentProvider ua={ms10UA}>
        <UserAgent mobile>
          {(isMobile: boolean) => isMobile && 'mobile'}
        </UserAgent>
      </UserAgentProvider>,
      node,
      () => {
        expect(node.innerHTML).toEqual('')
      }
    )
  })

  it('returns full parser when `returnFullParser` prop is provided', () => {
    render(
      <UserAgentProvider ua={ms10UA}>
        <UserAgent returnFullParser>
          {(parser: UAParser) => parser.getOS().name === 'Windows' && 'windows'}
        </UserAgent>
      </UserAgentProvider>,
      node,
      () => {
        expect(node.innerHTML).toEqual('windows')
      }
    )
  })

  it('Exposes UAContext to be used with useContext', () => {
    const WithUseContext = () => {
      const {parser} = useContext(UAContext)
      // @ts-ignore
      return parser.getOS().name
    }
    render(
      <UserAgentProvider ua={ms10UA}>
        <WithUseContext />
      </UserAgentProvider>,
      node,
      () => {
        expect(node.innerHTML).toEqual('Windows')
      }
    )
  })

  it('Exposes UAContext to be used with class contextType', () => {
    class WithContextType extends React.Component {
      static contextType = UAContext
      render() {
        // @ts-ignore
        return this.context.parser.getOS().name
      }
    }
    render(
      <UserAgentProvider ua={ms10UA}>
        <WithContextType />
      </UserAgentProvider>,
      node,
      () => {
        expect(node.innerHTML).toEqual('Windows')
      }
    )
  })
})
