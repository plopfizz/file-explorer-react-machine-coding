import "./App.css";
import React,{useState} from "react";
import FileExplorer from "./components/FileExplorer";
import { filesData } from "./config/data";
import useTraverseTree from "./hooks/useTraverseTree";

function App() {
  const [explorerData, setExplorerData] = useState(filesData);

  const { insertNode } = useTraverseTree();

  const handleInsertNode = (...args) => {
    const finalTree = insertNode(explorerData, ...args);
    setExplorerData(finalTree);
  };
  return (
    <>
    <div className="app">
      <FileExplorer files={explorerData} addNode={handleInsertNode}/>
    </div>
    </>
  );
}

export default App;
