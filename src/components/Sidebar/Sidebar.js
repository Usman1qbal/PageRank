/*eslint-disable*/
import React, { useState } from "react";

import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";

export default function Sidebar({
  nodeList,
  setNodeList,
  edgeList,
  setEdgeList,
  ...props
}) {
  const [nodeValue, setNodeValue] = useState("");
  const [source, setSource] = useState("");
  const [target, setTarget] = useState("");
  const [weightage, setWeightage] = useState("");

  const DropDown = (props) => (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-standard-label">
        {props.label}
      </InputLabel>
      <Select {...props} style={{ width: "12rem", height: "3rem" }}>
        <MenuItem value="">none</MenuItem>
        {nodeList.map((node) => (
          <MenuItem value={node}>{node}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          <p className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0">
            Web Page Ranker
          </p>

          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded "
            }
          >
            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Add Node
            </h6>
            <div className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <div className="inline-flex">
                <TextField
                  id="outlined"
                  type="input"
                  value={nodeValue}
                  onChange={(e) => {
                    setNodeValue((e.target.value).toUpperCase());
                  }}
                />
              </div>
              <div
                className="relative w-full px-4 max-w-full flex-grow flex-1 text-right"
                style={{ paddingTop: "10px" }}
              >
                <button
                  className={`${
                    nodeValue
                      ? "bg-indigo-500 active:bg-indigo-600"
                      : "bg-lightBlue-500"
                  } text-white  text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                  type="button"
                  disabled={nodeValue ? "" : "disabled"}
                  onClick={() => {
                    nodeList.includes(nodeValue)
                      ? alert("Node Already exist")
                      : setNodeList([...nodeList, nodeValue]);
                    setNodeValue("");
                  }}
                >
                  Add
                </button>
              </div>
            </div>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Add Edge
            </h6>

            <div className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <div className="inline-flex">
                <DropDown
                  label="Source"
                  value={source}
                  onChange={(e) => {
                    setSource(e.target.value);
                  }}
                />
              </div>
              <div className="inline-flex">
                <DropDown
                  label="Target"
                  value={target}
                  onChange={(e) => {
                    setTarget(e.target.value);
                  }}
                />
              </div>
              <div className="inline-flex" style={{ paddingTop: "1rem" }}>
                <TextField
                  id="outlined"
                  label="Weight"
                  type="input"
                  value={weightage}
                  onChange={(e) => {
                    setWeightage(e.target.value);
                  }}
                />
              </div>
              <div
                className="relative w-full px-4 max-w-full flex-grow flex-1 text-right"
                style={{ paddingTop: "10px" }}
              >
                <button
                  className={`${
                    source && target && weightage
                      ? "bg-indigo-500 active:bg-indigo-600"
                      : "bg-lightBlue-500"
                  } text-white  text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                  type="button"
                  disabled={source && target && weightage ? "" : "disabled"}
                  onClick={() => {
                    let indexFind =
                      edgeList &&
                      edgeList.findIndex((edge) => {
                        return edge.source === source && edge.target === target;
                      });

                    if (indexFind > -1) {
                      alert("Edge already Exist");
                    } else if (
                      indexFind === -1 &&
                      source !== "" &&
                      target !== "" &&
                      weightage !== ""
                    ) {
                      let obj = {
                        source: source,
                        target: target,
                        weight: weightage,
                      };
                      setEdgeList([...edgeList, obj]);
                      setSource("");
                      setTarget("");
                      setWeightage("");
                    } else {
                      alert("Please put valid entry");
                    }
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
