/* eslint-disable no-console */

import { register } from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered () {
      console.log('Service worker has been registered.')
    },
    cached () {
      return (alert || console.log)('Content has been cached for offline use.')
    },
    updatefound () {
      return (alert || console.log)('New content is downloading.')
    },
    updated () {
      return (alert || console.log)('New content is available; If you do not see the changes immediately, please refresh.')
    },
    offline () {
      return (alert || console.log)('No internet found. App is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })
}
