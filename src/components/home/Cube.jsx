"use client";

import { useGLTF } from "@react-three/drei";
import { useTransform } from "framer-motion";
import { motion } from "framer-motion-3d";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Cube(props) {
	const { nodes, materials } = useGLTF("./cube.glb");
	const cubeRef = useRef();

	const {
		// mouse,
		// multiplier,
		// position,
		metalness,
		roughness,
	} = props;

	const newMaterials = materials;

	useEffect(() => {
		newMaterials.Material__V2.metalness = metalness;
		newMaterials.Material__V2.roughness = roughness;
	}, [newMaterials, metalness, roughness]);

	// const positionX = useTransform(
	// 	mouse.x,
	// 	[0, 1],
	// 	[position[0] + multiplier * 1.7, position[0] - multiplier * 1.7],
	// );
	// const positionY = useTransform(
	// 	mouse.y,
	// 	[0, 1],
	// 	[position[1] - multiplier * 1.7, position[1] + multiplier * 1.7],
	// );

	useFrame(() => {
		if (cubeRef.current) {
			cubeRef.current.rotation.x += 0.002;
			cubeRef.current.rotation.y -= 0.003;
		}
	});

	return (
		<motion.mesh
			ref={cubeRef}
			{...props}
			castShadow
			receiveShadow
			geometry={nodes.Cube1.geometry}
			material={materials.Material__V2}
			// position-x={positionX}
      // position-y={positionY}
		/>
	);
}

useGLTF.preload("./cube.glb");
