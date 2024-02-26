import OpenAI from 'openai'
import * as dotenv from 'dotenv'
import * as process from 'process'

dotenv.config()


async function main() {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  })

  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: 'who are you ?' }],
    model: 'gpt-3.5-turbo',
    stream: true
  })

  for await (const chunk of chatCompletion) {
    process.stdout.write(chunk.choices[0]?.delta?.content ?? '')
  }
}

main().then(() => {})
