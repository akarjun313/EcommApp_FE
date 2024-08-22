import { atom } from 'recoil'

//to store user info
export const userAtom = atom({
    key: 'user',
    default: null
})


//for changing navbar bg-color
export const scrollPositionState = atom({
  key: 'scrollPositionState',
  default: 0
})

//Reload cart after booking
export const cartReloadAfterBooking = atom({
  key: 'cartReloadAfterBooking',
  default: false
})