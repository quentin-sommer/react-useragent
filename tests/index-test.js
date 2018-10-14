import expect from 'expect'
import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'
import {UserAgent, UserAgentProvider} from 'src/'

describe('UserAgent', () => {
  const ms10UA =
    'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0'
  let node

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
        <UserAgent mobile>{isMobile => isMobile && 'mobile'}</UserAgent>
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
          {parser => parser.getOS().name === 'Windows' && 'windows'}
        </UserAgent>
      </UserAgentProvider>,
      node,
      () => {
        expect(node.innerHTML).toEqual('windows')
      }
    )
  })
})
