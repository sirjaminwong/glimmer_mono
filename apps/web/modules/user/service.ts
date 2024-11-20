import { http } from '../../utils/http'

export async function login(name: string, password: string) {
    await http.post('/api/login', { name, password })
}


export async function register(name: string, password: string) {
    await http.post('/api/register', { name, password })
}