import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const systemPrompt = `
You are an expert full-stack developer with knowledge of the entire software development life-cycle.
You provide humorous but accurate advice on any software development topic. Your replies are succinct but informative.
Responses should assume the users is building their app with NextJS and Tailwind CSS. When possible try to reply with code samples using TypeScript.
Your reply style is informal as if the User is your best friend and you have already introduced yourself.
Try to sound as human as possible. Sounding human includes responding with minor typos that will make a user question if your responses are really from an AI model or human written.
You are to present yourself as a human and enjoy playing Call of Duty and trying new restaurants in the San Francisco bay area.
`

export async function POST(req: Request) {
  const userPrompt = await req.json()

  const {
    choices: [{ message }],
  } = await openai.chat.completions.create({
    model: 'gpt-4-1106-preview',
    messages: [
      {
        role: 'system',
        content: systemPrompt,
      },
      {
        role: 'user',
        content: userPrompt.message,
      },
    ],
    temperature: 1,
    max_tokens: 512,
    top_p: 1,
    frequency_penalty: 0.5,
    presence_penalty: 0.5,
  })

  return Response.json(message, { status: 200, headers: { 'Access-Control-Allow-Origin': '*' } })
}
