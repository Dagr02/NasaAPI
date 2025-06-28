import type { APOD } from "@/types/APOD"
import { Button, DatePicker, Image, NumberInput, Pagination, Spinner, type DateValue } from "@heroui/react"
import axios from "axios"
import { XIcon } from "lucide-react"
import { useEffect, useState } from "react"


const APODViewer: React.FC = () => {
    const [apods, setApods] = useState<APOD[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [page, setPage] = useState(1);

    const [range, setRange] = useState<boolean>(false)

    const [dateValue, setDateValue] = useState<DateValue | null>(null)
    const [startDateValue, setStartDateValue] = useState<DateValue | null>(null)
    const [endDateValue, setEndDateValue] = useState<DateValue | null>(null)

    const [count, setCount] = useState<number>()

    const fetchApods = async () => {
        setLoading(true)

        const formatDate = (value: DateValue | null) => value ? value.toString() : undefined

        let params: Record<string, string | number> = {}

        if(count) {
            params.count = count;
        }
        else if(range && startDateValue && endDateValue){
            params.start_date = formatDate(startDateValue)!
            params.end_date = formatDate(endDateValue)!
        }else if(dateValue){
            params.date = formatDate(dateValue)!
        }

        try{
            const res = await axios.get(`${import.meta.env.VITE_BACK_END_API_URL}/APOD`, {params})
            const data = Array.isArray(res.data) ? res.data : [res.data]
            setApods(data)
            
        }catch(err) {
            console.error("APOD fetch error: ", err)
            setApods([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchApods()
    }, [])


    if (loading) {
        return <Spinner color="secondary" className="relative h-[calc(100vh-64px)] flex flex-col items-center justify-center px-4" />
    }

    return (
        <div className="relative overflow-auto flex flex-col items-center justify-center px-4">
            <div className="container max-w-4xl mx-auto text-center z-10">
                <div className="flex flex-row items-center justify-center mt-10 mb-6">
                    <Button 
                        color="default" 
                        onPress={() => {
                            setRange((prev) => !prev)
                            setDateValue(null);
                            setStartDateValue(null);
                            setEndDateValue(null);
                        }}>
                            {range ? "Single Date" : "Date Range"}
                    </Button>
                </div>
                <div className="flex flex-row items-center justify-center gap-x-6 mb-6">
                    {range ? (
                        <>
                            <DatePicker
                                className="max-w-[240px]"
                                label="Start Date"
                                isDisabled={!!count || !!dateValue}
                                value={startDateValue}
                                onChange={setStartDateValue}
                                startContent={
                                    <Button variant="light" onPress={() => setStartDateValue(null)} isIconOnly className="mb-3">
                                        <XIcon className="w-5 h-5" />
                                    </Button>
                                }
                            />
                            <DatePicker
                                className="max-w-[240px]"
                                label="End Date"
                                value={endDateValue}
                                isDisabled={!!count || !!dateValue}
                                onChange={setEndDateValue}
                                startContent={
                                    <Button variant="light" onPress={() => setEndDateValue(null)} isIconOnly className="mb-3">
                                        <XIcon className="w-5 h-5" />
                                    </Button>
                                }
                            />
                        </>
                    ) : (
                        <DatePicker
                            className="max-w-[240px]"
                            label="Date"
                            value={dateValue}
                            isDisabled={!!count || !!startDateValue || !!endDateValue}
                            onChange={setDateValue}
                            startContent={
                                <Button variant="light" onPress={() => setDateValue(null)} isIconOnly className="mb-3">
                                    <XIcon className="w-5 h-5" />
                                </Button>
                            }
                        />
                    )}
                    <NumberInput
                        className="max-w-[240px]"
                        placeholder="Num of images"
                        minValue={0}
                        maxValue={100}
                        isDisabled={!!dateValue || !!startDateValue || !!endDateValue}
                        value={count}
                        onValueChange={setCount}
                    />
                </div>
                <div className="flex flex-row items-center justify-center mb-6">
                    <Button
                        color="default"
                        onPress={fetchApods}
                    >
                        Search
                    </Button>
                </div>
                {!dateValue && !startDateValue && !endDateValue && !count &&
                    (<h1 className="text-4xl md:text-5xl font-bold mb-5 text-center">Astronomy Picture of the Day</h1>)
                }
                {apods.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-3xl md:text-4xl mb-6 text-center">
                            {apods[page - 1].title} ({apods[page - 1].date})
                        </h2>
                        {apods[page - 1].media_type === "image" ? (
                            <div className="flex flex-row items-center justify-center">
                                <Image
                                    isBlurred
                                    src={apods[page - 1].url}
                                    alt={apods[page - 1].title}
                                    width={600}
                                />
                            </div>
                        ) : (
                            <div>video</div>
                        )}
                        {apods.length > 1 && (
                            <Pagination
                                total={apods.length}
                                page={page}
                                onChange={setPage}
                                className="flex flex-row items-center justify-center mt-6"
                            />
                        )}
                    </div>
                )}

            </div>
        </div>
    )
}

export default APODViewer