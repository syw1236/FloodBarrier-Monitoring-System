import { useRef, useEffect, useContext } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Text } from "@react-three/drei";
import * as THREE from "three";
import { Water } from "three/examples/jsm/objects/Water.js";
import { THRESHOLD } from "../../utils/constants";
import { waterNormals } from "../../utils/threeTextures";
import { WaterThresholdContext } from "../../App";

function normalizeLevel(value, min = THRESHOLD.min, max = THRESHOLD.max) {
  return Math.min(Math.max((value - min) / (max - min), 0), 1);
}

function GaugeScale({ min = THRESHOLD.min, max = THRESHOLD.max, step = 1 }) {
  const ticks = [];
  for (let i = min; i <= max; i += step) {
    const y = ((i - min) / (max - min)) * 2;
    ticks.push(
      <group key={i}>
        <mesh position={[0.5, y, 0]} renderOrder={2}>
          <boxGeometry args={[0.1, 0.005, 0.02]} />
          <meshStandardMaterial color="#555" />
        </mesh>
        <Text
          position={[0.65, y, 0]}
          fontSize={0.12}
          color="#222"
          anchorX="left"
          anchorY="middle"
          renderOrder={3}
          material-depthTest={false}
        >
          {i}
        </Text>
      </group>
    );
  }
  return <group renderOrder={3}>{ticks}</group>;
}

function WaterSurface() {
  const waterValue = useContext(WaterThresholdContext);
  const ref = useRef();
  const waterRef = useRef();
  const bodyRef = useRef();
  const levelRatio = normalizeLevel(waterValue);

  useEffect(() => {
    const geometry = new THREE.PlaneGeometry(17, 7, 256, 256);
    const water = new Water(geometry, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: waterNormals,
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x0077be,
      distortionScale: 3.7,
      fog: false,
    });

    water.rotation.x = -Math.PI / 2;

    water.position.y = levelRatio * 2;
    ref.current.add(water);
    waterRef.current = water;

    const bodyGeometry = new THREE.BoxGeometry(17, 1, 7);
    bodyGeometry.translate(0, 0.5, 0);
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x0077be,
      transparent: true,
      opacity: 0.5,
    });

    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.set(0, 0, 0);
    ref.current.add(body);
    bodyRef.current = body;
  }, []);

  useFrame((_, delta) => {
    if (waterRef.current) {
      waterRef.current.material.uniforms["time"].value += delta;

      const MIN_Y = 0;
      const MAX_Y = 2.01;

      const targetY = MIN_Y + (MAX_Y - MIN_Y) * levelRatio;

      waterRef.current.position.y = THREE.MathUtils.lerp(
        waterRef.current.position.y,
        targetY,
        0.05
      );

      bodyRef.current.scale.y = THREE.MathUtils.lerp(
        bodyRef.current.scale.y,
        targetY,
        0.05
      );
    }
  });

  return <group ref={ref} position={[0, 0, 0]} />;
}

const ThreeDWater = () => {
  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[0, 1, 4.7]}
        fov={50}
        onUpdate={(self) => self.lookAt(0, 1, 0)}
      />
      <OrbitControls enableRotate={false} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} />

      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[0.15, 2, 0.1]} />
        <meshStandardMaterial color="#bdbdbd" />
      </mesh>

      <GaugeScale />

      <WaterSurface />
    </>
  );
};

export default ThreeDWater;
