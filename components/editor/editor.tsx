'use client'
import { cn } from '@/lib/utils'
import {
  BoldItalicUnderlineToggles,
  ChangeCodeMirrorLanguage,
  codeBlockPlugin,
  codeMirrorPlugin,
  CodeToggle,
  ConditionalContents,
  CreateLink,
  diffSourcePlugin,
  headingsPlugin,
  imagePlugin,
  InsertCodeBlock,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  ListsToggle,
  markdownShortcutPlugin,
  MDXEditor,
  quotePlugin,
  Separator,
  tablePlugin,
  toolbarPlugin,
  UndoRedo,
  type MDXEditorMethods,
  type MDXEditorProps
} from '@mdxeditor/editor'
import { basicDark } from 'cm6-theme-basic-dark'
import { useTheme } from 'next-themes'
import type { ForwardedRef, FunctionComponent } from 'react'

import '@mdxeditor/editor/style.css'
import './dark-editor.css'

interface EditorProps extends Omit<MDXEditorProps, 'markdown'> {
  editorRef: ForwardedRef<MDXEditorMethods> | null
  value: string
  fieldChange: (value: string) => void
}

const Editor: FunctionComponent<EditorProps> = ({
  value,
  editorRef,
  fieldChange,
  ...props
}) => {
  const { resolvedTheme } = useTheme()

  const themeExtension = resolvedTheme === 'dark' ? [basicDark] : []

  return (
    <MDXEditor
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        quotePlugin(),
        markdownShortcutPlugin(),
        tablePlugin(),
        imagePlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: '' }),
        codeMirrorPlugin({
          codeBlockLanguages: {
            css: 'css',
            txt: 'txt',
            sql: 'sql',
            html: 'html',
            sass: 'sass',
            scss: 'scss',
            bash: 'bash',
            json: 'json',
            js: 'javascript',
            ts: 'typescript',
            '': 'unspecified',
            tsx: 'TypeScript (React)',
            jsx: 'JavaScript (React)'
          },
          autoLoadLanguageSupport: true,
          codeMirrorExtensions: themeExtension
        }),
        diffSourcePlugin({ viewMode: 'rich-text', diffMarkdown: '' }),
        toolbarPlugin({
          toolbarContents: () => (
            <ConditionalContents
              options={[
                {
                  when: (editor) => editor?.editorType === 'codeblock',
                  contents: () => <ChangeCodeMirrorLanguage />
                },
                {
                  fallback: () => (
                    <>
                      <UndoRedo />
                      <Separator />

                      <BoldItalicUnderlineToggles />
                      <CodeToggle />
                      <Separator />

                      <ListsToggle />
                      <Separator />

                      <CreateLink />
                      <InsertImage />
                      <Separator />

                      <InsertTable />
                      <InsertThematicBreak />
                      <Separator />

                      <InsertCodeBlock />
                    </>
                  )
                }
              ]}
            />
          )
        })
      ]}
      {...props}
      className={cn(
        'background-light800_dark200 light-border-2 markdown-editor dark-editor grid w-full border',
        props.className
      )}
      key={resolvedTheme}
      markdown={value}
      onChange={fieldChange}
      ref={editorRef}
    />
  )
}

export default Editor
