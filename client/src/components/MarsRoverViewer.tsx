import type { MarsRoverParams, MarsRoverPhoto } from "@/types/MarsRover";
import { Button, DatePicker, NumberInput, Pagination, Select, SelectItem, Spinner, Tooltip, type DateValue } from "@heroui/react";
import axios from "axios";
import { InfoIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react"

const ROVERS = [
    { key: "curiosity", label: "Curiosity" },
    { key: "opportunity", label: "Opportunity" },
    { key: "spirit", label: "Spirit" }
]
const CAMERAS = {
    curiosity: [
        { key: "FHAZ", label: "FHAZ" },
        { key: "RHAZ", label: "RHAZ" },
        { key: "MAST", label: "MAST" },
        { key: "CHEMCAM", label: "CHEMCAM" },
        { key: "MAHLI", label: "MAHLI" },
        { key: "MARDI", label: "MARDI" },
        { key: "NAVCAM", label: "NAVCAM" }
    ],
    opportunity: [
        { key: "FHAZ", label: "FHAZ" },
        { key: "RHAZ", label: "RHAZ" },
        { key: "NAVCAM", label: "NAVCAM" },
        { key: "PANCAM", label: "PANCAM" },
        { key: "MINITES", label: "MINITES" }
    ],
    spirit: [
        { key: "FHAZ", label: "FHAZ" },
        { key: "RHAZ", label: "RHAZ" },
        { key: "NAVCAM", label: "NAVCAM" },
        { key: "PANCAM", label: "PANCAM" },
        { key: "MINITES", label: "MINITES" }
    ],
}

const MarsRoverViewer: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const [page, setPage] = useState<number>(1);
    const [photos, setPhotos] = useState<MarsRoverPhoto[]>([])
    const [filter, setFilter] = useState<MarsRoverParams>({})
    const [availableCameras, setAvailableCameras] = useState<typeof CAMERAS[keyof typeof CAMERAS]>([])


    const handleFilterChange = (field: keyof MarsRoverParams, value: string | number | DateValue | null) => {
        if (field === 'earth_date') {
            setFilter(prev => ({
                ...prev,
                earth_date: value as DateValue | undefined,
                earth_date_string: value ? value.toString() : undefined
            }))
        } else {
            setFilter(prev => ({
                ...prev,
                [field]: value as any
            }))
        }
    }

    const fetchPhotos = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACK_END_API_URL}/MRP`, {
                params: {
                    ...filter,
                    page
                }
            })
            setPhotos(res.data.photos)

            if (filter.rover) {
                setAvailableCameras(CAMERAS[filter.rover as keyof typeof CAMERAS])
            }
        } catch (err) {
            console.error("Error fetching Mars photos:", err)
            setPhotos([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPhotos()
    }, [filter, page])


    return (
        <div className="container">
            <div className="flex flex-col gap-5 md:flex-row md:items-center mt-10">
                <Select
                    size="lg"
                    disabledKeys={["opportunity", "spirit"]}
                    placeholder="Select a Rover"
                    value={filter.rover}
                    onChange={(e) => handleFilterChange("rover", e.target.value)}
                    startContent={
                        <Tooltip content="Spirit & Opportunity are not available via Nasa API"
                            
                        > 
                            <Button isIconOnly size="sm">
                                <InfoIcon /> 
                            </Button>
                        </Tooltip>
                    }
                >
                    {ROVERS.map((rover) => (
                        <SelectItem key={rover.key}>
                            {rover.label}
                        </SelectItem>
                    ))}
                </Select>
                <Select
                    size="lg"
                    placeholder="Select a camera"
                    value={filter.camera}
                    onChange={(e) => handleFilterChange("camera", e.target.value)}
                >
                    {availableCameras.map((camera) => (
                        <SelectItem key={camera.key}>
                            {camera.label}
                        </SelectItem>
                    ))}
                </Select>

                <div className="flex-1">
                    <DatePicker
                        value={filter.earth_date}
                        onChange={(date) => handleFilterChange("earth_date", date)}
                        label="Earth Day"
                        startContent={
                            <Button variant="light" onPress={() => handleFilterChange("earth_date", null)} isIconOnly className="mb-3">
                                <XIcon className="w-5 h-5" />
                            </Button>
                        }
                    />
                </div>
                <div className="flex-1">
                    <NumberInput
                        className="min-w-xs"
                        placeholder="Enter Sol(day)"
                        width={100}
                        value={filter.sol}
                        onValueChange={(value) => handleFilterChange("sol", value)}
                    />
                </div>

                <Button
                    color="default"
                    onPress={fetchPhotos}
                >
                    Search
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                {loading ? (
                    <div className="flex items-center justify-center min-h-[60vh] w-full col-span-full" >
                        <Spinner color="secondary" size="lg" />
                    </div>
                ) : photos.length === 0 ? (
                    <div className="col-span-full text-center p-8">
                        No photos found. Try adjusting your filters.
                    </div>
                ) : (
                    photos.map((photo) => (

                        <div key={photo.id} className="relative overflow-hidden rounded-lg">
                            <img
                                src={photo.img_src}
                                alt={`Mars photo by ${photo.rover.name} on sol ${photo.sol}`}
                                className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
                            />
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-3 rounded-b-lg">
                                <div className="text-sm">
                                    <span className="font-bold">{photo.rover.name}</span> - Sol {photo.sol}
                                </div>
                                <div className="text-xs">
                                    {photo.camera.full_name} - {photo.earth_date}
                                </div>
                            </div>
                        </div>
                    ))
                )
                }

            </div>
            {photos.length > 0 &&
                <Pagination
                    total={photos.length / 25}
                    page={page}
                    onChange={setPage}
                    className="flex flex-row items-center justify-center mt-6"
                />
            }
        </div>
    )
}

export default MarsRoverViewer