import {createClient} from '@supabase/supabase-js';

export const GET = async () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // anonでOK
  );

await supabase.from('user').select('id').limit(1);

return Response.json({message: 'Keep Alive Ping Received'}, {status: 200});

}