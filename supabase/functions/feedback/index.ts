import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Helper function to normalize text for comparison
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[.,!?;:'"()-]/g, '') // Remove punctuation
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
}

// Calculate similarity between two strings using Jaccard similarity
function calculateSimilarity(str1: string, str2: string): number {
  const normalized1 = normalizeText(str1);
  const normalized2 = normalizeText(str2);
  
  // If either string is empty, return 0
  if (!normalized1 || !normalized2) return 0;
  
  // Split into words
  const words1 = new Set(normalized1.split(' '));
  const words2 = new Set(normalized2.split(' '));
  
  // Calculate Jaccard similarity (intersection / union)
  const intersection = new Set([...words1].filter(x => words2.has(x)));
  const union = new Set([...words1, ...words2]);
  
  return intersection.size / union.size;
}

// Check if the user's answer is acceptable based on similarity
function isAcceptableAnswer(userText: string, expectedText: string): boolean {
  const similarity = calculateSimilarity(userText, expectedText);
  const SIMILARITY_THRESHOLD = 0.88; // 88% similarity threshold for more natural conversation
  
  console.log(`Similarity between "${userText}" and "${expectedText}": ${similarity}`);
  return similarity >= SIMILARITY_THRESHOLD;
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
            content: `You are an English conversation partner. Analyze the user's text and provide ONLY a corrected version if there are significant grammar or vocabulary errors that affect meaning.

COMPLETELY IGNORE these minor issues:
- Missing or incorrect punctuation (commas, periods, question marks, exclamation marks)
- Capitalization differences
- Contractions vs full forms (I'm vs I am, don't vs do not)  
- Minor word order variations if meaning is clear
- Casual speech patterns
- Minor typos or spacing

Focus ONLY on significant grammar/vocabulary mistakes that change meaning.

If the text is grammatically acceptable for conversation, respond with: "CORRECT"
If there are significant errors, respond with ONLY the corrected version, nothing else.

Examples:
- "i go there yesterday" → "I went there yesterday" (tense error)
- "im going to store" → "I'm going to the store" (missing article)
- "hello how are you" → "CORRECT" (punctuation/capitalization ignored)
- "ok lets go" → "CORRECT" (casual speech is fine)
- "i dont know im feeling sad" → "CORRECT" (meaning is clear)`
          },
          {
            role: 'user',
            content: `Analyze: "${text}"`
          }
        ],
        max_tokens: 100,
        temperature: 0.3
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('OpenAI API error:', errorText)
      throw new Error(`OpenAI API error: ${errorText}`)
    }

    const result = await response.json()
    const aiResponse = result.choices[0].message.content.trim()
    
    console.log('AI response:', aiResponse)

    // Check if AI says it's correct
    if (aiResponse === 'CORRECT') {
      return new Response(
        JSON.stringify({ 
          corrected: text, 
          isCorrect: true,
          message: 'CORRECT'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Check similarity between original and corrected version
    const isAcceptable = isAcceptableAnswer(text, aiResponse);
    
    if (isAcceptable) {
      // Similar enough - treat as correct
      return new Response(
        JSON.stringify({ 
          corrected: text, 
          isCorrect: true,
          message: 'CORRECT'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Significant error - provide gentle correction
    return new Response(
      JSON.stringify({ 
        corrected: aiResponse,
        isCorrect: false,
        message: `Nice try, but say: "${aiResponse}"`
      }),
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