import React, { useState } from 'react';
import FileInput from './components/FileInput';
import DiffViewer from './components/DiffViewer';

function App() {
  const [text1, setText1] = useState('Original text here...');
  const [text2, setText2] = useState('Original modified text here...');
  const [diffMode, setDiffMode] = useState('chars'); // chars, words, lines

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem', minHeight: '100vh', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      <header style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', background: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          DiffMaster
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>Compare files and text with precision.</p>
      </header>

      <div className="split-view">
        <FileInput
          label="Original File"
          value={text1}
          onChange={setText1}
          onFileUpload={setText1}
        />
        <FileInput
          label="New File"
          value={text2}
          onChange={setText2}
          onFileUpload={setText2}
        />
      </div>

      <div className="controls" style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <button onClick={() => setDiffMode('chars')} style={{ opacity: diffMode === 'chars' ? 1 : 0.5 }}>Diff Chars</button>
        <button onClick={() => setDiffMode('words')} style={{ opacity: diffMode === 'words' ? 1 : 0.5 }}>Diff Words</button>
        <button onClick={() => setDiffMode('lines')} style={{ opacity: diffMode === 'lines' ? 1 : 0.5 }}>Diff Lines</button>
      </div>

      <div>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>Comparison Result</h2>
        <DiffViewer oldText={text1} newText={text2} mode={diffMode} />
      </div>
    </div>
  );
}

export default App;
