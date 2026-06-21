// import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
// import { useGesture } from '@use-gesture/react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { X, ChevronLeft, ChevronRight } from 'lucide-react';
// import { pageTransition } from '../lib/animations';
// import SectionHeader from '../components/ui/SectionHeader';
// import { galleryItems, galleryCategories } from '../data/gallery';
// import '../styles/DomeGallery.css';
// // ─── Constants ────────────────────────────────────────────────────────────────

// const SEGMENTS = 35;

// const DEFAULTS = {
//   fit: 0.72,
//   minRadius: 500,
//   maxRadius: Infinity,
//   padFactor: 0.2,
//   maxVerticalRotationDeg: 5,
//   dragSensitivity: 22,
//   enlargeTransitionMs: 400,
//   dragDampening: 2,
//   overlayBlurColor: '#080812',
//   imageBorderRadius: '24px',
//   openedImageBorderRadius: '24px',
//   openedImageWidth: '280px',
//   openedImageHeight: '380px',
//   grayscale: false,
// };

// // ─── Utilities ─────────────────────────────────────────────────────────────────

// const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
// const normalizeAngle = (d) => ((d % 360) + 360) % 360;
// const wrapAngleSigned = (deg) => {
//   const a = (((deg + 180) % 360) + 360) % 360;
//   return a - 180;
// };
// const getDataNumber = (el, name, fallback) => {
//   const attr = el.dataset[name] ?? el.getAttribute(`data-${name}`);
//   const n = attr == null ? NaN : parseFloat(attr);
//   return Number.isFinite(n) ? n : fallback;
// };

// // ─── Tile builder ──────────────────────────────────────────────────────────────

// function buildItems(pool, seg) {
//   const xCols = Array.from({ length: seg }, (_, i) => -Math.floor(seg / 2) + i * 2 + 1);
//   const evenYs = [-4, -2, 0, 2, 4];
//   const oddYs = [-3, -1, 1, 3, 5];

//   const coords = xCols.flatMap((x, c) => {
//     const ys = c % 2 === 0 ? evenYs : oddYs;
//     return ys.map((y) => ({ x, y, sizeX: 2, sizeY: 2 }));
//   });

//   const totalSlots = coords.length;
//   if (!pool.length) return coords.map((c) => ({ ...c, src: '', alt: '' }));

//   const usedImages = Array.from({ length: totalSlots }, (_, i) => pool[i % pool.length]);

//   // Shuffle adjacent duplicates
//   for (let i = 1; i < usedImages.length; i++) {
//     if (usedImages[i].src === usedImages[i - 1].src) {
//       for (let j = i + 1; j < usedImages.length; j++) {
//         if (usedImages[j].src !== usedImages[i].src) {
//           const tmp = usedImages[i];
//           usedImages[i] = usedImages[j];
//           usedImages[j] = tmp;
//           break;
//         }
//       }
//     }
//   }

//   return coords.map((c, i) => ({
//     ...c,
//     src: usedImages[i]?.src || '',
//     alt: usedImages[i]?.alt || '',
//     id: usedImages[i]?.id,
//   }));
// }

// function computeItemBaseRotation(offsetX, offsetY, sizeX, sizeY, segments) {
//   const unit = 360 / segments / 2;
//   return {
//     rotateY: unit * (offsetX + (sizeX - 1) / 2),
//     rotateX: unit * (offsetY - (sizeY - 1) / 2),
//   };
// }

// // ─── DomeGallery core component ────────────────────────────────────────────────

// function DomeGallery({
//   images = [],
//   onTileSelect,
//   fit = DEFAULTS.fit,
//   minRadius = DEFAULTS.minRadius,
//   maxRadius = DEFAULTS.maxRadius,
//   padFactor = DEFAULTS.padFactor,
//   maxVerticalRotationDeg = DEFAULTS.maxVerticalRotationDeg,
//   dragSensitivity = DEFAULTS.dragSensitivity,
//   enlargeTransitionMs = DEFAULTS.enlargeTransitionMs,
//   dragDampening = DEFAULTS.dragDampening,
//   overlayBlurColor = DEFAULTS.overlayBlurColor,
//   imageBorderRadius = DEFAULTS.imageBorderRadius,
//   openedImageBorderRadius = DEFAULTS.openedImageBorderRadius,
//   openedImageWidth = DEFAULTS.openedImageWidth,
//   openedImageHeight = DEFAULTS.openedImageHeight,
//   grayscale = DEFAULTS.grayscale,
// }) {
//   const rootRef = useRef(null);
//   const mainRef = useRef(null);
//   const sphereRef = useRef(null);
//   const frameRef = useRef(null);
//   const viewerRef = useRef(null);
//   const scrimRef = useRef(null);
//   const focusedElRef = useRef(null);
//   const originalTilePositionRef = useRef(null);

//   const rotationRef = useRef({ x: 0, y: 0 });
//   const startRotRef = useRef({ x: 0, y: 0 });
//   const startPosRef = useRef(null);
//   const draggingRef = useRef(false);
//   const movedRef = useRef(false);
//   const inertiaRAF = useRef(null);
//   const openingRef = useRef(false);
//   const openStartedAtRef = useRef(0);
//   const lastDragEndAt = useRef(0);

//   const scrollLockedRef = useRef(false);

//   const lockScroll = useCallback(() => {
//     if (scrollLockedRef.current) return;
//     scrollLockedRef.current = true;
//     document.body.classList.add('dg-scroll-lock');
//   }, []);

//   const unlockScroll = useCallback(() => {
//     if (!scrollLockedRef.current) return;
//     if (rootRef.current?.getAttribute('data-enlarging') === 'true') return;
//     scrollLockedRef.current = false;
//     document.body.classList.remove('dg-scroll-lock');
//   }, []);

//   // Normalize image pool: accept { image, title, id } shape from gallery data
//   const normalizedImages = useMemo(() =>
//     images.map((item) => ({
//       src: item.image || item.src || '',
//       alt: item.title || item.alt || '',
//       id: item.id,
//     })),
//     [images]
//   );

//   const items = useMemo(() => buildItems(normalizedImages, SEGMENTS), [normalizedImages]);

//   const applyTransform = (xDeg, yDeg) => {
//     if (sphereRef.current) {
//       sphereRef.current.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
//     }
//   };

//   // ── Resize observer → radius ──
//   useEffect(() => {
//     const root = rootRef.current;
//     if (!root) return;
//     const ro = new ResizeObserver((entries) => {
//       const cr = entries[0].contentRect;
//       const w = Math.max(1, cr.width);
//       const h = Math.max(1, cr.height);
//       const minDim = Math.min(w, h);
//       const aspect = w / h;
//       const basis = aspect >= 1.3 ? w : minDim;
//       let radius = basis * fit;
//       radius = Math.min(radius, h * 1.35);
//       radius = clamp(radius, minRadius, maxRadius);

//       const viewerPad = Math.max(8, Math.round(minDim * padFactor));
//       root.style.setProperty('--radius', `${Math.round(radius)}px`);
//       root.style.setProperty('--viewer-pad', `${viewerPad}px`);
//       root.style.setProperty('--overlay-blur-color', overlayBlurColor);
//       root.style.setProperty('--tile-radius', imageBorderRadius);
//       root.style.setProperty('--enlarge-radius', openedImageBorderRadius);
//       root.style.setProperty('--image-filter', grayscale ? 'grayscale(1)' : 'none');
//       applyTransform(rotationRef.current.x, rotationRef.current.y);
//     });
//     ro.observe(root);
//     return () => ro.disconnect();
//   }, [
//     fit, minRadius, maxRadius, padFactor,
//     overlayBlurColor, grayscale, imageBorderRadius,
//     openedImageBorderRadius,
//   ]);

//   useEffect(() => {
//     applyTransform(rotationRef.current.x, rotationRef.current.y);
//   }, []);

//   // ── Inertia ──
//   const stopInertia = useCallback(() => {
//     if (inertiaRAF.current) {
//       cancelAnimationFrame(inertiaRAF.current);
//       inertiaRAF.current = null;
//     }
//   }, []);

//   const startInertia = useCallback((vx, vy) => {
//     const MAX_V = 1.4;
//     let vX = clamp(vx, -MAX_V, MAX_V) * 80;
//     let vY = clamp(vy, -MAX_V, MAX_V) * 80;
//     let frames = 0;
//     const d = clamp(dragDampening ?? 0.6, 0, 1);
//     const frictionMul = 0.94 + 0.055 * d;
//     const stopThreshold = 0.015 - 0.01 * d;
//     const maxFrames = Math.round(90 + 270 * d);

//     const step = () => {
//       vX *= frictionMul;
//       vY *= frictionMul;
//       if (Math.abs(vX) < stopThreshold && Math.abs(vY) < stopThreshold) {
//         inertiaRAF.current = null;
//         return;
//       }
//       if (++frames > maxFrames) {
//         inertiaRAF.current = null;
//         return;
//       }
//       const nextX = clamp(rotationRef.current.x - vY / 200, -maxVerticalRotationDeg, maxVerticalRotationDeg);
//       const nextY = wrapAngleSigned(rotationRef.current.y + vX / 200);
//       rotationRef.current = { x: nextX, y: nextY };
//       applyTransform(nextX, nextY);
//       inertiaRAF.current = requestAnimationFrame(step);
//     };
//     stopInertia();
//     inertiaRAF.current = requestAnimationFrame(step);
//   }, [dragDampening, maxVerticalRotationDeg, stopInertia]);

//   // ── Drag gesture ──
//   useGesture(
//     {
//       onDragStart: ({ event }) => {
//         if (focusedElRef.current) return;
//         stopInertia();
//         draggingRef.current = true;
//         movedRef.current = false;
//         startRotRef.current = { ...rotationRef.current };
//         startPosRef.current = { x: event.clientX, y: event.clientY };
//       },
//       onDrag: ({ event, last, velocity = [0, 0], direction = [0, 0], movement }) => {
//         if (focusedElRef.current || !draggingRef.current || !startPosRef.current) return;
//         const dxTotal = event.clientX - startPosRef.current.x;
//         const dyTotal = event.clientY - startPosRef.current.y;
//         if (!movedRef.current && dxTotal * dxTotal + dyTotal * dyTotal > 16) movedRef.current = true;

//         const nextX = clamp(startRotRef.current.x - dyTotal / dragSensitivity, -maxVerticalRotationDeg, maxVerticalRotationDeg);
//         const nextY = wrapAngleSigned(startRotRef.current.y + dxTotal / dragSensitivity);
//         if (rotationRef.current.x !== nextX || rotationRef.current.y !== nextY) {
//           rotationRef.current = { x: nextX, y: nextY };
//           applyTransform(nextX, nextY);
//         }

//         if (last) {
//           draggingRef.current = false;
//           let [vMagX, vMagY] = velocity;
//           const [dirX, dirY] = direction;
//           let vx = vMagX * dirX;
//           let vy = vMagY * dirY;
//           if (Math.abs(vx) < 0.001 && Math.abs(vy) < 0.001 && Array.isArray(movement)) {
//             const [mx, my] = movement;
//             vx = clamp((mx / dragSensitivity) * 0.02, -1.2, 1.2);
//             vy = clamp((my / dragSensitivity) * 0.02, -1.2, 1.2);
//           }
//           if (Math.abs(vx) > 0.005 || Math.abs(vy) > 0.005) startInertia(vx, vy);
//           if (movedRef.current) lastDragEndAt.current = performance.now();
//           movedRef.current = false;
//         }
//       },
//     },
//     { target: mainRef, eventOptions: { passive: true } }
//   );

//   // ── Scrim close ──
//   useEffect(() => {
//     const scrim = scrimRef.current;
//     if (!scrim) return;

//     const close = () => {
//       if (performance.now() - openStartedAtRef.current < 250) return;
//       const el = focusedElRef.current;
//       if (!el) return;
//       const parent = el.parentElement;
//       const overlay = viewerRef.current?.querySelector('.enlarge');
//       if (!overlay) return;

//       const refDiv = parent.querySelector('.item__image--reference');
//       const originalPos = originalTilePositionRef.current;

//       if (!originalPos) {
//         overlay.remove();
//         if (refDiv) refDiv.remove();
//         parent.style.setProperty('--rot-y-delta', '0deg');
//         parent.style.setProperty('--rot-x-delta', '0deg');
//         el.style.visibility = '';
//         el.style.zIndex = 0;
//         focusedElRef.current = null;
//         rootRef.current?.removeAttribute('data-enlarging');
//         openingRef.current = false;
//         unlockScroll();
//         return;
//       }

//       const currentRect = overlay.getBoundingClientRect();
//       const rootRect = rootRef.current.getBoundingClientRect();
//       const originalPosRel = {
//         left: originalPos.left - rootRect.left,
//         top: originalPos.top - rootRect.top,
//         width: originalPos.width,
//         height: originalPos.height,
//       };
//       const overlayRel = {
//         left: currentRect.left - rootRect.left,
//         top: currentRect.top - rootRect.top,
//         width: currentRect.width,
//         height: currentRect.height,
//       };

//       const animDiv = document.createElement('div');
//       animDiv.className = 'enlarge-closing';
//       animDiv.style.cssText = `position:absolute;left:${overlayRel.left}px;top:${overlayRel.top}px;width:${overlayRel.width}px;height:${overlayRel.height}px;z-index:9999;border-radius:var(--enlarge-radius,32px);overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.35);transition:all ${enlargeTransitionMs}ms ease-out;pointer-events:none;`;
//       const origImg = overlay.querySelector('img');
//       if (origImg) {
//         const img = origImg.cloneNode();
//         img.style.cssText = 'width:100%;height:100%;object-fit:cover;';
//         animDiv.appendChild(img);
//       }
//       overlay.remove();
//       rootRef.current.appendChild(animDiv);
//       void animDiv.getBoundingClientRect();

//       requestAnimationFrame(() => {
//         animDiv.style.left = originalPosRel.left + 'px';
//         animDiv.style.top = originalPosRel.top + 'px';
//         animDiv.style.width = originalPosRel.width + 'px';
//         animDiv.style.height = originalPosRel.height + 'px';
//         animDiv.style.opacity = '0';
//       });

//       const cleanup = () => {
//         animDiv.remove();
//         originalTilePositionRef.current = null;
//         if (refDiv) refDiv.remove();
//         parent.style.transition = 'none';
//         el.style.transition = 'none';
//         parent.style.setProperty('--rot-y-delta', '0deg');
//         parent.style.setProperty('--rot-x-delta', '0deg');
//         requestAnimationFrame(() => {
//           el.style.visibility = '';
//           el.style.opacity = '0';
//           el.style.zIndex = 0;
//           focusedElRef.current = null;
//           rootRef.current?.removeAttribute('data-enlarging');
//           requestAnimationFrame(() => {
//             parent.style.transition = '';
//             el.style.transition = 'opacity 300ms ease-out';
//             requestAnimationFrame(() => {
//               el.style.opacity = '1';
//               setTimeout(() => {
//                 el.style.transition = '';
//                 el.style.opacity = '';
//                 openingRef.current = false;
//                 if (!draggingRef.current && rootRef.current?.getAttribute('data-enlarging') !== 'true') {
//                   document.body.classList.remove('dg-scroll-lock');
//                 }
//               }, 300);
//             });
//           });
//         });
//       };
//       animDiv.addEventListener('transitionend', cleanup, { once: true });
//     };

//     scrim.addEventListener('click', close);
//     const onKey = (e) => { if (e.key === 'Escape') close(); };
//     window.addEventListener('keydown', onKey);
//     return () => {
//       scrim.removeEventListener('click', close);
//       window.removeEventListener('keydown', onKey);
//     };
//   }, [enlargeTransitionMs, unlockScroll]);

//   // ── Open tile ──
//   const openItemFromElement = useCallback((el) => {
//     if (openingRef.current) return;
//     openingRef.current = true;
//     openStartedAtRef.current = performance.now();
//     lockScroll();

//     const parent = el.parentElement;
//     focusedElRef.current = el;
//     el.setAttribute('data-focused', 'true');

//     const offsetX = getDataNumber(parent, 'offsetX', 0);
//     const offsetY = getDataNumber(parent, 'offsetY', 0);
//     const sizeX = getDataNumber(parent, 'sizeX', 2);
//     const sizeY = getDataNumber(parent, 'sizeY', 2);

//     const parentRot = computeItemBaseRotation(offsetX, offsetY, sizeX, sizeY, SEGMENTS);
//     const parentY = normalizeAngle(parentRot.rotateY);
//     const globalY = normalizeAngle(rotationRef.current.y);
//     let rotY = -(parentY + globalY) % 360;
//     if (rotY < -180) rotY += 360;
//     const rotX = -parentRot.rotateX - rotationRef.current.x;

//     parent.style.setProperty('--rot-y-delta', `${rotY}deg`);
//     parent.style.setProperty('--rot-x-delta', `${rotX}deg`);

//     const refDiv = document.createElement('div');
//     refDiv.className = 'item__image item__image--reference';
//     refDiv.style.opacity = '0';
//     refDiv.style.transform = `rotateX(${-parentRot.rotateX}deg) rotateY(${-parentRot.rotateY}deg)`;
//     parent.appendChild(refDiv);
//     void refDiv.offsetHeight;

//     const tileR = refDiv.getBoundingClientRect();
//     const mainR = mainRef.current?.getBoundingClientRect();
//     const frameR = frameRef.current?.getBoundingClientRect();

//     if (!mainR || !frameR || tileR.width <= 0 || tileR.height <= 0) {
//       openingRef.current = false;
//       focusedElRef.current = null;
//       parent.removeChild(refDiv);
//       unlockScroll();
//       return;
//     }

//     originalTilePositionRef.current = { left: tileR.left, top: tileR.top, width: tileR.width, height: tileR.height };
//     el.style.visibility = 'hidden';
//     el.style.zIndex = 0;

//     const overlay = document.createElement('div');
//     overlay.className = 'enlarge';
//     overlay.style.cssText = `position:absolute;left:${frameR.left - mainR.left}px;top:${frameR.top - mainR.top}px;width:${frameR.width}px;height:${frameR.height}px;opacity:0;z-index:30;will-change:transform,opacity;transform-origin:top left;transition:transform ${enlargeTransitionMs}ms ease,opacity ${enlargeTransitionMs}ms ease;`;

//     const rawSrc = parent.dataset.src || el.querySelector('img')?.src || '';
//     const img = document.createElement('img');
//     img.src = rawSrc;
//     overlay.appendChild(img);
//     viewerRef.current.appendChild(overlay);

//     const tx0 = tileR.left - frameR.left;
//     const ty0 = tileR.top - frameR.top;
//     const sx0 = tileR.width / frameR.width;
//     const sy0 = tileR.height / frameR.height;
//     const validSx = isFinite(sx0) && sx0 > 0 ? sx0 : 1;
//     const validSy = isFinite(sy0) && sy0 > 0 ? sy0 : 1;

//     overlay.style.transform = `translate(${tx0}px,${ty0}px) scale(${validSx},${validSy})`;

//     setTimeout(() => {
//       if (!overlay.parentElement) return;
//       overlay.style.opacity = '1';
//       overlay.style.transform = 'translate(0px,0px) scale(1,1)';
//       rootRef.current?.setAttribute('data-enlarging', 'true');
//     }, 16);

//     if (openedImageWidth || openedImageHeight) {
//       const onFirstEnd = (ev) => {
//         if (ev.propertyName !== 'transform') return;
//         overlay.removeEventListener('transitionend', onFirstEnd);
//         const prevTransition = overlay.style.transition;
//         overlay.style.transition = 'none';
//         const tw = openedImageWidth || `${frameR.width}px`;
//         const th = openedImageHeight || `${frameR.height}px`;
//         overlay.style.width = tw;
//         overlay.style.height = th;
//         const newRect = overlay.getBoundingClientRect();
//         overlay.style.width = frameR.width + 'px';
//         overlay.style.height = frameR.height + 'px';
//         void overlay.offsetWidth;
//         overlay.style.transition = `left ${enlargeTransitionMs}ms ease,top ${enlargeTransitionMs}ms ease,width ${enlargeTransitionMs}ms ease,height ${enlargeTransitionMs}ms ease`;
//         const centeredLeft = frameR.left - mainR.left + (frameR.width - newRect.width) / 2;
//         const centeredTop = frameR.top - mainR.top + (frameR.height - newRect.height) / 2;
//         requestAnimationFrame(() => {
//           overlay.style.left = `${centeredLeft}px`;
//           overlay.style.top = `${centeredTop}px`;
//           overlay.style.width = tw;
//           overlay.style.height = th;
//         });
//         const cleanupSecond = () => {
//           overlay.removeEventListener('transitionend', cleanupSecond);
//           overlay.style.transition = prevTransition;
//         };
//         overlay.addEventListener('transitionend', cleanupSecond, { once: true });
//       };
//       overlay.addEventListener('transitionend', onFirstEnd);
//     }
//   }, [enlargeTransitionMs, lockScroll, openedImageHeight, openedImageWidth, unlockScroll]);

//   // ── Tile click handlers ──
//   const onTileClick = useCallback((e) => {
//     if (draggingRef.current || movedRef.current) return;
//     if (performance.now() - lastDragEndAt.current < 80) return;
//     if (openingRef.current) return;
//     const el = e.currentTarget;
//     // Notify parent with gallery item id if available
//     const parent = el.parentElement;
//     if (onTileSelect && parent?.dataset?.galleryId) {
//       onTileSelect(parseInt(parent.dataset.galleryId, 10));
//     }
//     openItemFromElement(el);
//   }, [openItemFromElement, onTileSelect]);

//   const onTilePointerUp = useCallback((e) => {
//     if (e.pointerType !== 'touch') return;
//     if (draggingRef.current || movedRef.current) return;
//     if (performance.now() - lastDragEndAt.current < 80) return;
//     if (openingRef.current) return;
//     const el = e.currentTarget;
//     const parent = el.parentElement;
//     if (onTileSelect && parent?.dataset?.galleryId) {
//       onTileSelect(parseInt(parent.dataset.galleryId, 10));
//     }
//     openItemFromElement(el);
//   }, [openItemFromElement, onTileSelect]);

//   useEffect(() => {
//     return () => { document.body.classList.remove('dg-scroll-lock'); };
//   }, []);

//   return (
//     <div
//       ref={rootRef}
//       className="sphere-root"
//       style={{
//         '--segments-x': SEGMENTS,
//         '--segments-y': SEGMENTS,
//         '--overlay-blur-color': overlayBlurColor,
//         '--tile-radius': imageBorderRadius,
//         '--enlarge-radius': openedImageBorderRadius,
//         '--image-filter': grayscale ? 'grayscale(1)' : 'none',
//       }}
//     >
//       <main ref={mainRef} className="sphere-main">
//         <div className="stage">
//           <div ref={sphereRef} className="sphere">
//             {items.map((it, i) => (
//               <div
//                 key={`${it.x},${it.y},${i}`}
//                 className="item"
//                 data-src={it.src}
//                 data-offset-x={it.x}
//                 data-offset-y={it.y}
//                 data-size-x={it.sizeX}
//                 data-size-y={it.sizeY}
//                 data-gallery-id={it.id}
//                 style={{
//                   '--offset-x': it.x,
//                   '--offset-y': it.y,
//                   '--item-size-x': it.sizeX,
//                   '--item-size-y': it.sizeY,
//                 }}
//               >
//                 <div
//                   className="item__image"
//                   role="button"
//                   tabIndex={0}
//                   aria-label={it.alt || 'Open image'}
//                   onClick={onTileClick}
//                   onPointerUp={onTilePointerUp}
//                 >
//                   <img src={it.src} draggable={false} alt={it.alt} />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="overlay" />
//         <div className="overlay overlay--blur" />
//         <div className="edge-fade edge-fade--top" />
//         <div className="edge-fade edge-fade--bottom" />

//         <div className="viewer" ref={viewerRef}>
//           <div ref={scrimRef} className="scrim" />
//           <div ref={frameRef} className="frame" />
//         </div>
//       </main>
//     </div>
//   );
// }

// // ─── Gallery page ──────────────────────────────────────────────────────────────

// function GalleryLoadingAssets() {
//   return (
//     <div className="h-full w-full flex items-center justify-center">
//       <div className="flex flex-col items-center justify-center gap-5">
//         <div className="flex items-center gap-3">
//           {Array.from({ length: 3 }).map((_, idx) => (
//             <span
//               key={idx}
//               className="h-3 w-3 rounded-full bg-red-500 animate-bounce"
//               style={{ animationDelay: `${idx * 140}ms` }}
//             />
//           ))}
//         </div>
//         <p className="font-mono text-xs font-bold tracking-[0.24em] text-white uppercase">
//           Loading gallery
//         </p>
//       </div>
//     </div>
//   );
// }

// export default function Gallery() {
//   const [activeCategory, setActiveCategory] = useState('ALL');
//   const [lightbox, setLightbox] = useState(null);
//   const [galleryReady, setGalleryReady] = useState(false);

//   const filtered =
//     activeCategory === 'ALL'
//       ? galleryItems
//       : galleryItems.filter((item) => item.category === activeCategory);

//   // Map gallery items to dome-friendly shape
//   const domeImages = useMemo(() =>
//     filtered.map((item) => ({
//       id: item.id,
//       src: item.image,
//       alt: item.title,
//       image: item.image,
//       title: item.title,
//     })),
//     [filtered]
//   );

//   useEffect(() => {
//     let cancelled = false;
//     const sources = [...new Set(filtered.map((item) => item.image).filter(Boolean))];

//     setGalleryReady(sources.length === 0);
//     if (sources.length === 0) return () => { cancelled = true; };

//     let loaded = 0;
//     const markLoaded = () => {
//       loaded += 1;
//       if (!cancelled && loaded >= sources.length) {
//         setGalleryReady(true);
//       }
//     };

//     const imageElements = sources.map((src) => {
//       const img = new Image();
//       img.onload = markLoaded;
//       img.onerror = markLoaded;
//       img.src = src;
//       if (img.complete) markLoaded();
//       return img;
//     });

//     return () => {
//       cancelled = true;
//       imageElements.forEach((img) => {
//         img.onload = null;
//         img.onerror = null;
//       });
//     };
//   }, [filtered]);

//   // Keyboard navigation for lightbox
//   useEffect(() => {
//     const handler = (e) => {
//       if (e.key === 'Escape') setLightbox(null);
//       if (lightbox !== null && e.key === 'ArrowRight')
//         setLightbox((i) => (i + 1) % filtered.length);
//       if (lightbox !== null && e.key === 'ArrowLeft')
//         setLightbox((i) => (i === 0 ? filtered.length - 1 : i - 1));
//     };
//     window.addEventListener('keydown', handler);
//     return () => window.removeEventListener('keydown', handler);
//   }, [lightbox, filtered.length]);

//   // Lock body scroll when lightbox open
//   useEffect(() => {
//     document.body.style.overflow = lightbox !== null ? 'hidden' : '';
//     return () => { document.body.style.overflow = ''; };
//   }, [lightbox]);

//   // When a dome tile is tapped, open the lightbox for that gallery item
//   const handleTileSelect = useCallback((galleryId) => {
//     const idx = filtered.findIndex((item) => item.id === galleryId);
//     if (idx >= 0) setLightbox(idx);
//   }, [filtered]);

//   return (
//     <motion.main
//       id="main-content"
//       variants={pageTransition}
//       initial="initial"
//       animate="animate"
//       exit="exit"
//       style={{ display: 'block', minHeight: '100vh' }}
//     >
//       {/* Top section: header + filters */}
// <div style={{ paddingTop: '7rem', paddingBottom: '1rem', paddingLeft: '1.5rem', paddingRight: '1.5rem', textAlign: 'center' }}>
  

//   {/* Title */}
//   <motion.h1
//     initial={{ opacity: 0, y: 16 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.5, delay: 0.1 }}
//     style={{
//       fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
//       fontWeight: '700',
//       color: '#ffffff',
//       lineHeight: 1.1,
//       marginBottom: '16px',
//       letterSpacing: '-0.02em',
//     }}
//   >
//     Our{' '}
//     <span style={{
//       WebkitTextStroke: '1px rgba(229,62,62,0.7)',
//       color: 'transparent',
//     }}>
//       Gallery
//     </span>
//   </motion.h1>

//   {/* Subtitle */}
//   <motion.p
//     initial={{ opacity: 0 }}
//     animate={{ opacity: 1 }}
//     transition={{ duration: 0.5, delay: 0.3 }}
//     style={{
//       fontSize: '20px',
//       color: '#ffffff',
//       maxWidth: '480px',
//       margin: '0 auto 32px',
//       lineHeight: 1.6,
//     }}
//   >
//     Snapshots from competitions, workshops, lab sessions, and team events.
//   </motion.p>

//   {/* Filter Tabs */}
//   {/* Filter Tabs */}
// <motion.div
//   initial={{ opacity: 0, y: 8 }}
//   animate={{ opacity: 1, y: 0 }}
//   transition={{ duration: 0.4, delay: 0.4 }}
//   style={{
//     display: 'inline-flex',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     gap: '6px',
//     margin: '0 auto',
// background: 'rgba(30,0,0,0.6)',    border: '1px solid rgba(255,255,255,0.06)',
//     borderRadius: '12px',
//     padding: '6px',
//   }}
// >
//   {galleryCategories.map((cat) => (
//     <button
//       key={cat}
//       onClick={() => { setActiveCategory(cat); setLightbox(null); }}
//       style={{
//         padding: '9px 22px',
//         fontSize: '11px',
//         fontFamily: 'monospace',
//         fontWeight: '700',
//         letterSpacing: '0.15em',
//         borderRadius: '8px',
//         border: 'none',
//         background: activeCategory === cat
//           ? 'linear-gradient(135deg, #e53e3e, #c53030)'
//           : 'transparent',
//         color: activeCategory === cat ? '#ffffff' : 'rgba(148,163,184,0.6)',
//         cursor: 'pointer',
//         transition: 'all 0.2s ease',
//         textTransform: 'uppercase',
//         boxShadow: activeCategory === cat ? '0 4px 12px rgba(229,62,62,0.35)' : 'none',
//       }}
//       onMouseEnter={e => {
//         if (activeCategory !== cat) {
//           e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
//           e.currentTarget.style.color = '#ffffff';
//         }
//       }}
//       onMouseLeave={e => {
//         if (activeCategory !== cat) {
//           e.currentTarget.style.background = 'transparent';
//           e.currentTarget.style.color = 'rgba(148,163,184,0.6)';
//         }
//       }}
//     >
//       {cat}
//     </button>
//   ))}
// </motion.div>
// </div>

//       {/* Dome sphere — fixed pixel height so sphere-root can fill it */}
//       <div style={{ position: 'relative', width: '100%', height: '620px' }}>
//         {filtered.length === 0 ? (
//           <p className="text-center text-text-muted font-mono mt-16">
//             No photos in this category yet.
//           </p>
//         ) : !galleryReady ? (
//           <GalleryLoadingAssets />
//         ) : (
//           <DomeGallery
//             images={domeImages}
//             onTileSelect={handleTileSelect}
//             fit={0.72}
//             minRadius={420}
//             maxVerticalRotationDeg={5}
//             dragDampening={2}
//             grayscale={false}
//             overlayBlurColor="transparent"
//             imageBorderRadius="20px"
//             openedImageBorderRadius="20px"
//             openedImageWidth="260px"
//             openedImageHeight="360px"
//           />
//         )}

//         <p style={{
//           position: 'absolute', bottom: '16px', left: '50%',
//           transform: 'translateX(-50%)', fontSize: '11px',
//           fontFamily: 'monospace', color: 'rgba(148,163,184,0.4)',
//           pointerEvents: 'none', whiteSpace: 'nowrap', zIndex: 10,
//           userSelect: 'none',
//         }}>
//           drag to rotate &nbsp;·&nbsp; click to open
//         </p>
//       </div>

//       {/* ─── Lightbox ─── */}
//       <AnimatePresence>
//         {lightbox !== null && filtered[lightbox] && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 bg-void/95 backdrop-blur-md flex items-center justify-center px-4"
//             onClick={() => setLightbox(null)}
//           >
//             {/* Close */}
//             <button
//               onClick={() => setLightbox(null)}
//               aria-label="Close lightbox"
//               className="absolute top-4 right-4 z-10 w-10 h-10 rounded-lg bg-elevated border border-border flex items-center justify-center text-text-muted hover:text-cyan-400 transition-colors"
//             >
//               <X size={18} />
//             </button>

//             {/* Prev */}
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setLightbox((i) => (i === 0 ? filtered.length - 1 : i - 1));
//               }}
//               aria-label="Previous image"
//               className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-elevated/60 backdrop-blur-sm border border-border flex items-center justify-center text-text-secondary hover:text-cyan-400 transition-colors"
//             >
//               <ChevronLeft size={20} />
//             </button>

//             {/* Next */}
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setLightbox((i) => (i + 1) % filtered.length);
//               }}
//               aria-label="Next image"
//               className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-elevated/60 backdrop-blur-sm border border-border flex items-center justify-center text-text-secondary hover:text-cyan-400 transition-colors"
//             >
//               <ChevronRight size={20} />
//             </button>

//             {/* Image */}
//             <motion.div
//               key={lightbox}
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.95 }}
//               transition={{ duration: 0.2 }}
//               className="max-w-4xl max-h-[85vh] w-full"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <img
//                 src={filtered[lightbox].image}
//                 alt={filtered[lightbox].title}
//                 className="w-full h-auto max-h-[75vh] object-contain rounded-card"
//               />
//               <div className="text-center mt-4">
//                 <h3 className="font-display font-semibold text-text-primary">
//                   {filtered[lightbox].title}
//                 </h3>
//                 <p className="text-xs font-mono text-text-muted mt-1">
//                   {filtered[lightbox].date} &nbsp;·&nbsp; {lightbox + 1} / {filtered.length}
//                 </p>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.main>
//   );
// }


import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { pageTransition, fadeUp, staggerContainer } from '../lib/animations';
import SectionHeader from '../components/ui/SectionHeader';
import { galleryItems, galleryCategories } from '../data/gallery';
import { SkeletonCard } from '../components/ui/Skeletons';

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [lightbox, setLightbox] = useState(null); // index into filtered array
  const [imagesLoaded, setImagesLoaded] = useState({}); // track loaded state of images

  const filtered =
    activeCategory === 'ALL'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const handleImageLoad = (id) => {
    setImagesLoaded((prev) => ({ ...prev, [id]: true }));
  };

  // Close lightbox on Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') setLightbox(null);
      if (lightbox !== null && e.key === 'ArrowRight')
        setLightbox((i) => (i + 1) % filtered.length);
      if (lightbox !== null && e.key === 'ArrowLeft')
        setLightbox((i) => (i === 0 ? filtered.length - 1 : i - 1));
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightbox, filtered.length]);

  // Lock body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  return (
    <motion.main
      id="main-content"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pt-28 pb-24 px-6 min-h-screen"
    >
      <SectionHeader
        label="// MEMORIES"
        title="Gallery"
        subtitle="Snapshots from competitions, workshops, lab sessions, and team events."
      />

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto mb-12 flex flex-wrap justify-center gap-2">
        {galleryCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => { setActiveCategory(cat); setLightbox(null); }}
            className={`px-[18px] py-[8px] text-[11px] font-mono font-semibold tracking-[0.1em] rounded-[4px] border transition-all duration-200 ${
              activeCategory === cat
                ? 'bg-white text-black border-white shadow-[0_0_16px_rgba(255,255,255,0.16)]'
                : 'bg-transparent text-white border-white/30 hover:bg-white/10 hover:border-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <motion.div
        layout
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="break-inside-avoid group cursor-pointer relative"
              onClick={() => setLightbox(index)}
            >
              {/* Skeleton showing before image loads */}
              {!imagesLoaded[item.id] && (
                <div className="absolute inset-0 z-10 bg-black/40 rounded-xl overflow-hidden">
                  <div className="w-full h-full skeleton-shimmer min-h-[250px]" />
                </div>
              )}

              <div className={`relative overflow-hidden rounded-xl border border-white/20 hover:border-red-500/50 hover:shadow-[0_0_20px_rgba(255,68,68,0.4)] transition-all duration-300 bg-black ${!imagesLoaded[item.id] ? 'opacity-0' : 'opacity-100'}`}>
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  onLoad={() => handleImageLoad(item.id)}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <h3 className="font-display font-semibold text-white text-lg">
                    {item.title}
                  </h3>
                  <p className="text-[11px] font-mono tracking-widest text-red-300 mt-1 uppercase">{item.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center p-12 text-center mt-8">
          <p className="text-xl text-white font-display mb-2">
            No photos in this category yet.
          </p>
          <button
            onClick={() => {
              setActiveCategory('ALL');
              setLightbox(null);
            }}
            className="mt-4 px-4 py-2 font-mono text-[13px] bg-transparent text-red-400 border border-red-400 rounded hover:bg-red-500/10 transition-colors"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* ─── Lightbox ─── */}
      <AnimatePresence>
        {lightbox !== null && filtered[lightbox] && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightbox(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            
            {/* Close */}
            <button
              onClick={() => setLightbox(null)}
              aria-label="Close lightbox"
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/70 hover:text-red-400 hover:border-red-400/40 transition-all hover:bg-red-500/10 group"
            >
              <X size={18} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((i) => (i === 0 ? filtered.length - 1 : i - 1));
              }}
              aria-label="Previous image"
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/70 hover:text-red-400 hover:border-red-400/40 hover:bg-black/80 transition-all"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Next */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((i) => (i + 1) % filtered.length);
              }}
              aria-label="Next image"
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/70 hover:text-red-400 hover:border-red-400/40 hover:bg-black/80 transition-all"
            >
              <ChevronRight size={24} />
            </button>

            {/* Image */}
            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl max-h-[90vh] z-10 flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative p-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(255,32,32,0.1)]">
                <img
                  src={filtered[lightbox].image}
                  alt={filtered[lightbox].title}
                  className="w-full h-auto max-h-[75vh] object-contain rounded-xl"
                />
              </div>
              <div className="text-center mt-6 bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
                <h3 className="font-display font-semibold text-white text-lg">
                  {filtered[lightbox].title}
                </h3>
                <p className="text-[11px] font-mono tracking-widest text-red-300 mt-1 uppercase">
                  {filtered[lightbox].date} &nbsp;·&nbsp; {lightbox + 1} / {filtered.length}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.main>
  );
}