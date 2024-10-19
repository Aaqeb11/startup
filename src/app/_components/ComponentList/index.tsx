/* eslint-disable no-console */
'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useDrag } from 'react-dnd'
import Image from 'next/image'
import payload from 'payload'

import { useBuildStore } from '../../../../store/useStore'

// import { fetchTools } from '@/lib/api'

interface Tool {
  id: string
  title: string
  type: string
  media?: {
    url?: string
  }
}

export const ComponentsList: React.FC = () => {
  const { tools, setTools } = useBuildStore()

  useEffect(() => {
    async function loadTools() {
      try {
        const response = await fetch('http://localhost:3000/api/tools')
        const data = await response.json()
        setTools(data)
      } catch (error) {
        console.error('Failed to load tools:', error)
      }
    }
    loadTools()
  }, [setTools])

  return (
    <div className="flex flex-wrap p-2 gap-2 pt-6 justify-center">
      {tools.map(tool => (
        <DraggableComponent key={tool.id} tool={tool} />
      ))}
    </div>
  )
}

const DraggableComponent: React.FC<{ tool: Tool }> = ({ tool }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'component',
    item: { type: 'tool', id: tool.id },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  drag(ref)

  return (
    <div
      ref={ref}
      className="flex flex-col lg:w-[10vw] w-[20vw] items-center p-4 shadow-lg border-[0.5px] border-black rounded-lg cursor-pointer"
    >
      {tool.media && tool.media.url ? (
        <Image src={tool.media.url} alt={tool.title} width={50} height={50} />
      ) : (
        <div className="w-[50px] h-[50px] bg-gray-200"></div>
      )}
      <p className="text-2xl">{tool.title}</p>
      {isDragging && <span>Dragging...</span>}
    </div>
  )
}
