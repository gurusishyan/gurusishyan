import { START_LOADER, STOP_LOADER, START_FULL_SCREEN_LOADER, STOP_FULL_SCREEN_LOADER } from './types'

export const startLoader = () => {
    return {
        type: START_LOADER
    }
}

export const stopLoader = () => {
    return {
        type: STOP_LOADER
    }
}

export const startFullScreenLoader = () => {
    return {
        type: START_FULL_SCREEN_LOADER
    }
}

export const stopFullScreenLoader = () => {
    return {
        type: STOP_FULL_SCREEN_LOADER
    }
}