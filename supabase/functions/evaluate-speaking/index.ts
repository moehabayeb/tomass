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
    const { question, answer, level } = await req.json();

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are an English speaking assessment AI. Evaluate the user's spoken response based on these specific criteria:

            1. Grammar Accuracy (0-2 points): Are verb tenses, articles, sentence structure correct?
            2. Fluency & Clarity (0-2 points): Is the user speaking clearly and in full sentences?
            3. Vocabulary Range (0-1 point): Are appropriate words used? Any variety?
            
            Expected level: ${level}
            
            Scoring examples:
            - Perfect answer: Grammar (2/2), Fluency (2/2), Vocabulary (1/1) = 5/5
            - Good answer: Grammar (2/2), Fluency (1/2), Vocabulary (1/1) = 4/5
            - Average answer: Grammar (1/2), Fluency (1/2), Vocabulary (1/1) = 3/5
            
            Return a JSON response with:
            - score: number (1-5, sum of all criteria)
            - feedback: string (1 encouraging sentence, max 15 words, mention specific improvements if needed)
            - grammarScore: number (0-2)
            - fluencyScore: number (0-2) 
            - vocabularyScore: number (0-1)`
          },
          {
            role: 'user',
            content: `Question: "${question}"
            Student's answer: "${answer}"`
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