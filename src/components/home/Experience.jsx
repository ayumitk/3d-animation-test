"use client";

import { OrbitControls, Environment, Float } from "@react-three/drei";
import Oval from "./Oval";
import Cube from "./Cube";
import { useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion-3d";

export default function Experience(props) {
	const mouse = {
		x: useMotionValue(0),
		y: useMotionValue(0),
	};

	const smoothMouse = {
		x: useSpring(mouse.x, { stiffness: 75, damping: 100, mass: 3 }),
		y: useSpring(mouse.y, { stiffness: 75, damping: 100, mass: 3 }),
	};

	const manageMouse = (e) => {
		const { innerWidth, innerHeight } = window;
		const { clientX, clientY } = e;
		const x = clientX / innerWidth;
		const y = clientY / innerHeight;
		mouse.x.set(x);
		mouse.y.set(y);
	};

	useEffect(() => {
		window.addEventListener("mousemove", manageMouse);
		return () => window.removeEventListener("mousemove", manageMouse);
	}, []);

	const [lightIntensity, setLightIntensity] = useState(40);
	const [colorIntensity, setColorIntensity] = useState(0);
	const [roughness, setroughness] = useState(0.8);
	const [metalness, setMetalness] = useState(1.3);

	useEffect(() => {
		const unsubscribe = props.scrollYProgress.onChange((value) => {
			const newLightIntensity = 40 - value * 35;
			const newColorIntensity = value * 10;
			const newRoughness = 0.8 - value * 0.4;
			const newMetalness = 1.3 - value * 0.4;
			setLightIntensity(newLightIntensity);
			setColorIntensity(newColorIntensity);
			setroughness(newRoughness);
			setMetalness(newMetalness);
		});
		return () => unsubscribe();
	}, [props.scrollYProgress]);

	const groupRef = useRef();

	useEffect(() => {
		const unsubscribe = props.scrollYProgress.onChange((value) => {
			const newRotationY = value * Math.PI * 2;
			const newRotationX = value * Math.PI * 0.25;
			if (groupRef.current) {
				groupRef.current.rotation.y = newRotationY;
				groupRef.current.rotation.x = newRotationX;
			}
		});
		return () => unsubscribe();
	}, [props.scrollYProgress]);

	const lightRef = useRef();

	// useEffect(() => {
	// 	const unsubscribe = props.scrollYProgress.onChange((value) => {
	// 		const newRotationY = - value * Math.PI;
	// 		const newRotationX = - value * Math.PI;
	// 		if (lightRef.current) {
	// 			lightRef.current.rotation.y = newRotationY;
	// 			lightRef.current.rotation.x = newRotationX;
	// 		}
	// 	});
	// 	return () => unsubscribe();
	// }, [props.scrollYProgress]);

	return (
		<>
			{/* <OrbitControls makeDefault /> */}

			<Environment
				files="./studio_small_08_1k.exr"
				environmentIntensity={0.5}
			/>

			<directionalLight intensity={lightIntensity} position={[-100, 0, 0]} />

			<group ref={lightRef}>
				<directionalLight
					intensity={colorIntensity}
					color="#f646ff" // pink
					position={[8, 6, -5]}
				/>
				<directionalLight
					intensity={colorIntensity}
					color="#f9ff00" // yellow
					position={[-7, -6, -7]}
				/>
				<directionalLight
					intensity={colorIntensity}
					color="#00bfff" // blue
					position={[-4, 0, -7]}
				/>
			</group>

			<Float>
				<motion.group
					initial={{ scale: 3 }}
					animate={{ rotateY: Math.PI * 2, scale: 1 }}
					transition={{ duration: 1.5, ease: "easeInOut" }}
				>
					<group ref={groupRef}>
						<Oval
							scale={1}
							metalness={metalness}
							roughness={roughness}
							position={[-1.5, 0, 0]}
							rotation={[0.2, 1.8, 1.259]}
							mouse={smoothMouse}
							multiplier={4}
						/>

						<Cube
							scale={0.8}
							metalness={metalness}
							roughness={roughness}
							position={[2, 0, 0]}
							rotation={[-0.9, -0.5, -0.08]}
							mouse={smoothMouse}
							multiplier={1}
						/>
					</group>
				</motion.group>
			</Float>
		</>
	);
}
