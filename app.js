import express from 'express'
import db from './model/db.js'
import path from 'path'
import session from 'express-session'
import auth from './routes/auth.js'


const app = express()

app.set('view engine', 'hbs')

const __dirname = path.resolve();
const publicDir = path.join(__dirname, './public')

app.use(express.static(publicDir))
app.use(express.urlencoded({extended: 'false'}))
app.use(express.json())
app.use(session({
    secret : 'auth',
    resave : true,
    saveUninitialized : true
}))


app.get('/', (req, res) => {
    res.render('index')
})

app.use('/', auth)

app.listen(3000, () => {
    console.log(`server running on port ${3000}`)
    db.connect(err => err ? console.log(err) : console.log('MySQL Connected!'))
})
