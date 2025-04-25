"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import type { Doctor } from "@/types"

interface SearchBarProps {
    searchQuery: string
    doctors: Doctor[]
    updateFilters: (searchQuery: string) => void
}

export default function SearchBar({ searchQuery, doctors, updateFilters }: SearchBarProps) {
    const [query, setQuery] = useState(searchQuery)
    const [suggestions, setSuggestions] = useState<Doctor[]>([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    // Update suggestions when query changes
    useEffect(() => {
        if (query.trim().length === 0) {
            setSuggestions([])
            return
        }

        const filteredDoctors = doctors
            .filter((doctor) => doctor.name.toLowerCase().includes(query.toLowerCase()))
            .slice(0, 3) // Show top 3 matches

        setSuggestions(filteredDoctors)
    }, [query, doctors])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
        setShowSuggestions(true)
    }

    const handleInputFocus = () => {
        setShowSuggestions(true)
    }

    const handleInputBlur = () => {
        setTimeout(() => {
            setShowSuggestions(false)
        }, 200)
    }

    const handleSuggestionClick = (doctorName: string) => {
        setQuery(doctorName)
        updateFilters(doctorName)
        setShowSuggestions(false)
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
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onKeyDown={handleKeyDown}
                    className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>

            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg">
                    <ul className="py-1">
                        {suggestions.map((doctor) => (
                            <li
                                key={doctor.id}
                                data-testid="suggestion-item"
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleSuggestionClick(doctor.name)}
                            >
                                {doctor.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
