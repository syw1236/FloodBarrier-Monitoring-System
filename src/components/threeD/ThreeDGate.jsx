import "./ThreeDGate.css";
import { useContext, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls, Plane, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { Water } from "three/examples/jsm/objects/Water.js";
import { OpenContext } from "../../pages/Control";
import { waterNormals } from "../../utils/threeTextures";

function Gate({ isOpen }) {
  const gateRef = useRef();

  useFrame(() => {
    if (!gateRef.current) return;
    const targetY = isOpen ? -0.8 : 1.0;

    gateRef.current.position.y = THREE.MathUtils.lerp(
      gateRef.current.position.y,
      targetY,
      0.05
    );
  });

  return (
    <mesh ref={gateRef} position={[0, 0.3, 0]}>
      <boxGeometry args={[10, 2, 0.3]} />
      <meshStandardMaterial color="#bdbdbd" />
    </mesh>
  );
}

function WavyWater() {
  const waterGroup = useRef();

  useEffect(() => {
    const geometry = new THREE.PlaneGeometry(30, 30);
    const water = new Water(geometry, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: waterNormals,
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x1ca3ec,
      distortionScale: 2.0,
      fog: false,
    });

    water.rotation.x = -Math.PI / 2;
    water.position.y = 0;
    waterGroup.current.add(water);
    waterGroup.current.water = water;
  }, []);

  useFrame((_, delta) => {
    if (!waterGroup.current?.water) return;
    waterGroup.current.water.material.uniforms["time"].value += delta;
  });

  return <group ref={waterGroup} />;
}

function GroundPlane() {
  return (
    <Plane rotation={[-Math.PI / 2, 0, 0]} args={[30, 30]}>
      <meshStandardMaterial color="#E0E0E0" />
    </Plane>
  );
}

const ThreeDGate = () => {
  const isOpen = useContext(OpenContext);

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[0, 1.5, 6]}
        fov={50}
        onUpdate={(self) => self.lookAt(0, 0.5, 0)}
      />
      <OrbitControls enableRotate={false} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} castShadow />

      {isOpen ? <GroundPlane /> : <WavyWater />}

      <Gate isOpen={isOpen} />
    </>
  );
};

export default ThreeDGate;
