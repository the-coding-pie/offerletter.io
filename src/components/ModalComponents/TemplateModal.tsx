import React, { useCallback, useState } from "react";
import useModal from "../../hooks/useModal";
import useTemplate from "../../hooks/useTemplate";
import { getId, replaceSpanTextWithPlaceholder } from "../../helpers";
import { NavigateFunction, useNavigate } from "react-router";
import { toast } from "react-toastify";

interface Props {
  value: string;
  navigate: NavigateFunction;
}

const TemplateModal = ({ value, navigate }: Props) => {
  const [name, setName] = useState("");

  const { hideModal } = useModal();

  const { setTemplates } = useTemplate();

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setTemplates((prevValue) => [
        ...prevValue,
        {
          id: getId(),
          name,
          template: replaceSpanTextWithPlaceholder(value),
        },
      ]);

      hideModal();

      toast("New template has been created", {
        type: "success",
      });

      navigate("/");
    },
    [value, name]
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="placeholder-modal w-96 flex items-center p-4"
    >
      <input
        type="text"
        required
        value={name}
        autoFocus
        className="w-full mr-2 px-4 py-2 rounded border outline-none"
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit" className="btn primary">
        Create
      </button>
    </form>
  );
};

export default TemplateModal;
