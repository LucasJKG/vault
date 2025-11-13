import { useRef, useState, useEffect } from "react";

const ZoomableImage = ({ src, alt = "", zoom = 2, className = "" }) => {
    const containerRef = useRef(null);
    const rafRef = useRef(null);
    const isTouchRef = useRef(false);
    const touchStateRef = useRef({
        startX: 0,
        startY: 0,
        startTranslateX: 0,
        startTranslateY: 0,
    });

    const [transform, setTransform] = useState({ scale: 1, x: 0, y: 0 });

    useEffect(() => {
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        container.addEventListener("touchmove", handleTouchMove, { passive: false });

        return () => {
            container.removeEventListener("touchmove", handleTouchMove);
        };
    }, []);

    const setTransformRAF = (next) => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
            setTransform(next);
        });
    };

    const handleMouseEnter = (e) => {
        if ("ontouchstart" in window) return;
        isTouchRef.current = false;
        setTransformRAF({ scale: zoom, x: 0, y: 0 });
    };

    const handleMouseMove = (e) => {
        if (isTouchRef.current) return;
        const container = containerRef.current;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const px = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
        const py = Math.min(Math.max((e.clientY - rect.top) / rect.height, 0), 1);

        const x = (1 - zoom) * px * rect.width;
        const y = (1 - zoom) * py * rect.height;

        setTransformRAF({ scale: zoom, x, y });
    };

    const handleMouseLeave = () => {
        if (isTouchRef.current) return;
        setTransformRAF({ scale: 1, x: 0, y: 0 });
    };

    const handleTouchStart = (e) => {
        isTouchRef.current = true;
        if (e.touches.length > 1) return;
        const touch = e.touches[0];
        const container = containerRef.current;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const px = Math.min(Math.max((touch.clientX - rect.left) / rect.width, 0), 1);
        const py = Math.min(Math.max((touch.clientY - rect.top) / rect.height, 0), 1);

        const startTranslateX = (1 - zoom) * px * rect.width;
        const startTranslateY = (1 - zoom) * py * rect.height;

        touchStateRef.current = {
            startX: touch.clientX,
            startY: touch.clientY,
            startTranslateX,
            startTranslateY,
        };

        setTransformRAF({ scale: zoom, x: startTranslateX, y: startTranslateY });
    };

    const handleTouchMove = (e) => {
        if (!isTouchRef.current) return;
        if (e.touches.length > 1) return;
        const touch = e.touches[0];
        const container = containerRef.current;
        if (!container) return;
        const rect = container.getBoundingClientRect();

        const { startX, startY, startTranslateX, startTranslateY } = touchStateRef.current;
        const dx = touch.clientX - startX;
        const dy = touch.clientY - startY;

        const minX = (1 - zoom) * rect.width;
        const minY = (1 - zoom) * rect.height;

        let newX = startTranslateX + dx;
        let newY = startTranslateY + dy;

        newX = Math.min(Math.max(newX, minX), 0);
        newY = Math.min(Math.max(newY, minY), 0);

        setTransformRAF({ scale: zoom, x: newX, y: newY });

        e.preventDefault();
    };

    const handleTouchEnd = () => {
        setTransformRAF({ scale: 1, x: 0, y: 0 });
        isTouchRef.current = false;
    };

    const imgStyle = {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0) scale(${transform.scale})`,
        transformOrigin: "0 0",
        willChange: "transform",
    };

    return (
        <div
            ref={containerRef}
            className={`product-image-wrapper zoomable ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <img
                src={src}
                alt={alt}
                draggable={false}
                style={imgStyle}
                className="product-color-image"
            />
        </div>
    );
};

export default ZoomableImage;
