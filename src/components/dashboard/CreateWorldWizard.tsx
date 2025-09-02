'use client';

import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import {
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';

interface WorldFormData {
  name: string;
  description: string;
  type: string;
  theme: string;
  difficulty: string;
  maxPlayers: number;
  model: string;
  storyStyle: string;
  contentRating: string;
}

const initialFormData: WorldFormData = {
  name: '',
  description: '',
  type: 'adventure',
  theme: 'fantasy',
  difficulty: 'medium',
  maxPlayers: 50,
  model: 'gpt-4',
  storyStyle: 'immersive',
  contentRating: 'family',
};

const worldTypes = [
  { value: 'adventure', label: 'Adventure' },
  { value: 'rpg', label: 'RPG' },
  { value: 'mystery', label: 'Mystery' },
  { value: 'survival', label: 'Survival' },
];

const themes = [
  { value: 'fantasy', label: 'Fantasy' },
  { value: 'sci-fi', label: 'Science Fiction' },
  { value: 'medieval', label: 'Medieval' },
  { value: 'modern', label: 'Modern' },
  { value: 'post-apocalyptic', label: 'Post-Apocalyptic' },
];

const difficulties = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
];

const storyStyles = [
  { value: 'immersive', label: 'Immersive' },
  { value: 'casual', label: 'Casual' },
  { value: 'challenging', label: 'Challenging' },
];

const contentRatings = [
  { value: 'family', label: 'Family Friendly' },
  { value: 'teen', label: 'Teen' },
  { value: 'mature', label: 'Mature' },
];

interface CreateWorldWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateWorldWizard({
  isOpen,
  onClose,
}: CreateWorldWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<WorldFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 4;

  const handleInputChange = (
    field: keyof WorldFormData,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // TODO: 实现创建世界的API调用
      console.log('Creating world:', formData);

      // 模拟API调用延迟
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 成功后关闭wizard并重置表单
      onClose();
      setFormData(initialFormData);
      setCurrentStep(1);
    } catch (error) {
      console.error('Failed to create world:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      setFormData(initialFormData);
      setCurrentStep(1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                World Name *
              </label>
              <input
                type='text'
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Enter world name'
                required
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  handleInputChange('description', e.target.value)
                }
                rows={3}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Describe your world'
              />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  World Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  {worldTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Theme
                </label>
                <select
                  value={formData.theme}
                  onChange={(e) => handleInputChange('theme', e.target.value)}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  {themes.map((theme) => (
                    <option key={theme.value} value={theme.value}>
                      {theme.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Difficulty
                </label>
                <select
                  value={formData.difficulty}
                  onChange={(e) =>
                    handleInputChange('difficulty', e.target.value)
                  }
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  {difficulties.map((difficulty) => (
                    <option key={difficulty.value} value={difficulty.value}>
                      {difficulty.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Max Players
                </label>
                <input
                  type='number'
                  value={formData.maxPlayers}
                  onChange={(e) =>
                    handleInputChange('maxPlayers', parseInt(e.target.value))
                  }
                  min='1'
                  max='100'
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  AI Model
                </label>
                <select
                  value={formData.model}
                  onChange={(e) => handleInputChange('model', e.target.value)}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  <option value='gpt-4'>GPT-4</option>
                  <option value='gpt-3.5-turbo'>GPT-3.5 Turbo</option>
                  <option value='claude-3'>Claude-3</option>
                </select>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Story Style
                </label>
                <select
                  value={formData.storyStyle}
                  onChange={(e) =>
                    handleInputChange('storyStyle', e.target.value)
                  }
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  {storyStyles.map((style) => (
                    <option key={style.value} value={style.value}>
                      {style.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Content Rating
              </label>
              <select
                value={formData.contentRating}
                onChange={(e) =>
                  handleInputChange('contentRating', e.target.value)
                }
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              >
                {contentRatings.map((rating) => (
                  <option key={rating.value} value={rating.value}>
                    {rating.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        );

      case 4:
        return (
          <div className='space-y-4'>
            <div className='bg-gray-50 p-4 rounded-lg'>
              <h4 className='font-medium text-gray-900 mb-3'>
                Review Your World
              </h4>
              <div className='space-y-2 text-sm'>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Name:</span>
                  <span className='font-medium'>{formData.name}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Type:</span>
                  <span className='font-medium'>{formData.type}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Theme:</span>
                  <span className='font-medium'>{formData.theme}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Difficulty:</span>
                  <span className='font-medium'>{formData.difficulty}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Max Players:</span>
                  <span className='font-medium'>{formData.maxPlayers}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>AI Model:</span>
                  <span className='font-medium'>{formData.model}</span>
                </div>
              </div>
            </div>
            <p className='text-sm text-gray-600'>
              Are you ready to create this world? You can modify these settings
              later.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return 'Basic Information';
      case 2:
        return 'Game Settings';
      case 3:
        return 'AI Configuration';
      case 4:
        return 'Review & Create';
      default:
        return '';
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} className='relative z-50'>
      <div className='fixed inset-0 bg-black/30' aria-hidden='true' />

      <div className='fixed inset-0 flex items-center justify-center p-4'>
        <Dialog.Panel className='w-full max-w-2xl bg-white rounded-lg shadow-xl'>
          {/* Header */}
          <div className='flex items-center justify-between p-6 border-b border-gray-200'>
            <div>
              <Dialog.Title className='text-lg font-semibold text-gray-900'>
                Create New World
              </Dialog.Title>
              <p className='text-sm text-gray-600 mt-1'>
                Step {currentStep} of {totalSteps}: {getStepTitle()}
              </p>
            </div>
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className='text-gray-400 hover:text-gray-600 disabled:opacity-50'
            >
              <XMarkIcon className='h-6 w-6' />
            </button>
          </div>

          {/* Progress Bar */}
          <div className='px-6 py-4'>
            <div className='w-full bg-gray-200 rounded-full h-2'>
              <div
                className='bg-blue-600 h-2 rounded-full transition-all duration-300'
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Content */}
          <div className='px-6 py-4'>{renderStepContent()}</div>

          {/* Footer */}
          <div className='flex items-center justify-between p-6 border-t border-gray-200'>
            <button
              onClick={prevStep}
              disabled={currentStep === 1 || isSubmitting}
              className='flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              <ChevronLeftIcon className='h-4 w-4 mr-2' />
              Previous
            </button>

            <div className='flex gap-3'>
              {currentStep < totalSteps ? (
                <button
                  onClick={nextStep}
                  disabled={!formData.name.trim() || isSubmitting}
                  className='flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  Next
                  <ChevronRightIcon className='h-4 w-4 ml-2' />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className='flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {isSubmitting ? 'Creating...' : 'Create World'}
                </button>
              )}
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
