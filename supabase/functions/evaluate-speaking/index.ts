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
            content: `You are an English speaking assessment AI. You will receive the EXACT verbatim transcript of what the user said, including any grammatical errors, incomplete sentences, or mispronunciations.

            Your task is to:
            1. Analyze the RAW transcript exactly as spoken (without correcting it in your mind)
            2. Evaluate it based on these 4 criteria, each scored out of 10:

            - Grammar (0-10 points): Evaluate verb tenses, articles, sentence structure, word order based on what was ACTUALLY said
            - Speaking Fluency (0-10 points): Assess speech flow, natural pace, hesitations, confidence from the transcript
            - Vocabulary (0-10 points): Range of vocabulary, word choice appropriateness, variety in what was said
            - Pronunciation/Clarity (0-10 points): Understandability, clarity (infer from transcript quality)
            
            Expected level: ${level}
            
            Scoring guidelines:
            - 9-10: Excellent, native-like proficiency
            - 7-8: Very good, minor issues
            - 5-6: Good, some noticeable issues
            - 3-4: Fair, significant room for improvement
            - 1-2: Needs much improvement
            
            IMPORTANT: If the transcript contains grammatical errors, reflect this in your grammar score. If it shows incomplete sentences or hesitations, reflect this in fluency. Do NOT assume what the user meant to say.

            3. Provide a corrected version ONLY if there are errors. If the speech was correct, do not provide corrections.
            
            Return a JSON response with:
            - grammarScore: number (0-10)
            - fluencyScore: number (0-10)
            - vocabularyScore: number (0-10)
            - pronunciationScore: number (0-10)
            - totalScore: number (sum of all 4 scores out of 40)
            - hasErrors: boolean (true if there were any errors)
            - correctedVersion: string (only if hasErrors is true, otherwise empty string)
            - feedback: string (encouraging sentence with specific improvements, max 20 words)`
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