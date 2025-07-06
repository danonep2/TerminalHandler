type TypeType = 'text' | 'text-area';

interface InputProps {
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  type?: TypeType;
  icon?: React.ReactNode
}
const Input = ({ value, onChange, label, placeholder, type, icon }: InputProps) => {
  switch (type) {
    case 'text-area':
      return (
        <div className="flex flex-col my-2 gap-1">
          <label>{label}</label>
          <textarea
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            className="border border-gray-300 rounded-md p-2 focus:outline-none resize-none
              [&::-webkit-scrollbar]:w-2
              [&::-webkit-scrollbar]:p-0.5
              [&::-webkit-scrollbar-track]:opacity-0
              [&::-webkit-scrollbar-thumb]:bg-gray-300
              [&::-webkit-scrollbar-thumb]:rounded-md"
          />
        </div>
      )

    default:
      return (<div className="flex flex-col my-2 gap-1">
        <label>{label}</label>

        <div className="flex p-2 justify-between items-center border border-gray-300 rounded-lg">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            className=" border-none focus:outline-none w-full mr-0.5"
            />
            {icon}
        </div>
      </div>)
  }
}

export default Input;
