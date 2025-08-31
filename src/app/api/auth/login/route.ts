import { getSupabaseClient } from '@/lib/supabase';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';
import { createErrorResponse, createSuccessResponse } from '@/utils/response';
import { validateLoginInput, sanitizeInput } from '@/utils/validator';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const validation = validateLoginInput({ email, password });
    if (!validation.isValid) {
      return createErrorResponse(validation.errors[0], 400);
    }

    const { email: cleanEmail, password: cleanPassword } = sanitizeInput({
      email,
      password,
    });

    const supabase = await getSupabaseClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password: cleanPassword,
    });

    if (error) {
      return createErrorResponse(error.message, 401);
    }

    if (!data.user) {
      return createErrorResponse('Authentication failed', 401);
    }

    const user = await prisma.user.upsert({
      where: { email: data.user.email! },
      update: {},
      create: {
        email: data.user.email!,
      },
    });

    return createSuccessResponse(
      'Login successful',
      {
        user: {
          id: user.id,
          email: user.email,
        },
        session: data.session,
      },
      200
    );
  } catch (error) {
    return createErrorResponse('Internal server error', 500);
  }
}
