import { useEffect, useState, Ref } from "react";

export function useSelectedText(inputRef: any) {
  const [selectedText, setSelectedText] = useState("");

  useEffect(() => {
    const handleSelectionChange = () => {
      const input = inputRef.current;
      if (input) {
        const start = input.selectionStart;
        const end = input.selectionEnd;
        const currentValue = input.value;
        const selected = currentValue.substring(start, end);
        setSelectedText(selected);
      }
    };

    const input = inputRef.current;
    if (input) {
      input.addEventListener("mouseup", handleSelectionChange);
      input.addEventListener("keyup", handleSelectionChange);
      input.addEventListener("blur", handleSelectionChange);
    }

    return () => {
      if (input) {
        input.removeEventListener("mouseup", handleSelectionChange);
        input.removeEventListener("keyup", handleSelectionChange);
        input.removeEventListener("blur", handleSelectionChange);
      }
    };
  }, [inputRef]);

  return selectedText;
}
