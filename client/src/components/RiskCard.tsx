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
        <Card className="p-4 bg-card rounded-lg">
            <CardHeader className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-foreground">{neo.name}</h3>
                <span className={`px-2 py-1 text-sm rounded-full ${neo.is_potentially_hazardous_asteroid ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                    {neo.is_potentially_hazardous_asteroid ? "Hazardous" : "Safe"}
                </span>
            </CardHeader>
            <CardBody>
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-foreground">Size:</span>
                        <span className="font-medium text-foreground">
                            {diameter.estimated_diameter_min.toFixed(2)} - {diameter.estimated_diameter_max.toFixed(2)} km
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-foreground">Speed:</span>
                        <span className="font-medium text-foreground">
                            {velocity.toFixed(0)} km/h
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-foreground">Miss Distance:</span>
                        <span className="font-medium text-foreground">
                            {missDistance.toFixed(0)} km
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-foreground">Close Approach:</span>
                        <span className="font-medium text-foreground">{date}</span>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}

export default RiskCard