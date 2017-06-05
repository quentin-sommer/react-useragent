import React, {Component} from 'react'
import {render} from 'react-dom'

import {UserAgentProvider, UserAgent} from '../../src'

class Demo extends Component {
  render() {
    return (
      <div>
        <UserAgentProvider ua={window.navigator.userAgent}>
          <div>
            {/* You can match each of these user agents */}
            <UserAgent mobile>
              <h1>Hello from a mobile</h1>
            </UserAgent>
            <UserAgent android>
              <h1>Hello from android</h1>
            </UserAgent>
            <UserAgent ios>
              <h1>Hello from ios</h1>
            </UserAgent>
            <UserAgent linux>
              <h1>Hello from linux</h1>
            </UserAgent>
            <UserAgent mac>
              <h1>Hello from mac</h1>
            </UserAgent>
            <UserAgent windows>
              <h1>Hello from windows</h1>
            </UserAgent>
            <UserAgent computer>
              <h1>Hello from a computer</h1>
            </UserAgent>
            {/* You can mix props to match multiple user agents */}
            <UserAgent linux android>
              <h1>Hello from mobile or linux</h1>
            </UserAgent>
            {/* Or if you want full control you can access the underlying parser */}
            <UserAgent returnfullParser>
              {parser =>
                <h1>
                  I see you, {parser.getOS().name}
                  {' '}{parser.getCPU().architecture}
                  {/*
                  {console.log(parser)}
                  {console.log('getBrowser', parser.getBrowser())}
                  {console.log('getCPU', parser.getCPU())}
                  {console.log('getDevice', parser.getDevice())}
                  {console.log('getEngine', parser.getEngine())}
                  {console.log('getOS', parser.getOS())}
                  */}
                </h1>}
            </UserAgent>
          </div>
        </UserAgentProvider>
      </div>
    )
  }
}

render(<Demo />, document.querySelector('#demo'))
