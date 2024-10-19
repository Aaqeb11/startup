/* eslint-disable no-console */
/* eslint-disable @next/next/no-img-element */
import { useRef } from 'react'
import { useDrop } from 'react-dnd'
import { FaRegImages, FaTrash } from 'react-icons/fa'

import { useBuildStore } from '../../../../store/useStore'

interface Tool {
  id: string
  title: string
  type: string
  media?: {
    url: string
  }
}

interface ComponentInstance {
  id: string
  type: string
  props?: {
    [key: string]: any
  }
}

export const EditorLayout: React.FC = () => {
  const { components, tools, addComponent, removeComponent, selectComponent, selectedComponentId } =
    useBuildStore()
  const ref = useRef<HTMLDivElement>(null)

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: tools.map(tool => tool.type), // Accept all tool types
    drop: (item: Tool, monitor) => {
      if (monitor.isOver({ shallow: true })) {
        console.log('Dropping item:', item)
        addComponent(item)
      }
      return { name: 'EditorLayout' }
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))

  drop(ref)

  const renderComponent = (component: ComponentInstance) => {
    const tool = tools.find(t => t.id === component.id)
    if (!tool) return null

    const DeleteButton = () => (
      <button
        className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
        onClick={() => removeComponent(component.id)}
      >
        <FaTrash />
      </button>
    )

    const commonProps = {
      onClick: () => {
        selectComponent(component.id)
      },
      className: `relative p-2 shadow-lg ${
        selectedComponentId === component.id ? 'ring-2 ring-blue-500' : ''
      }`,
    }

    switch (component.type) {
      case 'BOX':
        return (
          <div
            {...commonProps}
            key={component.id}
            style={{
              backgroundColor: component.props?.backgroundColor,
              width: `${component.props?.width}px`,
              height: `${component.props?.height}px`,
            }}
          >
            <p style={{ color: component.props?.color, fontSize: component.props?.fontSize }}>
              {component.props?.text || 'Text'}
            </p>
            <DeleteButton />
          </div>
        )
      case 'TEXT':
        return (
          <div {...commonProps} key={component.id}>
            <p style={{ color: component.props?.color, fontSize: component.props?.fontSize }}>
              {component.props?.text || 'Text'}
            </p>
            <DeleteButton />
          </div>
        )
      case 'IMAGE':
        return (
          <div
            {...commonProps}
            key={component.id}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {component.props?.src ? (
              <img
                style={{ width: component.props?.width, height: component.props?.height }}
                src={component.props.src}
                alt="Dragged image"
              />
            ) : (
              <FaRegImages />
            )}
            <DeleteButton />
          </div>
        )
      default:
        return (
          <div {...commonProps} key={component.id}>
            <p>{tool.title}</p>
            <DeleteButton />
          </div>
        )
    }
  }

  return (
    <>
      {components.map(renderComponent)}
      <div
        ref={ref}
        className={`w-full h-[20vh] border-dashed border-2 border-sky-500 p-4 rounded-lg ${
          isOver && canDrop ? 'bg-green-300' : 'bg-inherit'
        }`}
      >
        {isOver && canDrop ? 'Release here' : 'drop here'}
      </div>
    </>
  )
}
