-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "language" TEXT NOT NULL DEFAULT 'en',
    "theme" TEXT NOT NULL DEFAULT 'light',
    "timezone" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Preference" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "layout" TEXT DEFAULT 'comfortable',
    "fontSize" TEXT DEFAULT 'medium',
    "contrast" TEXT DEFAULT 'normal',
    "animations" TEXT DEFAULT 'enabled',
    "preferredDifficulty" TEXT DEFAULT 'medium',
    "gameSpeed" TEXT DEFAULT 'normal',
    "autoSaveInterval" INTEGER DEFAULT 10,
    "showHints" TEXT DEFAULT 'sometimes',
    "contentFilter" TEXT DEFAULT 'family',
    "violenceLevel" TEXT DEFAULT 'mild',
    "profanityFilter" BOOLEAN DEFAULT true,
    "preferredGenres" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "onlineStatus" TEXT DEFAULT 'visible',
    "friendRequests" TEXT DEFAULT 'approve_manually',
    "dataSharing" TEXT DEFAULT 'basic',
    "notifications" JSONB DEFAULT '{"email": true, "push": false, "inApp": true}',
    "subtitles" BOOLEAN DEFAULT false,
    "subtitleLanguage" TEXT DEFAULT 'auto',
    "keyboardShortcuts" BOOLEAN DEFAULT true,
    "graphicsQuality" TEXT DEFAULT 'medium',
    "frameRateLimit" TEXT DEFAULT '60',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Preference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Profile" (
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "public"."characters" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "background" TEXT,
    "avatarUrl" TEXT,
    "color" TEXT,
    "attributes" JSONB DEFAULT '{"str": 3, "wis": 7, "agi": 4, "cha": 6}',
    "progression" JSONB DEFAULT '{"level": 1, "experience": 0}',
    "status" TEXT NOT NULL DEFAULT 'active',
    "lastPlayedAt" TIMESTAMP(3),
    "totalPlayTime" INTEGER NOT NULL DEFAULT 0,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "characters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."worlds" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "worldConfig" JSONB DEFAULT '{"type": "adventure", "theme": "fantasy"}',
    "statusConfig" JSONB DEFAULT '{"status": "active", "isPublic": true, "isFeatured": false}',
    "gameSettings" JSONB DEFAULT '{"maxPlayers": 100, "currentPlayers": 0, "difficulty": "medium"}',
    "aiConfig" JSONB DEFAULT '{"model": "gpt-4", "storyStyle": "immersive", "contentRating": "family"}',
    "storyFrames" JSONB DEFAULT '[]',
    "keyLocations" JSONB DEFAULT '[]',
    "keyNpcs" JSONB DEFAULT '[]',
    "totalPlayTime" INTEGER NOT NULL DEFAULT 0,
    "totalSessions" INTEGER NOT NULL DEFAULT 0,
    "averageRating" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "ownerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastActiveAt" TIMESTAMP(3),

    CONSTRAINT "worlds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."world_legendary_items" (
    "id" TEXT NOT NULL,
    "worldId" TEXT,
    "itemId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "stats" JSONB,
    "description" TEXT,

    CONSTRAINT "world_legendary_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."player_sessions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "worldId" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTime" TIMESTAMP(3),
    "playTime" INTEGER NOT NULL DEFAULT 0,
    "sessionData" JSONB DEFAULT '{}',
    "characterStatus" JSONB DEFAULT '{"currentHp": 100, "maxHp": 100, "currentMp": 50, "maxMp": 50, "currentStamina": 100, "maxStamina": 100}',
    "inventory" JSONB DEFAULT '[]',
    "interactionLog" JSONB DEFAULT '[]',

    CONSTRAINT "player_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."legendary_item_collections" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "worldLegendaryItemId" TEXT NOT NULL,
    "collectedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "collectionNote" TEXT,

    CONSTRAINT "legendary_item_collections_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Preference_userId_key" ON "public"."Preference"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "characters_userId_name_key" ON "public"."characters"("userId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "worlds_name_key" ON "public"."worlds"("name");

-- CreateIndex
CREATE UNIQUE INDEX "world_legendary_items_worldId_itemId_key" ON "public"."world_legendary_items"("worldId", "itemId");

-- CreateIndex
CREATE UNIQUE INDEX "player_sessions_userId_worldId_characterId_key" ON "public"."player_sessions"("userId", "worldId", "characterId");

-- CreateIndex
CREATE UNIQUE INDEX "legendary_item_collections_userId_worldLegendaryItemId_key" ON "public"."legendary_item_collections"("userId", "worldLegendaryItemId");

-- AddForeignKey
ALTER TABLE "public"."Preference" ADD CONSTRAINT "Preference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."characters" ADD CONSTRAINT "characters_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."worlds" ADD CONSTRAINT "worlds_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."world_legendary_items" ADD CONSTRAINT "world_legendary_items_worldId_fkey" FOREIGN KEY ("worldId") REFERENCES "public"."worlds"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."player_sessions" ADD CONSTRAINT "player_sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."player_sessions" ADD CONSTRAINT "player_sessions_worldId_fkey" FOREIGN KEY ("worldId") REFERENCES "public"."worlds"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."player_sessions" ADD CONSTRAINT "player_sessions_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "public"."characters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."legendary_item_collections" ADD CONSTRAINT "legendary_item_collections_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."legendary_item_collections" ADD CONSTRAINT "legendary_item_collections_worldLegendaryItemId_fkey" FOREIGN KEY ("worldLegendaryItemId") REFERENCES "public"."world_legendary_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;
