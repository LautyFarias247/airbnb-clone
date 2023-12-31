"use client";
import React from "react";
import Container from "../Container";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiWindmill,
  GiIsland,
  GiBoatFishing,
  GiForestCamp,
  GiCactus,
  GiCaveEntrance,
} from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { BsSnow } from "react-icons/bs";
import { IoDiamondOutline } from "react-icons/io5";
import { FaSkiing } from "react-icons/fa";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
export const categories = [
  {
    label: "Playa",
    icon: TbBeach,
    description: "Esta propiedad esta cerca de la playa",
  },
  {
    label: "Molinos",
    icon: GiWindmill,
    description: "Esta propiedad es un molino!",
  },
  { label: "Moderno", icon: MdOutlineVilla, description: "Casa moderna" },
  // {
  //   label: "En las alturas",
  //   icon: TbMountain,
  //   description: "Casa en el campo",
  // },
  {
    label: "Albercas",
    icon: TbPool,
    description: "Esta casa tiene una alberca!",
  },
  {
    label: "Islas",
    icon: GiIsland,
    description: "Esta casa esta en una isla",
  },
  {
    label: "En el lago",
    icon: GiBoatFishing,
    description: "Esta casa esta en lago",
  },
  {
    label: "Casas de campo",
    icon: GiForestCamp,
    description: "Esta casa esta en el campo",
  },
  {
    label: "Esquí",
    icon: FaSkiing,
    description: "Esta casa esta cerca de pistas de esquí!",
  },
  {
    label: "Ártico",
    icon: BsSnow,
    description: "Esta casa esta en la nieve!",
  },
  {
    label: "Cuevas",
    icon: GiCaveEntrance,
    description: "Esta casa esta una cueva",
  },
  {
    label: "Desierto",
    icon: GiCactus,
    description: "Esta casa esta en el desierto",
  },
  {
    label: "Luxe",
    icon: IoDiamondOutline,
    description: "Esta es una casa de lujo!",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item) => {
          return (
            <CategoryBox
              key={item.label}
              label={item.label}
              icon={item.icon}
              selected={category === item?.label}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default Categories;
