import type { NeoObject } from "@/types/NeoWs"

interface CloseApproachTimelineProps {
    neoObjects: Record<string, NeoObject[]>
}

const CloseApproachTimeline: React.FC<CloseApproachTimelineProps> = ({ neoObjects }) => {
    const sortedDates = Object.keys(neoObjects).sort()

    return (
        <div className="relative border-l-4 border-gray-300 pl-6 space-y-12">
            {sortedDates.map(date => (
                <div key={date} className="relative group">
                    <div className="absolute -left-[29px] top-1.5 w-5 h-5 rounded-full bg-blue-600 border-4 border-white shadow-lg"></div>

                    <div className="mb-3">
                        <h3 className="text-2xl font-semibold text-primary">
                            {date}
                        </h3>
                    </div>

                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {neoObjects[date].map(neo => {
                            const velocity = parseFloat(neo.close_approach_data[0].relative_velocity.kilometers_per_hour).toFixed(0)
                            const minSize = neo.estimated_diameter.kilometers.estimated_diameter_min.toFixed(1)
                            const maxSize = neo.estimated_diameter.kilometers.estimated_diameter_max.toFixed(1)

                            return (
                                <div
                                    key={neo.id}
                                    className="bg-card rounded-2xl p-4"
                                >
                                    <h4 className="text-lg font-semibold text-foreground">
                                        {neo.name}
                                    </h4>

                                    <div className="mt-2 text-sm text-foreground space-y-1">
                                        <p>
                                            <strong>Size:</strong> {minSize} - {maxSize} km
                                        </p>
                                        <p>
                                            <strong>Speed:</strong> {velocity} km/h
                                        </p>
                                    </div>

                                    <div className="mt-3">
                                        <span
                                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                                                neo.is_potentially_hazardous_asteroid
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-green-100 text-green-700"
                                            }`}
                                        >
                                            {neo.is_potentially_hazardous_asteroid ? "Hazardous" : "Safe"}
                                        </span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CloseApproachTimeline
