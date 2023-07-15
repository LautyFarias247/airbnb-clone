"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Heading from "./Heading";
import Button from "./Button";

interface Props {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}
const EmptyState: React.FC<Props> = ({
  title = "No hay coincidencias exactas",
  subtitle = "Prueba cambiar o eliminar algunos filtros o ajustar la zona de búsqueda.",
  showReset,
}) => {
  const router = useRouter();
  return (
    <div className="h-[60vh] flex flex-col justify-center items-center">
      <Heading title={title} subtitle={subtitle} center/>
			<div className="w-48 mt-4">
				{showReset && (<Button
					outline
					label="Quitar filtros"
					onClick={()=> router.push('/')}
				/>)}
			</div>
    </div>
  );
};

export default EmptyState;
