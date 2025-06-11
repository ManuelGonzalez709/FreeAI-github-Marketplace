"use client"

import { useState } from "react"

export const FormattedText = ({ text }) => {
  const formatText = (input) => {
    const parts = []
    let currentIndex = 0
    let partKey = 0

    // Regex para encontrar código entre ``` y texto en negrita entre **
    const codeRegex = /```[\s\S]*?```/g
    const boldRegex = /\*\*(.*?)\*\*/g

    // Encontrar todas las coincidencias de código y negrita
    const codeMatches = Array.from(input.matchAll(codeRegex))
    const boldMatches = Array.from(input.matchAll(boldRegex))

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
            </span>
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
          </div>
        )
      } else if (match.type === "bold") {
        parts.push(
          <strong key={partKey++} className="font-bold text-gray-900">
            {match.innerContent}
          </strong>
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
          </span>
        )
      }
    }

    return parts
  }

  return <div className="prose prose-gray max-w-none">{formatText(text)}</div>
}