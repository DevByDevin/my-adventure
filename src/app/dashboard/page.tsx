'use client';

import { useState } from 'react';
import DashboardStats from '@/components/dashboard/DashboardStats';
import GameFlowSection from '@/components/dashboard/GameFlowSection';
import CreateWorldWizard from '@/components/dashboard/CreateWorldWizard';
import CreateCharacterWizard from '@/components/dashboard/CreateCharacterWizard';

export default function DashboardPage() {
  const [showCreateWorldWizard, setShowCreateWorldWizard] = useState(false);
  const [showCreateCharacterWizard, setShowCreateCharacterWizard] =
    useState(false);

  return (
    <div className='space-y-8'>
      {/* 页面标题 */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-4xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent'>
            ⚔️ Adventure Dashboard ⚔️
          </h1>
          <p className='text-gray-600 mt-2 text-lg'>
            Choose your character and world to begin your epic adventure
          </p>
        </div>
        <div className='flex gap-3'>
          <button
            onClick={() => setShowCreateCharacterWizard(true)}
            className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors'
          >
            Create Character
          </button>
          <button
            onClick={() => setShowCreateWorldWizard(true)}
            className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors'
          >
            Create World
          </button>
        </div>
      </div>

      {/* 统计卡片 */}
      <DashboardStats />

      {/* 游戏流程区域 */}
      <GameFlowSection />

      {/* Wizard组件 */}
      <CreateWorldWizard
        isOpen={showCreateWorldWizard}
        onClose={() => setShowCreateWorldWizard(false)}
      />
      <CreateCharacterWizard
        isOpen={showCreateCharacterWizard}
        onClose={() => setShowCreateCharacterWizard(false)}
      />
    </div>
  );
}
