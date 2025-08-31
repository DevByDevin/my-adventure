import { getSupabaseClient } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';
import { createErrorResponse, createSuccessResponse } from '@/utils/response';
import { validateEmail } from '@/utils/validator';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    const emailError = validateEmail(email);
    if (emailError) {
      return createErrorResponse(emailError, 400);
    }

    const cleanEmail = email.trim().toLowerCase();

    const supabase = await getSupabaseClient();

    const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
    });

    if (error) {
      return createErrorResponse(
        error.message || 'Failed to send password reset email',
        400
      );
    }

    return createSuccessResponse(
      'Password reset email sent, please check your inbox',
      null,
      200
    );
  } catch (error) {
    return createErrorResponse('Internal server error', 500);
  }
}
