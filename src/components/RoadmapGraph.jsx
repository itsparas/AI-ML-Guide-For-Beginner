import React, { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { phasesWithTopics } from "../utils/dataUtils";
import useProgressStore from "../store/useProgressStore";
import PhaseNode from "./PhaseNode";

const nodeTypes = { phaseNode: PhaseNode };

const RoadmapGraph = () => {
  const navigate = useNavigate();
  const { getPhaseProgress, getCurrentPhase } = useProgressStore();
  const currentPhaseIdx = getCurrentPhase(phasesWithTopics);

  // Build nodes in a zigzag pattern
  const initialNodes = useMemo(() => {
    return phasesWithTopics.map((phase, idx) => {
      const topicIds = phase.topics.map((t) => t.id);
      const progress = getPhaseProgress(topicIds);
      const isComplete = progress === 100;
      const isCurrent = idx === currentPhaseIdx;

      // Zigzag layout: alternate left and right
      const col = idx % 2 === 0 ? 0 : 320;
      const row = idx * 180;

      return {
        id: `phase-${phase.id}`,
        type: "phaseNode",
        position: { x: col, y: row },
        data: {
          phase,
          progress,
          isComplete,
          isCurrent,
          topicCount: phase.topics.length,
        },
      };
    });
  }, [currentPhaseIdx, getPhaseProgress]);

  // Build edges connecting phases sequentially
  const initialEdges = useMemo(() => {
    return phasesWithTopics.slice(0, -1).map((phase, idx) => ({
      id: `e-${phase.id}-${phase.id + 1}`,
      source: `phase-${phase.id}`,
      target: `phase-${phase.id + 1}`,
      type: "smoothstep",
      animated: idx === currentPhaseIdx,
      style: {
        stroke:
          idx < currentPhaseIdx
            ? "#10b981"
            : idx === currentPhaseIdx
              ? "#6366f1"
              : "#334155",
        strokeWidth: idx === currentPhaseIdx ? 3 : 2,
      },
    }));
  }, [currentPhaseIdx]);

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const onNodeClick = useCallback(
    (event, node) => {
      const phaseId = node.data.phase.id;
      navigate(`/phase/${phaseId}`);
    },
    [navigate],
  );

  return (
    <div className="w-full h-[700px] md:h-[800px] rounded-2xl overflow-hidden glass border border-white/5">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.3, maxZoom: 1 }}
        minZoom={0.3}
        maxZoom={1.5}
        attributionPosition="bottom-left"
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#334155" gap={20} size={1} />
        <Controls
          showInteractive={false}
          className="!bg-surface-800/80 !border-surface-700 !rounded-xl !shadow-lg [&>button]:!bg-surface-700 [&>button]:!border-surface-600 [&>button]:!text-surface-300 [&>button:hover]:!bg-surface-600"
        />
        <MiniMap
          nodeStrokeWidth={3}
          className="!bg-surface-800/80 !border-surface-700 !rounded-xl"
          maskColor="rgba(0, 0, 0, 0.5)"
          nodeColor={(n) => {
            if (n.data?.isComplete) return "#10b981";
            if (n.data?.isCurrent) return "#6366f1";
            return "#475569";
          }}
        />
      </ReactFlow>
    </div>
  );
};

export default RoadmapGraph;
