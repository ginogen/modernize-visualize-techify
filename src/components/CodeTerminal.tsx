
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

interface CodeSnippet {
  language: string;
  code: string[];
}

const CodeTerminal = () => {
  const [currentSnippetIndex, setCurrentSnippetIndex] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Collection of code snippets to display
  const codeSnippets: CodeSnippet[] = [
    {
      language: "python",
      code: [
        "import tensorflow as tf",
        "from tensorflow import keras",
        "",
        "# Load the dataset",
        "mnist = keras.datasets.mnist",
        "(x_train, y_train), (x_test, y_test) = mnist.load_data()",
        "x_train, x_test = x_train / 255.0, x_test / 255.0",
        "",
        "# Build the model",
        "model = keras.models.Sequential([",
        "  keras.layers.Flatten(input_shape=(28, 28)),",
        "  keras.layers.Dense(128, activation='relu'),",
        "  keras.layers.Dropout(0.2),",
        "  keras.layers.Dense(10)",
        "])"
      ]
    },
    {
      language: "javascript",
      code: [
        "import { useState, useEffect } from 'react';",
        "import { motion, AnimatePresence } from 'framer-motion';",
        "",
        "const AIComponent = () => {",
        "  const [data, setData] = useState([]);",
        "  const [loading, setLoading] = useState(true);",
        "",
        "  useEffect(() => {",
        "    async function fetchData() {",
        "      const response = await fetch('/api/ai/predictions');",
        "      const result = await response.json();",
        "      setData(result);",
        "      setLoading(false);",
        "    }",
        "    fetchData();",
        "  }, []);",
        "",
        "  return (",
        "    <div className=\"ai-container\">",
        "      {loading ? (",
        "        <div>Processing AI models...</div>",
        "      ) : (",
        "        <AnimatePresence>",
        "          {data.map((item) => (",
        "            <motion.div key={item.id} />",
        "          ))}",
        "        </AnimatePresence>",
        "      )}",
        "    </div>",
        "  );",
        "};"
      ]
    },
    {
      language: "typescript",
      code: [
        "interface AIModel<T> {",
        "  name: string;",
        "  version: string;",
        "  parameters: number;",
        "  predict(input: T): Promise<T>;",
        "}",
        "",
        "class TransformerModel implements AIModel<string> {",
        "  name: string;",
        "  version: string;",
        "  parameters: number;",
        "",
        "  constructor(name: string, version: string, parameters: number) {",
        "    this.name = name;",
        "    this.version = version;",
        "    this.parameters = parameters;",
        "  }",
        "",
        "  async predict(input: string): Promise<string> {",
        "    // Simulation of model inference",
        "    await new Promise(resolve => setTimeout(resolve, 100));",
        "    return `AI Response: ${input.length * this.parameters}`;",
        "  }",
        "}"
      ]
    }
  ];

  // Effect to type out one line at a time
  useEffect(() => {
    const currentSnippet = codeSnippets[currentSnippetIndex];
    
    if (currentLine < currentSnippet.code.length) {
      const timer = setTimeout(() => {
        setDisplayedLines(prev => [...prev, currentSnippet.code[currentLine]]);
        setCurrentLine(prev => prev + 1);
        
        // Auto-scroll to bottom
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
      }, 100); // Speed of typing
      
      return () => clearTimeout(timer);
    } else {
      // When finished with current snippet, move to next after a delay
      const timer = setTimeout(() => {
        setCurrentSnippetIndex((prev) => (prev + 1) % codeSnippets.length);
        setDisplayedLines([]);
        setCurrentLine(0);
      }, 3000); // Pause before moving to next snippet
      
      return () => clearTimeout(timer);
    }
  }, [currentLine, currentSnippetIndex, codeSnippets]);

  return (
    <motion.div 
      className="w-full max-w-3xl mx-auto mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px 0px" }}
    >
      <div className="bg-[#1e1e1e] rounded-lg overflow-hidden shadow-xl border border-white/10">
        {/* Terminal header */}
        <div className="bg-[#323233] p-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Terminal className="text-neonGreen w-5 h-5" />
            <span className="text-white/80 font-mono text-sm">
              {codeSnippets[currentSnippetIndex].language}.terminal
            </span>
          </div>
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
        </div>
        
        {/* Terminal content */}
        <div 
          ref={terminalRef}
          className="p-4 font-mono text-sm text-white/90 h-60 overflow-y-auto"
          style={{ backgroundColor: "#1e1e1e" }}
        >
          {displayedLines.map((line, index) => (
            <div key={index} className="min-h-[1.5em]">
              {line ? (
                <pre className="whitespace-pre-wrap break-words">
                  <code>{line}</code>
                </pre>
              ) : (
                <span>&nbsp;</span>
              )}
            </div>
          ))}
          <motion.span
            className="inline-block w-2 h-4 bg-neonGreen ml-1"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
          ></motion.span>
        </div>
      </div>
    </motion.div>
  );
};

export default CodeTerminal;
