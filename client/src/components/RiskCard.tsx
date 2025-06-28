import type { NeoObject } from "@/types/NeoWs"
import { Card, CardBody, CardHeader } from "@heroui/react"

interface RiskCardProps {
    neo: NeoObject
}

const RiskCard: React.FC<RiskCardProps> = ({ neo }) => {
    const diameter = neo.estimated_diameter.kilometers
    const velocity = parseFloat(neo.close_approach_data[0].relative_velocity.kilometers_per_hour)
    const missDistance = parseFloat(neo.close_approach_data[0].miss_distance.kilometers)
    const date = neo.close_approach_data[0].close_approach_date

    return (
        <Card className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
            <CardHeader className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{neo.name}</h3>
                <span className={`px-2 py-1 text-sm rounded-full ${neo.is_potentially_hazardous_asteroid ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                    {neo.is_potentially_hazardous_asteroid ? "Hazardous" : "Safe"}
                </span>
            </CardHeader>
            <CardBody>
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Size:</span>
                        <span className="font-medium text-gray-900">
                            {diameter.estimated_diameter_min.toFixed(1)} - {diameter.estimated_diameter_max.toFixed(1)} km
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Speed:</span>
                        <span className="font-medium text-gray-900">
                            {velocity.toFixed(0)} km/h
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Miss Distance:</span>
                        <span className="font-medium text-gray-900">
                            {missDistance.toFixed(0)} km
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Close Approach:</span>
                        <span className="font-medium text-gray-900">{date}</span>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}