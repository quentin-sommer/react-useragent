import React, {Component} from 'react'
import {render} from 'react-dom'

import {Provider, UserAgent} from '../../src'

class Demo extends Component {
  render() {
    return (
      <div>
        <Provider ua={window.navigator.userAgent}>
          <UserAgent>
            {ua => <h1>Hello, {ua.getOS().name}</h1>}
          </UserAgent>
        </Provider>
      </div>
    )
  }
}

render(<Demo />, document.querySelector('#demo'))
