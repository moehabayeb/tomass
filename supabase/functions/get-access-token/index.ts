import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from '../_shared/cors.ts'

serve(async (req: Request) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const HEYGEN_API_KEY = Deno.env.get('HEYGEN_API_KEY')
    
    if (!HEYGEN_API_KEY) {
      throw new Error('HEYGEN_API_KEY is required')
    }

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
      throw new Error(`HeyGen API error: ${response.status} ${errorText}`)
    }

    const data = await response.json()
    
    if (data.code !== 100) {
      throw new Error(`HeyGen API error: ${data.message}`)
    }

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