"use client";
import useCountries from "@/hooks/useCountries";
import React from "react";
import Container from "../Container";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";
import { SafeUser } from "@/types";

interface Props {
  title: string;
  locationValue: string;
  imageSrc: string;
  id: string;
  currentUser: SafeUser | null | undefined;
}
const ListingHead: React.FC<Props> = ({
  title,
  locationValue,
  imageSrc,
  id,
  currentUser,
}) => {
	const {getByValue} = useCountries()
	const location = getByValue(locationValue)
	return <>
		<Heading title={title} subtitle={`${location?.region}, ${location?.label}`}/>
		<div className="w-full flex flex-col justify-center h-[60vh] overflow-hidden rounded-xl relative">
			<Image alt="image" src={imageSrc} fill className="object-cover w-full"/>
			<div className="absolute top-5 right-5">
				<HeartButton
					listingId={id}
					currentUser={currentUser}
				/>
			</div>
		</div>
	</>;
};

export default ListingHead;
