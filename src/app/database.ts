import mysql from 'mysql2'
import {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
} from './config'

const connectionPool = mysql.createPool({
  host: MYSQL_HOST,
  port: MYSQL_PORT as unknown as number,
  database: MYSQL_DATABASE,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  connectionLimit: 5,
})

// 获取连接是否成功
connectionPool.getConnection((err, connection) => {
  // 1.判断是否有错误信息
  if (err) {
    console.log('获取连接失败', err)
    return
  }

  // 2.获取connection, 尝试和数据库建立一下连接
  connection.connect((err) => {
    if (err) {
      console.log('和数据库交互失败', err)
    } else {
      console.log('数据库连接成功, 可以操作数据库')
    }
  })
})

// 3.获取连接池中连接对象(promise)
export default connectionPool.promise()
