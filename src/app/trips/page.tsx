import React from 'react'
import ClientOnly from '@/components/ClientOnly'
import EmptyState from '@/components/EmptyState'
import getCurrentUser from '../actions/getCurrentUser'
import getReservations from '../actions/getReservations'
import TripsClient from './TripsClient'

const TripsPage = async () => {
	const currentUser = await getCurrentUser()
	if(!currentUser) return(
		<ClientOnly>
			<EmptyState
				title='No tienes acceso a esta pagina'
				subtitle='Por favor inicia sesión'
				/>
		</ClientOnly>
	)
	const reservations = await getReservations({userId: currentUser.id})
	
	if(reservations.length === 0) {
		return (
			<ClientOnly>
				<EmptyState
					title='No tienes ningún viaje reservado... ¡por ahora!'
					subtitle='Saca las maletas del clóset y comienza a planear tu próxima aventura'
				/>
			</ClientOnly>
		)
	}

	return (
		<ClientOnly>
			<TripsClient
				reservations={reservations}
				currentUser={currentUser}
			/>
		</ClientOnly>
	)
}

export default TripsPage