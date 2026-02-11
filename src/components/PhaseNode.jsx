import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import { FaCheckCircle } from "react-icons/fa";

const PhaseNode = memo(({ data }) => {
  const { phase, progress, isComplete, isCurrent, topicCount } = data;

  return (
    <div
      className={`relative group cursor-pointer transition-all duration-300 ${
        isCurrent ? "scale-105" : "hover:scale-105"
      }`}
      style={{ width: 280 }}
    >
      {/* Glow effect for current phase */}
      {isCurrent && (
        <div
          className="absolute -inset-1 rounded-2xl opacity-40 blur-md animate-pulse-slow"
          style={{
            background: `linear-gradient(135deg, ${phase.gradientFrom}, ${phase.gradientTo})`,
          }}
        />
      )}

      <div
        className={`relative rounded-2xl p-4 border transition-all duration-300 ${
          isComplete
            ? "bg-emerald-500/10 border-emerald-500/30"
            : isCurrent
              ? "bg-surface-800/95 border-primary-500/50"
              : "bg-surface-800/90 border-surface-700 hover:border-surface-500"
        }`}
        style={{
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-lg ${
              isComplete ? "bg-emerald-500" : ""
            }`}
            style={
              !isComplete
                ? {
                    background: `linear-gradient(135deg, ${phase.gradientFrom}, ${phase.gradientTo})`,
                  }
                : {}
            }
          >
            {isComplete ? <FaCheckCircle className="text-sm" /> : phase.id}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-xs truncate text-white">
                {phase.title}
              </h3>
              {isCurrent && (
                <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-primary-500/20 text-primary-400 font-bold flex-shrink-0 animate-pulse">
                  NOW
                </span>
              )}
            </div>
            <p className="text-[10px] text-surface-400">
              {topicCount} topics • ~{phase.estimatedWeeks}w
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-[10px] text-surface-500 line-clamp-2 mb-3">
          {phase.description}
        </p>

        {/* Progress bar */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-surface-700 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progress}%`,
                background: isComplete
                  ? "#10b981"
                  : `linear-gradient(90deg, ${phase.gradientFrom}, ${phase.gradientTo})`,
              }}
            />
          </div>
          <span className="text-[10px] font-medium text-surface-400">
            {progress}%
          </span>
        </div>

        {/* Difficulty badge */}
        <div className="mt-2 flex items-center justify-between">
          <span
            className={`text-[9px] px-2 py-0.5 rounded-full font-medium ${
              phase.difficulty === "beginner"
                ? "bg-emerald-400/10 text-emerald-400"
                : phase.difficulty === "intermediate"
                  ? "bg-amber-400/10 text-amber-400"
                  : phase.difficulty === "advanced"
                    ? "bg-red-400/10 text-red-400"
                    : "bg-surface-700 text-surface-400"
            }`}
          >
            {phase.difficulty}
          </span>
          <span className="text-[9px] text-surface-500 group-hover:text-primary-400 transition-colors">
            Click to explore →
          </span>
        </div>
      </div>

      {/* React Flow handles */}
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-surface-500 !w-2 !h-2 !border-surface-700"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-surface-500 !w-2 !h-2 !border-surface-700"
      />
    </div>
  );
});

PhaseNode.displayName = "PhaseNode";

export default PhaseNode;
