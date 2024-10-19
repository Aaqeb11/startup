/* eslint-disable simple-import-sort/imports */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../app/_providers/Auth'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { ComponentsList } from './_components/ComponentList'
import { EditorLayout } from './_components/EditorLayout'
const page = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <p>hello</p>
      <div className="flex flex-col w-full h-screen">
        {/* <div className="cols-span-12 h-[9vh] py-2">
        <NavBar />
      </div> */}
        <div className="flex-grow grid grid-cols-12 bg-gray-200">
          <div className="bg-purple-500 h-full col-span-3">
            <ComponentsList />
          </div>
          <div className="bg-white h-full col-span-7 p-2">
            <EditorLayout />
          </div>
          {/* <div className="bg-gray-100 h-full col-span-2">
          <PropertyPanel />
        </div> */}
        </div>
      </div>
    </DndProvider>
  )
}

export default page
