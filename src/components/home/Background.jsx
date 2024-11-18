"use client";

import React, { useEffect, useRef } from "react";
import styles from "./Background.module.css";
import { motion } from "framer-motion";

export default function Background(props) {
	const canvasRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		const circles = [];
		const colors = [
			"rgba(246, 70, 255, 0.5)",
			"rgba(249, 255, 0, 0.7)",
			"rgba(0, 191, 255, 0.7)",
		];

		function createCircles() {
			for (let i = 0; i < 9; i++) {
				circles.push({
					x: Math.random() * canvas.width,
					y: Math.random() * canvas.height,
					radius: Math.random() * 150 + 50,
					color: colors[i % 3],
					speedX: (Math.random() - 0.5) * 3,
					speedY: (Math.random() - 0.5) * 3,
				});
			}
		}

		function animate() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			for (const circle of circles) {
				ctx.beginPath();
				ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);

				ctx.fillStyle = circle.color;
				ctx.shadowColor = circle.color;
				ctx.fill();

				circle.x += circle.speedX;
				circle.y += circle.speedY;

				if (
					circle.x - circle.radius > canvas.width ||
					circle.x + circle.radius < 0
				) {
					circle.speedX *= -1;
				}
				if (
					circle.y - circle.radius > canvas.height ||
					circle.y + circle.radius < 0
				) {
					circle.speedY *= -1;
				}
			}

			requestAnimationFrame(animate);
		}

		createCircles();
		animate();

		const handleResize = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<motion.canvas
			ref={canvasRef}
			className={styles.canvas}
			style={{ opacity: props.scrollYProgress }}
		/>
	);
}
