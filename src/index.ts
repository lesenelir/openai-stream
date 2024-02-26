import OpenAI from 'openai'
import * as dotenv from 'dotenv'

dotenv.config()


async function main() {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  })

  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: 'who are you ?' }],
    model: 'gpt-3.5-turbo',
  })

  console.log(chatCompletion.choices[0].message.content)
}

main().then(() => {})
