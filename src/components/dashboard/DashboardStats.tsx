'use client';

import {
  GlobeAltIcon,
  UserIcon,
  ClockIcon,
  StarIcon,
} from '@heroicons/react/24/outline';

// 模拟数据，后续会替换为真实的API调用
const mockStats = {
  totalWorlds: 5,
  totalCharacters: 8,
  totalPlayTime: 127,
  averageRating: 4.2,
};

export default function DashboardStats() {
  // TODO: 替换为真实的API调用
  // const { data: stats, isLoading } = useQuery({
  //   queryKey: ['dashboard-stats'],
  //   queryFn: () => fetch('/api/dashboard/stats').then(res => res.json())
  // });

  const stats = mockStats;

  const statCards = [
    {
      name: 'Total Worlds',
      value: stats.totalWorlds,
      icon: GlobeAltIcon,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
    },
    {
      name: 'Total Characters',
      value: stats.totalCharacters,
      icon: UserIcon,
      color: 'bg-green-500',
      textColor: 'text-green-600',
    },
    {
      name: 'Total Play Time',
      value: `${stats.totalPlayTime}h`,
      icon: ClockIcon,
      color: 'bg-purple-500',
      textColor: 'text-purple-600',
    },
    {
      name: 'Average Rating',
      value: stats.averageRating,
      icon: StarIcon,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600',
    },
  ];

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
      {statCards.map((stat) => (
        <div
          key={stat.name}
          className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow'
        >
          <div className='flex items-center'>
            <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
              <stat.icon className={`h-6 w-6 ${stat.textColor}`} />
            </div>
            <div className='ml-4'>
              <p className='text-sm font-medium text-gray-600'>{stat.name}</p>
              <p className='text-2xl font-bold text-gray-900'>{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
