type Props = {
  title: string;
  description: string;
  placeholder: string;
  state: string;
  setState: (value: string) => void;
};

const FormField = ({
  title,
  description,
  placeholder,
  state,
  setState,
}: Props) => {
  return (
    <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
      <div className="w-full md:w-1/2">
        <p className="text-md font-semibold truncate ">{title}</p>
        <p className="text-sm">{description}</p>
      </div>
      <div className="inline-flex items-center text-base font-semibold">
        <div className="relative z-0">
          <input
            type="text"
            id={title}
            onChange={(e) => setState(e.target.value)}
            value={state}
            className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder={placeholder}
          />
        </div>
      </div>
    </div>
  );
};

export default FormField;
