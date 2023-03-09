import { useCallback, useEffect, useRef, useState } from "react";
import useModal from "../hooks/useModal";
import { ModalTypes } from "../types/enums";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { useReactToPrint } from "react-to-print";
import { getAllPlaceholders, replaceValue } from "../helpers";
import { useNavigate } from "react-router";

const CreateTemplate = () => {
  const [value, setValue] = useState(``);

  const [textSelected, setTextSelected] = useState<{
    text: string;
    range: Range;
  } | null>(null);

  const ref = useRef<any>(null);
  const buttonRef = useRef<any>(null);

  const navigate = useNavigate();

  const handlePrint = useReactToPrint({
    content: () => ref.current,
  });

  const { showModal } = useModal();

  const handleChange = useCallback((e: ContentEditableEvent) => {
    setValue(e.target.value);
  }, []);

  const handleSelect = useCallback(
    (e: any) => {
      const selection = window.getSelection();

      if (
        selection?.type === "Range" &&
        selection?.focusNode?.parentElement?.closest("[data-placeholder]") ===
          null &&
        Array.from(
          selection
            ?.getRangeAt(0)
            ?.cloneContents()
            ?.querySelectorAll("span[data-placeholder]")
        )?.length <= 0 &&
        selection.toString() !== " "
      ) {
        setTextSelected((prevValue) => ({
          text: selection.toString(),
          range: window.getSelection()?.getRangeAt(0)!,
        }));
      } else {
        setTextSelected(null);
      }
    },
    [value]
  );

  const makePlaceholder = useCallback(() => {
    showModal({
      modalType: ModalTypes.PLACEHOLDER_MODAL,
      modalTitle: "Placeholder Name",
      modalProps: {
        ...textSelected,
        setValue,
        myRef: ref,
        setTextSelected,
      },
    });
  }, [textSelected, ref]);

  const createTemplate = useCallback(() => {
    showModal({
      modalTitle: "Create Template",
      modalType: ModalTypes.TEMPLATE_MODAL,
      modalProps: {
        value,
        navigate,
      },
    });
  }, [value]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      // check if the click is outside ref and not inside btnRef
      if (
        ref.current &&
        !ref.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setTextSelected(null);
      }
    };

    document.addEventListener("click", handler);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  useEffect(() => {
    ref?.current?.focus();
  }, [ref]);

  return (
    <div className="template flex-1 w-full px-28 py-8 pb-24 flex gap-x-8">
      <div className="left flex-1">
        <div className="w-full flex justify-end">
          <button
            ref={buttonRef}
            onClick={makePlaceholder}
            disabled={!textSelected}
            className="btn primary mb-2"
          >
            Make Placeholder
          </button>
        </div>

        <ContentEditable
          innerRef={ref}
          html={value}
          onChange={handleChange}
          onMouseUp={handleSelect}
          onTouchEnd={handleSelect}
          className="w-full max-h-[350px] min-h-[350px] overflow-y-auto bg-white p-4 rounded border outline-none mb-6 resize-none"
        />

        <div className="buttons flex w-full items-center justify-center gap-x-4 pb-16">
          <button
            className="btn primary"
            disabled={!value}
            onClick={handlePrint}
          >
            Save PDF
          </button>
          <button className="btn success" onClick={createTemplate}>
            Create Template
          </button>
        </div>
      </div>
      <div className="placeholders min-w-[200px] max-w-[200px]">
        <h3 className="font-semibold mb-2">Placeholders</h3>

        <div className="placeholders">
          <table className="table table-fixed w-full">
            <thead>
              <tr>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {getAllPlaceholders(value).map((p) => {
                return (
                  <tr key={p.placeholder}>
                    <td className="break-all pb-2 pr-4 font-semibold">
                      {p.placeholder}
                    </td>
                    <td className="pb-2">
                      <input
                        type="text"
                        className="outline-none px-2 py-1 border rounded"
                        value={p.textContent}
                        onChange={(e) =>
                          setValue((prevValue) =>
                            replaceValue({
                              newValue: e.target.value,
                              placeholderName: p.placeholder,
                              prevValue: prevValue,
                            })
                          )
                        }
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreateTemplate;
