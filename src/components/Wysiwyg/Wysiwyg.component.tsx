"use client";
import {
  Button,
  Card,
  Container,
  Grid,
  Spacer,
  Text,
  Textarea,
} from "@nextui-org/react";
import {
  BracketsCurly,
  Link,
  TextB,
  TextItalic,
  TextUnderline,
} from "@phosphor-icons/react";
import { Ref, Suspense, useEffect, useRef, useState } from "react";
import colors from "@styles/_colors.module.scss";
import { useSelectedText } from "src/hooks/input.hooks";

interface WysiwygProps {
  width?: string;
  textAreaHeight?: string;
  value: string;
  setValue: (value: string) => void;
  onSubmit: () => void;
}

const markdown = {
  bold: ["*", "*"],
  italic: ["_", "_"],
  underline: ["__", "__"],
  code: ["`", "`"],
  link: ["[", "](my_link)"],
};

export const Wysiwyg: React.FunctionComponent<WysiwygProps> = ({
  width,
  textAreaHeight,
  value,
  setValue,
  onSubmit,
}) => {
  const inputRef = useRef(null);
  const selectedText = useSelectedText(inputRef);

  const handleMarkdown = (markdownType: string[]) => {
    const input = inputRef.current as Ref<HTMLTextAreaElement>;
    if (input) {
      // @ts-ignore
      const start = input.selectionStart;
      // @ts-ignore
      const end = input.selectionEnd;
      // @ts-ignore
      const currentValue = input.value;
      const selectedText = currentValue.substring(start, end);
      // Check if the selected text is already wrapped in markdown
      if (
        selectedText.startsWith(markdownType[0]) &&
        selectedText.endsWith(markdownType[1])
      ) {
        const newValue =
          currentValue.substring(0, start) +
          selectedText.substring(1, selectedText.length - 1) +
          currentValue.substring(end);
        // @ts-ignore
        input.value = newValue;
        setValue(newValue);
      } else {
        const modifiedText = `${markdownType[0]}${selectedText}${markdownType[1]}`;
        const newValue =
          currentValue.substring(0, start) +
          modifiedText +
          currentValue.substring(end);
        // @ts-ignore
        input.value = newValue;
        setValue(newValue);
      }
    }
  };

  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [isCode, setIsCode] = useState(false);

  const checkMarkdown = (selectedText: string) => {
    // Remove spaces
    selectedText = selectedText.trim();
    if (
      selectedText.startsWith(markdown.bold[0]) &&
      selectedText.endsWith(markdown.bold[1])
    ) {
      setIsBold(true);
    } else {
      setIsBold(false);
    }
    if (
      selectedText.startsWith(markdown.italic[0]) &&
      selectedText.endsWith(markdown.italic[1])
    ) {
      setIsItalic(true);
    } else {
      setIsItalic(false);
    }
    if (
      selectedText.startsWith(markdown.underline[0]) &&
      selectedText.endsWith(markdown.underline[1])
    ) {
      setIsUnderline(true);
    } else {
      setIsUnderline(false);
    }
    if (
      selectedText.startsWith(markdown.link[0]) &&
      selectedText.endsWith(markdown.link[1])
    ) {
      setIsLink(true);
    } else {
      setIsLink(false);
    }
    if (
      selectedText.startsWith(markdown.code[0]) &&
      selectedText.endsWith(markdown.code[1])
    ) {
      setIsCode(true);
    } else {
      setIsCode(false);
    }
  };

  useEffect(() => {
    console.log(selectedText);
    checkMarkdown(selectedText);
  }, [selectedText]);

  return (
    <Card css={{ mw: width ?? "50%" }}>
      <Card.Body>
        <Grid.Container
          justify="flex-start"
          alignContent="center"
          direction="row"
        >
          <Grid xs={6} md={6}>
            <Text h3>Envoyer un message Slack</Text>
          </Grid>
          <Grid xs={6} md={6} alignItems="center" justify="flex-end">
            <Button
              auto
              icon={<TextB size={32} color={colors.white} />}
              flat
              onPress={() => handleMarkdown(markdown.bold)}
              shadow={isBold}
            />
            <Spacer x={0.5} />
            <Button
              auto
              icon={<TextItalic size={32} color={colors.white} />}
              flat
              onPress={() => handleMarkdown(markdown.italic)}
              shadow={isItalic}
            />
            <Spacer x={0.5} />
            <Button
              auto
              icon={<TextUnderline size={32} color={colors.white} />}
              flat
              onPress={() => handleMarkdown(markdown.underline)}
              shadow={isUnderline}
            />
            <Spacer x={0.5} />
            <Button
              auto
              icon={<Link size={32} color={colors.white} />}
              flat
              onPress={() => handleMarkdown(markdown.link)}
              shadow={isLink}
            />
            <Spacer x={0.5} />
            <Button
              auto
              icon={<BracketsCurly size={32} color={colors.white} />}
              flat
              onPress={() => handleMarkdown(markdown.code)}
              shadow={isCode}
            />
          </Grid>
        </Grid.Container>
        <Spacer y={1} />
        <Textarea
          ref={inputRef}
          placeholder="Saisissez votre message..."
          aria-label="Saisissez votre message..."
          size="xl"
          rows={10}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Card.Body>
      <Card.Footer>
        <Button auto onPress={onSubmit}>
          Envoyer mon message
        </Button>
      </Card.Footer>
    </Card>
  );
};
