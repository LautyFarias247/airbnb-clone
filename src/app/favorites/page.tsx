import ClientOnly from '@/components/ClientOnly'
import EmptyState from '@/components/EmptyState'
import React from 'react'
import getCurrentUser from '../actions/getCurrentUser'
import getFavoriteListing from '../actions/getFavorites'
import FavoritesClient from './FavoritesClient'

const FavoritePage = async () => {
	const listings = await getFavoriteListing()
	const currentUser = await getCurrentUser()

	if(listings.length === 0) {
		return (
		<ClientOnly>
			<EmptyState
				title='No favorites found'
				subtitle='Looks like '
			/>
		</ClientOnly>

		)
	}


	return (
		<ClientOnly>
			<FavoritesClient
				listings={listings}
				currentUser={currentUser}

			/>
		</ClientOnly>
	)
}

export default FavoritePage