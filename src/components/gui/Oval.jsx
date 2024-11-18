"use client";

import { useGLTF } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { GUI } from 'dat.gui'

export default function Oval(props) {
	const { nodes, materials } = useGLTF("./oval.glb");

	const { metalness, roughness } = props;

	const newMaterials = materials;

	useEffect(() => {
		newMaterials.Material__V2.metalness = metalness;
		newMaterials.Material__V2.roughness = roughness;
	}, [newMaterials, metalness, roughness]);

	const ref = useRef();

	useFrame(() => {
		if (ref.current) {
			ref.current.rotation.x += 0.001;
			ref.current.rotation.y += 0.005;
		}
	});

  useEffect(() => {
    const gui = new GUI()
    const modelFolder = gui.addFolder('Oval')

    const materialFolder = modelFolder.addFolder('Material')
    materialFolder.add(ref.current.material, 'metalness', 0, 1)
    materialFolder.add(ref.current.material, 'roughness', 0, 1)

    const rotationFolder = modelFolder.addFolder('Rotation')
    rotationFolder.add(ref.current.rotation, 'x', 0, Math.PI * 2)
    rotationFolder.add(ref.current.rotation, 'y', 0, Math.PI * 2)
    rotationFolder.add(ref.current.rotation, 'z', 0, Math.PI * 2)

    modelFolder.close()
    materialFolder.open()
    rotationFolder.open()

    return () => {
      gui.destroy()
    }
  }, [])

	return (
		<motion.mesh
			ref={ref}
			{...props}
			castShadow
			receiveShadow
			geometry={nodes.Oval3001.geometry}
			material={materials.Material__V2}
		/>
	);
}

useGLTF.preload("./oval.glb");
