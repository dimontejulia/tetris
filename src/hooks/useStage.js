import { useState } from "react";
import { createStage } from "../gameHelpers";

export const useStage = () => {
  //props destructure
  const [stage, setStage] = useState(createStage());

  return [stage, setStage];
};
