import 'jsr:@supabase/functions-js/edge-runtime.d.ts';

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

/** Membership checkout was removed — reject any leftover clients. */
Deno.serve((req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: cors });
  }
  return Response.json(
    { error: 'Membership is not available.' },
    { status: 410, headers: cors }
  );
});
