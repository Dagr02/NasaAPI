import {
    Button,
    DatePicker,
    NumberInput,
    Checkbox,
} from "@heroui/react"
import { XIcon } from "lucide-react"
import type { NeoFiltersType } from "@/types/NeoWs"

interface NeoFiltersProps {
    filters: NeoFiltersType
    setFilters: React.Dispatch<React.SetStateAction<NeoFiltersType>>
}

const NeoFilters: React.FC<NeoFiltersProps> = ({ filters, setFilters }) => {
    

    const handleChange = (field: keyof NeoFiltersType, value: any) => {
        console.log(filters)
        if (field === "start_date" || field === "end_date") {
            setFilters(prev => ({
                ...prev,
                [field]: value,
                [`${field}_string`]: value ? value.toString() : undefined
            }))
        } else {
            setFilters(prev => ({ ...prev, [field]: value }))
        }
    }


    const handleClearDate = (field: "start_date" | "end_date") => {
        setFilters(prev => ({ ...prev, [field]: null }))
    }

    return (
        <div className="flex flex-col gap-4 mt-6">
            <div className="flex flex-wrap gap-4 items-end">
                <div className="flex-1 min-w-[200px]">
                    <DatePicker
                        value={filters.start_date}
                        onChange={date => handleChange("start_date", date)}
                        label="Start Date"
                        startContent={
                            <Button
                                variant="light"
                                isIconOnly
                                onPress={() => handleClearDate("start_date")}
                                className="mb-3"
                            >
                                <XIcon className="w-5 h-5" />
                            </Button>
                        }
                    />
                </div>
                <div className="flex-1 min-w-[200px]">
                    <DatePicker
                        value={filters.end_date}
                        onChange={date => handleChange("end_date", date)}
                        label="End Date"
                        startContent={
                            <Button
                                variant="light"
                                isIconOnly
                                onPress={() => handleClearDate("end_date")}
                                className="mb-3"
                            >
                                <XIcon className="w-5 h-5" />
                            </Button>
                        }
                    />
                </div>
                <div className="flex-1 min-w-[140px]">
                    <NumberInput
                        label="Min Diameter (km)"
                        value={filters.minDiameter}
                        onValueChange={val => handleChange("minDiameter", val)}
                    />
                </div>
                <div className="flex-1 min-w-[140px]">
                    <NumberInput
                        label="Max Diameter (km)"
                        labelPlacement="inside"
                        value={filters.maxDiameter}
                        onValueChange={val => handleChange("maxDiameter", val)}
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox
                        isSelected={filters.hazardousOnly}
                        onValueChange={val => handleChange("hazardousOnly", val)}
                    >
                        Hazardous Only
                    </Checkbox>
                </div>
            </div>
        </div>
    )
}

export default NeoFilters
