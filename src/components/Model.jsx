import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ModelView from "./ModelView";
import { useState, useRef, useEffect } from "react";
import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { animateWithGsapTimeline } from "../utils/animations";

const Model = () => {
    const[size, setSize] = useState('small');
    const[model, setModel] = useState({
        title: '3D Bird Model',
        color: ['#8F8A81'],
    });

    const cameraControlSmall = useRef();
    const cameraControlLarge = useRef();

    const small = useRef(new THREE.Group());
    const large = useRef(new THREE.Group());

    const [smallRotation, setSmallRotation] = useState(0);
    const [largeRotation, setLargeRotation] = useState(0);

    useGSAP(() => {
        gsap.to('#heading', {y:0, opacity: 1})
    }, [])

    const tl = gsap.timeline();
    
    useEffect(() => {
        if (size === 'large'){
            animateWithGsapTimeline(tl, small, smallRotation, '#view1', '#view2', {
                transform: 'translateX(-100%)',
                duration: 2
            })
        }
        if (size === 'small'){
            animateWithGsapTimeline(tl, large, largeRotation, '#view2', '#view1', {
                transform: 'translateX(0%)',
                duration: 2
            })
        }
    }, [size])

    return (
        <main className="flex flex-col items-center bg-transparent">
            <h1 id="heading" className="text-2xl font-semibold text-center opacity-0 translate-y-20">
                {model.title}
            </h1>

            <div className="mt-10 h-screen w-full flex items-center">
                <div className="relative h-[75vh] w-full flex items-center">
                    <div className="w-full h-full absolute">
                        <ModelView 
                            index={1} 
                            groupRef={small} 
                            gsapType="view1" 
                            controlRef={cameraControlSmall} 
                            setRotationState={setSmallRotation} 
                            item={model} 
                            size={size}
                        />
                    </div>
                    <div className="w-full h-full absolute">
                        <ModelView 
                            index={2} 
                            groupRef={large} 
                            gsapType="view2" 
                            controlRef={cameraControlLarge} 
                            setRotationState={setLargeRotation} 
                            item={model} 
                            size={size}
                        />
                    </div>
                    <Canvas
                        className="w-full h-full"
                        style={{
                            position: 'fixed',
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                            overflow: 'hidden'
                            }
                        }
                        eventSource={document.getElementById('root')}
                    >
                        <View.Port/>
                    </Canvas>
                </div>
            </div>
        </main>
    )
}

export default Model