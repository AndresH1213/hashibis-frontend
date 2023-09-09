import { ChangeEvent } from 'react';

type Props = {
  type?: string;
  title: string;
  state: string;
  placeholder: string;
  isTextArea?: boolean;
  isRequired?: boolean;
  setState: (value: string | number) => void;
};

const FormField = ({
  type,
  title,
  state,
  placeholder,
  isTextArea,
  isRequired = false,
  setState,
}: Props) => {
  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    let value = type === 'number' ? Number(target.value) : target.value;
    setState(value);
  };

  const isCenter = type === 'number' ? ' text-center' : '';
  return (
    <div className="flexStart flex-col w-full gap-3">
      <label className="w-full text-gray-100">{title}</label>

      {isTextArea ? (
        <textarea
          placeholder={placeholder}
          value={state}
          className="form_field-input"
          onChange={(e) => setState(e.target.value)}
        />
      ) : (
        <input
          type={type || 'text'}
          placeholder={placeholder}
          required={isRequired}
          value={state}
          className={`form_field-input${isCenter}`}
          onChange={handleChange}
        />
      )}
    </div>
  );
};

export default FormField;
