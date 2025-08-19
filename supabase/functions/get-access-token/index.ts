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
    const DID_API_KEY = Deno.env.get('DID_API_KEY')
    
    if (!DID_API_KEY) {
      console.error('DID_API_KEY is missing')
      throw new Error('DID_API_KEY is required')
    }

    console.log('Creating D-ID access token...')
    
    // Generate access token from D-ID
    const response = await fetch('https://api.d-id.com/v1/streams', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${DID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source_url: "https://create-images-results.d-id.com/api_docs/assets/noelle.jpeg"
      })
    })

    console.log('D-ID API response status:', response.status)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('D-ID API error:', response.status, errorText)
      throw new Error(`D-ID API error: ${response.status} ${errorText}`)
    }

    const data = await response.json()
    console.log('D-ID API response:', { 
      hasId: !!data.id, 
      hasSessionId: !!data.session_id,
      hasStreamingUrl: !!data.streaming_url 
    })
    
    if (!data.id || !data.session_id) {
      const errorMsg = 'Invalid D-ID response structure'
      console.error('D-ID API error:', errorMsg, data)
      throw new Error(`D-ID API error: ${errorMsg}`)
    }

    console.log('Successfully created D-ID stream')
    
    return new Response(JSON.stringify({
      streamId: data.id,
      sessionId: data.session_id,
      streamingUrl: data.streaming_url || `https://api.d-id.com/v1/streams/${data.id}`
    }), {
      headers: { 
        ...corsHeaders,
        'Content-Type': 'application/json',
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