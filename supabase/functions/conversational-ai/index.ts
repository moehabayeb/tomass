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

1. **ONLY if user made an ACTUAL grammatical ERROR** (wrong tense, missing REQUIRED article, incorrect word order, wrong plural, incorrect preposition):
   Start with: "Great! Just a quick tip: it's '{corrected phrase}' 😊\\n\\n"

2. **Then respond naturally** to what they said (acknowledge their message, show interest)

3. **Ask a follow-up question** about THEIR topic (don't change subjects)

🚨 ULTRA-STRICT RULES - PREVENT FALSE POSITIVES 🚨

🔴 MANDATORY PRE-CHECK BEFORE CORRECTING:
1. Is this sentence 100% grammatically WRONG? (If ANY doubt, answer NO)
2. Would a native speaker say this is incorrect? (If unsure, answer NO)
3. If you answered NO to either question → hadGrammarIssue = FALSE

⛔ NEVER CORRECT CONTRACTIONS - ALL ARE VALID:
- "let's" = "let us" ✅ BOTH CORRECT
- "I'm" = "I am" ✅ BOTH CORRECT
- "I'd" = "I would" ✅ BOTH CORRECT
- "I'll" = "I will" ✅ BOTH CORRECT
- "I've" = "I have" ✅ BOTH CORRECT
- "you're" = "you are" ✅ BOTH CORRECT
- "we're" = "we are" ✅ BOTH CORRECT
- "they're" = "they are" ✅ BOTH CORRECT
- "it's" = "it is" ✅ BOTH CORRECT
- "don't" = "do not" ✅ BOTH CORRECT

❌ NEVER CORRECT THESE (ALL ARE 100% GRAMMATICALLY CORRECT):
1. "I like playing pingpong" ✅ CORRECT
2. "I would like to talk about animals" ✅ CORRECT
3. "let's talk about animals" ✅ CORRECT
4. "I'm very interested in them" ✅ CORRECT
5. "let's talk about animals. I'm very interested in them" ✅ CORRECT (perfect!)
6. "talk about apples" ✅ CORRECT (no article needed)
7. "eating apple pie" ✅ CORRECT (no article needed)
8. "I like animals" ✅ CORRECT (no article needed)
9. "playing football" ✅ CORRECT (no article for sports)
10. "I enjoy reading books" ✅ CORRECT (plural, no article)
11. "go to school" ✅ CORRECT (no article for school/work/home/bed)
12. "by car" / "by bus" ✅ CORRECT (no article for transport)
13. "I want to discuss music" ✅ CORRECT
14. "talking about sports" ✅ CORRECT
15. "I'm interested in learning" ✅ CORRECT
16. "we can talk about movies" ✅ CORRECT
17. "I'd like to practice English" ✅ CORRECT
18. "let's discuss science" ✅ CORRECT
19. "I'm excited about this" ✅ CORRECT
20. "we should talk more" ✅ CORRECT

✅ ONLY CORRECT THESE ACTUAL ERRORS:
1. ❌ "I goed" → ✅ "I went" (WRONG VERB FORM)
2. ❌ "I am student" → ✅ "I am a student" (MISSING REQUIRED ARTICLE for profession)
3. ❌ "he go" → ✅ "he goes" (SUBJECT-VERB DISAGREEMENT)
4. ❌ "one dogs" → ✅ "one dog" (WRONG PLURAL)
5. ❌ "I have 20 years old" → ✅ "I am 20 years old" (WRONG VERB)
6. ❌ "more better" → ✅ "better" (DOUBLE COMPARATIVE)

DECISION TREE - USE THIS EXACT ORDER:

Step 1: Is there a WRONG VERB FORM? (goed, eated, have went, etc.)
→ YES = hadGrammarIssue: true
→ NO = Continue to Step 2

Step 2: Is there SUBJECT-VERB DISAGREEMENT? (he go, they is, etc.)
→ YES = hadGrammarIssue: true
→ NO = Continue to Step 3

Step 3: Is there a MISSING **REQUIRED** ARTICLE?
→ Check: Is it a profession/identity without "a/an"? ("I am student")
→ YES = hadGrammarIssue: true
→ NO = Continue to Step 4

Step 4: Is there a WRONG PLURAL/SINGULAR? (one dogs, two cat, etc.)
→ YES = hadGrammarIssue: true
→ NO = Continue to Step 5

Step 5: Is there a WRONG PREPOSITION? (arrive to home, depend of, etc.)
→ YES = hadGrammarIssue: true
→ NO = Continue to Step 6

Step 6: Did user pass all checks?
→ YES = hadGrammarIssue: FALSE (DO NOT CORRECT!)

CRITICAL ARTICLE RULES:
❌ NEVER add articles to: general plurals, sports, school/work/home, by+transport
✅ ONLY add articles when REQUIRED: professions (I am a teacher), specific countable singular

EXAMPLES OF CORRECT RESPONSES:

✅ User: "I like playing pingpong" (PASSES ALL CHECKS - NO ERROR)
Response: "Awesome! Pingpong is such a fun sport! 🏓 How long have you been playing?"
JSON: { "hadGrammarIssue": false, "originalPhrase": "", "correctedPhrase": "" }

✅ User: "I would like to talk about animals" (PASSES ALL CHECKS - NO ERROR)
Response: "Great! Animals are fascinating! 😊 What's your favorite animal?"
JSON: { "hadGrammarIssue": false, "originalPhrase": "", "correctedPhrase": "" }

✅ User: "eating apple pie" (PASSES ALL CHECKS - NO ERROR)
Response: "Yum! Apple pie is delicious! Do you make it yourself?"
JSON: { "hadGrammarIssue": false, "originalPhrase": "", "correctedPhrase": "" }

❌ User: "I goed to park yesterday" (FAILS Step 1: wrong verb + FAILS Step 3: missing article)
Response: "Great! Just a quick tip: it's 'I went to the park' 😊\\n\\nWhat did you do there?"
JSON: { "hadGrammarIssue": true, "originalPhrase": "I goed to park", "correctedPhrase": "I went to the park" }

❌ User: "I am student" (FAILS Step 3: missing required article for profession)
Response: "Excellent! Just a quick tip: it's 'I am a student' 😊\\n\\nWhat are you studying?"
JSON: { "hadGrammarIssue": true, "originalPhrase": "I am student", "correctedPhrase": "I am a student" }

Level-specific requirements: ${getLevelInstructions(userLevel)}

🎯 FINAL SAFETY CHECK (MANDATORY):
Before setting hadGrammarIssue=true, ask yourself:
1. "Is there a CLEAR, OBVIOUS error that ANY English teacher would mark wrong?"
2. "Or is this just a different way of saying something correctly?"
3. If #2, then hadGrammarIssue = FALSE

🎯 GOLDEN RULE: When in doubt, DO NOT CORRECT. Only correct OBVIOUS grammatical errors.

⚠️ CRITICAL: If the sentence uses contractions (let's, I'm, I'd, etc.), it is almost ALWAYS correct!`
          },
          {
            role: 'user',
            content: `Conversation history:
${conversationHistory}

User just said: "${userMessage}"

🔴 CRITICAL INSTRUCTION: Before responding, check if "${userMessage}" appears in the NEVER CORRECT list above or uses contractions. If yes, you MUST set hadGrammarIssue=false.

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
        temperature: 0.1  // Ultra-low for maximum deterministic grammar checking
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('OpenAI API error:', errorText)
      throw new Error(`OpenAI API error: ${errorText}`)
    }

    const result = await response.json()
    const aiResponse = JSON.parse(result.choices[0].message.content)

    // 🛡️ SERVER-SIDE VALIDATION FILTER - Final safety net against false positives
    if (aiResponse.hadGrammarIssue && aiResponse.originalPhrase && aiResponse.correctedPhrase) {
      const original = aiResponse.originalPhrase.toLowerCase().trim()
      const corrected = aiResponse.correctedPhrase.toLowerCase().trim()

      // Safety check 1: Reject if identical
      if (original === corrected) {
        console.warn('🚨 Blocked false positive: identical phrases')
        aiResponse.hadGrammarIssue = false
        aiResponse.originalPhrase = ''
        aiResponse.correctedPhrase = ''
      }

      // Safety check 2: Reject if only difference is contractions
      const contractionsMap: Record<string, string> = {
        "let's": "let us", "i'm": "i am", "i'd": "i would", "i'll": "i will",
        "i've": "i have", "you're": "you are", "we're": "we are",
        "they're": "they are", "it's": "it is", "don't": "do not",
        "doesn't": "does not", "didn't": "did not", "won't": "will not",
        "can't": "cannot", "isn't": "is not", "aren't": "are not"
      }

      let origExpanded = original
      let corrExpanded = corrected

      Object.entries(contractionsMap).forEach(([contr, expanded]) => {
        const regex = new RegExp(`\\b${contr}\\b`, 'g')
        origExpanded = origExpanded.replace(regex, expanded)
        corrExpanded = corrExpanded.replace(regex, expanded)
      })

      if (origExpanded === corrExpanded) {
        console.warn('🚨 Blocked false positive: only contraction difference', { original, corrected })
        aiResponse.hadGrammarIssue = false
        aiResponse.originalPhrase = ''
        aiResponse.correctedPhrase = ''
      }

      // Safety check 3: Reject if only difference is optional articles
      const origNoArticles = original.replace(/\b(the|a|an)\s+/g, '').replace(/\s+/g, ' ')
      const corrNoArticles = corrected.replace(/\b(the|a|an)\s+/g, '').replace(/\s+/g, ' ')

      if (origNoArticles === corrNoArticles) {
        // Exception: Required articles for professions
        const requiresArticle = /\b(i am|he is|she is|it is|you are|we are|they are)\s+(student|teacher|doctor|engineer|lawyer|nurse|programmer|designer)\b/i

        if (!requiresArticle.test(original)) {
          console.warn('🚨 Blocked false positive: optional article difference', { original, corrected })
          aiResponse.hadGrammarIssue = false
          aiResponse.originalPhrase = ''
          aiResponse.correctedPhrase = ''
        }
      }

      // Safety check 4: Reject if only difference is punctuation/capitalization
      // Remove ALL punctuation and normalize whitespace
      const normalizePunctuation = (text: string): string => {
        return text
          .toLowerCase()
          .replace(/[.,!?;:'"()\[\]{}<>\/\\|@#$%^&*_+=~`-]/g, '') // Remove all punctuation
          .replace(/\s+/g, ' ') // Normalize whitespace
          .trim();
      };

      const origNoPunct = normalizePunctuation(original);
      const corrNoPunct = normalizePunctuation(corrected);

      if (origNoPunct === corrNoPunct) {
        console.warn('🚨 Blocked false positive: only punctuation/capitalization difference', { original, corrected })
        aiResponse.hadGrammarIssue = false
        aiResponse.originalPhrase = ''
        aiResponse.correctedPhrase = ''
      }
    }

    console.log('Conversational AI response generated:', {
      hadGrammarIssue: aiResponse.hadGrammarIssue,
      topic: aiResponse.conversationTopic,
      filtered: aiResponse.hadGrammarIssue ? 'passed' : 'none'
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
