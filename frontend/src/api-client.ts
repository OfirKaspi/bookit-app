import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import { HotelSearchResponse, HotelType } from "../../backend/src/shared/types"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

export const register = async (formData: RegisterFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })

    const responseBody = await response.json()

    if (!response.ok) {
        throw new Error(responseBody.message)
    }

}

export const SignIn = async (formData: SignInFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })

    const responseBody = await response.json()

    if (!response.ok) {
        throw new Error(responseBody.message)
    }

    return responseBody
}

export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        credentials: 'include'
    })
    if (!response.ok) throw new Error('Token invalid')
    return response.json()
}

export const signOut = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        credentials: 'include',
        method: 'POST'
    })
    if (!response.ok) throw new Error('Eror during signout')
}

export const addMyHotel = async (hotelFormDate: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        method: 'POST',
        credentials: 'include',
        body: hotelFormDate
    })
    if (!response.ok) throw new Error('Fail to add')
    return response.json()
}

export const fetchMyHotels = async (): Promise<HotelType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, { credentials: 'include' })
    if (!response.ok) throw new Error('Eror fetching hotels')
    return response.json()
}

// NEED TO SEE WHATS WRONG WITH THE FORM
export const fetchMyHotelById = async (hotelId: string): Promise<HotelType> => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, { credentials: 'include' })
    if (!response.ok) throw new Error('Eror fetching hotels')
    return response.json()
}

export const updateMyHotelById = async (hotelFormDate: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelFormDate.get('hotelId')}`, {
        method: 'PUT',
        body: hotelFormDate,
        credentials: 'include'
    })
    if (!response.ok) throw new Error('Failed to update Hotel')
    return response.json()
}

export type SearchParams = {
    destination?: string
    checkIn?: string
    checkOut?: string
    adultCount?: string
    childCount?: string
    page?: string
    facilities?: string[]
    types?: string[]
    stars?: string[]
    maxPrice?: string
    sortOption?: string
}

export const searchHotels = async (searchParams: SearchParams): Promise<HotelSearchResponse> => {
    const queryParams = new URLSearchParams()
    queryParams.append('destination', searchParams.destination || '')
    queryParams.append('checkIn', searchParams.checkIn || '')
    queryParams.append('checkOut', searchParams.checkOut || '')
    queryParams.append('adultCount', searchParams.adultCount || '')
    queryParams.append('childCount', searchParams.childCount || '')
    queryParams.append('page', searchParams.page || '')
    queryParams.append('maxPrice', searchParams.maxPrice || '')
    queryParams.append('sortOption', searchParams.sortOption || '')

    searchParams.facilities?.forEach((facility) => {
        queryParams.append('facilities', facility)
    })
    searchParams.types?.forEach((type) => {
        queryParams.append('types', type)
    })
    searchParams.stars?.forEach((star) => {
        queryParams.append('stars', star)
    })

    const response = await fetch(`${API_BASE_URL}/api/hotels/search?${queryParams}`)
    if (!response.ok) throw new Error('Failed to update Hotel')
    return response.json()
}