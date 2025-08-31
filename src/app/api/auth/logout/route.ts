import { getSupabaseClient } from '@/lib/supabase';
import { createSuccessResponse } from '@/utils/response';

export async function POST() {
  try {
    const supabase = await getSupabaseClient();

    await supabase.auth.signOut();

    return createSuccessResponse('Logout successful', null, 200);
  } catch (error) {
    return createSuccessResponse('Logout successful', null, 200);
  }
}
