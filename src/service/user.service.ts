import connection from '../app/database'
import type { IUser } from '../global/types'

class userService {
  async create(userInfo: IUser) {
    const { name, password } = userInfo
    const statement = `INSERT INTO users (name, password) VALUES (?, ?);`
    const [values] = await connection.execute(statement, [name, password])
    return values
  }

  async getUserByName(name: string) {
    const statement = 'SELECT * FROM `users` WHERE name = ?;'
    const [values] = await connection.execute(statement, [name])
    return values
  }

  async updateAvatarUrl(avatarUrl: string, userId: number) {
    const statement = `UPDATE users SET avatar_url = ? WHERE id = ?;`
    const [values] = await connection.execute(statement, [avatarUrl, userId])
    return values
  }
}

export default new userService()
