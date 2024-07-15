import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Cat = () => {
  const catRef = useRef();
  const leftEyeRef = useRef();
  const rightEyeRef = useRef();

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      const vector = new THREE.Vector3(x, y, 0.5).unproject(catRef.current);
      const dir = vector.sub(catRef.current.position).normalize();
      const distance = -catRef.current.position.z / dir.z;
      const pos = catRef.current.position
        .clone()
        .add(dir.multiplyScalar(distance));

      leftEyeRef.current.lookAt(pos);
      rightEyeRef.current.lookAt(pos);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <group ref={catRef}>
      <mesh position={[0, 1, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <mesh ref={leftEyeRef} position={[-0.3, 1.3, 0.8]}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh ref={rightEyeRef} position={[0.3, 1.3, 0.8]}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[-0.3, 1.3, 0.9]}>
        <sphereGeometry args={[0.05, 32, 32]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh position={[0.3, 1.3, 0.9]}>
        <sphereGeometry args={[0.05, 32, 32]} />
        <meshStandardMaterial color="black" />
      </mesh>
    </group>
  );
};

export default Cat;
