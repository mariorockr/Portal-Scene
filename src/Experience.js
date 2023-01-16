import { shaderMaterial,Sparkles,Center, useTexture, useGLTF, OrbitControls } from '@react-three/drei'
import portalVertexShader from './shaders/portal/vertex.js'
import portalFragmentShader from './shaders/portal/fragment.js'
import * as THREE from 'three'
import { extend, useFrame } from '@react-three/fiber'
import { useRef } from 'react'

const PortalMaterial = shaderMaterial(
    {
        uTime: 0,
        uColorStart: new THREE.Color('#ffffff'),
        uColorEnd: new THREE.Color('#000000')
    },
    portalVertexShader,
    portalFragmentShader
)

extend({PortalMaterial})

export default function Experience() {

    const { nodes } = useGLTF('./model/portal.glb')
    const bakedTexture = useTexture('./model/baked.jpg')
    bakedTexture.flipY = false

    const portalMaterial = useRef()

    useFrame( (state,delta) => {
        portalMaterial.current.uTime += delta
    }, [])

    return <>

        <color args={['#201919']}
            attach={'background'}
        />
        <OrbitControls makeDefault />

        {/* <mesh scale={ 1.5 }>
            <boxGeometry />
            <meshNormalMaterial />
        </mesh> */}
        <Center>
            <mesh geometry={nodes.baked.geometry}
            >
                <meshBasicMaterial map={bakedTexture}></meshBasicMaterial>
            </mesh>

            <mesh 
            geometry={nodes.poleLightA.geometry} 
            position={nodes.poleLightA.position} >
                <meshBasicMaterial color={'#ffffe5'}></meshBasicMaterial>
            </mesh>

            <mesh 
            geometry={nodes.poleLightB.geometry} 
            position={nodes.poleLightB.position} >
                <meshBasicMaterial color={'#ffffe5'}></meshBasicMaterial>
            </mesh>

            <mesh 
            geometry={nodes.portalLight.geometry} 
            position={nodes.portalLight.position}
            rotation={nodes.portalLight.rotation}
            scale={nodes.portalLight.scale} >
              <portalMaterial ref={portalMaterial}>
              </portalMaterial>
            </mesh>

        <Sparkles
        size={6}
        scale={[4,2,4]}
        position-y={1}
        speed={0.2}
        count={40}
        >
            
        </Sparkles>

        </Center>


    </>
}