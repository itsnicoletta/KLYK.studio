<template>
    <div ref="wrapRef" class="w-full h-full absolute top-0 left-0 right-0 bottom-0 overflow-visible">
        <canvas ref="canvasRef" class="w-full h-full block"></canvas>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    AmbientLight,
    DirectionalLight,
    Box3,
    Vector2,
    Vector3,
    Group,
    PlaneGeometry,
    Mesh,
    ShadowMaterial,
    SRGBColorSpace,
    ACESFilmicToneMapping,
    PMREMGenerator,
    Raycaster,
    Color,
    CanvasTexture,
    MeshStandardMaterial,
    LinearFilter,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

const wrapRef = ref(null);
const canvasRef = ref(null);

// ================= CONFIG =================
const MODEL_URL = "/models/pc.glb";

// Blender object names
const SCREEN_NAME = "Schermo_computer";
const HITBOX_NAME = "hb_pc_power_raycaster_pointer";
const TEXT_NAME = "hello_world";

// Pose
const FINAL_ROT_Y = -0.35;
const FINAL_ROT_X = 0.05;

// Enter anim
const ENTER_FROM_X = 1.0;
const ENTER_ROT_Z = 0.45;
const ENTER_DURATION = 850;

// Press anim
const PRESS_DEPTH = 0.02;
const PRESS_DOWN_MS = 80;
const PRESS_UP_MS = 140;
const PRESS_AXIS_LOCAL = new Vector3(0, 0, -1);

// Hello fade + glow
const TEXT_FADE_MS = 550;
const TEXT_EMISSIVE_ON = 6.5;
const TEXT_COLOR_ON = 0x33ff66;

// Screen
const SCREEN_FADE_MS = 220;
const SCREEN_EMISSIVE_ON = 0.95;
const SCREEN_COLOR_ON = 0x09322a;
const SCREEN_COLOR_OFF = 0x050608;

// Hello plane sizing (relative to screen mesh)
const HELLO_PLANE_W = 0.86;
const HELLO_PLANE_H = 0.4;

// Canvas texture
const HELLO_CANVAS_W = 1024;
const HELLO_CANVAS_H = 512;

// Font
const HELLO_FONT_FAMILY = '"Courier New", Courier, monospace';
const HELLO_FONT_SIZE = 78;
const HELLO_LINE_HEIGHT = 106;
const HELLO_LETTER_SPACING = 2.0;
const HELLO_GLOW_BLUR = 18;
const HELLO_GLOW_ALPHA = 0.9;

// Typing
const HELLO_MESSAGE = "Hello, this is\n KLYK.studio";
const TYPE_INTERVAL_MS = 38;
const CURSOR_BLINK_MS = 420;

// Responsive
const BP_PHONE_MAX = 650;
const BP_MID_MAX = 1280;
const CAMERA_PADDING = 1.25;

const DOLLY_DESKTOP = 1.3; // > 1280
const DOLLY_MID = 1.2; // 650–1280
const DOLLY_PHONE = 1.45; // < 650

const GLOBAL_FRAMING = 0.6;

// ✅ MODEL LAYOUT SHIFT (tuning)
const MODEL_SHIFT_X_DESKTOP = 0.55; // modello più a destra
const MODEL_SHIFT_X_MID = 0.35;
const MODEL_SHIFT_Y_PHONE = -0.75; // modello più in basso (valore negativo)

// Reduce motion
const reduceMotion =
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

// ================= STATE =================
let renderer = null,
    scene = null,
    camera = null,
    rafId = null,
    resizeObserver = null,
    dracoLoader = null,
    pmrem = null;

let pivot = null;
let modelRoot = null;

let screenObj = null;
let hitboxObj = null;
let textObj = null;

let shadowPlane = null;

const raycaster = new Raycaster();
const pointer = new Vector2();
let hovering = false;

let isOn = false;

// model metrics
const modelSize = new Vector3(1, 1, 1);
let modelRadius = 1;

// responsive camera
let dolly = DOLLY_DESKTOP;
let lastDollyKey = "";

// ✅ responsive model offset (layout)
let baseOffset = new Vector3(0, 0, 0);
let lastOffsetKey = "";
let enterOffsetX = 0;

// press
let hitboxBasePos = null;
let pressStart = null;
let pressing = false;

// enter
let enterStart = null;
let entered = false;

// screen anim
let screenMats = [];
let screenAnimStart = null;
let screenFrom = 0;
let screenTo = 0;
let screenProgress = 0;

// hello plane
let helloPlane = null;
let helloMat = null;
let helloTex = null;
let helloCanvas = null;
let helloCtx = null;

// hello fade anim
let helloAnimStart = null;
let helloFrom = 0;
let helloTo = 0;
let helloProgress = 0;
let helloHideAtEnd = false;

// typing
let typingActive = false;
let typedCount = 0;
let lastTypeAt = 0;
let cursorOn = true;
let lastCursorAt = 0;

// ================= HELPERS =================
function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

function getPointerNDC(e) {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
}

function computeDolly(w, h) {
    const isCoarse = window.matchMedia?.("(pointer: coarse)")?.matches ?? false;
    const isPhone = w < BP_PHONE_MAX || (isCoarse && h <= 520 && w <= 950);

    if (isPhone) return DOLLY_PHONE;
    if (w <= BP_MID_MAX) return DOLLY_MID;
    return DOLLY_DESKTOP;
}

function updateCameraFraming() {
    if (!camera || !renderer || !isFinite(modelRadius)) return;

    const vFov = (camera.fov * Math.PI) / 180;
    const aspect = camera.aspect || 1;
    const hFov = 2 * Math.atan(Math.tan(vFov / 2) * aspect);

    const distV = modelRadius / Math.sin(vFov / 2);
    const distH = modelRadius / Math.sin(hFov / 2);
    const dist = Math.max(distV, distH) * CAMERA_PADDING * dolly * GLOBAL_FRAMING;

    camera.position.set(0, modelSize.y * 0.06, dist);
    camera.near = Math.max(0.01, dist / 50);
    camera.far = dist * 50;
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
}

function applyResponsiveDolly(w, h) {
    const d = computeDolly(w, h);
    const key = String(d);
    if (key === lastDollyKey) return;
    lastDollyKey = key;
    dolly = d;
    updateCameraFraming();
}

// ✅ compute model offset (responsive) — sposti il modello, non il canvas
function computeModelOffset(w, h) {
    const isCoarse = window.matchMedia?.("(pointer: coarse)")?.matches ?? false;
    const isPhone = w < BP_PHONE_MAX || (isCoarse && h <= 520 && w <= 950);

    const sx = isFinite(modelSize.x) ? modelSize.x : 1;
    const sy = isFinite(modelSize.y) ? modelSize.y : 1;

    if (isPhone) return new Vector3(0, sy * MODEL_SHIFT_Y_PHONE, 0);
    if (w <= BP_MID_MAX) return new Vector3(sx * MODEL_SHIFT_X_MID, 0, 0);
    return new Vector3(sx * MODEL_SHIFT_X_DESKTOP, 0, 0);
}

function applyResponsiveModelOffset(w, h) {
    const off = computeModelOffset(w, h);
    const key = `${off.x.toFixed(4)}|${off.y.toFixed(4)}`;
    if (key === lastOffsetKey) return;
    lastOffsetKey = key;
    baseOffset.copy(off);

    // se l'enter è finito, aggiorna subito la posizione
    if (pivot && entered) {
        pivot.position.set(baseOffset.x, baseOffset.y, baseOffset.z);
    }
}

function resizeToContainer() {
    if (!wrapRef.value || !renderer || !camera) return;

    const rect = wrapRef.value.getBoundingClientRect();
    const w = Math.max(1, Math.floor(rect.width));
    const h = Math.max(1, Math.floor(rect.height));
    if (w <= 1 || h <= 1) return;

    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();

    applyResponsiveDolly(w, h);
    applyResponsiveModelOffset(w, h);
    // updateCameraFraming è già gestita da applyResponsiveDolly quando serve
}

function centerModel(model) {
    const box = new Box3().setFromObject(model);
    const center = new Vector3();
    const size = new Vector3();
    box.getCenter(center);
    box.getSize(size);

    const p = new Group();
    p.add(model);
    model.position.sub(center);

    const radius = size.length() * 0.5;
    return { pivot: p, size, radius };
}

function collectMaterials(obj) {
    const mats = [];
    if (!obj) return mats;

    obj.traverse((o) => {
        if (!o.isMesh) return;
        const mm = Array.isArray(o.material) ? o.material : [o.material];
        for (const m of mm) if (m) mats.push(m);
    });
    return mats;
}

function getFirstMesh(obj) {
    if (!obj) return null;
    if (obj.isMesh) return obj;

    let found = null;
    obj.traverse((o) => {
        if (found) return;
        if (o.isMesh) found = o;
    });
    return found;
}

function findTargets(root) {
    screenObj = root.getObjectByName(SCREEN_NAME) || null;
    hitboxObj = root.getObjectByName(HITBOX_NAME) || null;
    textObj = root.getObjectByName(TEXT_NAME) || null;
}

// ================= SCREEN =================
function setupScreen() {
    screenMats = [];
    if (!screenObj) return;

    const mats = collectMaterials(screenObj);
    for (const m of mats) {
        m.toneMapped = true;
        if ("color" in m) m.color = new Color(SCREEN_COLOR_OFF);
        if ("emissive" in m) {
            m.emissive = new Color(SCREEN_COLOR_ON);
            m.emissiveIntensity = 0;
        }
        m.needsUpdate = true;
        screenMats.push(m);
    }
    screenProgress = 0;
}

function startScreenAnim(to01) {
    screenAnimStart = performance.now();
    screenFrom = screenProgress;
    screenTo = to01;
}

function applyScreenAnim() {
    if (screenAnimStart === null || !screenMats.length) return;

    const t = Math.min(1, (performance.now() - screenAnimStart) / SCREEN_FADE_MS);
    const k = easeOutCubic(t);
    screenProgress = screenFrom + (screenTo - screenFrom) * k;

    const off = new Color(SCREEN_COLOR_OFF);
    const on = new Color(SCREEN_COLOR_ON);

    for (const m of screenMats) {
        if ("color" in m) m.color.lerpColors(off, on, screenProgress);
        if ("emissive" in m) m.emissiveIntensity = SCREEN_EMISSIVE_ON * screenProgress;
        m.needsUpdate = true;
    }

    if (t >= 1) {
        screenAnimStart = null;
        screenProgress = screenTo;
    }
}

// ================= HELLO CANVAS / TYPING =================
function initHelloCanvas() {
    helloCanvas = document.createElement("canvas");
    helloCanvas.width = HELLO_CANVAS_W;
    helloCanvas.height = HELLO_CANVAS_H;
    helloCtx = helloCanvas.getContext("2d");

    helloTex = new CanvasTexture(helloCanvas);
    helloTex.colorSpace = SRGBColorSpace;
    helloTex.minFilter = LinearFilter;
    helloTex.magFilter = LinearFilter;
    helloTex.needsUpdate = true;

    drawHelloText("");
}

function measureLineWidth(ctx, line) {
    let w = 0;
    for (let i = 0; i < line.length; i++) {
        w += ctx.measureText(line[i]).width;
        if (i < line.length - 1) w += HELLO_LETTER_SPACING;
    }
    return w;
}

function drawLine(ctx, line, x, y) {
    let xx = x;
    for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        ctx.fillText(ch, xx, y);
        xx += ctx.measureText(ch).width + HELLO_LETTER_SPACING;
    }
}

function drawHelloText(visibleText) {
    if (!helloCtx || !helloCanvas || !helloTex) return;

    const ctx = helloCtx;
    const w = helloCanvas.width;
    const h = helloCanvas.height;

    ctx.clearRect(0, 0, w, h);

    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.font = `600 ${HELLO_FONT_SIZE}px ${HELLO_FONT_FAMILY}`;

    ctx.shadowColor = `rgba(51,255,102,${HELLO_GLOW_ALPHA})`;
    ctx.shadowBlur = HELLO_GLOW_BLUR;
    ctx.fillStyle = "rgba(51,255,102,1)";

    const lines = String(visibleText).split("\n");
    const totalH = (lines.length - 1) * HELLO_LINE_HEIGHT;
    const startY = h / 2 - totalH / 2;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const lineW = measureLineWidth(ctx, line);
        const x = (w - lineW) / 2;
        const y = startY + i * HELLO_LINE_HEIGHT;
        drawLine(ctx, line, x, y);
    }

    helloTex.needsUpdate = true;
}

function startTyping() {
    typingActive = true;
    typedCount = 0;
    lastTypeAt = performance.now();
    cursorOn = true;
    lastCursorAt = performance.now();

    if (reduceMotion) typedCount = HELLO_MESSAGE.length;
    drawHelloText("");
}

function stopTyping() {
    typingActive = false;
    typedCount = 0;
    drawHelloText("");
}

function updateTyping() {
    if (!typingActive) return;

    const now = performance.now();

    if (now - lastCursorAt >= CURSOR_BLINK_MS) {
        cursorOn = !cursorOn;
        lastCursorAt = now;
    }

    if (!reduceMotion && typedCount < HELLO_MESSAGE.length) {
        if (now - lastTypeAt >= TYPE_INTERVAL_MS) {
            typedCount = Math.min(HELLO_MESSAGE.length, typedCount + 1);
            lastTypeAt = now;
        }
    }

    const base = HELLO_MESSAGE.slice(0, typedCount);
    const out =
        cursorOn && typedCount < HELLO_MESSAGE.length ? base + "▌" : base;
    drawHelloText(out);

    if (typedCount >= HELLO_MESSAGE.length) {
        typingActive = false;
        drawHelloText(HELLO_MESSAGE);
    }
}

// ================= HELLO PLANE =================
function createHelloPlane() {
    if (!screenObj || !helloTex) return;

    const screenMesh = getFirstMesh(screenObj);
    if (!screenMesh?.isMesh) return;

    if (!screenMesh.geometry.boundingBox) screenMesh.geometry.computeBoundingBox();
    const bb = screenMesh.geometry.boundingBox;
    const size = new Vector3();
    bb.getSize(size);

    const geo = new PlaneGeometry(size.x * HELLO_PLANE_W, size.y * HELLO_PLANE_H);

    helloMat = new MeshStandardMaterial({
        transparent: true,
        opacity: 0,
        depthWrite: false,
        map: helloTex,
        emissive: new Color(TEXT_COLOR_ON),
        emissiveMap: helloTex,
        emissiveIntensity: 0,
        roughness: 1,
        metalness: 0,
    });
    helloMat.toneMapped = false;

    helloPlane = new Mesh(geo, helloMat);
    helloPlane.renderOrder = 10;
    helloPlane.visible = false;

    const center = new Vector3();
    bb.getCenter(center);
    helloPlane.position.set(center.x, center.y, bb.max.z + 0.002);

    screenMesh.add(helloPlane);
}

function setupHelloWorldText() {
    if (textObj) textObj.visible = false;
}

// ================= HELLO FADE =================
function startHelloAnim(to01) {
    if (!helloMat || !helloPlane) return;

    if (to01 === 1) helloPlane.visible = true;
    helloHideAtEnd = to01 === 0;

    helloAnimStart = performance.now();
    helloFrom = helloProgress;
    helloTo = to01;
}

function applyHelloAnim() {
    if (helloAnimStart === null || !helloMat || !helloPlane) return;

    const t = Math.min(1, (performance.now() - helloAnimStart) / TEXT_FADE_MS);
    const k = easeOutCubic(t);

    helloProgress = helloFrom + (helloTo - helloFrom) * k;

    helloMat.opacity = helloProgress;
    helloMat.emissiveIntensity = TEXT_EMISSIVE_ON * helloProgress;
    helloMat.needsUpdate = true;

    if (t >= 1) {
        helloAnimStart = null;
        helloProgress = helloTo;
        if (helloHideAtEnd) helloPlane.visible = false;
    }
}

// ================= POWER =================
function setPower(nextOn) {
    isOn = nextOn;
    startScreenAnim(isOn ? 1 : 0);
    startHelloAnim(isOn ? 1 : 0);
    if (isOn) startTyping();
    else stopTyping();
}
function togglePower() {
    setPower(!isOn);
}

// ================= PRESS =================
function startPress() {
    if (!hitboxObj || !hitboxBasePos) return;
    pressing = true;
    pressStart = performance.now();
}

function applyPress() {
    if (!pressing || !hitboxObj || !hitboxBasePos || pressStart === null) return;

    const elapsed = performance.now() - pressStart;
    const total = PRESS_DOWN_MS + PRESS_UP_MS;

    let k = 0;
    if (elapsed <= PRESS_DOWN_MS) k = easeOutCubic(elapsed / PRESS_DOWN_MS);
    else k = 1 - easeOutCubic((elapsed - PRESS_DOWN_MS) / PRESS_UP_MS);

    const dir = PRESS_AXIS_LOCAL.clone()
        .applyQuaternion(hitboxObj.quaternion)
        .normalize();
    hitboxObj.position.copy(hitboxBasePos).addScaledVector(dir, PRESS_DEPTH * k);

    if (elapsed >= total) {
        pressing = false;
        pressStart = null;
        hitboxObj.position.copy(hitboxBasePos);
    }
}

// ================= POINTER =================
function onPointerMove(e) {
    if (!renderer || !camera || !hitboxObj) return;

    getPointerNDC(e);
    raycaster.setFromCamera(pointer, camera);

    const hits = raycaster.intersectObject(hitboxObj, true);
    const nowHover = hits.length > 0;

    if (nowHover !== hovering) {
        hovering = nowHover;
        renderer.domElement.style.cursor = hovering ? "pointer" : "default";
    }
}

function onPointerDown(e) {
    if (!renderer || !camera || !hitboxObj) return;

    getPointerNDC(e);
    raycaster.setFromCamera(pointer, camera);

    const hits = raycaster.intersectObject(hitboxObj, true);
    if (!hits.length) return;

    startPress();
    togglePower();
}

function onPointerLeave() {
    hovering = false;
    if (renderer?.domElement) renderer.domElement.style.cursor = "default";
}

// ================= LOOP =================
function animate() {
    rafId = requestAnimationFrame(animate);

    // enter (✅ non sovrascrive l'offset responsive)
    if (pivot && !entered && !reduceMotion) {
        if (enterStart === null) enterStart = performance.now();

        const elapsed = performance.now() - enterStart;
        const t = Math.min(1, elapsed / ENTER_DURATION);
        const k = easeOutCubic(t);

        enterOffsetX = ENTER_FROM_X * (1 - k);
        pivot.rotation.z = ENTER_ROT_Z * (1 - k);

        // posizione = baseOffset + enterOffset
        pivot.position.set(
            baseOffset.x + enterOffsetX,
            baseOffset.y,
            baseOffset.z
        );

        if (t >= 1) {
            entered = true;
            enterOffsetX = 0;
            pivot.rotation.z = 0;
            pivot.position.set(baseOffset.x, baseOffset.y, baseOffset.z);
        }
    }

    // micro-float
    if (pivot && entered && !reduceMotion) {
        const tt = performance.now() * 0.001;
        pivot.rotation.y = FINAL_ROT_Y + Math.sin(tt * 0.6) * 0.03;
    }

    applyPress();
    applyScreenAnim();
    applyHelloAnim();

    if (isOn && helloPlane?.visible) updateTyping();

    renderer.render(scene, camera);
}

// ================= INIT / DISPOSE =================
function initThree() {
    scene = new Scene();

    camera = new PerspectiveCamera(35, 1, 0.1, 100);

    renderer = new WebGLRenderer({
        canvas: canvasRef.value,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = SRGBColorSpace;
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = 2;

    pmrem = new PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    scene.add(new AmbientLight(0xffffff, 0.25));

    const key = new DirectionalLight(0xffffff, 2.6);
    key.position.set(3, 5, 2);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    scene.add(key);

    const fill = new DirectionalLight(0xf9e4b7, 1.2);
    fill.position.set(-4, 2, 3);
    scene.add(fill);

    const rim = new DirectionalLight(0x5b23ff, 1.0);
    rim.position.set(-2, 4, -4);
    scene.add(rim);

    shadowPlane = new Mesh(
        new PlaneGeometry(10, 10),
        new ShadowMaterial({ opacity: 0.16 })
    );
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -0.001;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    const loader = new GLTFLoader();
    dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");
    loader.setDRACOLoader(dracoLoader);

    loader.load(
        MODEL_URL,
        (gltf) => {
            modelRoot = gltf.scene;

            modelRoot.traverse((obj) => {
                if (!obj.isMesh) return;
                obj.castShadow = true;
                obj.receiveShadow = true;
                if (obj.geometry?.attributes?.uv && !obj.geometry.attributes.uv2) {
                    obj.geometry.setAttribute("uv2", obj.geometry.attributes.uv);
                }
            });

            const centered = centerModel(modelRoot);
            modelSize.copy(centered.size);
            modelRadius = centered.radius;

            pivot = centered.pivot;
            scene.add(pivot);

            findTargets(modelRoot);

            setupScreen();
            setupHelloWorldText();

            initHelloCanvas();
            createHelloPlane();

            setPower(false);

            pivot.rotation.y = FINAL_ROT_Y;
            pivot.rotation.x = FINAL_ROT_X;

            if (hitboxObj) hitboxBasePos = hitboxObj.position.clone();

            // ✅ calcola subito offset responsive con le dimensioni correnti
            if (wrapRef.value) {
                const rect = wrapRef.value.getBoundingClientRect();
                applyResponsiveModelOffset(rect.width, rect.height);
            }

            if (!reduceMotion) {
                // enter parte da baseOffset + ENTER_FROM_X
                entered = false;
                enterStart = null;
                enterOffsetX = ENTER_FROM_X;
                pivot.position.set(
                    baseOffset.x + enterOffsetX,
                    baseOffset.y,
                    baseOffset.z
                );
                pivot.rotation.z = ENTER_ROT_Z;
            } else {
                pivot.rotation.z = 0;
                entered = true;
                enterOffsetX = 0;
                pivot.position.set(baseOffset.x, baseOffset.y, baseOffset.z);
            }

            resizeToContainer();
            updateCameraFraming();
        },
        undefined,
        (err) => console.error("Errore caricamento GLB:", err)
    );

    resizeObserver = new ResizeObserver(() => resizeToContainer());
    resizeObserver.observe(wrapRef.value);

    const el = renderer.domElement;
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointerleave", onPointerLeave);

    resizeToContainer();
    animate();
}

function disposeThree() {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;

    if (resizeObserver) {
        resizeObserver.disconnect();
        resizeObserver = null;
    }

    if (renderer?.domElement) {
        renderer.domElement.removeEventListener("pointermove", onPointerMove);
        renderer.domElement.removeEventListener("pointerdown", onPointerDown);
        renderer.domElement.removeEventListener("pointerleave", onPointerLeave);
    }

    dracoLoader?.dispose?.();
    dracoLoader = null;

    pmrem?.dispose?.();
    pmrem = null;

    helloTex?.dispose?.();
    helloTex = null;

    renderer?.dispose?.();
    renderer = null;

    scene = null;
    camera = null;

    pivot = null;
    modelRoot = null;

    screenObj = null;
    hitboxObj = null;
    textObj = null;

    screenMats = [];
    screenAnimStart = null;

    helloPlane = null;
    helloMat = null;
    helloCanvas = null;
    helloCtx = null;
}

onMounted(initThree);
onBeforeUnmount(disposeThree);
</script>
