"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export function RichTextEditor({
  id,
  value,
  disabled,
  language = "en",
  onChange,
}: {
  id: string;
  value: string;
  disabled: boolean;
  language?: "en" | "am";
  onChange: (value: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        link: false,
        codeBlock: false,
        code: false,
        horizontalRule: false,
      }),
    ],
    content: value,
    immediatelyRender: false,
    editable: !disabled,
    editorProps: {
      attributes: {
        id,
        lang: language,
        role: "textbox",
        "aria-multiline": "true",
        "aria-label": "Post content",
        class:
          "sermon-prose min-h-64 p-4 outline-none focus-visible:ring-2 focus-visible:ring-primary",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });
  useEffect(() => {
    editor?.setEditable(!disabled);
  }, [editor, disabled]);
  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <div
        role="toolbar"
        aria-label="Text formatting"
        className="flex flex-wrap gap-1 p-2 border-b border-border"
      >
        {[
          {
            label: "Bold",
            run: () => editor?.chain().focus().toggleBold().run(),
          },
          {
            label: "Italic",
            run: () => editor?.chain().focus().toggleItalic().run(),
          },
          {
            label: "Heading",
            run: () =>
              editor?.chain().focus().toggleHeading({ level: 2 }).run(),
          },
          {
            label: "Bullet list",
            run: () => editor?.chain().focus().toggleBulletList().run(),
          },
          {
            label: "Numbered list",
            run: () => editor?.chain().focus().toggleOrderedList().run(),
          },
          {
            label: "Quote",
            run: () => editor?.chain().focus().toggleBlockquote().run(),
          },
          { label: "Undo", run: () => editor?.chain().focus().undo().run() },
          { label: "Redo", run: () => editor?.chain().focus().redo().run() },
        ]
          .filter((action) => language !== "am" || action.label !== "Italic")
          .map((action) => (
            <Button
              key={action.label}
              type="button"
              variant="ghost"
              size="sm"
              disabled={disabled || !editor}
              onClick={action.run}
            >
              {action.label}
            </Button>
          ))}
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
