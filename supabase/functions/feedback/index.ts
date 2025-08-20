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
            content: `You are a friendly English conversation partner. Respond with either "CORRECT" or provide a gentle correction.

IGNORE these minor issues (respond with "CORRECT"):
- Missing punctuation (commas, periods, exclamation marks)
- Contractions vs full forms (I'm vs I am)
- Minor word order if meaning is clear

ONLY correct if there are actual grammar/vocabulary mistakes that affect meaning.

If CORRECT: respond exactly with just "CORRECT"
If incorrect: respond with "Nice try, but say: [corrected version]"

Focus on communication, not perfect grammar.`
          },
          {
            role: 'user',
            content: `Check: "${text}"`
          }
        ],
        max_tokens: 100,
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