"use client";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import { SafeReservation, SafeUser } from "@/types";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "@/components/listings/ListingCard";

interface Props {
  reservations: SafeReservation[];
  currentUser: SafeUser;
}
const TripsClient: React.FC<Props> = ({ reservations, currentUser }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback((id: string) => {
    setDeletingId(id);
    axios.delete(`/api/reservations/${id}`)
		.then(() => {
      toast.success("Cancelaste tu reserva");
    })
		.catch((error)=>{
			toast.error(error?.response?.data?.error)
		})
		.finally(()=>{
			setDeletingId("")
		})
  }, [router]);

  return (
    <Container>
      <Heading title="Viajes" subtitle="Donde estuviste y donde vas a estar" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
				{reservations.map((reservation)=>{
					return <ListingCard
						key={reservation.id}
						data={reservation.listing}
						reservation={reservation}
						onAction={onCancel}
						actionId={reservation.id}
						disabled={deletingId === reservation.id}
						actionLabel="Cancelar reserva"
						currentUser={currentUser}
					/>
				})}
			</div>
    </Container>
  );
};

export default TripsClient;
