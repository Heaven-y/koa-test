import connection from '../app/database'

class fileService {
  async createAvatar(
    filename: string,
    mimetype: string,
    size: number,
    userId: number,
    hasOldAvatar: boolean
  ) {
    let statement = ''
    // 没旧的就插入，有旧的就更新
    if (!hasOldAvatar) {
      statement = 'INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?, ?, ?, ?);'
    } else {
      statement = 'UPDATE avatar SET filename = ?, mimetype = ?, size = ? WHERE user_id = ?'
    }

    const [values] = await connection.execute(statement, [filename, mimetype, size, userId])
    return values
  }

  async queryAvatarByUserId(userId: string) {
    const statement = 'SELECT * FROM avatar WHERE user_id = ?;'
    const [values] = await connection.execute(statement, [userId])

    return values.pop()
  }
}

export default new fileService()
