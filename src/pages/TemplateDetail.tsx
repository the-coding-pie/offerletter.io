import { useCallback, useEffect, useRef, useState } from "react";
import useModal from "../hooks/useModal";
import { ModalTypes } from "../types/enums";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { useReactToPrint } from "react-to-print";
import useTemplate from "../hooks/useTemplate";
import { useParams } from "react-router-dom";

const getAllPlaceholders = (value: string) => {
  const pattern = /<span\s+data-placeholder="([^"]+)"[^>]*>([^<]*)<\/span>/gi;
  const placeholders: any[] = [];

  let match;

  while ((match = pattern.exec(value)) !== null) {
    const placeholder = match[1];
    const textContent = match[2];

    if (placeholders.filter((p) => p.placeholder === placeholder).length <= 0) {
      placeholders.push({
        textContent: textContent,
        placeholder: placeholder,
      });
    }
  }

  return placeholders;
};

const replaceValue = ({
  newValue,
  placeholderName,
  prevValue,
}: {
  newValue: string;
  placeholderName: string;
  prevValue: string;
}) => {
  const pattern = new RegExp(
    `(\\<span\\s+data-placeholder="${placeholderName}"[^>]*\\>)[^<]*(\\</span\\>)`,
    "gi"
  );
  const newString = prevValue.replace(pattern, `$1${newValue}$2`);

  return newString;
};

const TemplateDetail = () => {
  const [value, setValue] = useState("");
  const { setTemplates, templates } = useTemplate();

  const { id } = useParams();

  const [textSelected, setTextSelected] = useState<{
    text: string;
    range: Range;
  } | null>(null);

  const ref = useRef(null);

  useEffect(() => {
    const template = templates.find((t) => t.id === id);

    if (template) {
      setValue(template.template);
    }
  }, [templates]);

  const handlePrint = useReactToPrint({
    content: () => ref.current,
  });

  const { showModal } = useModal();

  const handleBlur = useCallback(() => {
    setTextSelected(null);
  }, []);

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

  return (
    <div className="template flex-1 w-full px-28 py-8 pb-24 flex gap-x-8">
      <div className="left flex-1">
        <div className="w-full flex justify-end">
          <button
            onClick={() => {
              showModal({
                modalType: ModalTypes.PLACEHOLDER_MODAL,
                modalTitle: "Placeholder Name",
                modalProps: {
                  ...textSelected,
                  setValue,
                  myRef: ref,
                },
              });
            }}
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
          className="w-full h-full bg-white p-4 rounded border outline-none mb-6 resize-none"
        />

        <div className="buttons flex w-full items-center justify-center gap-x-4 pb-16">
          <button
            className="btn primary"
            disabled={!value}
            onClick={() => handlePrint()}
          >
            Save PDF
          </button>
          <button className="btn success" onClick={() => {}}>
            Update Template
          </button>
        </div>
      </div>
      <div className="placeholders min-w-[200px] max-w-[200px]">
        <h3 className="font-semibold mb-2">Placeholders</h3>

        <div className="placeholders">
          {getAllPlaceholders(value).map((p) => {
            return (
              <div
                key={p.placeholder}
                className="flex items-center gap-x-2 mb-2"
              >
                <div className="font-semibold min-w-[70px]">
                  {p.placeholder}
                </div>
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TemplateDetail;
