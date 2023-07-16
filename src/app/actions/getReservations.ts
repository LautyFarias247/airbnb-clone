import prisma from "@/libs/prismadb";
import { SafeReservation } from "@/types";

interface IParams {
	listingId?: string
	userId?: string
	authorId?: string
}

export default async function getReservations(params: IParams) {
	const { listingId,userId,authorId } = params
	const query: any = {}
	try {

		if (listingId) query.listingId = listingId
		if (userId) query.userId = userId
		if (authorId) query.listing = { userId: authorId }

		const reservations = await prisma.reservation.findMany({
			where: query,
			include: {
				listing: true
			},
			orderBy: {
				createdAt: 'desc'
			}
		})

		const safeReservation: SafeReservation[] = reservations.map((reservation) => {
			return {
				...reservation,
				createdAt: reservation.createdAt.toISOString(),
				startDate: reservation.startDate.toISOString(),
				endDate: reservation.endDate.toISOString(),
				listing: {
					...reservation.listing,
					createdAt: reservation.listing?.createdAt.toISOString()
				}
			}
		})
		return safeReservation
	} catch (error: any) {
		throw new Error(error)
	}
}