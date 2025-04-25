"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface FilterPanelProps {
    specialties: string[]
    selectedSpecialties: string[]
    consultationType: string
    sortBy: string
    updateFilters: (searchQuery?: string, consultationType?: string, specialties?: string[], sortBy?: string) => void
}

export default function FilterPanel({
    specialties,
    selectedSpecialties,
    consultationType,
    sortBy,
    updateFilters,
}: FilterPanelProps) {
    const [showSpecialties, setShowSpecialties] = useState(true)
    const [showConsultation, setShowConsultation] = useState(true)
    const [showSort, setShowSort] = useState(true)

    const handleConsultationChange = (value: string) => {
        updateFilters(undefined, value, undefined, undefined)
    }

    const handleSpecialtyChange = (specialty: string, checked: boolean) => {
        const newSpecialties = checked
            ? [...selectedSpecialties, specialty]
            : selectedSpecialties.filter((s) => s !== specialty)

        updateFilters(undefined, undefined, newSpecialties, undefined)
    }

    const handleSortChange = (value: string) => {
        updateFilters(undefined, undefined, undefined, value)
    }

    return (
        <div className="bg-white rounded-lg shadow p-4 space-y-6">
            <div>
                <div className="flex justify-between items-center cursor-pointer" onClick={() => setShowSort(!showSort)}>
                    <h3 className="font-medium text-lg" data-testid="filter-header-sort">
                        Sort by
                    </h3>
                    {showSort ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>

                {showSort && (
                    <div className="mt-3 space-y-2">
                        <div className="flex items-center space-x-2">
                            <RadioGroup value={sortBy} onValueChange={handleSortChange}>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="fees" id="sort-fees" data-testid="sort-fees" />
                                    <Label htmlFor="sort-fees">Price: Low-High</Label>
                                </div>
                                <div className="flex items-center space-x-2 mt-2">
                                    <RadioGroupItem value="experience" id="sort-experience" data-testid="sort-experience" />
                                    <Label htmlFor="sort-experience">Experience: Most Experience first</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                )}
            </div>

            <div>
                <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => setShowConsultation(!showConsultation)}
                >
                    <h3 className="font-medium text-lg" data-testid="filter-header-moc">
                        Mode of consultation
                    </h3>
                    {showConsultation ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>

                {showConsultation && (
                    <div className="mt-3 space-y-2">
                        <RadioGroup value={consultationType} onValueChange={handleConsultationChange}>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="video" id="video-consult" data-testid="filter-video-consult" />
                                <Label htmlFor="video-consult">Video Consultation</Label>
                            </div>
                            <div className="flex items-center space-x-2 mt-2">
                                <RadioGroupItem value="clinic" id="in-clinic" data-testid="filter-in-clinic" />
                                <Label htmlFor="in-clinic">In-clinic Consultation</Label>
                            </div>
                        </RadioGroup>
                    </div>
                )}
            </div>

            <div>
                <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => setShowSpecialties(!showSpecialties)}
                >
                    <h3 className="font-medium text-lg" data-testid="filter-header-speciality">
                        Specialities
                    </h3>
                    {showSpecialties ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>

                {showSpecialties && (
                    <div className="mt-3 space-y-2 max-h-60 overflow-y-auto">
                        {specialties.sort().map((specialty) => (
                            <div key={specialty} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`specialty-${specialty}`}
                                    data-testid={`filter-specialty-${specialty}`}
                                    checked={selectedSpecialties.includes(specialty)}
                                    onCheckedChange={(checked) => handleSpecialtyChange(specialty, checked as boolean)}
                                />
                                <Label htmlFor={`specialty-${specialty}`}>{specialty}</Label>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {(selectedSpecialties.length > 0 || consultationType || sortBy) && (
                <Button variant="outline" className="w-full" onClick={() => updateFilters(undefined, "", [], "")}>
                    Clear All Filters
                </Button>
            )}
        </div>
    )
}
