import { nanoid } from "nanoid";

// get all placeholders to render on the right side
export const getAllPlaceholders = (value: string) => {
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

// replace placeholder with given value when you update placeholder by
// finding the span with data-placeholder=placeholderName
export const replaceValue = ({
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

// replace all span's text content with the placeholder's name
// used when creating or updating template
export function replaceSpanTextWithPlaceholder(htmlString: string): string {
  // Define a regular expression to match <span> elements with a data-placeholder attribute
  const regex = /(<span\s+data-placeholder="([^"]*)"[^>]*>)(.*?)(<\/span>)/gi;

  // Replace all matches of the regular expression with the data-placeholder attribute value
  const updatedHtmlString = htmlString.replace(
    regex,
    (
      _: string,
      openingTag: string,
      placeholder: string,
      text: string,
      closingTag: string
    ) => {
      return openingTag + placeholder + closingTag;
    }
  );

  // Return the updated HTML string
  return updatedHtmlString;
}

export const getId = () => {
  return nanoid();
};
