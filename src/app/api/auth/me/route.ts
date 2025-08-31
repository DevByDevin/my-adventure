import { getSupabaseClient } from '@/lib/supabase';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { createErrorResponse, createSuccessResponse } from '@/utils/response';

export async function GET() {
  try {
    const supabase = await getSupabaseClient();

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return createErrorResponse('No valid authentication session found', 401);
    }

    const dbUser = await prisma.user.findUnique({
      where: { email: user.email! },
    });

    if (!dbUser) {
      return createErrorResponse('User not found in database', 404);
    }

    const userData = {
      id: dbUser.id,
      email: dbUser.email,
      createdAt: dbUser.createdAt,
      language: dbUser.language,
      theme: dbUser.theme,
      timezone: dbUser.timezone,
      lastLoginAt: dbUser.lastLoginAt,
    };

    return createSuccessResponse(
      'User info retrieved successfully',
      userData,
      200
    );
  } catch (error) {
    return createErrorResponse('Internal server error', 500);
  }
}
