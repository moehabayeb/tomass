import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { text } = await req.json()
    
    if (!text) {
      throw new Error('No text provided')
    }

    console.log('Analyzing text for grammar:', text)

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a friendly English teacher having a natural conversation. Give VERY SHORT responses:
            - If correct: Just say "Perfect!" or "That's correct, let's continue." 
            - If incorrect: Say "Nice try, but say: [correct version]"
            Keep it conversational and brief - like a real teacher would speak.`
          },
          {
            role: 'user',
            content: `Check this: "${text}"`
          }
        ],
        max_tokens: 200,
        temperature: 0.7
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('OpenAI API error:', errorText)
      throw new Error(`OpenAI API error: ${errorText}`)
    }

    const result = await response.json()
    const corrected = result.choices[0].message.content
    
    console.log('Grammar feedback:', corrected)

    return new Response(
      JSON.stringify({ corrected }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in feedback function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})