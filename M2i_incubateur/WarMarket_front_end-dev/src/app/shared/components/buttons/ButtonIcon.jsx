import React from "react";

const ButtonIcon = ({ item, color }) => {
  var clr = "";
  switch (color) {
    case "blue":
      clr = "text-blue-500 hover:bg-blue-200 hover:text-blue";
      break;
    case "red":
      clr = "text-red-500 hover:bg-red-200 hover:text-red";
      break;
    case "primary":
      clr = "text-primary-500 hover:bg-primary-200 hover:text-primary";
      break;
    case "secondary":
      clr = "text-secondary-500 hover:bg-secondary-200 hover:text-secondary";
      break;
    default:
      clr = "text-black hover:bg-gray-300 hover:text-black";
  }
  return (
    <div
      className={`flex items-center p-2 text-sm font-medium object-contain 
        px-2 rounded-md object-center ${clr}`}
    >
      <img className="h-9 sm:h-12 mr-10" src={item.image} alt="" />
      <div className=""><p className="font-bold">{item.name}</p></div>
    </div>
  );
};

export default ButtonIcon;
