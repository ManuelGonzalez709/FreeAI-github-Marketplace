"use client"
import { InlineMath, BlockMath } from "react-katex"

export const FormattedText = ({ text }) => {
  const formatText = (input) => {
    const parts = []
    let currentIndex = 0
    let partKey = 0

    // Regex para encontrar código entre ```, texto en negrita entre **, fórmulas LaTeX y encabezados ###
    const codeRegex = /```[\s\S]*?```/g
    const boldRegex = /\*\*(.*?)\*\*/g
    const blockMathRegex = /\\\[([\s\S]*?)\\\]/g // Para fórmulas en bloque \[ ... \]
    const inlineMathRegex = /\\$$([\s\S]*?)\\$$/g // Para fórmulas inline $$ ... $$
    const headingRegex = /^###\s+(.*?)$/gm // Para encabezados que comienzan con ###
    const headingRegex2 = /^####\s+(.*?)$/gm // Para encabezados que comienzan con ###

    // Encontrar todas las coincidencias
    const codeMatches = Array.from(input.matchAll(codeRegex))
    const boldMatches = Array.from(input.matchAll(boldRegex))
    const blockMathMatches = Array.from(input.matchAll(blockMathRegex))
    const inlineMathMatches = Array.from(input.matchAll(inlineMathRegex))
    const headingMatches = Array.from(input.matchAll(headingRegex))
    const headingMatches2 = Array.from(input.matchAll(headingRegex2))
    // Combinar y ordenar todas las coincidencias por posición
    const allMatches = [
      ...codeMatches.map((match) => ({
        type: "code",
        start: match.index,
        end: match.index + match[0].length,
        content: match[0],
        innerContent: match[0].replace(/```/g, "").trim(),
      })),
      ...boldMatches.map((match) => ({
        type: "bold",
        start: match.index,
        end: match.index + match[0].length,
        content: match[0],
        innerContent: match[1],
      })),
      ...blockMathMatches.map((match) => ({
        type: "blockMath",
        start: match.index,
        end: match.index + match[0].length,
        content: match[0],
        innerContent: match[1].trim(),
      })),
      ...inlineMathMatches.map((match) => ({
        type: "inlineMath",
        start: match.index,
        end: match.index + match[0].length,
        content: match[0],
        innerContent: match[1].trim(),
      })),
      ...headingMatches.map((match) => ({
        type: "heading",
        start: match.index,
        end: match.index + match[0].length,
        content: match[0],
        innerContent: match[1].trim(),
      })),
      ...headingMatches2.map((match) => ({
        type: "heading2",
        start: match.index,
        end: match.index + match[0].length,
        content: match[0],
        innerContent: match[1].trim(),
      })),
    ].sort((a, b) => a.start - b.start)

    // Procesar el texto
    for (const match of allMatches) {
      // Agregar texto antes de la coincidencia
      if (currentIndex < match.start) {
        const textBefore = input.slice(currentIndex, match.start)
        if (textBefore) {
          parts.push(
            <span key={partKey++} className="whitespace-pre-wrap">
              {textBefore}
            </span>,
          )
        }
      }

      // Agregar la coincidencia formateada
      if (match.type === "code") {
        parts.push(
          <div key={partKey++} className="my-4">
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <div className="bg-gray-800 px-4 py-2 text-sm text-gray-300 border-b border-gray-700">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span>Code</span>
                </div>
              </div>
              <pre className="p-4 text-sm text-gray-100 overflow-x-auto">
                <code>{match.innerContent}</code>
              </pre>
            </div>
          </div>,
        )
      } else if (match.type === "bold") {
        parts.push(
          <strong key={partKey++} className="font-bold text-gray-900">
            {match.innerContent}
          </strong>,
        )
      } else if (match.type === "blockMath") {
        parts.push(
          <div
            key={partKey++}
            className="my-2 flex justify-center"
            style={{
              contain: "layout",
              maxWidth: "100%",
              overflow: "auto",
            }}
          >
            <div
              className="bg-gray-50 p-6 rounded-lg border border-gray-200 max-w-full"
              style={{
                display: "inline-block",
                minWidth: "fit-content",
              }}
            >
              <BlockMath
                math={match.innerContent}
                renderError={(error) => <span className="text-red-500 text-sm">Error en fórmula: {error.message}</span>}
              />
            </div>
          </div>,
        )
      } else if (match.type === "inlineMath") {
        parts.push(
          <span
            key={partKey++}
            className="inline-block mx-1"
            style={{
              contain: "layout",
              verticalAlign: "baseline",
            }}
          >
            <InlineMath
              math={match.innerContent}
              renderError={(error) => <span className="text-red-500 text-xs">Error</span>}
            />
          </span>,
        )
      } else if (match.type === "heading") {
        parts.push(
          <div key={partKey++} className="my-1">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="text-300 font-bold text-gray-800">{match.innerContent}</h3>
            </div>
          </div>,
        )
      }
      else if (match.type === "heading2") {
        parts.push(
          <div key={partKey++} className="my-2">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800">{match.innerContent}</h3>
            </div>
          </div>,
        )
      }

      currentIndex = match.end
    }

    // Agregar texto restante
    if (currentIndex < input.length) {
      const remainingText = input.slice(currentIndex)
      if (remainingText) {
        parts.push(
          <span key={partKey++} className="whitespace-pre-wrap">
            {remainingText}
          </span>,
        )
      }
    }

    return parts
  }

  return (
    <div
      className="prose prose-gray max-w-none"
      style={{
        contain: "layout style",
        overflow: "hidden",
      }}
    >
      {formatText(text)}
    </div>
  )
}
