
import {accountRoutes, accountServerRoutes} from './components/account/routes'

export const urls = {
    notFound: '*',
    home: '/',
    account: accountRoutes,

}

export const server_urls = {
    account: accountServerRoutes
}
