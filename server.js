require('dotenv').config()
const sdk = require('node-appwrite')
const uuid4 = require('uuid4')
const express = require('express')
const cors = require('cors')

const PORT = 8000
const app = express()

app.use(cors())
app.use(express.json())


const client = new sdk.Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY)

const users = new sdk.Users(client)

const messaging = new sdk.Messaging(client)

const sendEmail = async (result) => {
    const id = uuid4()
    const email = result.email
    const userID = result['$id']

    const message = await messaging.createEmail(
        id, // Id
        `Welcome ${email}!`, // Subject
        'Thank you for signing up! We welcome you to our email community.', // Content
        [], // Topics
        [userID], // Users
    )
    console.log(message)
}

app.post('/register', async (req, res) => {
    const user = req.body
    const id = uuid4()

    try {
        const result = await users.create(
            id,
            user.email,
            user.tel
        )

        if (result) {
            sendEmail(result)
            // sendSMS(result)
        }
    } catch (error) {
        console.error(error)
    }
})

app.listen(PORT, () => console.log(`Server listening on ${PORT}`))