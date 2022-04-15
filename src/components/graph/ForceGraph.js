import React from "react";
import { runForceGraph } from "./forceGraphGenerator";
import styles from "./forceGraph.module.css";

export function ForceGraph({ linksData, nodesData, nodeHoverTooltip }) {
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    let destroyFn;

    if (containerRef.current) {
   let test = containerRef.current

    //   while (test.firstChild) {
    // test=test.firstChild.removeChild(test.firstChild);
    //   }
      const { destroy } = runForceGraph(containerRef.current, linksData, nodesData, nodeHoverTooltip);
      destroyFn = destroy;
      
    }

    return destroyFn;
  });

  

  return <div ref={containerRef} className={styles.container} />;
}