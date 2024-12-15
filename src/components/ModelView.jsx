import { OrbitControls, PerspectiveCamera, View } from "@react-three/drei";
import Lights from "./Lights";
import { Suspense } from "react";
import Bird from "./Bird";
import * as THREE from "three";
import Loader from "./Loader";

const ModelView = ({
  index,
  groupRef,
  gsapType,
  controlRef,
  setRotationState,
  size,
  item,
}) => {
  return (
    <View
      index={index}
      id={gsapType}
      className={`w-full h-full absolute ${index === 2 ? 'right-[-100%]' : ''}`}
    >
      <ambientLight intensity={0.5} />
      <directionalLight intensity={2} position={[10, 10, 5]} />

      <PerspectiveCamera makeDefault position={[0, 0, 50]} />
      <Lights />
      
      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0,0,0)}
        onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
      />
      <group ref={groupRef} name={`${index === 1 ? 'small' : 'large'}`} position={[0, 0, 0]}>
        <Suspense fallback={<Loader />}>
          <Bird 
            scale={index === 1 ? [0.02, 0.02, 0.02] : [0.025, 0.025, 0.025]}
            position={[0, -2, 0]}
            rotation={[0, Math.PI, 0]}
          />
        </Suspense>
      </group>
    </View>
  );
};

export default ModelView;
