"use client";
import { SafeUser } from "@/types";
import { IconType } from "react-icons";
import React from "react";
import useCountries from "@/hooks/useCountries";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../Map"), {
  ssr: false,
});

interface Props {
  user: SafeUser;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
  category: {
    icon: IconType;
    label: string;
    description: string;
  };
}
const ListingInfo: React.FC<Props> = ({
  user,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  locationValue,
  category,
}) => {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <div>Anfitrión: {user.name}</div>
          <Avatar src={user.image} />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>{guestCount} huéspedes</div>
          <div>{roomCount} dormitorios</div>
          <div>{bathroomCount} baños</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500 ">{description}</div>
      <hr />
      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
