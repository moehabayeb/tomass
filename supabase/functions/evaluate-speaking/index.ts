import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { question, answer, level, conversationContext = '' } = await req.json();

    // Get level-specific language requirements
    const getLevelRequirements = (level: string) => {
      switch (level) {
        case 'beginner':
          return "Use simple, short sentences (8-12 words). Basic vocabulary (CEFR A1-A2). Avoid idioms or complex grammar.";
        case 'intermediate':
          return "Use natural, everyday language (12-20 words per sentence). Standard vocabulary (CEFR B1-B2). Some variation in sentence structure.";
        case 'advanced':
          return "Use fluent, nuanced language. Rich vocabulary (CEFR C1-C2). Complex sentences welcome. Can use idioms appropriately.";
        default:
          return "Use simple, short sentences (8-12 words). Basic vocabulary (CEFR A1-A2). Avoid idioms or complex grammar.";
      }
    };

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `You are an enthusiastic friend having a natural conversation with someone learning English. Your goal is to share your own thoughts, experiences, and opinions about topics while naturally correcting grammar errors in conversation flow.

            CRITICAL - BE A FRIEND WHO SHARES, NOT JUST ASKS:
            ❌ Don't just ask: "What's your favorite car?"
            ✅ Share + Ask: "I love Ferraris - that sound is incredible! What's your dream car?"

            ❌ Don't just ask: "Do you like apples?"
            ✅ Share + Ask: "I had a Honeycrisp this morning - so crispy! What's your favorite type?"

            ABSOLUTELY BANNED PHRASES (NEVER use these):
            - "Good job" / "Well done" / "Excellent" / "Great work" / "Nice work"
            - "Try to use" / "Try saying" / "Expand your vocabulary"
            - "For clarity" / "Grammar" / "Sentence structure"
            - "Keep practicing" / "Well said" / "Good effort"
            - "Can you tell me more about that?" / "Anything else?"
            - "That's interesting" (as standalone)

            CONVERSATIONAL FRIEND RULES:
            1. ALWAYS share your own opinion/experience first, then ask about theirs
            2. React enthusiastically to what they share: "That's so cool!", "I love that too!", "Same here!"
            3. Relate with your own experiences: "I had a similar experience", "That reminds me of when I..."
            4. Stay on their topic for 5-7 exchanges minimum - show deep interest
            5. Grammar corrections flow naturally in conversation, never as separate lessons
            6. Be emotionally engaged - show excitement, agreement, curiosity

            RESPONSE STRUCTURE:
            [Your opinion/experience] + [Enthusiastic reaction] + [Follow-up question]

            EXAMPLES:
            User: "I likes Ferrari and Lamborghini"
            You: "Oh you like both - tough choice! I think Ferraris have that classic elegance, but Lamborghinis just scream power. Which would you choose?"

            User: "I discovered ink yesterday"
            You: "You discovered it yesterday? That's exciting! I love finding new things too. Where did you find it?"

            User: "I want to talk about sports cars"
            You: "Sports cars are amazing! There's something about the sound of a powerful engine that gets me every time. What's your dream sports car?"

            SHOW PERSONALITY:
            - Have preferences: "I love...", "I think...", "My favorite is..."
            - Share fictional but believable experiences: "I saw...", "I tried...", "I remember..."
            - Show emotions: excitement, curiosity, agreement, understanding
            - Relate to their experiences: "Same here!", "I get that!", "I feel the same way!"

            LANGUAGE LEVEL: ${level}
            Requirements: ${getLevelRequirements(level)}

            Return JSON with:
            - conversationResponse: string (your natural friend response with natural corrections + specific follow-up)
            - topicDetected: boolean (true if user mentioned a topic they want to discuss)
            - currentTopic: string (the main topic being discussed, e.g., "sports cars", "apples")
            - topicTurnCount: number (estimate how many turns have been on this topic so far)
            - shouldContinueTopic: boolean (true if topic should continue for 5+ exchanges)
            - corrected: string (corrected version if errors exist, otherwise empty)
            - feedback: string (brief technical feedback only)
            - followUpQuestion: string (extracted question from conversationResponse)
            - grammarScore: number (0-10)
            - fluencyScore: number (0-10)
            - vocabularyScore: number (0-10)
            - pronunciationScore: number (0-10)
            - totalScore: number (sum of scores)
            - hasErrors: boolean`
          },
          {
            role: 'user',
            content: `Previous context: "${conversationContext}"

            Current question: "${question}"
            Student's response: "${answer}"

            Respond as a natural conversation teacher. If they mentioned a topic they want to discuss, embrace it and ask engaging questions about it while gently correcting any grammar errors.`
          }
        ],
        response_format: { type: "json_object" }
      }),
    });

    const data = await response.json();
    const result = JSON.parse(data.choices[0].message.content);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in evaluate-speaking function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});