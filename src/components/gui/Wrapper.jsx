"use client";

import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import styles from "./Wrapper.module.css";

export default function Wrapper(props) {


	return (
		<div className={styles.container}>
      
			<Canvas
				className={styles.canvas}
				shadows
				camera={{
					fov: 45,
					near: 0.1,
					far: 200,
					position: [-4, 3, 6],
				}}
			>
				<Experience {...props} />
			</Canvas>

		</div>
	);
}
