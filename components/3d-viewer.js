import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

class Model3DViewer {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.model = null;
        this.isLoading = false;
        this.autoRotateEnabled = false;

        this.init();
    }

    init() {
        // Get modal elements
        this.modal = document.getElementById('modelViewerModal');
        this.canvas = document.getElementById('threejs-canvas');
        this.openBtn = document.querySelector('.view-3d-btn');
        this.closeBtn = document.getElementById('closeModal');

        // Control elements
        this.rotationSpeedSlider = document.getElementById('rotationSpeed');
        this.zoomSlider = document.getElementById('zoomControl');
        this.resetBtn = document.getElementById('resetView');
        this.autoRotateBtn = document.getElementById('autoRotate');

        this.setupEventListeners();
    }

    setupEventListeners() {
        // Modal controls
        this.openBtn?.addEventListener('click', () => this.openModal());
        this.closeBtn?.addEventListener('click', () => this.closeModal());
        this.modal?.addEventListener('click', (e) => {
            if (e.target === this.modal || e.target.classList.contains('modal-overlay')) {
                this.closeModal();
            }
        });

        // 3D controls
        this.rotationSpeedSlider?.addEventListener('input', (e) => {
            if (this.controls) {
                this.controls.autoRotateSpeed = parseFloat(e.target.value);
            }
        });

        this.zoomSlider?.addEventListener('input', (e) => {
            if (this.camera) {
                const zoomValue = parseFloat(e.target.value);
                this.camera.position.setLength(10 / zoomValue);
            }
        });

        this.resetBtn?.addEventListener('click', () => this.resetView());
        this.autoRotateBtn?.addEventListener('click', () => this.toggleAutoRotate());

        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            if (this.modal?.classList.contains('active')) {
                if (e.key === 'Escape') {
                    this.closeModal();
                }
            }
        });
    }

    async openModal() {
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        if (!this.scene) {
            await this.initThreeJS();
            await this.loadModel();
        }

        this.startRenderLoop();
    }

    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        this.stopRenderLoop();
    }

    async initThreeJS() {
        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xf8f9fa);

        // Camera setup
        const aspect = this.canvas.clientWidth / this.canvas.clientHeight;
        this.camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
        this.camera.position.set(0, 0, 10);

        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // Lighting setup
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 10, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        this.scene.add(directionalLight);

        const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
        fillLight.position.set(-10, 0, -5);
        this.scene.add(fillLight);

        // Controls setup
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.enableZoom = true;
        this.controls.enablePan = true;
        this.controls.autoRotate = false;
        this.controls.autoRotateSpeed = 1.0;

        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize());
    }

    async loadModel() {
        this.showLoading();
        try {
            const modelPath = window.glbModelPath;
            await this.loadGLBModel(modelPath);
            this.hideLoading();
        } catch (error) {
            console.error('Error loading 3D model:', error);
            await this.createPlaceholderModel();
            this.hideLoading();
        }
    }

    async createPlaceholderModel() {
        // Create a placeholder 3D object until actual GLB model is provided
        const geometry = new THREE.BoxGeometry(3, 4, 1);
        const material = new THREE.MeshPhongMaterial({
            color: 0xd4af37,
            shininess: 100,
            transparent: true,
            opacity: 0.9
        });

        this.model = new THREE.Mesh(geometry, material);
        this.model.castShadow = true;
        this.model.receiveShadow = true;

        // Add some detail to make it more interesting
        const edgeGeometry = new THREE.EdgesGeometry(geometry);
        const edgeMaterial = new THREE.LineBasicMaterial({ color: 0x1a1a2e });
        const edges = new THREE.LineSegments(edgeGeometry, edgeMaterial);
        this.model.add(edges);

        this.scene.add(this.model);

        // Add a ground plane for shadows
        const planeGeometry = new THREE.PlaneGeometry(20, 20);
        const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.2 });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = -Math.PI / 2;
        plane.position.y = -3;
        plane.receiveShadow = true;
        this.scene.add(plane);
    }

    showLoading() {
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'model-loading';
        loadingDiv.id = 'modelLoading';
        loadingDiv.innerHTML = `
            <div class="loading-spinner"></div>
            <p>Loading 3D Model...</p>
        `;
        this.canvas.parentElement.appendChild(loadingDiv);
    }

    hideLoading() {
        const loadingDiv = document.getElementById('modelLoading');
        if (loadingDiv) {
            loadingDiv.remove();
        }
    }

    startRenderLoop() {
        const animate = () => {
            if (this.modal?.classList.contains('active')) {
                requestAnimationFrame(animate);

                if (this.controls) {
                    this.controls.update();
                }

                if (this.renderer && this.scene && this.camera) {
                    this.renderer.render(this.scene, this.camera);
                }
            }
        };
        animate();
    }

    stopRenderLoop() {
        // The render loop will stop automatically when modal is not active
    }

    onWindowResize() {
        if (!this.camera || !this.renderer || !this.modal?.classList.contains('active')) return;

        const width = this.canvas.clientWidth;
        const height = this.canvas.clientHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    resetView() {
        if (this.camera && this.controls) {
            this.camera.position.set(0, 0, 10);
            this.controls.reset();

            // Reset sliders
            if (this.zoomSlider) this.zoomSlider.value = '1';
            if (this.rotationSpeedSlider) this.rotationSpeedSlider.value = '1';
        }
    }

    toggleAutoRotate() {
        if (this.controls) {
            this.autoRotateEnabled = !this.autoRotateEnabled;
            this.controls.autoRotate = this.autoRotateEnabled;

            if (this.autoRotateBtn) {
                if (this.autoRotateEnabled) {
                    this.autoRotateBtn.textContent = 'Stop Rotation';
                    this.autoRotateBtn.classList.add('active');
                } else {
                    this.autoRotateBtn.textContent = 'Auto Rotate';
                    this.autoRotateBtn.classList.remove('active');
                }
            }
        }
    }

    // Method to load actual GLB file when provided
    async loadGLBModel(modelPath) {
        const loader = new GLTFLoader();

        try {
            const gltf = await new Promise((resolve, reject) => {
                loader.load(modelPath, resolve, undefined, reject);
            });

            // Remove existing model
            if (this.model) {
                this.scene.remove(this.model);
            }

            this.model = gltf.scene;
            this.model.castShadow = true;
            this.model.receiveShadow = true;

            // Scale and position the model appropriately
            const box = new THREE.Box3().setFromObject(this.model);
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 5 / maxDim;
            this.model.scale.setScalar(scale);

            // Center the model
            const center = box.getCenter(new THREE.Vector3());
            this.model.position.sub(center.multiplyScalar(scale));

            this.scene.add(this.model);

        } catch (error) {
            console.error('Error loading GLB model:', error);
            throw error;
        }
    }
}

// Initialize 3D viewer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.model3DViewer = new Model3DViewer();
});

export default Model3DViewer;