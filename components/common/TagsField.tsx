'use client';

import React, { ChangeEvent, useState } from 'react';

type Props = {
  type?: string;
  title: string;
  state: string[];
  placeholder: string;
  isTextArea?: boolean;
  setState: (value: string[]) => void;
};

const TagsField = ({ title, placeholder, state: tags, setState }: Props) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      event.preventDefault();
      const newTags: string[] = [...tags, inputValue.trim()];
      setState(newTags);
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setState(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="max-w-lg m-6">
      <div className="relative">
        <label className="w-full text-gray-100">{title}</label>
        <input
          className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyPress}
        />
        <div
          className={
            tags.length === 0 ? 'hidden' : 'absolute z-40 left-0 mt-2 w-full'
          }
        >
          <div className="py-1 text-sm bg-white rounded shadow-lg border border-gray-300">
            {tags.map((tag, index) => (
              <div
                key={`${tag}${index}`}
                className="flex items-center justify-between px-5 py-1"
              >
                <span className="font-semibold">{tag}</span>
                <span
                  className="w-6 h-6 text-black bg-blue-200 focus:outline-none cursor-pointer flexCenter"
                  onClick={() => removeTag(tag)}
                >
                  <svg
                    className="w-4 h-4 fill-current mx-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15.78 14.36a1 1 0 0 1-1.42 1.42l-2.82-2.83-2.83 2.83a1 1 0 1 1-1.42-1.42l2.83-2.82L7.3 8.7a1 1 0 0 1 1.42-1.42l2.83 2.83 2.82-2.83a1 1 0 0 1 1.42 1.42l-2.83 2.83 2.83 2.82z"
                    />
                  </svg>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagsField;
