import React, { useMemo } from 'react';
import * as Diff from 'diff';

const DiffViewer = ({ oldText, newText, mode = 'lines' }) => {
    const diff = useMemo(() => {
        if (mode === 'chars') {
            return Diff.diffChars(oldText, newText);
        }
        if (mode === 'words') {
            return Diff.diffWords(oldText, newText);
        }
        return Diff.diffLines(oldText, newText);
    }, [oldText, newText, mode]);

    return (
        <div className="diff-container">
            <div className="diff-content">
                {diff.map((part, index) => {
                    const className = part.added
                        ? 'diff-added'
                        : part.removed
                            ? 'diff-removed'
                            : 'diff-unchanged';

                    return (
                        <span key={index} className={`diff-chunk ${className}`}>
                            {part.value}
                        </span>
                    );
                })}
            </div>
        </div>
    );
};

export default DiffViewer;
