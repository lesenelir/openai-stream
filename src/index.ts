import cors from 'cors'
import OpenAI from 'openai'
import * as dotenv from 'dotenv'
import * as process from 'process'
import express, { Request, Response } from 'express'

dotenv.config()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const app = express()
app.use(cors())
app.use(express.text())

app.post('/chat/send', async (req: Request, res: Response) => {

  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: req.body }],
      model: 'gpt-3.5-turbo',
      stream: true
    })

    res.header('Content-Type', 'text/plain')

    // for await (const chunk of chatCompletion.toReadableStream()) {
    //   res.write(chunk)
    // }

    const reader = chatCompletion.toReadableStream().getReader()

    while (true) {
      const { done, value } = await reader.read()
      if (done) {
        break
      }
      res.write(value)
    }

    res.end()
  } catch (e) {
    console.log('error', e)
  }

})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
