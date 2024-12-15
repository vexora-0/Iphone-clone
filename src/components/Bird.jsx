import React, { useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

function Bird(props) {
  const group = useRef();
  const { scene, animations } = useGLTF('/utils/scene.gltf');
  const { actions } = useAnimations(animations, group);

  // Play the first animation if available
  React.useEffect(() => {
    if (animations.length > 0) {
      const firstAnimation = Object.values(actions)[0];
      firstAnimation.play();
    }
  }, [actions, animations]);

  return (
    <group ref={group} {...props}>
      <primitive object={scene} />
    </group>
  );
}

export default Bird;

useGLTF.preload('/utils/scene.gltf')