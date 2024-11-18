"use client";

import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import styles from "./Wrapper.module.css";
import { useScroll } from "framer-motion";
import ProgressBar from "./ProgressBar";
import { useRef } from "react";
import Background from "./Background";

export default function Wrapper() {
	const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  })

	return (
		<div ref={ref} className={styles.container}>
      
			<ProgressBar scrollYProgress={scrollYProgress} />

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
				<Experience scrollYProgress={scrollYProgress} />
			</Canvas>

			<div className={styles.placeholder}>screen 1</div>
			<div className={styles.placeholder}>screen 2</div>
			{/* <div className={styles.placeholder}>screen 3</div> */}

      <Background scrollYProgress={scrollYProgress} />
		</div>
	);
}
