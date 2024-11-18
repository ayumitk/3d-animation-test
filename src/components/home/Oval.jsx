"use client";

import { useGLTF } from "@react-three/drei";
import { useTransform } from "framer-motion";
import { motion } from "framer-motion-3d";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Oval(props) {
	const { nodes, materials } = useGLTF("./oval.glb");

	const { mouse, multiplier, position, metalness, roughness } = props;

	const newMaterials = materials;

	useEffect(() => {
		newMaterials.Material__V2.metalness = metalness;
		newMaterials.Material__V2.roughness = roughness;
	}, [newMaterials, metalness, roughness]);

	const ovalRef = useRef();

	const positionX = useTransform(
		mouse.x,
		[0, 1],
		[position[0] + multiplier * 0.15, position[0] - multiplier * 0.15],
	);
	const positionY = useTransform(
		mouse.y,
		[0, 1],
		[position[1] - multiplier * 0.15, position[1] + multiplier * 0.15],
	);

	useFrame(() => {
		if (ovalRef.current) {
			ovalRef.current.rotation.x += 0.001;
			ovalRef.current.rotation.y += 0.005;
		}
	});

	return (
		<motion.mesh
			ref={ovalRef}
			{...props}
			castShadow
			receiveShadow
			geometry={nodes.Oval3001.geometry}
			material={materials.Material__V2}
			position-x={positionX}
			position-y={positionY}
		/>
	);
}

useGLTF.preload("./oval.glb");
