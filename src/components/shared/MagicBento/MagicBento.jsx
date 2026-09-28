import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./MagicBento.css";

const DEFAULT_PARTICLE_COUNT = 10;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = "210, 187, 255";
const MOBILE_BREAKPOINT = 768;

const createParticle = (x, y, color) => {
  const particle = document.createElement("div");

  particle.className = "magic-bento-particle";

  particle.style.cssText = `
    position: absolute;
    width: 3px;
    height: 3px;
    border-radius: 999px;
    background: rgba(${color}, 1);
    box-shadow: 0 0 8px rgba(${color}, 0.8);
    pointer-events: none;
    z-index: 20;
    left: ${x}px;
    top: ${y}px;
  `;

  return particle;
};

const calculateSpotlightValues = (radius) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75,
});

function useMobileDetection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return isMobile;
}

export default function MagicBento({
  children,

  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,

  disableAnimations = false,

  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,

  enableTilt = true,
  enableMagnetism = true,
  clickEffect = true,
}) {
  const gridRef = useRef(null);
  const spotlightRef = useRef(null);

  const particlesRef = useRef([]);
  const particleTemplatesRef = useRef([]);

  const isMobile = useMobileDetection();

  const shouldDisableAnimations =
    disableAnimations || isMobile;

  /*
   * ---------------------------------------------------------
   * Initialize card effects
   * ---------------------------------------------------------
   */

  useEffect(() => {
    if (shouldDisableAnimations || !gridRef.current) return;

    const grid = gridRef.current;

    const cards = Array.from(
      grid.querySelectorAll(".magic-bento-card")
    );

    if (!cards.length) return;

    const cleanups = [];

    cards.forEach((card) => {
      card.style.setProperty("--glow-color", glowColor);

      /*
       * Mouse enter
       */
      const handleMouseEnter = () => {
        card.classList.add("magic-bento-card--active");

        if (enableStars) {
          const rect = card.getBoundingClientRect();

          particleTemplatesRef.current = Array.from(
            { length: particleCount },
            () =>
              createParticle(
                Math.random() * rect.width,
                Math.random() * rect.height,
                glowColor
              )
          );

          particleTemplatesRef.current.forEach(
            (template, index) => {
              const particle = template.cloneNode(true);

              card.appendChild(particle);

              particlesRef.current.push(particle);

              gsap.fromTo(
                particle,
                {
                  scale: 0,
                  opacity: 0,
                },
                {
                  scale: 1,
                  opacity: 1,
                  duration: 0.35,
                  delay: index * 0.025,
                  ease: "back.out(1.7)",
                }
              );

              gsap.to(particle, {
                x: (Math.random() - 0.5) * 100,
                y: (Math.random() - 0.5) * 100,
                rotation: Math.random() * 360,
                duration: 2 + Math.random() * 2,
                repeat: -1,
                yoyo: true,
                ease: "none",
              });

              gsap.to(particle, {
                opacity: 0.25,
                duration: 1.2,
                repeat: -1,
                yoyo: true,
                ease: "power2.inOut",
              });
            }
          );
        }
      };

      /*
       * Mouse leave
       */
      const handleMouseLeave = () => {
        card.classList.remove("magic-bento-card--active");

        particlesRef.current.forEach((particle) => {
          gsap.killTweensOf(particle);

          gsap.to(particle, {
            scale: 0,
            opacity: 0,
            duration: 0.25,
            ease: "back.in(1.7)",
            onComplete: () => {
              particle.remove();
            },
          });
        });

        particlesRef.current = [];

        if (enableTilt) {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.35,
            ease: "power3.out",
          });
        }

        if (enableMagnetism) {
          gsap.to(card, {
            x: 0,
            y: 0,
            duration: 0.35,
            ease: "power3.out",
          });
        }
      };

      /*
       * Mouse movement
       */
      const handleMouseMove = (event) => {
        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        /*
         * 3D tilt
         */
        if (enableTilt) {
          const rotateX =
            ((y - centerY) / centerY) * -4;

          const rotateY =
            ((x - centerX) / centerX) * 4;

          gsap.to(card, {
            rotateX,
            rotateY,
            duration: 0.12,
            ease: "power2.out",
            transformPerspective: 1200,
            overwrite: true,
          });
        }

        /*
         * Magnetic movement
         */
        if (enableMagnetism) {
          const magnetX =
            (x - centerX) * 0.025;

          const magnetY =
            (y - centerY) * 0.025;

          gsap.to(card, {
            x: magnetX,
            y: magnetY,
            duration: 0.3,
            ease: "power3.out",
            overwrite: true,
          });
        }

        /*
         * Local border glow
         */
        const relativeX =
          (x / rect.width) * 100;

        const relativeY =
          (y / rect.height) * 100;

        card.style.setProperty(
          "--glow-x",
          `${relativeX}%`
        );

        card.style.setProperty(
          "--glow-y",
          `${relativeY}%`
        );

        card.style.setProperty(
          "--glow-intensity",
          "1"
        );

        card.style.setProperty(
          "--glow-radius",
          `${spotlightRadius}px`
        );
      };

      /*
       * Click ripple
       */
      const handleClick = (event) => {
        if (!clickEffect) return;

        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const maxDistance = Math.max(
          Math.hypot(x, y),
          Math.hypot(x - rect.width, y),
          Math.hypot(x, y - rect.height),
          Math.hypot(
            x - rect.width,
            y - rect.height
          )
        );

        const ripple = document.createElement("div");

        ripple.className =
          "magic-bento-click-ripple";

        ripple.style.cssText = `
          width: ${maxDistance * 2}px;
          height: ${maxDistance * 2}px;
          left: ${x - maxDistance}px;
          top: ${y - maxDistance}px;
          background:
            radial-gradient(
              circle,
              rgba(${glowColor}, 0.35) 0%,
              rgba(${glowColor}, 0.15) 30%,
              transparent 70%
            );
        `;

        card.appendChild(ripple);

        gsap.fromTo(
          ripple,
          {
            scale: 0,
            opacity: 1,
          },
          {
            scale: 1,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            onComplete: () => ripple.remove(),
          }
        );
      };

      card.addEventListener(
        "mouseenter",
        handleMouseEnter
      );

      card.addEventListener(
        "mouseleave",
        handleMouseLeave
      );

      card.addEventListener(
        "mousemove",
        handleMouseMove
      );

      card.addEventListener(
        "click",
        handleClick
      );

      cleanups.push(() => {
        card.removeEventListener(
          "mouseenter",
          handleMouseEnter
        );

        card.removeEventListener(
          "mouseleave",
          handleMouseLeave
        );

        card.removeEventListener(
          "mousemove",
          handleMouseMove
        );

        card.removeEventListener(
          "click",
          handleClick
        );

        gsap.killTweensOf(card);
      });
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());

      particlesRef.current.forEach((particle) => {
        gsap.killTweensOf(particle);
        particle.remove();
      });

      particlesRef.current = [];
    };
  }, [
    shouldDisableAnimations,
    enableStars,
    enableTilt,
    enableMagnetism,
    clickEffect,
    particleCount,
    glowColor,
    spotlightRadius,
  ]);

  /*
   * ---------------------------------------------------------
   * Global spotlight
   * ---------------------------------------------------------
   */

  useEffect(() => {
    if (
      shouldDisableAnimations ||
      !enableSpotlight ||
      !gridRef.current
    ) {
      return;
    }

    const spotlight = document.createElement("div");

    spotlight.className =
      "magic-bento-global-spotlight";

    document.body.appendChild(spotlight);

    spotlightRef.current = spotlight;

    const handleMouseMove = (event) => {
      if (!gridRef.current) return;

      const section =
        gridRef.current.closest(
          ".magic-bento-section"
        );

      if (!section) return;

      const sectionRect =
        section.getBoundingClientRect();

      const inside =
        event.clientX >= sectionRect.left &&
        event.clientX <= sectionRect.right &&
        event.clientY >= sectionRect.top &&
        event.clientY <= sectionRect.bottom;

      const cards =
        gridRef.current.querySelectorAll(
          ".magic-bento-card"
        );

      if (!inside) {
        gsap.to(spotlight, {
          opacity: 0,
          duration: 0.3,
        });

        cards.forEach((card) => {
          card.style.setProperty(
            "--glow-intensity",
            "0"
          );
        });

        return;
      }

      const {
        proximity,
        fadeDistance,
      } = calculateSpotlightValues(
        spotlightRadius
      );

      let minDistance = Infinity;

      cards.forEach((card) => {
        const rect =
          card.getBoundingClientRect();

        const centerX =
          rect.left + rect.width / 2;

        const centerY =
          rect.top + rect.height / 2;

        const distance =
          Math.hypot(
            event.clientX - centerX,
            event.clientY - centerY
          ) -
          Math.max(
            rect.width,
            rect.height
          ) /
            2;

        const effectiveDistance =
          Math.max(0, distance);

        minDistance = Math.min(
          minDistance,
          effectiveDistance
        );

        let intensity = 0;

        if (effectiveDistance <= proximity) {
          intensity = 1;
        } else if (
          effectiveDistance <= fadeDistance
        ) {
          intensity =
            (fadeDistance -
              effectiveDistance) /
            (fadeDistance - proximity);
        }

        card.style.setProperty(
          "--glow-intensity",
          intensity.toString()
        );

        card.style.setProperty(
          "--glow-radius",
          `${spotlightRadius}px`
        );

        const localX =
          ((event.clientX - rect.left) /
            rect.width) *
          100;

        const localY =
          ((event.clientY - rect.top) /
            rect.height) *
          100;

        card.style.setProperty(
          "--glow-x",
          `${localX}%`
        );

        card.style.setProperty(
          "--glow-y",
          `${localY}%`
        );
      });

      gsap.to(spotlight, {
        left: event.clientX,
        top: event.clientY,
        duration: 0.12,
        ease: "power2.out",
      });

      const opacity =
        minDistance <= proximity
          ? 0.75
          : minDistance <= fadeDistance
            ? ((fadeDistance -
                minDistance) /
                (fadeDistance -
                  proximity)) *
              0.75
            : 0;

      gsap.to(spotlight, {
        opacity,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(spotlight, {
        opacity: 0,
        duration: 0.3,
      });
    };

    document.addEventListener(
      "mousemove",
      handleMouseMove
    );

    document.addEventListener(
      "mouseleave",
      handleMouseLeave
    );

    return () => {
      document.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      document.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );

      spotlight.remove();
    };
  }, [
    shouldDisableAnimations,
    enableSpotlight,
    spotlightRadius,
  ]);

  return (
    <div
      ref={gridRef}
      className={`magic-bento-section ${
        enableBorderGlow
          ? "magic-bento-border-enabled"
          : ""
      }`}
      style={{
        "--magic-bento-glow": glowColor,
      }}
    >
      {children}
    </div>
  );
}