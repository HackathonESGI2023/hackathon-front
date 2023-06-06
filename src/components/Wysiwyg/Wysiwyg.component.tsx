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
import { Ref, useRef } from "react";
import colors from "@styles/_colors.module.scss";

interface WysiwygProps {
  width?: string;
}

const markdown = {
  bold: ["*", "*"],
  italic: ["_", "_"],
  underline: ["__", "__"],
  code: ["`", "`"],
  link: ["[", "](my_link)"],
};

export const Wysiwyg: React.FunctionComponent<WysiwygProps> = ({
  width = "50%",
}) => {
  const inputRef = useRef(null);

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
        // @ts-ignore
        input.value =
          currentValue.substring(0, start) +
          selectedText.substring(1, selectedText.length - 1) +
          currentValue.substring(end);
      } else {
        const modifiedText = `${markdownType[0]}${selectedText}${markdownType[1]}`;
        const newValue =
          currentValue.substring(0, start) +
          modifiedText +
          currentValue.substring(end);
        // @ts-ignore
        input.value = newValue;
      }
    }
  };

  return (
    <Card css={{ mw: width }}>
      <Card.Body>
        <Container>
          <Grid.Container justify="flex-start">
            <Button
              auto
              icon={<TextB size={32} color={colors.white} />}
              flat
              onPress={() => handleMarkdown(markdown.bold)}
            />
            <Spacer x={0.5} />
            <Button
              auto
              icon={<TextItalic size={32} color={colors.white} />}
              flat
              onPress={() => handleMarkdown(markdown.italic)}
            />
            <Spacer x={0.5} />
            <Button
              auto
              icon={<TextUnderline size={32} color={colors.white} />}
              flat
              onPress={() => handleMarkdown(markdown.underline)}
            />
            <Spacer x={0.5} />
            <Button
              auto
              icon={<Link size={32} color={colors.white} />}
              flat
              onPress={() => handleMarkdown(markdown.link)}
            />
            <Spacer x={0.5} />
            <Button
              auto
              icon={<BracketsCurly size={32} color={colors.white} />}
              flat
              onPress={() => handleMarkdown(markdown.code)}
            />
          </Grid.Container>
        </Container>
        <Spacer y={1} />
        <Textarea
          ref={inputRef}
          placeholder="Saisissez votre message..."
          aria-label="Saisissez votre message..."
          style={{
            height: "400px !important",
          }}
        />
      </Card.Body>
      <Card.Footer>
        <Button auto>Envoyer mon message</Button>
      </Card.Footer>
    </Card>
  );
};
