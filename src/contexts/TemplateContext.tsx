import { createContext, ReactNode, useCallback, useState } from "react";
import { ModalObj } from "../types/interfaces";

interface Props {
  children: ReactNode;
}

interface TemplateObj {
  id: string;
  name: string;
  template: string;
}

interface TemplateState {
  templates: TemplateObj[];
  setTemplates: React.Dispatch<React.SetStateAction<TemplateObj[]>>;
}

export const TemplateContext = createContext<TemplateState | undefined>(
  undefined
);

const TemplateContextProvider = ({ children }: Props) => {
  const [templates, setTemplates] = useState<TemplateObj[]>([
    {
      id: "1",
      name: "Offer Letter",
      template:
        "<span>Hi</span> <span data-placeholder='Name' class='placeholder'>Name</span> <br /> <br /> <p>We are pleased to offer you the <span data-placeholder='Position' class='placeholder'>Position</span> role, your CTC is Rs.<span data-placeholder='Salary' class='placeholder'>Salary</span> lakhs per year. <br /> <br /> <span>Thank you</span>",
    },
  ]);

  return (
    <TemplateContext.Provider
      value={{
        templates,
        setTemplates,
      }}
    >
      {children}
    </TemplateContext.Provider>
  );
};

export default TemplateContextProvider;
