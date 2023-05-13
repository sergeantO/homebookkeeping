import { Notify as QNotify } from 'quasar'

QNotify.setDefaults({
    position: 'bottom-right',
    timeout: 2500,
    progress: true,
    group: false,
    textColor: 'white',
    actions: [{ icon: 'close', color: 'white' }]
})

class Notify {
    success(message: string) {
        QNotify.create({
            message,
            type: 'positive',
        })
    }

    error(message: string) {
        QNotify.create({
            message,
            type: 'negative',
        })
    }

    warning(message: string) {
        QNotify.create({
            message,
            type: 'warning',
        })
    }
}

export const notify = new Notify()
