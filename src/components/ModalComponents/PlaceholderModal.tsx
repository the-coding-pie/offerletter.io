import React, { useCallback, useState } from "react";
import useModal from "../../hooks/useModal";

interface Props {
  text: string;
  range: Range;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  myRef: any;
}

const PlaceholderModal = ({ text, range, setValue, myRef }: Props) => {
  const [name, setName] = useState("");

  const { hideModal } = useModal();

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const selectedText = text;
      const span = document.createElement("span");
      span.setAttribute("data-placeholder", name);
      span.classList.add("placeholder");
      span.textContent = selectedText;

      range?.deleteContents();
      range?.insertNode(span);

      setValue(myRef?.current?.innerHTML);

      hideModal();
    },
    [text, range, setValue, name]
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
        Add
      </button>
    </form>
  );
};

export default PlaceholderModal;
