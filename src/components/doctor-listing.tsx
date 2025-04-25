"use client"

import { useEffect, useState, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import type { Doctor } from "@/types"
import SearchBar from "@/components/search-bar"
import FilterPanel from "@/components/filter-panel"
import DoctorCard from "@/components/doctor-card"

export default function DoctorListing() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [doctors, setDoctors] = useState<Doctor[]>([])
    const [loading, setLoading] = useState(true)

    // Read current filter values from URL
    const searchQuery = searchParams.get("search") || ""
    const consultationType = searchParams.get("consultationType") || ""
    const specialties = searchParams.getAll("specialty")
    const sortBy = searchParams.get("sortBy") || ""

    useEffect(() => {
        async function fetchDoctors() {
            try {
                const res = await fetch(
                    "https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json"
                )
                if (!res.ok) throw new Error("Failed to fetch doctors")
                const data = (await res.json()) as Doctor[]
                setDoctors(data)
            } catch (err) {
                console.error("Error fetching doctors:", err)
            } finally {
                setLoading(false)
            }
        }
        fetchDoctors()
    }, [])

    // Compute filtered & sorted list whenever inputs change
    const filteredDoctors = useMemo<Doctor[]>(() => {
        let list = [...doctors]

        // Search by name
        if (searchQuery) {
            list = list.filter((d) =>
                d.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }

        // Consultation type filter
        if (consultationType === "video") {
            list = list.filter((d) => d.video_consult)
        } else if (consultationType === "clinic") {
            list = list.filter((d) => d.in_clinic)
        }

        // Specialties filter
        if (specialties.length > 0) {
            list = list.filter((d) =>
                d.specialities.some((s) => specialties.includes(s.name))
            )
        }

        // Sorting
        if (sortBy === "fees") {
            list.sort((a, b) => {
                const af = parseInt(a.fees.replace(/\D/g, ""), 10)
                const bf = parseInt(b.fees.replace(/\D/g, ""), 10)
                return af - bf
            })
        } else if (sortBy === "experience") {
            list.sort((a, b) => {
                const ae = parseInt(a.experience.match(/\d+/)?.[0] || "0", 10)
                const be = parseInt(b.experience.match(/\d+/)?.[0] || "0", 10)
                return be - ae
            })
        }

        return list
    }, [doctors, searchQuery, consultationType, specialties, sortBy])

    const updateFilters = (
        newSearchQuery?: string,
        newConsultationType?: string,
        newSpecialties?: string[],
        newSortBy?: string
    ) => {
        const params = new URLSearchParams(searchParams.toString())

        if (newSearchQuery !== undefined) {
            newSearchQuery ? params.set("search", newSearchQuery) : params.delete("search")
        }
        if (newConsultationType !== undefined) {
            newConsultationType
                ? params.set("consultationType", newConsultationType)
                : params.delete("consultationType")
        }
        if (newSpecialties !== undefined) {
            params.delete("specialty")
            newSpecialties.forEach((s) => params.append("specialty", s))
        }
        if (newSortBy !== undefined) {
            newSortBy ? params.set("sortBy", newSortBy) : params.delete("sortBy")
        }

        const nextQS = params.toString()
        if (nextQS === searchParams.toString()) {
            return
        }

        router.replace(`?${nextQS}`, undefined)
    }

    if (loading) {
        return <div className="text-center py-10">Loading doctors...</div>
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Filter sidebar */}
            <div className="md:col-span-1">
                <FilterPanel
                    specialties={Array.from(
                        new Set(doctors.flatMap((d) => d.specialities.map((s) => s.name)))
                    )}
                    selectedSpecialties={specialties}
                    consultationType={consultationType}
                    sortBy={sortBy}
                    updateFilters={updateFilters}
                />
            </div>

            {/* Main content */}
            <div className="md:col-span-3">
                <SearchBar
                    searchQuery={searchQuery}
                    doctors={doctors}
                    updateFilters={updateFilters}
                />

                <div className="mt-6 space-y-4">
                    {filteredDoctors.length > 0 ? (
                        filteredDoctors.map((doc) => (
                            <DoctorCard key={doc.id} doctor={doc} />
                        ))
                    ) : (
                        <div className="text-center py-10 bg-white rounded-lg shadow">
                            <p className="text-gray-500">
                                No doctors found matching your criteria.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
