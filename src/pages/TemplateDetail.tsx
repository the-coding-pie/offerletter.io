import { useCallback, useState } from "react";
import useModal from "../hooks/useModal";
import { ModalTypes } from "../types/enums";

const TemplateDetail = () => {
  const [value, setValue] = useState("");
  const [textSelected, setTextSelected] = useState("");

  const { showModal } = useModal();

  const handleBlur = useCallback(() => {
    setTextSelected("");
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
    },
    []
  );

  const handleSelect = useCallback(
    (e: any) => {
      const { selectionStart, selectionEnd } = e.target;
      const text = value.substring(selectionStart, selectionEnd);

      if (selectionStart !== selectionEnd) {
        // some content has been selected
        setTextSelected(text);
      } else {
        setTextSelected("");
      }
    },
    [value]
  );

  const createPlaceholder = useCallback((text: string) => {
    showModal({
      modalType: ModalTypes.PLACEHOLDER_MODAL,
    });
  }, []);

  return (
    <div className="template flex-1 w-full px-28 py-8 pb-24 flex gap-x-8">
      <div className="left flex-1">
        <div className="w-full flex justify-end">
          <button
            onClick={() => createPlaceholder(textSelected)}
            disabled={!textSelected}
            className="btn primary mb-2"
          >
            Make Placeholder
          </button>
        </div>
        <textarea
          onBlur={handleBlur}
          className="w-full h-full bg-white p-4 rounded border outline-none mb-6 resize-none"
          value={value}
          onChange={handleChange}
          onSelect={handleSelect}
        ></textarea>

        <div className="buttons flex w-full items-center justify-center gap-x-4">
          <button className="btn primary">Save PDF</button>
          <button className="btn success">Create Template</button>
        </div>
      </div>
      <div className="placeholders min-w-[200px] max-w-[200px]">
        <h3 className="font-semibold">Placeholders</h3>
      </div>
    </div>
  );
};

export default TemplateDetail;
