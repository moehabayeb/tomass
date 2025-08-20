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

    console.log('Creating D-ID stream session...')
    
    // Build proper Basic auth from the raw API key
    const auth = 'Basic ' + btoa(`${DID_API_KEY}:`)
    
    // Create D-ID agent streaming session
    const response = await fetch('https://api.d-id.com/v1/agents/streams', {
      method: 'POST',
      headers: {
        'Authorization': auth,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agent_id: "v2_agt_ZthBshyK",
        client_key: "Z29vZ2xILW9hdXRoMnwxMTM5MTg0NTQ0NzE3Mz"
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
      hasOfferUrl: !!data.offer?.sdp_url,
      hasStreamingUrl: !!data.streaming_url
    })
    
    if (!data.id || !data.session_id) {
      const errorMsg = 'Invalid D-ID response structure'
      console.error('D-ID API error:', errorMsg, data)
      throw new Error(`D-ID API error: ${errorMsg}`)
    }

    console.log('Successfully created D-ID stream session')
    
    // Return exact URLs for WebRTC connection
    const id = data.id
    return new Response(JSON.stringify({
      sessionId: data.session_id || id,
      sdpUrl: `https://api.d-id.com/v1/streams/${id}/sdp`,
      talkUrl: `https://api.d-id.com/v1/streams/${id}/talks`,
      authHeader: auth
    }), {
      headers: { 
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Error in did-start-stream:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})