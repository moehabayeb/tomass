import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Safety keywords for distress signal detection
const DISTRESS_KEYWORDS = [
  'kill myself', 'suicide', 'want to die', 'end my life', 'take my life',
  'hurt myself', 'harm myself', 'don\'t want to live', 'want to disappear',
  'nothing to live for', 'better off dead', 'can\'t go on'
];

// Check for distress signals using keyword matching
function detectDistressSignal(text: string): boolean {
  const normalizedText = text.toLowerCase();
  return DISTRESS_KEYWORDS.some(keyword => normalizedText.includes(keyword));
}

// Generate empathetic crisis response
function generateCrisisResponse(): string {
  return `I'm really sorry you're feeling this way. You're not alone, and help is available.

If you're in immediate danger, please contact your local emergency number now.

You can also reach out to a crisis line: US 988, UK & ROI Samaritans 116 123, Canada Talk Suicide 1-833-456-4566, or visit findahelpline.com for local options.

Please consider talking to someone you trust or a mental health professional.`;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { text, context } = await req.json()
    
    if (!text) {
      throw new Error('No text provided')
    }

    console.log('Classifying intent for text:', text.substring(0, 100) + '...')

    // First check for distress signals
    if (detectDistressSignal(text)) {
      console.log('distress_signal=true')
      return new Response(
        JSON.stringify({ 
          intent: 'distress_signal',
          response: generateCrisisResponse(),
          skipCorrection: true,
          skipXP: true
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Use LLM to classify intent for non-distress utterances
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
            content: `You are an intent classifier for an English conversation app. Classify the user's utterance into exactly one category:

- "lesson_answer": Direct responses to English learning questions/exercises
- "question": Questions directed at the teacher/app
- "small_talk": Casual conversation, greetings, comments not related to the lesson

Respond with ONLY the category name: lesson_answer, question, or small_talk`
          },
          {
            role: 'user',
            content: `Context: ${context || 'English conversation practice'}
            
User said: "${text}"

Classify this utterance:`
          }
        ],
        max_tokens: 20,
        temperature: 0.1
      }),
    })

    if (!response.ok) {
      console.error('OpenAI API error:', await response.text())
      // Fallback to lesson_answer if classification fails
      return new Response(
        JSON.stringify({ 
          intent: 'lesson_answer',
          skipCorrection: false,
          skipXP: false
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const result = await response.json()
    const intent = result.choices[0].message.content.trim().toLowerCase()
    
    console.log('Classified intent:', intent)

    return new Response(
      JSON.stringify({ 
        intent: intent,
        skipCorrection: false,
        skipXP: false
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in classify-intent function:', error)
    return new Response(
      JSON.stringify({ 
        intent: 'lesson_answer', // Safe fallback
        skipCorrection: false,
        skipXP: false,
        error: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})