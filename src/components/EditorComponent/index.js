import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';

const EditorComponent = ({ value, onChange, apiKey }) => {
    const editorRef = useRef(null);

    const handleInit = (evt, editor) => {
        editorRef.current = editor;
    };
    const editorInit = {
        height: 360,
        menubar: false,
        plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'code',
            'help',
            'wordcount',
        ],
        toolbar:
            'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        setup: (editor) => {
            editor.on('change', (e) => {
                const content = editor.getContent();
                const cleanContent = content.replace(/<\/?p[^>]*>/g, '');
                onChange(content);
            });
        },
    };
    return (
        <Editor
            apiKey="co561hel5ob9nlckqm7pmmpv8dqwb7mait3oz2i9q68v6igt"
            textareaName="description"
            onInit={handleInit}
            init={editorInit}
            value={value}
            onEditorChange={(content) => onChange(content)}
        />
    );
};

export default EditorComponent;
