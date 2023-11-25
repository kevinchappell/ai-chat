'use client'

import { useState, useCallback } from 'react'

type Storable = string | number | boolean | object | null

const isNullOrUndefined = (value: any): value is null | undefined => value === null || value === undefined

const localStorageCache: Record<string, Storable> = {}
const localStorage = {
  set: (key: string, value: Storable) => {
    if (isNullOrUndefined(value)) {
      localStorage.remove(key)
      return
    }
    localStorageCache[key] = value
    window.localStorage.setItem(key, JSON.stringify(value))
  },

  get: <T extends Storable>(key: string): T | null => {
    if (!isNullOrUndefined(localStorageCache[key])) {
      return localStorageCache[key] as T
    }
    const localStorageValue = window.localStorage.getItem(key)
    if (isNullOrUndefined(localStorageValue)) {
      return null
    }
    try {
      const parsedValue: T = JSON.parse(localStorageValue)
      localStorageCache[key] = parsedValue
      return parsedValue
    } catch (e) {
      localStorageCache[key] = localStorageValue
      return localStorageValue as T
    }
  },

  remove: (key: string) => {
    delete localStorageCache[key]
    window.localStorage.removeItem(key)
  },

  clear: () => window.localStorage.clear(),
}

export const useLocalStorage = <T extends Storable>(localStorageKey: string, initialValue: T) => {
  const [state, setState] = useState<T>(() => {
    const storedValue = localStorage.get<T>(localStorageKey)
    return isNullOrUndefined(storedValue) ? initialValue : storedValue
  })

  const setValue = useCallback(
    (valueOrPrevValFunction: T | ((prevValue: T) => T)) => {
      setState((prevState) => {
        const newState =
          valueOrPrevValFunction instanceof Function ? valueOrPrevValFunction(prevState) : valueOrPrevValFunction
        localStorage.set(localStorageKey, newState)
        return newState
      })
    },
    [localStorageKey]
  )

  return [state, setValue] as const
}
