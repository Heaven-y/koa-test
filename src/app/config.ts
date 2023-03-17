import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

const {
  APP_HOST,
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
} = process.env

const PRIVATE_KEY = fs.readFileSync(
  path.resolve(__dirname, './keys/private.key')
)
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './keys/public.key'))

const AVATAR_PATH = './uploads/avatar'

export {
  APP_HOST,
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
  PRIVATE_KEY,
  PUBLIC_KEY,
  AVATAR_PATH,
}
