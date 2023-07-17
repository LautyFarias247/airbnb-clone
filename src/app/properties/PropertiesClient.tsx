"use client";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import { SafeListing, SafeUser } from "@/types";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "@/components/listings/ListingCard";

interface Props {
  listings: SafeListing[];
  currentUser: SafeUser;
}
const TripsClient: React.FC<Props> = ({ listings, currentUser }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback((id: string) => {
    setDeletingId(id);
    axios.delete(`/api/listings/${id}`)
		.then(() => {
      toast.success("Se borro tu publicación");
			router.refresh()
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
      <Heading title="Propiedades" subtitle="Lista de tus propiedades publicadas" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
				{listings.map((listing)=>{
					return <ListingCard
						key={listing.id}
						data={listing}
						
						onAction={onCancel}
						actionId={listing.id}
						disabled={deletingId === listing.id}
						actionLabel="Borrar propiedad"
						currentUser={currentUser}
					/>
				})}
			</div>
    </Container>
  );
};

export default TripsClient;
