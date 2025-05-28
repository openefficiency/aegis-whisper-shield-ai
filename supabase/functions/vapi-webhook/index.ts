
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    if (req.method === 'POST') {
      const { type, transcript, summary, callId } = await req.json()
      
      console.log('VAPI Webhook received:', { type, callId })

      if (type === 'end-of-call-report' && (transcript || summary)) {
        // Generate unique report ID
        const timestamp = Date.now().toString().slice(-6)
        const random = Math.random().toString(36).substring(2, 6).toUpperCase()
        const reportId = `WR-${timestamp}-${random}`

        // Extract title and category from content
        const content = summary || transcript
        const title = extractTitle(content) || "Voice Complaint"
        const category = detectCategory(content) || "General"

        // Save complaint to database
        const { data: complaint, error } = await supabase
          .from('complaints')
          .insert({
            report_id: reportId,
            title: title,
            summary: content,
            category: category,
            status: 'open',
            company_subdomain: 'company'
          })
          .select()
          .single()

        if (error) {
          console.error('Error saving complaint:', error)
          throw error
        }

        console.log('Complaint saved:', complaint)

        return new Response(
          JSON.stringify({ 
            success: true, 
            reportId,
            message: `Report ${reportId} has been submitted successfully.`
          }),
          { 
            headers: { 
              ...corsHeaders, 
              'Content-Type': 'application/json' 
            } 
          }
        )
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Webhook processed' }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Webhook error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})

function extractTitle(text: string): string {
  // Simple title extraction - take first 50 characters or until first period
  const firstSentence = text.split('.')[0]
  return firstSentence.length > 50 ? firstSentence.substring(0, 50) + '...' : firstSentence
}

function detectCategory(text: string): string {
  const categories = {
    'Harassment': ['harassment', 'harass', 'discriminat', 'hostile', 'bullying'],
    'Financial Fraud': ['money', 'fraud', 'financial', 'accounting', 'budget', 'expense'],
    'Safety Violation': ['safety', 'dangerous', 'unsafe', 'injury', 'accident', 'hazard'],
    'Ethics Violation': ['ethics', 'unethical', 'corrupt', 'bribe', 'kickback']
  }

  const lowerText = text.toLowerCase()
  
  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some(keyword => lowerText.includes(keyword))) {
      return category
    }
  }
  
  return 'General'
}
