'use client'

interface Props {
	error: Error
}

import EmptyState from '@/components/EmptyState'
import React, { useEffect } from 'react'

const ErrorState: React.FC<Props> = ({error}) => {
	useEffect(()=>{
		console.error(error)
	},[error])
	return (
		<EmptyState
			title='Ocurrió un error'
			subtitle='Refresca la página o vuelve a intentar más tarde'
		/>
	)
}

export default ErrorState