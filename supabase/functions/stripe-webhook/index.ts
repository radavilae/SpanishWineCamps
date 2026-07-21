import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@14.21.0'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2023-10-16',
})

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const signature = req.headers.get('stripe-signature')
    const body = await req.text()
    
    console.log('Received webhook from Stripe')
    console.log('Signature present:', !!signature)
    
    // Verificar webhook signature
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')
    if (!webhookSecret) {
      console.error('STRIPE_WEBHOOK_SECRET not configured')
      return new Response(JSON.stringify({ error: 'Webhook secret not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    let event
    try {
      event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret)
      console.log('Webhook signature verified')
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message)
      return new Response(JSON.stringify({ error: 'Invalid signature' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    console.log('Event type:', event.type)

    // Manejar diferentes eventos de Stripe
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object
        console.log('Processing payment_intent.succeeded:', paymentIntent.id)
        
        const supabase = createClient(supabaseUrl, supabaseServiceKey)
        
        const { error } = await supabase
          .from('payments')
          .update({ status: 'succeeded' })
          .eq('stripe_payment_intent_id', paymentIntent.id)
        
        if (error) {
          console.error('Error updating payment status:', error)
        } else {
          console.log(`Payment ${paymentIntent.id} updated to succeeded`)
        }
        break
      }
      
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object
        console.log('Processing payment_intent.payment_failed:', paymentIntent.id)
        
        const supabase = createClient(supabaseUrl, supabaseServiceKey)
        
        const { error } = await supabase
          .from('payments')
          .update({ status: 'failed' })
          .eq('stripe_payment_intent_id', paymentIntent.id)
        
        if (error) {
          console.error('Error updating payment status:', error)
        } else {
          console.log(`Payment ${paymentIntent.id} updated to failed`)
        }
        break
      }
      
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Webhook error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
