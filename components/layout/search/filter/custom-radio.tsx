interface CustomRadioProps {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
}

export default function CustomRadio({
  name,
  value,
  checked,
  onChange,
  disabled = false,
}: CustomRadioProps) {
  return (
    <div className="relative flex items-center justify-center w-[18px] h-[18px]">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="sr-only"
      />
      <div
        onClick={!disabled ? onChange : undefined}
        className={`w-[18px] h-[18px] rounded-full border-2 cursor-pointer transition-all flex items-center justify-center ${
          checked
            ? 'border-orange-500 bg-white dark:bg-gray-900'
            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-orange-400'}`}
      >
        {checked && (
          <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-in zoom-in-50 duration-150" />
        )}
      </div>
    </div>
  );
}
