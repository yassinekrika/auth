import db from "../model/db.js"
import bcrypt from 'bcryptjs'

export const getLogin = async (req, res) => {
    res.render('login')
}

export const getRegister = async (req, res) => {
    res.render('register')
}

export const register = async (req, res) => {
    const { name, email, password, password_confirm } = req.body

    db.query(`SELECT email FROM auth WHERE email = '${email}'`, async (error, result) => {
        if (error) {
            console.log(error)
        } else {
            if (result.length > 0) {
                return res.render('register', {
                    message: 'This email is already used'
                })
            } else if (password !== password_confirm) {
                return res.render('register', {
                    message: 'Passwords do not match!'
                })
            }
        }
    })
    

    db.query(`SELECT username FROM auth WHERE username = '${name}'`, async (error, result) => {
        if (error) {
            console.log(error)
        } else {
            if (result.length > 0) {
                return res.render('register', {
                    message: 'This username is already used'
                })
            }
        }
    })

    let hashedPassword = await bcrypt.hash(password, 8)
    db.query(`INSERT INTO auth (user_id, username, email, password, user_status) VALUES (NULL, '${name}', '${email}', '${hashedPassword}', 'normal')`, (err, result) => {
        if(err) {
            console.log(err)
        } else {
            return res.render('register', {
                message: 'User registered!'
            })
        }
    })


}

export const login = async (req, res) => {
    const { name, password } = req.body

    let hashedPassword = await bcrypt.hash(password, 8)

    db.query(`SELECT * FROM auth WHERE username = '${name}'`, async (error, result) => {
        if (error) {
            console.log(error)
        } else {
            if (result.length > 0 && hashedPassword !== result.password) {
                for (let i = 0; i < result.length; i++) {
                    if (result[i].password === hashedPassword) {
                        req.session.user_id = result[i].user_id
                        console.log(result[i].user_id)
                        return res.render('secret', {
                            message: `Welcome ${result.username}` 
                        })
                    }
                }
            }
        }
    })
}