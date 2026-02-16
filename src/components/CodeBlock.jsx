import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FaCopy, FaCheck } from "react-icons/fa";

const CodeBlock = ({ code, language = "javascript", title, explanation }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="rounded-xl overflow-hidden border border-white/5 bg-[#1a1b26]">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
        <div className="flex items-center gap-3">
          {/* Traffic light dots */}
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          {title && (
            <span className="text-xs text-surface-400 font-medium">
              {title}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-surface-500 uppercase font-mono tracking-wider">
            {language}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs text-surface-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-white/10"
            title="Copy code"
          >
            {copied ? (
              <>
                <FaCheck className="text-emerald-400" /> Copied!
              </>
            ) : (
              <>
                <FaCopy /> Copy
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code */}
      <SyntaxHighlighter
        language={language === "http" ? "markup" : language}
        style={oneDark}
        customStyle={{
          margin: 0,
          padding: "16px 20px",
          background: "transparent",
          fontSize: "0.85rem",
          lineHeight: "1.6",
        }}
        codeTagProps={{
          style: {
            fontFamily: "'Fira Code', 'JetBrains Mono', 'Consolas', monospace",
          },
        }}
        showLineNumbers={code.split("\n").length > 5}
        lineNumberStyle={{
          minWidth: "2.5em",
          color: "#4a5568",
          paddingRight: "1em",
        }}
        wrapLongLines
      >
        {code}
      </SyntaxHighlighter>

      {/* Explanation */}
      {explanation && (
        <div className="px-4 py-3 bg-violet-500/5 border-t border-white/5">
          <p className="text-xs text-surface-400 leading-relaxed">
            <span className="text-violet-400 font-semibold mr-1">💡</span>
            {explanation}
          </p>
        </div>
      )}
    </div>
  );
};

export default CodeBlock;
