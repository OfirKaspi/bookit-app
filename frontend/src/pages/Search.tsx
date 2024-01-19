import { useQuery } from "react-query"
import { useSearchContext } from "../contexts/SearchContext"
import { searchHotels } from "../api-client"
import { ChangeEvent, useState } from "react"
import { SerachResultsCard } from "../cmps/SerachResultsCard"
import { Pagination } from "../cmps/Pagination"
import { StarRatingFilter } from "../cmps/StarRatingFilter"
import { HotelTypesFilter } from "../cmps/HotelTypesFilter"
import { FacilitiesFilter } from "../cmps/FacilitiesFilter"
import { PriceFilter } from "../cmps/PriceFilter"
import { SortBy } from "../cmps/SortBy"

export const Search = () => {
    const search = useSearchContext()
    const [page, setPage] = useState<number>(1)
    const [selectedStars, setSelectedStars] = useState<string[]>([])
    const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([])
    const [selectedFacilities, setSelectedFacilities] = useState<string[]>([])
    const [selectedPrice, setSelectedPrice] = useState<number | undefined>()
    const [sortOption, setSortOption] = useState<string>('')

    const searchParams = {
        destination: search.destination,
        checkIn: search.checkIn.toISOString(),
        checkOut: search.checkOut.toISOString(),
        adultCount: search.adultCount.toString(),
        childCount: search.childCount.toString(),
        page: page.toString(),
        stars: selectedStars,
        types: selectedHotelTypes,
        facilities: selectedFacilities,
        maxPrice: selectedPrice?.toString(),
        sortOption,
    }

    const { data: hotelData } = useQuery(['searchHotels', searchParams], () =>
        searchHotels(searchParams)
    )

    const handleStarsChange = (event: ChangeEvent<HTMLInputElement>) => {
        const starRating = event.target.value
        setSelectedStars((prevStars) =>
            event.target.checked
                ? [...prevStars, starRating]
                : prevStars.filter((star) => star !== starRating)
        )
    }

    const handleHotelTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
        const hotelType = event.target.value
        setSelectedHotelTypes((prevHotelTypes) =>
            event.target.checked
                ? [...prevHotelTypes, hotelType]
                : prevHotelTypes.filter((prevHotelType) => prevHotelType !== hotelType)
        )
    }

    const handleFacilityChange = (event: ChangeEvent<HTMLInputElement>) => {
        const facility = event.target.value
        setSelectedFacilities((prevFavilities) =>
            event.target.checked
                ? [...prevFavilities, facility]
                : prevFavilities.filter((prevFacility) => prevFacility !== facility)
        )
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div className="rounded-lg border border-slate-300 p-5 h-fit lg:sticky top-10">
                <div className="space-y-5">
                    <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
                        Filter by:
                    </h3>
                    <StarRatingFilter selectedStars={selectedStars} onChange={handleStarsChange} />
                    <HotelTypesFilter selectedHotelTypes={selectedHotelTypes} onChange={handleHotelTypeChange} />
                    <FacilitiesFilter selectedFacilities={selectedFacilities} onChange={handleFacilityChange} />
                    <PriceFilter selectedPrice={selectedPrice} onChange={(value?: number) => setSelectedPrice(value)} />
                </div>
            </div>
            <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">
                        {hotelData?.pagination.total} Hotels found
                        {search.destination ? ` in ${search.destination}` : ''}
                    </span>
                    <SortBy sortOption={sortOption} setSortOption={setSortOption} />
                </div>
                {hotelData?.data.map((hotel) => (
                    <SerachResultsCard hotel={hotel} />
                ))}
                <div>
                    <Pagination
                        page={hotelData?.pagination.page || 1}
                        pages={hotelData?.pagination.pages || 1}
                        onPageChange={(page) => setPage(page)}
                    />
                </div>
            </div>
        </div>
    )
}