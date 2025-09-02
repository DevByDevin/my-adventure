'use client';

import {
  GlobeAltIcon,
  UsersIcon,
  StarIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

// 模拟数据，后续会替换为真实的API调用
const mockWorlds = [
  {
    id: '1',
    name: 'Fantasy Kingdom',
    description: 'A magical realm filled with dragons and wizards',
    isOwner: true,
    currentPlayers: 12,
    maxPlayers: 50,
    averageRating: 4.5,
    totalPlayTime: 45,
    status: 'active',
  },
  {
    id: '2',
    name: 'Cyberpunk City',
    description: 'A futuristic metropolis with advanced technology',
    isOwner: false,
    currentPlayers: 8,
    maxPlayers: 30,
    averageRating: 4.2,
    totalPlayTime: 23,
    status: 'active',
  },
  {
    id: '3',
    name: 'Medieval Village',
    description: 'A peaceful village in the countryside',
    isOwner: true,
    currentPlayers: 5,
    maxPlayers: 25,
    averageRating: 4.8,
    totalPlayTime: 67,
    status: 'active',
  },
];

export default function WorldsSection() {
  // TODO: 替换为真实的API调用
  // const { data: worlds, isLoading } = useQuery({
  //   queryKey: ['user-worlds'],
  //   queryFn: () => fetch('/api/worlds/user').then(res => res.json())
  // });

  const worlds = mockWorlds;

  return (
    <div className='bg-white rounded-lg shadow-sm border border-gray-200'>
      <div className='px-6 py-4 border-b border-gray-200'>
        <div className='flex items-center justify-between'>
          <h3 className='text-lg font-semibold text-gray-900'>My Worlds</h3>
          <span className='text-sm text-gray-500'>{worlds.length} worlds</span>
        </div>
      </div>

      <div className='p-6'>
        {worlds.length === 0 ? (
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
          <div className='space-y-4'>
            {worlds.map((world) => (
              <div
                key={world.id}
                className='border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors'
              >
                <div className='flex items-start justify-between'>
                  <div className='flex-1'>
                    <div className='flex items-center gap-2 mb-2'>
                      <h4 className='font-medium text-gray-900'>
                        {world.name}
                      </h4>
                      {world.isOwner && (
                        <span className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800'>
                          Owner
                        </span>
                      )}
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          world.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {world.status}
                      </span>
                    </div>
                    <p className='text-sm text-gray-600 mb-3'>
                      {world.description}
                    </p>

                    <div className='flex items-center gap-4 text-sm text-gray-500'>
                      <div className='flex items-center gap-1'>
                        <UsersIcon className='h-4 w-4' />
                        <span>
                          {world.currentPlayers}/{world.maxPlayers}
                        </span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <StarIcon className='h-4 w-4' />
                        <span>{world.averageRating}</span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <ClockIcon className='h-4 w-4' />
                        <span>{world.totalPlayTime}h</span>
                      </div>
                    </div>
                  </div>

                  <div className='ml-4'>
                    <button className='text-blue-600 hover:text-blue-700 text-sm font-medium'>
                      {world.isOwner ? 'Manage' : 'Join'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
