'use client';

import dynamic from 'next/dynamic';
import useSWR from 'swr';
import fetchModels from '../lib/fetchModels';

// Import react-select with SSR disabled
const Select = dynamic(() => import('react-select'), { ssr: false });

function ModelSelection() {
  const { data: models, isLoading } = useSWR('models', fetchModels);
  const { data: model, mutate: setModel } = useSWR('model', {
    fallbackData: 'gpt-3.5-turbo',
  });

  return (
    <div className="mt-2">
      <Select
        className="h-10"
        defaultValue={model ? { label: model, value: model } : null}
        isSearchable
        isLoading={isLoading}
        menuPosition="fixed"
        styles={{
          control: (provided) => ({
            ...provided,
            backgroundColor: '#1E293B',
            borderColor: '#434654',
            borderRadius: '6px',
            color: '#E5E7EB',
          }),
          menu: (provided) => ({
            ...provided,
            backgroundColor: '#111827',
            borderRadius: '6px',
            border: '1px solid #6366f1',
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected
              ? '#6366f1' // ✅ Highlight selected option
              : state.isFocused
              ? '#374151' // ✅ Light hover effect
              : '#1E293B',
            color: '#E5E7EB',
            padding: '8px',
          }),
          singleValue: (provided) => ({
            ...provided,
            color: '#E5E7EB', // ✅ Ensures selected value is white
          }),
        }}
        placeholder={model || 'Select Model'}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange={(selectedOption: any) => {
          if (selectedOption) {
            setModel(selectedOption.value); // ✅ Properly typed
          }
        }}
        options={models?.modelOptions || []}
      />
    </div>
  );
}

export default ModelSelection;
