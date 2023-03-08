import { useContext } from "react";
import { TemplateContext } from "../contexts/TemplateContext";

const useTemplate = () => {
  const context = useContext(TemplateContext);

  if (context === undefined) {
    throw new Error(
      "useTemplate must be used within a TemplateContextProvider"
    );
  }

  return context;
};

export default useTemplate;
