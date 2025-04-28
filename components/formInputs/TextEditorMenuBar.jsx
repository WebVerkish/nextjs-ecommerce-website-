import {
    Code,
    ListOrdered,
    BoldIcon,
    ItalicIcon,
    Strikethrough,
  } from "lucide-react"; // Importing Lucid icons
  import { Editor } from "@tiptap/react";
  import { Redo, Undo } from "lucide-react"; // Redo and Undo icons from Lucid
  import { Underline } from "lucide-react"; // Underline icon from Lucid
  import { List } from "lucide-react"; // List icon from Lucid
  
  const Button = ({ onClick, isActive, disabled, children }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`p-2 ${isActive ? "bg-violet-500 text-white rounded-md" : ""}`}
    >
      {children}
    </button>
  );
  
  export default function TextEditorMenuBar({ editor }) {
    if (!editor) return null;
  
    const buttons = [
      {
        icon: <BoldIcon className="size-5 text-slate-800 dark:text-slate-100" />,
        onClick: () => editor.chain().focus().toggleBold().run(),
        isActive: editor.isActive("bold"),
      },
      {
        icon: <Underline className="size-5 text-slate-800 dark:text-slate-100" />,
        onClick: () => editor.chain().focus().toggleUnderline().run(),
        isActive: editor.isActive("underline"),
      },
      {
        icon: <ItalicIcon className="size-5 text-slate-800 dark:text-slate-100" />,
        onClick: () => editor.chain().focus().toggleItalic().run(),
        isActive: editor.isActive("italic"),
        disabled: !editor.can().chain().focus().toggleItalic().run(),
      },
      {
        icon: <Strikethrough className="size-5 text-slate-800 dark:text-slate-100"  />,
        onClick: () => editor.chain().focus().toggleStrike().run(),
        isActive: editor.isActive("strike"),
        disabled: !editor.can().chain().focus().toggleStrike().run(),
      },
      {
        icon: <Code className="size-5 text-slate-800 dark:text-slate-100" />,
        onClick: () => editor.chain().focus().toggleCode().run(),
        isActive: editor.isActive("code"),
        disabled: !editor.can().chain().focus().toggleCode().run(),
      },
      {
        icon: <List className="size-5 text-slate-800 dark:text-slate-100" />,
        onClick: () => editor.chain().focus().toggleBulletList().run(),
        isActive: editor.isActive("bulletList"),
      },
      {
        icon: <ListOrdered className="size-5 text-slate-800 dark:text-slate-100" />,
        onClick: () => editor.chain().focus().toggleOrderedList().run(),
        isActive: editor.isActive("orderedList"),
        disabled: !editor.can().chain().focus().toggleOrderedList().run(),
      },
      {
        icon: <Undo className="size-5 text-slate-800 dark:text-slate-100" />,
        onClick: () => editor.chain().focus().undo().run(),
        isActive: editor.isActive("undo"),
        disabled: !editor.can().chain().focus().undo().run(),
      },
      {
        icon: <Redo className="size-5 text-slate-800 dark:text-slate-100" />,
        onClick: () => editor.chain().focus().redo().run(),
        isActive: editor.isActive("redo"),
        disabled: !editor.can().chain().focus().redo().run(),
      },
    ];
  
    return (
      <div className="mb-2 flex space-x-2">
        {buttons.map(({ icon, onClick, isActive, disabled }, index) => (
          <Button
            key={index}
            onClick={onClick}
            isActive={isActive}
            disabled={disabled}
          >
            {icon}
          </Button>
        ))}
      </div>
    );
  }
  