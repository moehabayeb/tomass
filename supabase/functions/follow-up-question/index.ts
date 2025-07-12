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
    const { text, previousContext = '', userLevel = 'beginner' } = await req.json();

    // Enhanced contextual prompt for smooth, natural follow-ups
    const prompt = `
Context: The student said: "${text}". 
Previous conversation: ${previousContext}
Student level: ${userLevel}

Generate a natural, contextual follow-up question that:
1. Stays on the same topic as what they just said
2. Feels like a friendly conversation, not an interview
3. Uses simple, encouraging language for ${userLevel} level
4. Shows genuine interest in their response
5. Keeps the conversation flowing naturally

Examples of smooth transitions:
- If they mentioned food: "That sounds delicious! Do you cook it yourself?"
- If they talked about hobbies: "How long have you been doing that?"
- If they shared an opinion: "That's interesting! What made you think that way?"

Generate ONE short, warm follow-up question (max 15 words):`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: 'You are a friendly English tutor.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 50,
        temperature: 0.9
      }),
    });

    const data = await response.json();
    const followUpQuestion = data.choices?.[0]?.message?.content?.trim() || "Can you tell me more about that?";

    return new Response(JSON.stringify({ followUpQuestion }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in follow-up-question function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});