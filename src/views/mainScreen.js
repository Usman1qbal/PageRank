import React from "react";
import { ForceGraph } from "../components/graph/ForceGraph";
// components

import EdgeListViewCard from "components/Cards/EdgeListViewCard.js";
import NodeViewCard from "components/Cards/NodeViewCard.js";

export default function MainScreen({
  nodeList,
  setNodeList,
  edgeList,
  setEdgeList,
  graphNodeList,
  ...props
}) {
  const removeNode = (node, nodeIndex) => {
    nodeList.splice(nodeIndex, 1);
    setNodeList(nodeList);
    let newEdgeList = edgeList.filter(
      (edge) => edge.source !== node && edge.target !== node
    );
    setEdgeList(newEdgeList);
  };

  const nodeHoverTooltip = React.useCallback((node) => {
    return `<div>${node.name}</div>`;
  }, []);

  return (
    <>
      <div className="flex flex-wrap" style={{paddingTop: "7.5rem"}}>
        {/* // graph going to be add here  */}
        <div className="w-full">
        {graphNodeList.length > 0 ?<ForceGraph linksData={edgeList} nodesData={graphNodeList} nodeHoverTooltip={nodeHoverTooltip} /> : <></>}
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <EdgeListViewCard edgeList={edgeList} setEdgeList={setEdgeList} />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <NodeViewCard
            nodeList={nodeList}
            setNodeList={setNodeList}
            removeNode={removeNode}
          />
        </div>
      </div>
    </>
  );
}
