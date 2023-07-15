import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import {SafeUser} from '../types'
import useLoginModal from "./useLoginModal";
interface IUseFavorite {
	listingId: string
	currentUser?: SafeUser | null
}

const useFavorite =  ({listingId, currentUser}: IUseFavorite) =>{
	const router = useRouter()
	const loginModal = useLoginModal()

	const hasFavorited = useMemo(()=>{
		const list = currentUser?.favoriteIds || []

		return list.includes(listingId)
	},[currentUser, listingId])

	const toggleFavorite = useCallback(async(e: React.MouseEvent<HTMLDivElement>)=>{
		e.stopPropagation()
		if(!currentUser) return loginModal.onOpen()
		try {
			let request
			if(hasFavorited) {
				request = () =>axios.delete(`/api/favorites/${listingId}`)
			} else {
				request = () => axios.post(`/api/favorites/${listingId}`)
			}

			const req = await request()
			console.log(req);
			
			router.refresh()
			if(req.config.method === 'post'){
				toast.success('Agregado a favoritos')
			} else {
				toast.success('Quitado de favoritos')

			}
		} catch (error) {
			toast.error('Algo salió mal')
		}
	},[currentUser, hasFavorited, listingId, loginModal, router])
	return {
		hasFavorited,
		toggleFavorite
	}
}

export default useFavorite