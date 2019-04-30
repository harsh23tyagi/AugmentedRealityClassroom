import React, { Component } from 'react';
import * as THREE from 'three';
import GLTFLoader from 'three-gltf-loader';
//import gltfFile from './public/styles/BrainAreas.gltf';

//import brainpath from 'C:/Users/Chirag/Desktop/F8/Code/ReactJS_Seed_Project/public/styles/BrainAreas.gltf';
//import brain from 'BrainAreas.gltf';

class Minor extends Component {
    
    componentDidMount(){
        
        const width = this.mount.clientWidth
        const height = this.mount.clientHeight
        //ADD SCENE
        this.scene = new THREE.Scene()
        //ADD CAMERA
        this.camera = new THREE.PerspectiveCamera(
          75,
          width / height,
          0.1,
          1000
        )
        this.camera.position.z = 4
        //ADD RENDERER
        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.setClearColor('#f3f3f4')
        this.renderer.setSize(width, height)
        this.mount.appendChild(this.renderer.domElement)

        const loader = new GLTFLoader();
        //let uri = 'https://raw.githubusercontent.com/chiragpop/ARmodels/master/BrainAreas.gltf';
        
        // loader.load(
        //     gltfFile,
        //     ( gltf ) => {
                
        //     this.scene.add( gltf.scene );
        //     });
            
        // if( this.state.current.Race === null ) {
        //     loader.load(
        //       'BrainAreas.gltf',
        //       ( gltf ) => {
        //         this.scene.add( gltf.scene );
        //       },
        //     )
        //    } else {
        //     console.log( 'Not loaded' );
        //    }

        
        loader.load( 'BrainAreas.gltf', function ( gltf ) {
            this.scene.add( gltf.scene );
        }, undefined, function ( error ) {
            console.error( error );

        } );
        //ADD CUBE
        const geometry = new THREE.BoxGeometry(1, 1, 1)
        const material = new THREE.MeshBasicMaterial({ color: '#007fc6'     })
        this.cube = new THREE.Mesh(geometry, material)
        this.scene.add(this.cube)
    this.start()
      }
    componentWillUnmount(){
        this.stop()
        this.mount.removeChild(this.renderer.domElement)
      }
    start = () => {
        if (!this.frameId) {
          this.frameId = requestAnimationFrame(this.animate)
        }
      }
    stop = () => {
        cancelAnimationFrame(this.frameId)
      }
    animate = () => {
       this.cube.rotation.x += 0.01
       this.cube.rotation.y += 0.01
       this.renderScene()
       this.frameId = window.requestAnimationFrame(this.animate)
     }
    renderScene = () => {
      this.renderer.render(this.scene, this.camera)
    }
    render() {
        return (
            <div className="wrapper wrapper-content animated fadeInRight">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="text-center m-t-lg">
                            <h1>
                                AR Lecture Live View
                                <div
        style={{ width: '400px', height: '400px' }}
        ref={(mount) => { this.mount = mount }}
      />
                            </h1>
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Minor