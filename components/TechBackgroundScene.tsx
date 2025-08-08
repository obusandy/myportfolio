"use client";

import React, { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

/** ✅ Digital Rain (binary stream) */
function DigitalRain() {
  const groupRef = useRef<THREE.Group>(null);

  const streams = useMemo(() => {
    return Array.from({ length: 40 }, () => ({
      x: (Math.random() - 0.5) * 30,
      z: (Math.random() - 0.5) * 20,
      speed: 0.4 + Math.random() * 1.2,
      length: 5 + Math.random() * 10,
      opacity: 0.1 + Math.random() * 0.15,
    }));
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        child.position.y -= streams[i].speed * 0.1;
        if (child.position.y < -10) {
          child.position.y = 10;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {streams.map((stream, i) => (
        <group key={i} position={[stream.x, 10, stream.z]}>
          <Text
            fontSize={0.2}
            color="#00ff88"
            anchorX="center"
            anchorY="middle"
            material-transparent
            material-opacity={stream.opacity}
          >
            {Array.from({ length: Math.floor(stream.length) }, () =>
              Math.random() > 0.5 ? "1" : "0"
            ).join("\n")}
          </Text>
        </group>
      ))}
    </group>
  );
}

/** ✅ Background Grid with visible square lines */
function BackgroundGrid() {
  const texture = useMemo(() => {
    const size = 1024;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = "black"; // solid dark background
    ctx.fillRect(0, 0, size, size);

    ctx.strokeStyle = "rgba(0, 204, 255, 0.15)"; // Much lower opacity than before
    ctx.lineWidth = 1.2; // thinner lines

    const step = 150; // Large grid cells
    for (let i = 0; i <= size; i += step) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, size);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(size, i);
      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 3); // fewer, larger squares
    texture.anisotropy = 16;
    texture.needsUpdate = true;

    return texture;
  }, []);

  return (
    <mesh position={[0, 0, -5]} scale={[50, 30, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        map={texture}
        transparent={false}
        opacity={1}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}

/** ✅ Final Scene */
const TechBackgroundScene = () => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "#000" }}
      >
        <Suspense fallback={null}>
          <fog attach="fog" args={["#000000", 30, 60]} />
          <ambientLight intensity={0.1} />

          <BackgroundGrid />
          <DigitalRain />
        </Suspense>
      </Canvas>
      <div className="bg-gradient-radial-to-center" />
    </div>
  );
};

export default TechBackgroundScene;
