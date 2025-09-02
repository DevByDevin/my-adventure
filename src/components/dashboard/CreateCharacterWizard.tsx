'use client';

import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import {
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';

interface CharacterFormData {
  name: string;
  background: string;
  avatarUrl: string;
  color: string;
  strength: number;
  agility: number;
  wisdom: number;
  charisma: number;
}

const initialFormData: CharacterFormData = {
  name: '',
  background: '',
  avatarUrl: '',
  color: '#3B82F6',
  strength: 5,
  agility: 5,
  wisdom: 5,
  charisma: 5,
};

const characterColors = [
  { value: '#3B82F6', label: 'Blue' },
  { value: '#EF4444', label: 'Red' },
  { value: '#10B981', label: 'Green' },
  { value: '#F59E0B', label: 'Yellow' },
  { value: '#8B5CF6', label: 'Purple' },
  { value: '#F97316', label: 'Orange' },
  { value: '#EC4899', label: 'Pink' },
  { value: '#6B7280', label: 'Gray' },
];

interface CreateCharacterWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateCharacterWizard({
  isOpen,
  onClose,
}: CreateCharacterWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<CharacterFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 3;
  const totalAttributePoints = 20;
  const usedPoints =
    formData.strength + formData.agility + formData.wisdom + formData.charisma;
  const remainingPoints = totalAttributePoints - usedPoints;

  const handleInputChange = (
    field: keyof CharacterFormData,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAttributeChange = (
    attribute: keyof Pick<
      CharacterFormData,
      'strength' | 'agility' | 'wisdom' | 'charisma'
    >,
    value: number
  ) => {
    if (value >= 1 && value <= 10) {
      const newValue = value;
      const currentValue = formData[attribute];
      const difference = newValue - currentValue;

      if (remainingPoints - difference >= 0) {
        setFormData((prev) => ({ ...prev, [attribute]: newValue }));
      }
    }
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
      // TODO: 实现创建角色的API调用
      console.log('Creating character:', formData);

      // 模拟API调用延迟
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 成功后关闭wizard并重置表单
      onClose();
      setFormData(initialFormData);
      setCurrentStep(1);
    } catch (error) {
      console.error('Failed to create character:', error);
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
                Character Name *
              </label>
              <input
                type='text'
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Enter character name'
                required
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Background Story
              </label>
              <textarea
                value={formData.background}
                onChange={(e) =>
                  handleInputChange('background', e.target.value)
                }
                rows={4}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder="Tell us about your character's background, personality, and motivations..."
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Avatar URL (optional)
              </label>
              <input
                type='url'
                value={formData.avatarUrl}
                onChange={(e) => handleInputChange('avatarUrl', e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='https://example.com/avatar.jpg'
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className='space-y-6'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Character Color
              </label>
              <div className='grid grid-cols-4 gap-3'>
                {characterColors.map((color) => (
                  <button
                    key={color.value}
                    type='button'
                    onClick={() => handleInputChange('color', color.value)}
                    className={`w-12 h-12 rounded-lg border-2 transition-all ${
                      formData.color === color.value
                        ? 'border-gray-900 scale-110'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.label}
                  />
                ))}
              </div>
            </div>

            <div>
              <div className='flex items-center justify-between mb-4'>
                <label className='block text-sm font-medium text-gray-700'>
                  Attributes
                </label>
                <div className='text-sm text-gray-600'>
                  Points:{' '}
                  <span
                    className={
                      remainingPoints >= 0 ? 'text-green-600' : 'text-red-600'
                    }
                  >
                    {remainingPoints}
                  </span>{' '}
                  / {totalAttributePoints}
                </div>
              </div>

              <div className='space-y-4'>
                {[
                  {
                    key: 'strength',
                    label: 'Strength',
                    description: 'Physical power and combat ability',
                  },
                  {
                    key: 'agility',
                    label: 'Agility',
                    description: 'Speed, reflexes, and stealth',
                  },
                  {
                    key: 'wisdom',
                    label: 'Wisdom',
                    description: 'Knowledge, intuition, and magic',
                  },
                  {
                    key: 'charisma',
                    label: 'Charisma',
                    description: 'Social skills and leadership',
                  },
                ].map((attr) => (
                  <div
                    key={attr.key}
                    className='flex items-center justify-between'
                  >
                    <div className='flex-1'>
                      <div className='flex items-center gap-2'>
                        <span className='text-sm font-medium text-gray-700'>
                          {attr.label}
                        </span>
                        <span className='text-xs text-gray-500'>
                          ({attr.description})
                        </span>
                      </div>
                    </div>
                    <div className='flex items-center gap-2'>
                      <button
                        type='button'
                        onClick={() =>
                          handleAttributeChange(
                            attr.key as keyof Pick<
                              CharacterFormData,
                              'strength' | 'agility' | 'wisdom' | 'charisma'
                            >,
                            formData[
                              attr.key as keyof Pick<
                                CharacterFormData,
                                'strength' | 'agility' | 'wisdom' | 'charisma'
                              >
                            ] - 1
                          )
                        }
                        disabled={
                          formData[
                            attr.key as keyof Pick<
                              CharacterFormData,
                              'strength' | 'agility' | 'wisdom' | 'charisma'
                            >
                          ] <= 1
                        }
                        className='w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
                      >
                        -
                      </button>
                      <span className='w-12 text-center font-medium text-gray-900'>
                        {
                          formData[
                            attr.key as keyof Pick<
                              CharacterFormData,
                              'strength' | 'agility' | 'wisdom' | 'charisma'
                            >
                          ]
                        }
                      </span>
                      <button
                        type='button'
                        onClick={() =>
                          handleAttributeChange(
                            attr.key as keyof Pick<
                              CharacterFormData,
                              'strength' | 'agility' | 'wisdom' | 'charisma'
                            >,
                            formData[
                              attr.key as keyof Pick<
                                CharacterFormData,
                                'strength' | 'agility' | 'wisdom' | 'charisma'
                              >
                            ] + 1
                          )
                        }
                        disabled={
                          formData[
                            attr.key as keyof Pick<
                              CharacterFormData,
                              'strength' | 'agility' | 'wisdom' | 'charisma'
                            >
                          ] >= 10 || remainingPoints <= 0
                        }
                        className='w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className='space-y-4'>
            <div className='bg-gray-50 p-4 rounded-lg'>
              <h4 className='font-medium text-gray-900 mb-3'>
                Review Your Character
              </h4>
              <div className='space-y-2 text-sm'>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Name:</span>
                  <span className='font-medium'>{formData.name}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Background:</span>
                  <span className='font-medium max-w-xs truncate'>
                    {formData.background || 'None'}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Color:</span>
                  <div className='flex items-center gap-2'>
                    <div
                      className='w-4 h-4 rounded-full border border-gray-300'
                      style={{ backgroundColor: formData.color }}
                    />
                    <span className='font-medium'>{formData.color}</span>
                  </div>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Attributes:</span>
                  <span className='font-medium'>
                    STR: {formData.strength}, AGI: {formData.agility}, WIS:{' '}
                    {formData.wisdom}, CHA: {formData.charisma}
                  </span>
                </div>
              </div>
            </div>
            <p className='text-sm text-gray-600'>
              Are you ready to create this character? You can modify these
              settings later.
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
        return 'Appearance & Attributes';
      case 3:
        return 'Review & Create';
      default:
        return '';
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.name.trim().length > 0;
      case 2:
        return remainingPoints === 0;
      default:
        return true;
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
                Create New Character
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
                className='bg-green-600 h-2 rounded-full transition-all duration-300'
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
                  disabled={!canProceed() || isSubmitting}
                  className='flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed'
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
                  {isSubmitting ? 'Creating...' : 'Create Character'}
                </button>
              )}
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
