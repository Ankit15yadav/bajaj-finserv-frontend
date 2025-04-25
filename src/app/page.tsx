'use client'
import { Suspense } from "react"
import DoctorListing from "@/components/doctor-listing"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-4">
        <h1 className="text-2xl font-bold mb-6">Find Doctors</h1>
        <Suspense fallback={<div className="text-center py-10">Loading doctors...</div>}>
          <DoctorListing />
        </Suspense>
      </div>
    </main>
  )
}
