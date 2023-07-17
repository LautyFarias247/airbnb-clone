import React from "react";
import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ReservationClient from "./ReservationClient";

const ReservationPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState 
					title="No estas logueado"
					subtitle="Por favor inicia sesión"
				/>
      </ClientOnly>
    );
  }

	const reservations = await getReservations(
		{authorId: currentUser.id}
	)

	if(reservations.length === 0){
		return (
			<ClientOnly>
				<EmptyState
					title="No se encontraron reservas"
					subtitle="Aún nadie ha realizado reservas para tu propiedad"
				/>
			</ClientOnly>
		)
	}
  return <ClientOnly>
		<ReservationClient
			reservations ={reservations}
			currentUser={currentUser}
		/>
	</ClientOnly>;
};

export default ReservationPage;
