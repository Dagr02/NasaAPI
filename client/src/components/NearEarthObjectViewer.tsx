import type { NeoFeedResponse, NeoFiltersType, NeoObject } from "@/types/NeoWs"
import { useEffect, useState } from "react"
import NeoFilters from "./NeoFilters"
import CloseApproachTimeline from "./CloseApproachTimeline"
import { Spinner } from "@heroui/react"
import axios from "axios"
import RiskCard from "./RiskCard"

const NearEarthObjectViewer: React.FC = () => {
    const [neoData, setNeoData] = useState<NeoFeedResponse | null>(null)
    const [loading, setLoading] = useState(false)
    const [filters, setFilters] = useState<NeoFiltersType>({
        start_date: undefined,
        end_date: undefined,
        start_date_string: undefined,
        end_date_string: undefined,
        minDiameter: 0,
        maxDiameter: 1000,
        hazardousOnly: false
    })

    const fetchNeo = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${process.env.BACK_END_API_URL}/NeoWs`, {
                params: {
                    start_date: filters.start_date_string,
                    end_date: filters.end_date_string
                }
            })
            setNeoData(res.data)
        } catch (err) {
            console.error('Error fetching NEO data:', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const {start_date, end_date} = filters

        if(end_date && start_date) {
            const diff = end_date.compare(start_date)
            if(diff > 7){
                alert("NASA API only supports a maximum range of 7 days")
                return
            }
        }
        fetchNeo()
    }, [filters.start_date, filters.end_date])

    const getFilteredNeoObjects = (objects: NeoObject[]) => {
        return objects.filter(neo => {
            const diameter = neo.estimated_diameter.kilometers.estimated_diameter_min
            const isHazardous = neo.is_potentially_hazardous_asteroid

            return (
                diameter >= (filters.minDiameter ?? 0) &&
                diameter <= (filters.maxDiameter ?? Infinity) &&
                (!filters.hazardousOnly || isHazardous)
            )
        })
    }

    const allNeoObjects = neoData
        ? Object.values(neoData.near_earth_objects)
            .flat()
            .map(neo => ({
                ...neo,
                closeApproachDate: neo.close_approach_data[0]?.close_approach_date ?? ""
            }))
            .sort((a, b) => {
                return new Date(a.closeApproachDate).getTime() - new Date(b.closeApproachDate).getTime()
            })
        : []

    const filteredNeoObjects = getFilteredNeoObjects(allNeoObjects)

    return (
        <div className="container">
            <h1 className="text-4xl md:text-5xl font-bold mb-5 text-center">Near Earth Objects</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="lg:col-span-1 sticky top-1/3 self-start h-fit"> 
                    <NeoFilters filters={filters} setFilters={setFilters} />
                </div>


                <div className="lg:col-span-3">
                    {loading && (
                        <div className="flex justify-center items-center py-10">
                            <Spinner color="secondary" />
                        </div>
                    )}

                    {neoData && (
                        <>
                            <CloseApproachTimeline neoObjects={neoData.near_earth_objects} />
                            <div>
                                <h2 className="text-3xl md:text-4xl mb-6 mt-10 text-center">Closest Approaches</h2>
                                {filteredNeoObjects.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {filteredNeoObjects.map((neo, index) => (
                                            <div key={index} className="w-full">
                                                <RiskCard neo={neo} />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-center text-gray-500">No objects match your filters.</p>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default NearEarthObjectViewer
