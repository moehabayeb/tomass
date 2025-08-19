import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const HEYGEN_API_KEY = Deno.env.get('HEYGEN_API_KEY')
    
    if (!HEYGEN_API_KEY) {
      console.error('HEYGEN_API_KEY is missing')
      throw new Error('HEYGEN_API_KEY is required')
    }

    console.log('Creating HeyGen access token...')
    
    // Generate access token from HeyGen
    const response = await fetch('https://api.heygen.com/v1/streaming.create_token', {
      method: 'POST',
      headers: {
        'X-Api-Key': HEYGEN_API_KEY,
        'Content-Type': 'application/json',
      }
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('HeyGen API error:', response.status, errorText)
      throw new Error(`HeyGen API error: ${response.status} ${errorText}`)
    }

    const data = await response.json()
    console.log('HeyGen API response:', { code: data.code, hasToken: !!data.data?.token })
    
    if (data.code !== 100) {
      console.error('HeyGen API error code:', data.code, data.message)
      throw new Error(`HeyGen API error: ${data.message}`)
    }

    if (!data.data?.token) {
      console.error('No token in HeyGen response')
      throw new Error('No token received from HeyGen')
    }

    console.log('Successfully created HeyGen access token')
    
    return new Response(data.data.token, {
      headers: { 
        ...corsHeaders,
        'Content-Type': 'text/plain',
      },
    })
  } catch (error) {
    console.error('Error in get-access-token:', error)
    return new Response(`Error: ${error.message}`, {
      status: 500,
      headers: corsHeaders,
    })
  }
})