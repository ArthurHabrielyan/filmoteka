import { useEffect, useState } from "react";

export const useKeyPress = (keyTarget) => {
  // eslint-disable-next-line no-unused-vars
  const [isKeyPressed, setIsKeyPressed] = useState(false);

  const downHandler = ({ key }) => {
    if (key === keyTarget) setIsKeyPressed(true);
  };

  const upHandler = ({ key }) => {
    if (key === keyTarget) setIsKeyPressed(false);
  };

  useEffect(() => {
    window.addEventListener("keydown", downHandler);

    return () => {
      window.addEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  });
};
