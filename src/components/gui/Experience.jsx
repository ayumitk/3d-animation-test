"use client";

import { OrbitControls, Environment, Float } from "@react-three/drei";
import Oval from "./Oval";
import Cube from "./Cube";
import { useEffect, useRef } from "react";
import { GUI } from 'dat.gui'

export default function Experience(props) {
  const {lightIntensity, colorIntensity, roughness, metalness} = props

  const lightRef = useRef()
  const pinkRef = useRef()
  const yellowRef = useRef()
  const blueRef = useRef()

  useEffect(() => {
    const gui = new GUI()
    const lightsFolder = gui.addFolder('Lights')

    const mainFolder = lightsFolder.addFolder('Main Light Position')
    mainFolder.add(lightRef.current, "intensity", 0, 10).name("Intensity");
    mainFolder.add(lightRef.current.position, 'x', -100, 100)
    mainFolder.add(lightRef.current.position, 'y', -100, 100)
    mainFolder.add(lightRef.current.position, 'z', -100, 100)

    const pinkFolder = lightsFolder.addFolder('Pink Light Position')
    pinkFolder.add(pinkRef.current, "intensity", 0, 100).name("Intensity");
    pinkFolder.add(pinkRef.current.position, 'x', -20, 20)
    pinkFolder.add(pinkRef.current.position, 'y', -20, 20)
    pinkFolder.add(pinkRef.current.position, 'z', -20, 20)

    const yellowFolder = lightsFolder.addFolder('Yellow Light Position')
    yellowFolder.add(yellowRef.current, "intensity", 0, 100).name("Intensity");
    yellowFolder.add(yellowRef.current.position, 'x', -20, 20)
    yellowFolder.add(yellowRef.current.position, 'y', -20, 20)
    yellowFolder.add(yellowRef.current.position, 'z', -20, 20)

    const blueFolder = lightsFolder.addFolder('Blue Light Position')
    blueFolder.add(blueRef.current, "intensity", 0, 100).name("Intensity");
    blueFolder.add(blueRef.current.position, 'x', -20, 20)
    blueFolder.add(blueRef.current.position, 'y', -20, 20)
    blueFolder.add(blueRef.current.position, 'z', -20, 20)

    lightsFolder.close()
    mainFolder.open()
    pinkFolder.open()
    yellowFolder.open()
    blueFolder.open()

    return () => {
      gui.destroy()
    }
  }, [])

  return (
    <>
      {/* <OrbitControls makeDefault /> */}

      <Environment files="./studio_small_08_1k.exr" environmentIntensity={0.5} />

      <directionalLight ref={lightRef} intensity={lightIntensity} position={[-100, 0, 0]} />

      <directionalLight
      ref={pinkRef}
        intensity={colorIntensity}
        color="#f646ff" // pink
        position={[8, 6, -5]}
      />
      <directionalLight
      ref={yellowRef}
        intensity={colorIntensity}
        color="#f9ff00" // yellow
        position={[-7, -6, -7]}
      />
      <directionalLight
      ref={blueRef}
        intensity={colorIntensity}
        color="#00bfff" // blue
        position={[-4, 0, -7]}
      />

      <Float>
        <Oval
          scale={1}
          metalness={metalness}
          roughness={roughness}
          position={[-1.5, 0, 0]}
          rotation={[0.2, 1.8, 1.259]}
          multiplier={4}
        />

        <Cube
          scale={0.8}
          metalness={metalness}
          roughness={roughness}
          position={[2, 0, 0]}
          rotation={[-0.9, -0.5, -0.08]}
          multiplier={1}
        />
      </Float>
    </>
  );
}
