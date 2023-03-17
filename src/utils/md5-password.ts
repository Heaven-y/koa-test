import crypto from 'crypto'

const md5Password = (password: string) => {
  const hash = crypto.createHash('md5')
  const res = hash.update(password).digest('hex')
  return res
}

export default md5Password
