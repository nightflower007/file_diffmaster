import React, { useRef } from 'react';

const FileInput = ({ label, value, onChange, onFileUpload }) => {
    const fileInputRef = useRef(null);
    const textareaRef = useRef(null);
    const lineNumbersRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                onFileUpload(e.target.result);
            };
            reader.readAsText(file);
        }
    };

    const handleScroll = () => {
        if (textareaRef.current && lineNumbersRef.current) {
            lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
        }
    };

    const lineCount = value.split('\n').length;
    const lines = Array.from({ length: lineCount }, (_, i) => i + 1).join('\n');

    return (
        <div className="split-pane">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 className="pane-header">{label}</h3>
                <button
                    onClick={() => fileInputRef.current?.click()}
                    style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                >
                    Upload File
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                    accept=".txt,.md,.json,.js,.jsx,.css,.html"
                />
            </div>
            <div className="input-wrapper">
                <div className="line-numbers" ref={lineNumbersRef} aria-hidden="true">
                    <pre style={{ margin: 0, fontFamily: 'inherit' }}>{lines}</pre>
                </div>
                <textarea
                    ref={textareaRef}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onScroll={handleScroll}
                    placeholder="Paste text here or upload a file..."
                    rows={15}
                    spellCheck={false}
                />
            </div>
        </div>
    );
};

export default FileInput;
