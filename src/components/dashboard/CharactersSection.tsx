'use client';

import { UserIcon, ClockIcon } from '@heroicons/react/24/outline';

// 模拟数据，后续会替换为真实的API调用
const mockCharacters = [
  {
    id: '1',
    name: 'Aria Shadowblade',
    background: 'A mysterious rogue with a dark past',
    level: 15,
    experience: 1250,
    totalPlayTime: 89,
    lastPlayedAt: '2024-01-15T10:30:00Z',
    status: 'active',
    attributes: { str: 8, agi: 16, wis: 12, cha: 14 },
  },
  {
    id: '2',
    name: 'Thorin Ironfist',
    background: 'A proud dwarf warrior from the mountains',
    level: 12,
    experience: 890,
    totalPlayTime: 67,
    lastPlayedAt: '2024-01-14T15:45:00Z',
    status: 'active',
    attributes: { str: 16, agi: 10, wis: 8, cha: 6 },
  },
  {
    id: '3',
    name: 'Luna Stardust',
    background: 'A wise elven mage with ancient knowledge',
    level: 18,
    experience: 2100,
    totalPlayTime: 134,
    lastPlayedAt: '2024-01-16T09:15:00Z',
    status: 'active',
    attributes: { str: 6, agi: 12, wis: 18, cha: 10 },
  },
];

export default function CharactersSection() {
  // TODO: 替换为真实的API调用
  // const { data: characters, isLoading } = useQuery({
  //   queryKey: ['user-characters'],
  //   queryFn: () => fetch('/api/characters/user').then(res => res.json())
  // });

  const characters = mockCharacters;

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
    <div className='bg-white rounded-lg shadow-sm border border-gray-200'>
      <div className='px-6 py-4 border-b border-gray-200'>
        <div className='flex items-center justify-between'>
          <h3 className='text-lg font-semibold text-gray-900'>My Characters</h3>
          <span className='text-sm text-gray-500'>
            {characters.length} characters
          </span>
        </div>
      </div>

      <div className='p-6'>
        {characters.length === 0 ? (
          <div className='text-center py-8'>
            <UserIcon className='mx-auto h-12 w-12 text-gray-400' />
            <h3 className='mt-2 text-sm font-medium text-gray-900'>
              No characters yet
            </h3>
            <p className='mt-1 text-sm text-gray-500'>
              Create your first character to begin your adventure.
            </p>
          </div>
        ) : (
          <div className='space-y-4'>
            {characters.map((character) => (
              <div
                key={character.id}
                className='border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors'
              >
                <div className='flex items-start justify-between'>
                  <div className='flex-1'>
                    <div className='flex items-center gap-2 mb-2'>
                      <h4 className='font-medium text-gray-900'>
                        {character.name}
                      </h4>
                      <span className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800'>
                        Level {character.level}
                      </span>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          character.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {character.status}
                      </span>
                    </div>
                    <p className='text-sm text-gray-600 mb-3'>
                      {character.background}
                    </p>

                    <div className='grid grid-cols-2 gap-4 mb-3'>
                      <div className='text-sm'>
                        <span className='text-gray-500'>Experience:</span>
                        <span className='ml-2 font-medium'>
                          {character.experience}
                        </span>
                      </div>
                      <div className='text-sm'>
                        <span className='text-gray-500'>Play Time:</span>
                        <span className='ml-2 font-medium'>
                          {character.totalPlayTime}h
                        </span>
                      </div>
                    </div>

                    <div className='flex items-center gap-4 text-sm text-gray-500'>
                      <div className='flex items-center gap-1'>
                        <ClockIcon className='h-4 w-4' />
                        <span>
                          Last played {formatLastPlayed(character.lastPlayedAt)}
                        </span>
                      </div>
                    </div>

                    <div className='mt-3 flex gap-2'>
                      <span className='text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded'>
                        STR: {character.attributes.str}
                      </span>
                      <span className='text-xs bg-green-100 text-green-800 px-2 py-1 rounded'>
                        AGI: {character.attributes.agi}
                      </span>
                      <span className='text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded'>
                        WIS: {character.attributes.wis}
                      </span>
                      <span className='text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded'>
                        CHA: {character.attributes.cha}
                      </span>
                    </div>
                  </div>

                  <div className='ml-4'>
                    <button className='text-blue-600 hover:text-blue-700 text-sm font-medium'>
                      Play
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
