import express from 'express'
import { getLogin, getRegister, register, login } from '../controller/handleAuth.js'
const routes = express.Router()

routes.get('/login', getLogin)
routes.get('/register', getRegister)
routes.post('/login', login)
routes.post('/register', register)

export default routes