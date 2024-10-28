import React, { useState } from "react";

const FileExplorer = ({ files, addNode }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isFolderType, setIsFolderType] = useState(false);

  const toggleFolderDisplay = () => {
    setIsExpanded(!isExpanded);
    setIsCreating(false);
  };

  const startCreation = (e, isFolder) => {
    e.stopPropagation();
    setIsFolderType(isFolder);
    setIsCreating(true);
  };

  const handleNewItemCreation = (id, e) => {
    e.stopPropagation();
    if (e.key === "Enter" && inputValue.trim()) {
      addNode(id, inputValue, isFolderType);
      setInputValue("");
      setIsCreating(false);
    }
  };

  return files?.isFolder ? (
    <>
      <div
        className="folder"
        style={{ fontWeight: "bold" }}
        onClick={toggleFolderDisplay}
      >
        📁 {files.name}
        <div className="creation-controls">
          <button onClick={(e) => startCreation(e, true)}>+ Folder</button>
          <button onClick={(e) => startCreation(e, false)}>+ File</button>
        </div>
        {isCreating && (
          <input
            type="text"
            autoFocus
            value={inputValue}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => handleNewItemCreation(files.id, e)}
          />
        )}
      </div>
      <div
        style={{
          paddingLeft: "20px",
          display: isExpanded ? "block" : "none",
        }}
      >
        {files.items.map((file) => (
          <FileExplorer key={file.id} files={file} addNode={addNode} />
        ))}
      </div>
    </>
  ) : (
    <div style={{ paddingBottom: "10px" }}> 📄 {files.name}</div>
  );
};

export default FileExplorer;
