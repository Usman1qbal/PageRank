import React, { useState } from "react";
import * as graph from "computation/Pagerank";
import MainScreen from "views/mainScreen";
import Sidebar from "components/Sidebar/Sidebar";
import { useEffect } from "react";

export default function App() {
  const [nodeList, setNodeList] = useState(["A", "B", "C", "D"]);

  const [graphNodeList, setGraphNodeList] = useState([]);
  const [edgeList, setEdgeList] = useState([
    { source: "A", target: "B", weight: "0.5" },
    { source: "C", target: "B", weight: "0.33" },
    { source: "A", target: "C", weight: "0.5" },
    { source: "C", target: "A", weight: "0.33" },
    { source: "D", target: "C", weight: "0.33" },
    { source: "B", target: "D", weight: "1" },
    { source: "C", target: "D", weight: "0.33" },
  ]);

  useEffect(() => {
    graph.reset();
    edgeList.forEach((edge) => {
      graph.link(edge.source, edge.target, edge.weight);
    });

    graph.rank(0.85, 0.000001, function (node, rank) {
      let foundNode = graphNodeList.some((nod) => nod.name === node);
      if (!foundNode) {
        let obj = {
          name: node,
          rank: rank,
        };
        setGraphNodeList((oldGraphNodeList) => [...oldGraphNodeList, obj]);
      } else {
        let newGraphNodeList = graphNodeList.map((edge) => {
          if (edge.name === node) {
            edge.rank = rank;
          }
          return edge;
        });
        setGraphNodeList(newGraphNodeList);
      }
    });
  }, [edgeList]);

  return (
    <>
      <Sidebar
        nodeList={nodeList}
        setNodeList={setNodeList}
        edgeList={edgeList}
        setEdgeList={setEdgeList}
      />
      <div className="relative md:ml-64 bg-blueGray-100">
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <MainScreen
            nodeList={nodeList}
            setNodeList={setNodeList}
            edgeList={edgeList}
            setEdgeList={setEdgeList}
            graphNodeList={graphNodeList}
          />
        </div>
      </div>
    </>
  );
}
