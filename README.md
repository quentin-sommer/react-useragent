# react-useragent

[![Greenkeeper badge](https://badges.greenkeeper.io/quentin-sommer/react-useragent.svg)](https://greenkeeper.io/)

Integrate user-agent detection in an idiomatic React way.

## Installation

`yarn add @quentin-sommer/react-useragent` or `npm i -s @quentin-sommer/react-useragent`

## Introduction

Imagine being able to render magnificent, deep links, beautiful download buttons for your app. Well, Now you can.

``` js
<div>
  <UserAgent ios>
    <BeautifulIOSButton/>
  </UserAgent>
  <UserAgent windows>
    <BeautifulIWindowsButton/>
  </UserAgent>
</div>
```

react-useragent wraps the great [UAParser.js](https://github.com/faisalman/ua-parser-js) library and make it easy to use useragent knowledge inside your React applications.
react-useragent provides useful shortcuts but you can always use an escape hatch in case you want to access the underlying library.

[live demo](https://quentin-sommer.github.io/react-useragent/)

## Usage

First you need to wrap your App in a `<UserAgentProvider>` tag.
You also need to pass a user agent string to `<UserAgentProvider>`. 
On the browser that would be `window.navigator.userAgent`.

react-useragent works in **server side rendering** as well, just pass it the request useragent string. On express that would be `req.headers['user-agent']`.

``` js
import {UserAgentProvider} from '@quentin-sommer/react-useragent'

const App = (props) => (
    <UserAgentProvider ua={window.navigator.userAgent}>
        <div>
        {/* rest of your App */}
        </div>
    </UserAgentProvider>
)

```

Then use the `<UserAgent>` component.


react-useragent expose some props, these are optimized and using them will be faster than directly accessing the `UAParser.js` library.


Available props for `<UserAgent>`
* computer
* windows
* linux
* mac
* mobile
* tablet
* android
* ios 
* firefox
* chrome
* edge
* safari

Theses props are cumulable : `<UserAgent firefox mobile>` will match both firefox browser and mobile systems.

``` js
import {UserAgentProvider, UserAgent} from '@quentin-sommer/react-useragent'

const App = (props) => (
    <UserAgentProvider ua={window.navigator.userAgent}>
        <div>
          <UserAgent mobile>
            <p>This will only be rendered on mobile</p>
          </UserAgent>
        </div>
    </UserAgentProvider>
)
```

You can also use this alternative API if you find it more convenient
``` js
<UserAgent mobile>
    {uaIsMobile => (
        {uaIsMobile && <p>This will ONLY be rendered on mobile</p>}
        {!uaIsMobile && <p>This will NOT be rendered on mobile</p>}
    )}
</UserAgent>
```

For full power you can always access the underlying parser with the `returnFullParser` prop
``` js
<UserAgent returnfullParser>
    {parser => (
      <p>I see you, {parser.getOS().name} {parser.getCPU().architecture}</p>
    )}
</UserAgent>
```

For more example see the demo app source [here](https://github.com/quentin-sommer/react-useragent/blob/master/demo/src/index.js)

If you have any questions don't hesitate to say hi on [Twitter](https://twitter.com/quentin_smr)
