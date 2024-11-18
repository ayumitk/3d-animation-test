"use client";

import { useGLTF, useTexture } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { GUI } from "dat.gui";

export default function Cube(props) {
	const { nodes, materials } = useGLTF("./cube.glb");
	const ref = useRef();

	// console.log(materials);

	const { metalness, roughness } = props;

	const newMaterials = materials;

	useEffect(() => {
		newMaterials.Material__V2.metalness = metalness;
		newMaterials.Material__V2.roughness = roughness;
	}, [newMaterials, metalness, roughness]);

	useFrame(() => {
		if (ref.current) {
			ref.current.rotation.x += 0.002;
			ref.current.rotation.y -= 0.003;
		}
	});

	useEffect(() => {
		const gui = new GUI();
		const modelFolder = gui.addFolder("Cube");

		const materialFolder = modelFolder.addFolder("Material");
		materialFolder.add(ref.current.material, "metalness", 0, 1);
		materialFolder.add(ref.current.material, "roughness", 0, 1);

		const rotationFolder = modelFolder.addFolder("Rotation");
		rotationFolder.add(ref.current.rotation, "x", 0, Math.PI * 2);
		rotationFolder.add(ref.current.rotation, "y", 0, Math.PI * 2);
		rotationFolder.add(ref.current.rotation, "z", 0, Math.PI * 2);

		modelFolder.close();
		materialFolder.open();
		rotationFolder.open();

		return () => {
			gui.destroy();
		};
	}, []);

	const colorMap = useTexture("./texture.jpg");

	return (
		<motion.mesh
			ref={ref}
			{...props}
			castShadow
			receiveShadow
			geometry={nodes.Cube1.geometry}
			material={materials.Material__V2}
		>
			{/* <meshStandardMaterial
        metalness={1.0}
        roughnessMap={colorMap}
				color={[0.5213989615440369, 0.44702160358428955, 0.44701555371284485]}
			/> */}
		</motion.mesh>
	);
}

useGLTF.preload("./cube.glb");
