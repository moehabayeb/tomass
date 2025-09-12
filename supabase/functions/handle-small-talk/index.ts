import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Get level-specific instructions
const getLevelInstructions = (level: string) => {
  switch (level) {
    case 'beginner':
      return "Use short, simple sentences. CEFR A1–A2 vocabulary. One question at a time. Avoid idioms. Max 12 words per sentence.";
    case 'intermediate':
      return "Use everyday, varied sentences. CEFR B1–B2 vocabulary. Allow follow-ups. Natural pace. 1–2 sentences per turn.";
    case 'advanced':
      return "Use fluent, nuanced language. CEFR C1–C2 vocabulary. Encourage opinions, reasoning, and idioms. 2–3 sentences max.";
    default:
      return "Use short, simple sentences. CEFR A1–A2 vocabulary. One question at a time. Avoid idioms. Max 12 words per sentence.";
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { text, intent, context, level = 'beginner' } = await req.json()
    
    if (!text) {
      throw new Error('No text provided')
    }

    console.log('Handling small talk/question:', text.substring(0, 50) + '...')

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
            content: `You are Tomas, a friendly English conversation teacher. The user just made a ${intent === 'question' ? 'question' : 'conversational comment'}.

Rules:
1. Respond naturally and enthusiastically to what they said
2. Show genuine interest and ask a related follow-up question
3. Keep the conversation flowing on THEIR topic, don't redirect
4. Be encouraging and supportive
5. NEVER tell them to "focus on answering" or redirect to a different topic

Level-specific requirements for your response: ${getLevelInstructions(level)}

Example responses:
- User: "I like pingpong" → "That's awesome! Pingpong is such a fun sport. How long have you been playing? Do you play with friends or at a club?"
- User: "How are you?" → "I'm doing great, thanks for asking! How about you - how has your day been so far?"
- User: "Do you like pizza?" → "I love pizza! Pepperoni is my favorite. What's your favorite type of pizza? Do you make it at home or order it?"

IMPORTANT: Continue the conversation about THEIR topic. Do not change subjects unless they do.`
          },
          {
            role: 'user',
            content: `Context: ${context || 'English conversation practice'}
            
User said: "${text}"

Respond briefly and steer back to conversation practice:`
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
    const botResponse = result.choices[0].message.content.trim()
    
    console.log('Small talk response:', botResponse)

    return new Response(
      JSON.stringify({ 
        response: botResponse
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in handle-small-talk function:', error)
    return new Response(
      JSON.stringify({ 
        response: "That's interesting! Let's continue with our conversation practice - what would you like to talk about next?",
        error: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})