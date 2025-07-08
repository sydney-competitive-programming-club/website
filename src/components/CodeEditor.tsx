import React, { useRef } from 'react';
import Editor from '@monaco-editor/react';
import * as monaco from 'monaco-editor';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
  height?: string;
  theme?: string;
  readOnly?: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  language,
  height = '400px',
  theme = 'vs-dark',
  readOnly = false
}) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount = (editor: monaco.editor.IStandaloneCodeEditor, monaco: typeof import('monaco-editor')) => {
    editorRef.current = editor;
    
    // Configure editor options
    editor.updateOptions({
      minimap: { enabled: false },
      fontSize: 14,
      lineNumbers: 'on',
      roundedSelection: false,
      scrollBeyondLastLine: false,
      readOnly: readOnly,
      automaticLayout: true,
      tabSize: 2,
      insertSpaces: true,
      wordWrap: 'on',
      wrappingIndent: 'indent',
      folding: true,
      foldingStrategy: 'auto',
      showFoldingControls: 'always',
      unfoldOnClickAfterEndOfLine: false,
      bracketPairColorization: {
        enabled: true
      }
    });

    // Add custom key bindings
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      // Prevent default save behavior
      console.log('Save shortcut pressed');
    });

    // Focus the editor
    editor.focus();
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      onChange(value);
    }
  };

  // Map language names to Monaco Editor language identifiers
  const getMonacoLanguage = (lang: string): string => {
    switch (lang.toLowerCase()) {
      case 'javascript':
        return 'javascript';
      case 'python':
        return 'python';
      case 'java':
        return 'java';
      case 'cpp':
      case 'c++':
        return 'cpp';
      case 'c':
        return 'c';
      case 'typescript':
        return 'typescript';
      default:
        return 'plaintext';
    }
  };

  return (
    <div className="code-editor-container">
      <Editor
        height={height}
        language={getMonacoLanguage(language)}
        theme={theme}
        value={value}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        options={{
          selectOnLineNumbers: true,
          mouseWheelZoom: true,
          cursorBlinking: 'blink',
          cursorSmoothCaretAnimation: 'on',
          renderWhitespace: 'selection',
          renderControlCharacters: true,
          fontFamily: 'JetBrains Mono, Fira Code, Monaco, Consolas, "Courier New", monospace',
          fontLigatures: true,
          smoothScrolling: true,
          contextmenu: true,
          multiCursorMergeOverlapping: true,
          suggest: {
            showKeywords: true,
            showSnippets: true,
            showClasses: true,
            showFunctions: true,
            showVariables: true,
            showModules: true,
            showProperties: true,
            showValues: true,
            showMethods: true,
            showWords: true,
            showColors: true,
            showFiles: true,
            showReferences: true,
            showFolders: true,
            showTypeParameters: true,
            showIssues: true,
            showUsers: true,
            showStructs: true,
            showEvents: true,
            showOperators: true,
            showUnits: true,
            showConstants: true,
            showConstructors: true,
            showEnums: true,
            showInterfaces: true
          }
        }}
      />
    </div>
  );
};

export default CodeEditor;