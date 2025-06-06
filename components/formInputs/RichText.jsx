import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextEditorMenuBar from "./TextEditorMenuBar";


export default function RichTextEditor({ onChange, initialContent }) {
  const editor = useEditor({
    extensions: [StarterKit, Underline ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        className: "min-h-[150px] cursor-text rounded-md border p-5 ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 "
      }
    },
    immediatelyRender: false
  });

  return (
    <div className="col-span-full ">
      <TextEditorMenuBar editor={editor} />
      <EditorContent editor={editor} className='' style={{ border: '2px solid #fff', borderRadius: '8px' }}/>
    </div>
  );
}
