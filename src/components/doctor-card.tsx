import Image from "next/image"
import { MapPin, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Doctor } from "@/types"
import { toast } from "sonner"


interface DoctorCardProps {
    doctor: Doctor
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
    // Extract years of experience
    // const experienceYears = doctor.experience.match(/\d+/)?.[0] || ""

    return (
        <div className="bg-white rounded-lg shadow p-4" data-testid="doctor-card">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-shrink-0">
                    <img
                        src={doctor.photo || "/placeholder.svg?height=100&width=100"}
                        alt={doctor.name}
                        width={100}
                        height={100}
                        className="rounded-full object-cover"
                    />
                </div>

                <div className="flex-grow">
                    <h2 className="text-xl font-bold" data-testid="doctor-name">
                        {doctor.name}
                    </h2>

                    <div className="text-sm text-gray-600 mt-1" data-testid="doctor-specialty">
                        {doctor.specialities.map((s) => s.name).join(", ")}
                    </div>

                    <div className="mt-2 text-sm">{doctor.doctor_introduction}</div>

                    <div className="mt-2 text-sm font-medium" data-testid="doctor-experience">
                        {doctor.experience}
                    </div>

                    <div className="mt-2 flex flex-wrap gap-2">
                        {doctor.video_consult && (
                            <div className="flex items-center text-sm text-green-600">
                                <Video size={16} className="mr-1" />
                                <span>Video Consult</span>
                            </div>
                        )}

                        {doctor.in_clinic && doctor.clinic && (
                            <div className="flex items-center text-sm text-gray-600">
                                <MapPin size={16} className="mr-1" />
                                <span>{doctor.clinic.name}</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col justify-between items-end">
                    <div className="text-xl font-bold" data-testid="doctor-fee">
                        {doctor.fees}
                    </div>

                    <Button
                        onClick={() => toast.success("Booking Initiated")}
                        className="mt-2 cursor-pointer">Book Appointment</Button>
                </div>
            </div>
        </div>
    )
}
