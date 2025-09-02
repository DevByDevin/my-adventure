'use client';

import { useState } from 'react';
import {
  UserIcon,
  GlobeAltIcon,
  PlayIcon,
  ArrowRightIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

// 模拟数据，后续会替换为真实的API调用
const mockCharacters = [
  {
    id: 1,
    name: 'Aria Shadowblade',
    level: 5,
    background: 'A mysterious rogue with a dark past...',
    totalPlayTime: 23,
    lastPlayedAt: '2024-01-15T10:30:00Z',
    status: 'active',
    attributes: { str: 8, agi: 16, wis: 12, cha: 14 },
    avatarUrl: null,
    color: '#3B82F6',
  },
  {
    id: 2,
    name: 'Thorin Ironfist',
    level: 8,
    background: 'A mighty warrior from the northern mountains...',
    totalPlayTime: 45,
    lastPlayedAt: '2024-01-14T15:45:00Z',
    status: 'active',
    attributes: { str: 16, agi: 10, wis: 8, cha: 6 },
    avatarUrl: null,
    color: '#EF4444',
  },
  {
    id: 3,
    name: 'Luna Stardust',
    level: 3,
    background: 'A young mage learning the ancient arts...',
    totalPlayTime: 12,
    lastPlayedAt: '2024-01-16T09:15:00Z',
    status: 'active',
    attributes: { str: 6, agi: 12, wis: 18, cha: 10 },
    avatarUrl: null,
    color: '#8B5CF6',
  },
];

const mockWorlds = [
  {
    id: 1,
    name: 'Mystic Realms',
    description: 'A world of magic and wonder where anything is possible...',
    type: 'fantasy',
    theme: 'medieval',
    difficulty: 'medium',
    currentPlayers: 3,
    maxPlayers: 8,
    averageRating: 4.5,
    totalPlayTime: 45,
    status: 'active',
    isOwner: true,
  },
  {
    id: 2,
    name: 'Cyberpunk 2077',
    description: 'A dystopian future where technology meets chaos...',
    type: 'rpg',
    theme: 'modern',
    difficulty: 'hard',
    currentPlayers: 5,
    maxPlayers: 6,
    averageRating: 4.2,
    totalPlayTime: 23,
    status: 'active',
    isOwner: false,
  },
  {
    id: 3,
    name: 'Lost in Space',
    description: 'Explore the vast unknown of deep space...',
    type: 'adventure',
    theme: 'sci-fi',
    difficulty: 'easy',
    currentPlayers: 2,
    maxPlayers: 4,
    averageRating: 4.8,
    totalPlayTime: 67,
    status: 'active',
    isOwner: true,
  },
];

export default function GameFlowSection() {
  const [selectedCharacter, setSelectedCharacter] = useState<
    (typeof mockCharacters)[0] | null
  >(null);
  const [selectedWorld, setSelectedWorld] = useState<
    (typeof mockWorlds)[0] | null
  >(null);

  const canStartGame = selectedCharacter && selectedWorld;

  const handleStartGame = () => {
    if (canStartGame) {
      // TODO: 实现进入游戏的逻辑
      console.log('Starting game with:', {
        character: selectedCharacter,
        world: selectedWorld,
      });
      alert(
        `Starting adventure with ${selectedCharacter?.name} in ${selectedWorld?.name}!`
      );
    }
  };

  const formatLastPlayed = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  return (
    <div className='space-y-8'>
      {/* 游戏流程标题 */}
      <div className='text-center relative'>
        <div className='absolute inset-0 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 opacity-10 rounded-full blur-3xl'></div>
        <h2 className='text-3xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-2 relative z-10'>
          ⚔️ Ready to Adventure? ⚔️
        </h2>
        <p className='text-gray-600 relative z-10'>
          Follow these steps to begin your epic journey
        </p>
      </div>

      {/* 步骤指示器 */}
      <div className='flex items-center justify-center space-x-8'>
        <div
          className={`flex items-center space-x-2 transition-all duration-300 ${
            selectedCharacter ? 'text-amber-600 scale-110' : 'text-gray-400'
          }`}
        >
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center border-2 shadow-lg transition-all duration-300 ${
              selectedCharacter
                ? 'border-amber-500 bg-gradient-to-br from-amber-100 to-orange-100 shadow-amber-200'
                : 'border-gray-300 bg-gradient-to-br from-gray-100 to-gray-50'
            }`}
          >
            {selectedCharacter ? (
              <CheckCircleIcon className='w-6 h-6 text-amber-600' />
            ) : (
              <span className='text-sm font-bold text-gray-600'>1</span>
            )}
          </div>
          <div className='flex flex-col'>
            <span className='font-semibold'>🎭 Choose Character</span>
            {selectedCharacter && (
              <span className='text-xs text-amber-600'>Click to change</span>
            )}
          </div>
        </div>

        <div className='relative'>
          <ArrowRightIcon className='w-8 h-8 text-amber-400' />
          <div className='absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full blur-sm opacity-30'></div>
        </div>

        <div
          className={`flex items-center space-x-2 transition-all duration-300 ${
            selectedWorld ? 'text-amber-600 scale-110' : 'text-gray-400'
          }`}
        >
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center border-2 shadow-lg transition-all duration-300 ${
              selectedWorld
                ? 'border-amber-500 bg-gradient-to-br from-amber-100 to-orange-100 shadow-amber-200'
                : 'border-gray-300 bg-gradient-to-br from-gray-100 to-gray-50'
            }`}
          >
            {selectedWorld ? (
              <CheckCircleIcon className='w-6 h-6 text-amber-600' />
            ) : (
              <span className='text-sm font-bold text-gray-600'>2</span>
            )}
          </div>
          <div className='flex flex-col'>
            <span className='font-semibold'>🌍 Choose World</span>
            {selectedWorld && (
              <span className='text-xs text-amber-600'>Click to change</span>
            )}
          </div>
        </div>

        <div className='relative'>
          <ArrowRightIcon className='w-8 h-8 text-amber-400' />
          <div className='absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full blur-sm opacity-30'></div>
        </div>

        <div
          className={`flex items-center space-x-2 transition-all duration-300 ${
            canStartGame ? 'text-amber-600 scale-110' : 'text-gray-400'
          }`}
        >
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center border-2 shadow-lg transition-all duration-300 ${
              canStartGame
                ? 'border-amber-500 bg-gradient-to-br from-amber-100 to-orange-100 shadow-amber-200'
                : 'border-gray-300 bg-gradient-to-br from-gray-100 to-gray-50'
            }`}
          >
            {canStartGame ? (
              <CheckCircleIcon className='w-6 h-6 text-amber-600' />
            ) : (
              <span className='text-sm font-bold text-gray-600'>3</span>
            )}
          </div>
          <span className='font-semibold'>⚡ Enter Game</span>
        </div>
      </div>

      {/* 选择区域 */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        {/* 角色选择 */}
        <div className='bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl shadow-lg border border-slate-200 overflow-hidden'>
          <div className='px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white'>
            <div className='flex items-center justify-between'>
              <h3 className='text-lg font-bold flex items-center gap-2'>
                🎭 Select Your Character
              </h3>
              <span className='text-sm bg-white/20 px-3 py-1 rounded-full font-medium'>
                {mockCharacters.length} characters
              </span>
            </div>
          </div>

          <div className='p-6'>
            {mockCharacters.length === 0 ? (
              <div className='text-center py-8'>
                <UserIcon className='mx-auto h-12 w-12 text-gray-400' />
                <h3 className='mt-2 text-sm font-medium text-gray-900'>
                  No characters yet
                </h3>
                <p className='mt-1 text-sm text-gray-500'>
                  Create your first character to get started.
                </p>
              </div>
            ) : (
              <div className='space-y-3'>
                {mockCharacters.map((character) => (
                  <div
                    key={character.id}
                    onClick={() => {
                      if (selectedCharacter?.id === character.id) {
                        setSelectedCharacter(null); // 取消选择
                      } else {
                        setSelectedCharacter(character); // 选择新角色
                      }
                    }}
                    className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                      selectedCharacter?.id === character.id
                        ? 'border-amber-500 bg-gradient-to-br from-amber-50 to-orange-50 shadow-amber-200 shadow-lg'
                        : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className='flex items-center space-x-3'>
                      <div
                        className='w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg border-2 border-white'
                        style={{ backgroundColor: character.color }}
                      >
                        {character.name.charAt(0)}
                      </div>
                      <div className='flex-1'>
                        <div className='flex items-center gap-2 mb-2'>
                          <h4 className='font-bold text-slate-800'>
                            {character.name}
                          </h4>
                          <span className='inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-sm'>
                            ⚔️ Level {character.level}
                          </span>
                        </div>
                        <p className='text-sm text-slate-600 line-clamp-2 mb-2'>
                          {character.background}
                        </p>
                        <div className='flex items-center gap-4 text-xs text-slate-500'>
                          <span className='flex items-center gap-1'>
                            <span className='w-2 h-2 bg-blue-500 rounded-full'></span>
                            {character.totalPlayTime}h played
                          </span>
                          <span className='flex items-center gap-1'>
                            <span className='w-2 h-2 bg-green-500 rounded-full'></span>
                            {formatLastPlayed(character.lastPlayedAt)}
                          </span>
                        </div>
                      </div>
                      {selectedCharacter?.id === character.id && (
                        <div className='flex flex-col items-center gap-1'>
                          <div className='flex items-center justify-center w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full shadow-lg'>
                            <CheckCircleIcon className='w-5 h-5 text-white' />
                          </div>
                          <span className='text-xs text-amber-600 font-medium'>
                            Click to unselect
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 世界选择 */}
        <div className='bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl shadow-lg border border-slate-200 overflow-hidden'>
          <div className='px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white'>
            <div className='flex items-center justify-between'>
              <h3 className='text-lg font-bold flex items-center gap-2'>
                🌍 Select Your World
              </h3>
              <span className='text-sm bg-white/20 px-3 py-1 rounded-full font-medium'>
                {mockWorlds.length} worlds
              </span>
            </div>
          </div>

          <div className='p-6'>
            {mockWorlds.length === 0 ? (
              <div className='text-center py-8'>
                <GlobeAltIcon className='mx-auto h-12 w-12 text-gray-400' />
                <h3 className='mt-2 text-sm font-medium text-gray-900'>
                  No worlds yet
                </h3>
                <p className='mt-1 text-sm text-gray-500'>
                  Create your first world to get started.
                </p>
              </div>
            ) : (
              <div className='space-y-3'>
                {mockWorlds.map((world) => (
                  <div
                    key={world.id}
                    onClick={() => {
                      if (selectedWorld?.id === world.id) {
                        setSelectedWorld(null); // 取消选择
                      } else {
                        setSelectedWorld(world); // 选择新世界
                      }
                    }}
                    className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                      selectedWorld?.id === world.id
                        ? 'border-emerald-500 bg-gradient-to-br from-emerald-50 to-teal-50 shadow-emerald-200 shadow-lg'
                        : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className='flex items-center space-x-3'>
                      <div className='w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg border-2 border-white'>
                        <GlobeAltIcon className='w-7 h-7 text-white' />
                      </div>
                      <div className='flex-1'>
                        <div className='flex items-center gap-2 mb-2'>
                          <h4 className='font-bold text-slate-800'>
                            {world.name}
                          </h4>
                          {world.isOwner && (
                            <span className='inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-sm'>
                              👑 Owner
                            </span>
                          )}
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold ${
                              world.difficulty === 'easy'
                                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                                : world.difficulty === 'medium'
                                ? 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white'
                                : 'bg-gradient-to-r from-red-500 to-pink-600 text-white'
                            } shadow-sm`}
                          >
                            {world.difficulty === 'easy'
                              ? '🟢'
                              : world.difficulty === 'medium'
                              ? '🟡'
                              : '🔴'}{' '}
                            {world.difficulty}
                          </span>
                        </div>
                        <p className='text-sm text-slate-600 line-clamp-2 mb-2'>
                          {world.description}
                        </p>
                        <div className='flex items-center gap-4 text-xs text-slate-500'>
                          <span className='flex items-center gap-1'>
                            <span className='w-2 h-2 bg-emerald-500 rounded-full'></span>
                            {world.currentPlayers}/{world.maxPlayers} players
                          </span>
                          <span className='flex items-center gap-1'>
                            <span className='w-2 h-2 bg-yellow-500 rounded-full'></span>
                            ⭐ {world.averageRating}
                          </span>
                        </div>
                      </div>
                      {selectedWorld?.id === world.id && (
                        <div className='flex flex-col items-center gap-1'>
                          <div className='flex items-center justify-center w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full shadow-lg'>
                            <CheckCircleIcon className='w-5 h-5 text-white' />
                          </div>
                          <span className='text-xs text-emerald-600 font-medium'>
                            Click to unselect
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 开始游戏按钮 */}
      <div className='text-center relative'>
        <div className='absolute inset-0 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 opacity-20 rounded-full blur-3xl'></div>
        <button
          onClick={handleStartGame}
          disabled={!canStartGame}
          className={`px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 transform relative z-10 ${
            canStartGame
              ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:via-orange-600 hover:to-red-600 text-white shadow-2xl hover:shadow-amber-500/50 hover:scale-110 border-2 border-amber-300'
              : 'bg-gradient-to-r from-slate-300 to-slate-400 text-slate-500 cursor-not-allowed border-2 border-slate-200'
          }`}
        >
          <div className='flex items-center justify-center space-x-3'>
            <div
              className={`p-2 rounded-full ${
                canStartGame ? 'bg-white/20' : 'bg-slate-200'
              }`}
            >
              <PlayIcon className='w-7 h-7' />
            </div>
            <span className='font-extrabold'>
              {canStartGame
                ? `🚀 Start Adventure with ${selectedCharacter?.name} in ${selectedWorld?.name} 🚀`
                : '🎯 Select Character and World to Begin 🎯'}
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}
