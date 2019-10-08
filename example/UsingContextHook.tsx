import React, {useContext} from 'react'
import {UAContext} from '../src'

const UsingContextHook = () => {
  const {uaResults, parser} = useContext(UAContext)
  return parser.getOS().name
}

export default UsingContextHook
