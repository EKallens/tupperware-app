import React, { useRef, useEffect } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

type QuillEditorProps = {
    value: string
    onChange: (value: string) => void
}

export const QuillEditor: React.FC<QuillEditorProps> = ({ value, onChange }) => {
    const editorRef = useRef<HTMLDivElement | null>(null)
    const quillRef = useRef<Quill | null>(null)

    useEffect(() => {
        if (editorRef.current && !quillRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                theme: 'snow',
                modules: {
                    toolbar: [['bold'], [{ list: 'ordered' }, { list: 'bullet' }]]
                }
            })

            quillRef.current.root.innerHTML = value

            quillRef.current.on('text-change', () => {
                const newValue = quillRef.current?.root.innerHTML || ''
                if (newValue !== value) {
                    onChange(newValue)
                }
            })
        }
    }, [value, onChange])

    useEffect(() => {
        if (quillRef.current) {
            const currentContent = quillRef.current.root.innerHTML
            if (currentContent !== value) {
                quillRef.current.root.innerHTML = value
            }
        }
    }, [value])

    return <div ref={editorRef} className="border p-2" />
}
