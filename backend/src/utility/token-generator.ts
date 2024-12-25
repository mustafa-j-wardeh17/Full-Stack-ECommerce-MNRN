import config from 'config'
import jwt from 'jsonwebtoken'

export const generateAuthToken = (id, email, type) => {
    return jwt.sign({ id: id, email, type }, config.get('jwtSecret'), { expiresIn: '30d' })
}

export const decodeAuthToken = (token: string) => {
    return jwt.verify(token, config.get('jwtSecret'))
}