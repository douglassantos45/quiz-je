import { ReactElement, ReactNode, useState } from 'react';

type RadioGroupProps = {
  children: ReactNode;
  labelText?: string;
};

export const RadioGroup = ({ labelText, children }: RadioGroupProps) => {
  return (
    <div className="w-full">
      {labelText && (
        <label className="block text-gray-600 mb-2">{labelText}</label>
      )}
      <div className="flex flex-col gap-3 justify-evenly">{children}</div>
    </div>
  );
};
