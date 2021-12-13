
export const accountRoutes = {
    login : '/account/login',
    createAccount: '/account/register'
}

export const accountServerRoutes = {
    login : 'http://127.0.0.1:8000/account/api/token',
    refresh : 'http://127.0.0.1:8000/account/api/refresh',
    register : 'http://127.0.0.1:8000/account/registration/',
}
