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

    // Add 15s timeout to prevent indefinite hangs. Kept comfortably below the
    // client's request timeout so the graceful fallback below (HTTP 200) is what
    // the client receives, instead of the client's own "took too long" message.
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        max_tokens: 500, // Limit response length for faster processing
        messages: [
          {
            role: 'system',
            content: `You are Tomas, a friendly and encouraging English conversation partner. Your goal is to help users practice English naturally while gently correcting their mistakes.

RESPONSE FORMAT (ALWAYS follow this structure):

1. **ONLY if user made an ACTUAL grammatical ERROR** (wrong tense, missing REQUIRED article, incorrect word order, wrong plural, incorrect preposition):
   Start with: "Great! Just a quick tip: it's '{corrected phrase}' 😊\\n\\n"

2. **OR if user's sentence could be expressed more naturally/contextually** (grammar is OK but phrasing is awkward or doesn't match context):
   Start with: "Nice! You could also say: '{better contextual phrasing}' 😊\\n\\n"

3. **Then respond naturally** to what they said (acknowledge their message, show interest)

4. **Ask a follow-up question** about THEIR topic (don't change subjects)

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
21. "I like Italian super cars" ✅ CORRECT (compound word variation - both "super cars" and "supercars" are acceptable)
22. "I want ice cream" ✅ CORRECT (compound word - both "ice cream" and "icecream" are acceptable)
23. "Let's meet at the coffee shop" ✅ CORRECT (compound word - both "coffee shop" and "coffeeshop" are acceptable)
24. "I got your e-mail" ✅ CORRECT (compound word - both "e-mail" and "email" are acceptable)
25. "I'm learning on line" ✅ CORRECT (compound word - both "on line", "on-line" and "online" are acceptable)
26. "at some point in life" ✅ CORRECT (same as 'at some point in life' or "at some point in life" - quote style doesn't matter)
27. "hello" ✅ CORRECT (same as 'hello' or "hello" or hello - all quote styles are acceptable)
28. "He said yes" ✅ CORRECT (adding quotes around 'yes' is unnecessary)
29. "I like it" ✅ CORRECT (no comma/period needed in spoken language)
30. "We can talk about this later" ✅ CORRECT (punctuation is added by speech-to-text, don't correct it)

⚠️ CRITICAL RULES FOR SPOKEN/CONVERSATIONAL LANGUAGE:

🚨 ABSOLUTELY NEVER CORRECT THESE (NOT GRAMMAR ERRORS):
1. CAPITALIZATION differences: "We Should Skip" vs "We should skip" - NOT AN ERROR!
2. PUNCTUATION: Missing commas, periods, question marks - NOT AN ERROR!
3. QUOTE STYLES: 'hello' vs "hello" vs hello - NOT AN ERROR!

Speech-to-text systems automatically add punctuation AND random capitalization.
Users CANNOT control these during speech recognition.
These are TRANSCRIPTION ARTIFACTS, not grammar mistakes.

🧠 SMART TEACHER MINDSET:
Ask yourself: "Would a good teacher interrupt a student just because they didn't pause for a comma?"
Answer: NO! A teacher only corrects errors that affect MEANING or show incorrect grammar knowledge.

Examples of what a SMART TEACHER IGNORES:
❌ "We Should Skip months" → "We should skip months" (JUST CAPITALIZATION - IGNORE!)
❌ "I like pizza" → "I like pizza." (JUST PUNCTUATION - IGNORE!)
❌ "Yes I can" → "Yes, I can" (JUST COMMA - IGNORE!)
❌ "he said yes" → "he said 'yes'" (JUST QUOTES - IGNORE!)
❌ "how are you" → "How are you?" (JUST CAPITALIZATION + PUNCTUATION - IGNORE!)

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
JSON: { "hadGrammarIssue": false, "originalPhrase": "", "correctedPhrase": "", "hasSuggestedPhrasing": false, "suggestedPhrasing": "" }

✅ User: "I would like to talk about animals" (PASSES ALL CHECKS - NO ERROR)
Response: "Great! Animals are fascinating! 😊 What's your favorite animal?"
JSON: { "hadGrammarIssue": false, "originalPhrase": "", "correctedPhrase": "", "hasSuggestedPhrasing": false, "suggestedPhrasing": "" }

🎯 User: "my type favorite Apple of green" (AWKWARD PHRASING - Contextual improvement needed)
Context: Question was "What's your favorite type of apple?"
Response: "Nice! You could also say: 'My favorite type of apples are green apples' 😊\\n\\nGreen apples are great! Do you like them because they're tart or crunchy?"
JSON: { "hadGrammarIssue": false, "originalPhrase": "", "correctedPhrase": "", "hasSuggestedPhrasing": true, "suggestedPhrasing": "My favorite type of apples are green apples" }

❌ User: "I goed to park yesterday" (FAILS Step 1: wrong verb + FAILS Step 3: missing article)
Response: "Great! Just a quick tip: it's 'I went to the park' 😊\\n\\nWhat did you do there?"
JSON: { "hadGrammarIssue": true, "originalPhrase": "I goed to park", "correctedPhrase": "I went to the park", "hasSuggestedPhrasing": false, "suggestedPhrasing": "" }

❌ User: "I am student" (FAILS Step 3: missing required article for profession)
Response: "Excellent! Just a quick tip: it's 'I am a student' 😊\\n\\nWhat are you studying?"
JSON: { "hadGrammarIssue": true, "originalPhrase": "I am student", "correctedPhrase": "I am a student", "hasSuggestedPhrasing": false, "suggestedPhrasing": "" }

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

Respond following the format above. If there were grammar mistakes, provide the EXACT corrected phrase (just the phrase that was wrong, not the whole sentence). If the phrasing is awkward or could be more contextual, provide a better complete sentence in suggestedPhrasing.

🎯 CONTEXTUAL PHRASING RULES:
- Consider the conversation history and what question was asked
- If user's answer is grammatically OK but awkwardly phrased, provide a natural rephrasing
- The suggested phrasing should be a COMPLETE sentence that fully answers the question naturally
- Example: Q: "What's your favorite fruit?" A: "apple red I like" → Suggest: "My favorite fruit is red apples" or "I like red apples"

Return your response in this JSON format:
{
  "response": "your full conversational response (with correction/suggestion if needed + natural conversation + follow-up question)",
  "hadGrammarIssue": true/false,
  "originalPhrase": "the exact phrase user said that was wrong" (empty string if no errors),
  "correctedPhrase": "the exact corrected phrase" (empty string if no errors),
  "hasSuggestedPhrasing": true/false (true if you provided a better contextual phrasing),
  "suggestedPhrasing": "a complete, natural sentence that better expresses what the user meant in context" (empty string if not needed),
  "conversationTopic": "brief topic description (e.g., 'playing pingpong', 'eating pizza', 'studying at university')"
}`
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.1  // Ultra-low for maximum deterministic grammar checking
      }),
    })

    // Clear timeout on successful response
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text()
      console.error('OpenAI API error:', errorText)
      throw new Error(`OpenAI API error: ${errorText}`)
    }

    const result = await response.json()
    const aiResponse = JSON.parse(result.choices[0].message.content)

    // 🛡️ SERVER-SIDE VALIDATION FILTER - Final safety net against false positives
    // Helper function to strip correction prefix from response when blocking false positives
    const stripCorrectionPrefix = (response: string): string => {
      // Remove "Great! Just a quick tip: it's '...' 😊" pattern
      const patterns = [
        /^Great!\s*Just a quick tip:.*?😊\s*\\n\\n/i,
        /^Great!\s*Just a quick tip:.*?😊\s*\n\n/i,
        /^Great!\s*Just a quick tip:.*?😊\s*/i,
        /^Excellent!\s*Just a quick tip:.*?😊\s*\\n\\n/i,
        /^Excellent!\s*Just a quick tip:.*?😊\s*\n\n/i,
        /^Nice!\s*Just a quick tip:.*?😊\s*\\n\\n/i,
      ];
      let cleaned = response;
      for (const pattern of patterns) {
        cleaned = cleaned.replace(pattern, '');
      }
      return cleaned.trim();
    };

    if (aiResponse.hadGrammarIssue && aiResponse.originalPhrase && aiResponse.correctedPhrase) {
      const original = aiResponse.originalPhrase.toLowerCase().trim()
      const corrected = aiResponse.correctedPhrase.toLowerCase().trim()

      // Safety check 1: Reject if identical (catches capitalization-only differences)
      if (original === corrected) {
        console.warn('🚨 Blocked false positive: identical/capitalization-only', {
          original: aiResponse.originalPhrase,
          corrected: aiResponse.correctedPhrase
        })
        aiResponse.hadGrammarIssue = false
        aiResponse.originalPhrase = ''
        aiResponse.correctedPhrase = ''
        aiResponse.response = stripCorrectionPrefix(aiResponse.response)
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
        aiResponse.response = stripCorrectionPrefix(aiResponse.response)
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
          aiResponse.response = stripCorrectionPrefix(aiResponse.response)
        }
      }

      // Safety check 4: Reject if only difference is punctuation/capitalization
      // Remove ALL punctuation (including Unicode smart quotes) and normalize whitespace
      const normalizePunctuation = (text: string): string => {
        return text
          .toLowerCase()
          // Remove ASCII punctuation
          .replace(/[.,!?;:'"()\[\]{}<>\/\\|@#$%^&*_+=~`-]/g, '')
          // Remove Unicode smart quotes and quote variants
          .replace(/[\u2018\u2019\u201C\u201D\u00AB\u00BB\u2039\u203A\u201E\u201A]/g, '')
          // Normalize whitespace
          .replace(/\s+/g, ' ')
          .trim();
      };

      const origNoPunct = normalizePunctuation(original);
      const corrNoPunct = normalizePunctuation(corrected);

      if (origNoPunct === corrNoPunct) {
        console.warn('🚨 Blocked false positive: only punctuation/capitalization difference', { original, corrected })
        aiResponse.hadGrammarIssue = false
        aiResponse.originalPhrase = ''
        aiResponse.correctedPhrase = ''
        aiResponse.response = stripCorrectionPrefix(aiResponse.response)
      }

      // Safety check 5: Reject if only difference is compound word spacing/hyphenation
      // Examples: "super cars" vs "supercars", "ice cream" vs "icecream", "e-mail" vs "email"
      const normalizeCompounds = (text: string): string => {
        return text
          .toLowerCase()
          .replace(/[\s-]/g, '') // Remove all spaces and hyphens
          .trim();
      };

      const origNoSpaces = normalizeCompounds(original);
      const corrNoSpaces = normalizeCompounds(corrected);

      if (origNoSpaces === corrNoSpaces) {
        console.warn('🚨 Blocked false positive: only compound word spacing/hyphenation difference', { original, corrected })
        aiResponse.response = stripCorrectionPrefix(aiResponse.response)
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

    // Handle timeout specifically
    const isTimeout = error.name === 'AbortError' || error.message?.includes('abort');
    const errorMessage = isTimeout
      ? "I'm taking a bit longer to think. Let's continue - what would you like to talk about?"
      : "That's interesting! Let's continue our conversation - what else would you like to talk about?";

    // IMPORTANT: return HTTP 200 so supabase.functions.invoke surfaces this body
    // (a non-2xx status makes invoke null out `data` and the friendly fallback is
    // lost, leaving the user with a dead-end error). The `error` field below still
    // carries the real cause for logging/telemetry; the conversation keeps flowing.
    return new Response(
      JSON.stringify({
        response: errorMessage,
        hadGrammarIssue: false,
        originalPhrase: '',
        correctedPhrase: '',
        hasSuggestedPhrasing: false,
        suggestedPhrasing: '',
        conversationTopic: 'general conversation',
        fallback: true,
        error: isTimeout ? 'timeout' : (error.message || 'unknown')
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
