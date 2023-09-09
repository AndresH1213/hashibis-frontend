import Image from 'next/image';

type Props = {
  handleSubmit: () => Promise<void>;
  text?: string;
};

const ButtonSave = ({ handleSubmit, text = 'Save Information' }: Props) => {
  return (
    <button
      onClick={handleSubmit}
      data-tooltip-target="tooltip-button"
      className="p-0.5 w-1/2 max-w-[230px] mt-3 rounded-lg group bg-gradient-to-br from-green-50 to-green-100 group-hover:from-green-300 group-hover:to-green-100 focus:ring-4 focus:outline-none focus:ring-green-50"
      data-te-toggle="tooltip"
      data-te-placement="top"
      data-te-ripple-init
      data-te-ripple-color="light"
      title="Upload data"
    >
      <span className="flexBetween px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
        <Image src="/save.svg" alt="save icon" width={20} height={20} />
        {text}
      </span>
    </button>
  );
};

export default ButtonSave;
