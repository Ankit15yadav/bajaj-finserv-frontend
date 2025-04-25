"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import type { Doctor } from "@/types"

interface SearchBarProps {
    searchQuery: string
    doctors: Doctor[]
    updateFilters: (searchQuery: string) => void
}

export default function SearchBar({
    searchQuery,
    doctors,
    updateFilters,
}: SearchBarProps) {
    const [query, setQuery] = useState(searchQuery)
    const [suggestions, setSuggestions] = useState<Doctor[]>([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    // 1. Sync prop → local state
    useEffect(() => {
        setQuery(searchQuery)
    }, [searchQuery])

    // 2. When query is empty, reset filters and suggestions
    useEffect(() => {
        if (query.trim() === "") {
            updateFilters("")      // clear URL param
            setSuggestions([])
        }
    }, [query, updateFilters])

    // 3. Generate suggestions when query is non-empty
    useEffect(() => {
        if (query.trim() === "") return

        const filtered = doctors
            .filter((d) => d.name.toLowerCase().includes(query.toLowerCase()))
            .slice(0, 3)
        setSuggestions(filtered)
    }, [query, doctors])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
        setShowSuggestions(true)
    }

    const handleClear = () => {
        setQuery("")
        setShowSuggestions(false)
        // updateFilters called by effect above
        inputRef.current?.focus()
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            updateFilters(query)
            setShowSuggestions(false)
        }
    }

    return (
        <div className="relative">
            <div className="relative">
                <Input
                    ref={inputRef}
                    data-testid="autocomplete-input"
                    type="text"
                    placeholder="Search for doctors by name"
                    value={query}
                    onChange={handleInputChange}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    onKeyDown={handleKeyDown}
                    className="pl-10 pr-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                {query && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 hover:text-gray-600"
                        aria-label="Clear search"
                    >
                        <X size={16} />
                    </button>
                )}
            </div>

            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg">
                    <ul className="py-1">
                        {suggestions.map((doc) => (
                            <li
                                key={doc.id}
                                data-testid="suggestion-item"
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                    setQuery(doc.name)
                                    updateFilters(doc.name)
                                    setShowSuggestions(false)
                                }}
                            >
                                {doc.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
