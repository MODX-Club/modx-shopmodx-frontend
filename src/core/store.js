'use strict'
import { EventEmitter } from 'events'
import update from 'react/lib/update'

const CHANGE_EVENT = 'change'

export class Store extends EventEmitter {
  constructor(props) {
    super()
    this.props = update({}, {
      $merge: props || {}
    })
    this.dispatchToken = null
  }

  emitChange() {
    this.emit(CHANGE_EVENT)
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }

}
