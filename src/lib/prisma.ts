import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export interface UserWithRelations {
  id: string;
  email: string;
  createdAt: Date;
  lastLoginAt: Date | null;
  language: string;
  theme: string;
  timezone: string | null;
  preferences: any;
  profile: any;
}

export interface CreateUserData {
  id: string;
  email: string;
  createdAt: Date;
  language?: string;
  theme?: string;
  timezone?: string;
}

export interface UpdateUserData {
  email?: string;
  language?: string;
  theme?: string;
  timezone?: string;
}

export async function findUserById(
  id: string
): Promise<UserWithRelations | null> {
  try {
    return await prisma.user.findUnique({
      where: { id },
      include: {
        preferences: true,
        profile: true,
      },
    });
  } catch (error) {
    console.error('Error finding user by ID:', error);
    throw error;
  }
}

export async function findUserByEmail(
  email: string
): Promise<UserWithRelations | null> {
  try {
    return await prisma.user.findUnique({
      where: { email },
      include: {
        preferences: true,
        profile: true,
      },
    });
  } catch (error) {
    console.error('Error finding user by email:', error);
    throw error;
  }
}

export async function createUser(
  userData: CreateUserData
): Promise<UserWithRelations> {
  try {
    return await prisma.user.create({
      data: {
        id: userData.id,
        email: userData.email,
        createdAt: userData.createdAt,
        language: userData.language,
        theme: userData.theme,
        timezone: userData.timezone,
        lastLoginAt: new Date(),
        preferences: {
          create: {},
        },
        profile: {
          create: {},
        },
      },
      include: {
        preferences: true,
        profile: true,
      },
    });
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export async function updateUser(
  id: string,
  updateData: UpdateUserData
): Promise<UserWithRelations> {
  try {
    return await prisma.user.update({
      where: { id },
      data: updateData,
      include: {
        preferences: true,
        profile: true,
      },
    });
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

export async function updateLastLoginTime(id: string) {
  try {
    return await prisma.user.update({
      where: { id },
      data: {
        lastLoginAt: new Date(),
      },
    });
  } catch (error) {
    console.error('Error updating last login time:', error);
    throw error;
  }
}

export async function upsertUserOnLogin(
  id: string,
  email: string,
  createdAt: Date
): Promise<UserWithRelations> {
  try {
    return await prisma.user.upsert({
      where: { id },
      update: {
        lastLoginAt: new Date(),
        email,
      },
      create: {
        id,
        email,
        createdAt,
        lastLoginAt: new Date(),
        preferences: {
          create: {},
        },
        profile: {
          create: {},
        },
      },
      include: {
        preferences: true,
        profile: true,
      },
    });
  } catch (error) {
    console.error('Error upserting user on login:', error);
    throw error;
  }
}

export async function deleteUser(id: string) {
  try {
    return await prisma.user.delete({
      where: { id },
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

export async function getUserStats(id: string) {
  try {
    const [characterCount, sessionCount, worldCount] = await Promise.all([
      prisma.character.count({ where: { userId: id } }),
      prisma.playerSession.count({ where: { userId: id } }),
      prisma.world.count({ where: { ownerId: id } }),
    ]);

    return {
      characterCount,
      sessionCount,
      worldCount,
    };
  } catch (error) {
    console.error('Error getting user stats:', error);
    throw error;
  }
}
