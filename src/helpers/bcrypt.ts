import bcrypt from 'bcryptjs'

export const hashPassword = (value : string) => {
    return bcrypt.hashSync(value, 12)
}

export const comparePassword = (value : string, database : string) => {
    return bcrypt.compareSync(value, database)
}