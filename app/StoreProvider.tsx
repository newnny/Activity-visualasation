'use client'

import { useRef } from "react"
import { Provider } from "react-redux"
import { makeStore, AppStore } from "@/store/store"

/*This component is to use the makeStore function*/
//include the StoreProvider anywhere in the tree above where the store is used
//in my case, it wraps app/layout.tsx

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}