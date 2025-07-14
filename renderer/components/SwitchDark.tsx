import { useEffect, useState } from "react";
import { MdOutlineWbSunny } from "react-icons/md";
import { BsFillMoonFill } from "react-icons/bs";

const SwitchDark = () => {
  const [isOn, setIsOn] = useState(false);

  const darkStorageKey = 'darkMode';

  useEffect(() => {
    const isDarkMode = localStorage.getItem(darkStorageKey) === 'true';
    setIsOn(isDarkMode);
  },[])

  useEffect(() => {
    localStorage.setItem(darkStorageKey, isOn.toString());

    const html = document.documentElement;
    if (isOn) {
      html.classList.add('dark');
      return;
    }

    html.classList.remove('dark');
  }, [isOn]);

  return (
    <div
      className="border border-gray-400 w-16 rounded-full flex flex-col p-1 cursor-pointer"
      title="Dark Mode"
      onClick={
        () => {
          setIsOn(!isOn);
        }
      }
    >
      <div
        className={`w-7 h-7 rounded-full trasition-all ease-in-out duration-300
          bg-white dark:bg-gray-700
          flex items-center justify-center
          ${isOn ? 'translate-x-7' : ''}
        `}
      >{
        isOn
        ? <BsFillMoonFill color="#fff" />
        : <MdOutlineWbSunny/>
      }
      </div>
    </div>
  );
}

export default SwitchDark;
