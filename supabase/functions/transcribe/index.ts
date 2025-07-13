import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const formData = await req.formData()
    const audioFile = formData.get('audio') as File
    
    if (!audioFile) {
      throw new Error('No audio file provided')
    }

    console.log('Received audio file:', audioFile.name, audioFile.size, 'bytes')

    // Convert file to buffer for OpenAI
    const arrayBuffer = await audioFile.arrayBuffer()
    const audioBlob = new Blob([arrayBuffer], { type: 'audio/wav' })

    // Prepare form data for OpenAI
    const openAIFormData = new FormData()
    openAIFormData.append('file', audioBlob, audioFile.name || 'audio.webm')
    openAIFormData.append('model', 'whisper-1')
    openAIFormData.append('language', 'en') // Specify English for better accuracy
    openAIFormData.append('temperature', '0') // More deterministic results
    // Note: Removed response_format to get JSON response by default

    console.log('Sending to OpenAI Whisper...')

    // Send to OpenAI Whisper
    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
      },
      body: openAIFormData,
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('OpenAI API error:', errorText)
      throw new Error(`OpenAI API error: ${errorText}`)
    }

    const result = await response.json()
    console.log('Transcription result:', result.text)

    return new Response(
      JSON.stringify({ transcript: result.text }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in transcribe function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})