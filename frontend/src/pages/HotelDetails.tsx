import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { fetchHotelById } from "../api-client"
import { AiFillStar } from "react-icons/ai"

export const HotelDetails = () => {
    const { hotelId } = useParams()
    const { data: hotel } = useQuery('fetchHotelById', () =>
        fetchHotelById(hotelId || ''), {
        enabled: !!hotelId
    })

    if (!hotel) return <></>

    return (
        <div className="space-y-6">
            <div>
                <span className="flex ">
                    {Array.from({ length: hotel.starRating }).map(() => (
                        <AiFillStar className="fill-yellow-400" />
                    ))}
                </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {hotel.imageUrls.map((image) => (
                    <div key={image} className="h-[300px]">
                        <img src={image} alt={hotel.name} className="rounded-md w-full h-full object-cover object-center" />
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
                {hotel.facilities.map((facility) => (
                    <div className="border border-slate-300 rounded-sm p-3">
                        {facility}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[2fr-1fr]">
                <div className="whitespace-pre-line">{hotel.description}</div>
                <div className="h-fit">
                    {/* <GeustInfo/> */}
                </div>
            </div>

        </div>
    )
}