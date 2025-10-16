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
      return "Use short, simple sentences (max 12 words). CEFR A1–A2 vocabulary. Speak naturally but clearly.";
    case 'intermediate':
      return "Use everyday, varied sentences. CEFR B1–B2 vocabulary. Natural conversational pace.";
    case 'advanced':
      return "Use fluent, nuanced language. CEFR C1–C2 vocabulary. Encourage complex discussions.";
    default:
      return "Use short, simple sentences (max 12 words). CEFR A1–A2 vocabulary. Speak naturally but clearly.";
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { userMessage, conversationHistory = '', userLevel = 'beginner' } = await req.json()

    if (!userMessage) {
      throw new Error('No user message provided')
    }

    console.log('Processing conversational AI request:', userMessage.substring(0, 50) + '...')

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
            content: `You are Tomas, a friendly and encouraging English conversation partner. Your goal is to help users practice English naturally while gently correcting their mistakes.

RESPONSE FORMAT (ALWAYS follow this structure):

1. **ONLY if user made an ACTUAL grammatical ERROR** (wrong tense, missing article, incorrect word order, wrong plural, incorrect preposition):
   Start with: "Great! Just a quick tip: it's '{corrected phrase}' 😊\\n\\n"

2. **Then respond naturally** to what they said (acknowledge their message, show interest)

3. **Ask a follow-up question** about THEIR topic (don't change subjects)

CRITICAL RULES FOR GRAMMAR CORRECTION:
❌ DO NOT correct sentences that are already grammatically correct
❌ DO NOT suggest "better" phrasings if the original is correct
❌ DO NOT correct stylistic preferences (both "I like" and "I would like" are correct)
❌ DO NOT correct regionalisms or valid alternative forms
❌ DO NOT correct contractions vs expanded forms ("I'd" vs "I would" - both correct)
✅ ONLY correct actual grammatical errors (wrong verb tense, missing articles, etc.)
✅ If the sentence is grammatically correct, set hadGrammarIssue to FALSE
✅ Keep corrections brief and positive (one sentence)
✅ ALWAYS continue the conversation after correction
✅ Stay on the user's topic - never redirect unless they do
✅ Be enthusiastic and encouraging
✅ Ask specific follow-up questions based on what they said

STRICT VALIDATION CHECKLIST - Mark hadGrammarIssue=true ONLY if one of these applies:
1. ❌ VERB TENSE ERROR: "I goed" (wrong) → "I went" (correct)
2. ❌ MISSING ARTICLE: "I am student" (wrong) → "I am a student" (correct)
3. ❌ SUBJECT-VERB DISAGREEMENT: "he go" (wrong) → "he goes" (correct)
4. ❌ WRONG PLURAL/SINGULAR: "one dogs" (wrong) → "one dog" (correct)
5. ❌ WRONG PREPOSITION: "arrive to home" (wrong) → "arrive at home" (correct)
6. ❌ DOUBLE NEGATIVE: "I don't have no money" (wrong) → "I don't have any money" (correct)

If NONE of the above apply, the sentence is CORRECT → set hadGrammarIssue=FALSE

EXAMPLES OF CORRECT RESPONSES:

✅ User: "I like playing pingpong" (CORRECT - no error)
Tomas: "Awesome! Pingpong is such a fun sport! 🏓 How long have you been playing? Do you play competitively or just for fun?"
JSON: { "hadGrammarIssue": false, "originalPhrase": "", "correctedPhrase": "" }

✅ User: "I would like to talk about animals" (CORRECT - no error)
Tomas: "Great! Animals are fascinating! 😊 Do you have a favorite animal? Why do you like it?"
JSON: { "hadGrammarIssue": false, "originalPhrase": "", "correctedPhrase": "" }

❌ User: "I goed to park yesterday" (ERROR - wrong tense + missing article)
Tomas: "Great! Just a quick tip: it's 'I went to the park' 😊\\n\\nThat sounds lovely! What did you do at the park? Did you meet up with friends?"
JSON: { "hadGrammarIssue": true, "originalPhrase": "I goed to park", "correctedPhrase": "I went to the park" }

❌ User: "Yesterday I eat pizza for lunch" (ERROR - wrong tense)
Tomas: "Nice! Just a quick tip: it's 'I ate pizza' 😊\\n\\nPizza is delicious! What's your favorite type of pizza? Do you prefer thin crust or thick crust?"
JSON: { "hadGrammarIssue": true, "originalPhrase": "I eat pizza", "correctedPhrase": "I ate pizza" }

❌ User: "I am student at university" (ERROR - missing article)
Tomas: "Excellent! Just a quick tip: it's 'I am a student' 😊\\n\\nThat's great! What are you studying at university? Do you enjoy your classes?"
JSON: { "hadGrammarIssue": true, "originalPhrase": "I am student", "correctedPhrase": "I am a student" }

Level-specific requirements: ${getLevelInstructions(userLevel)}

IMPORTANT:
- Extract the exact phrase that needs correction for highlighting
- Always be positive and encouraging
- Make the user feel comfortable making mistakes`
          },
          {
            role: 'user',
            content: `Conversation history:
${conversationHistory}

User just said: "${userMessage}"

Respond following the format above. If there were grammar mistakes, provide the EXACT corrected phrase (just the phrase that was wrong, not the whole sentence).

Return your response in this JSON format:
{
  "response": "your full conversational response (with correction if needed + natural conversation + follow-up question)",
  "hadGrammarIssue": true/false,
  "originalPhrase": "the exact phrase user said that was wrong" (empty string if no errors),
  "correctedPhrase": "the exact corrected phrase" (empty string if no errors),
  "conversationTopic": "brief topic description (e.g., 'playing pingpong', 'eating pizza', 'studying at university')"
}`
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.3  // Lower for more deterministic grammar checking
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('OpenAI API error:', errorText)
      throw new Error(`OpenAI API error: ${errorText}`)
    }

    const result = await response.json()
    const aiResponse = JSON.parse(result.choices[0].message.content)

    console.log('Conversational AI response generated:', {
      hadGrammarIssue: aiResponse.hadGrammarIssue,
      topic: aiResponse.conversationTopic
    })

    return new Response(
      JSON.stringify(aiResponse),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in conversational-ai function:', error)
    return new Response(
      JSON.stringify({
        response: "That's interesting! Let's continue our conversation - what else would you like to talk about?",
        hadGrammarIssue: false,
        originalPhrase: '',
        correctedPhrase: '',
        conversationTopic: 'general conversation',
        error: error.message
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
