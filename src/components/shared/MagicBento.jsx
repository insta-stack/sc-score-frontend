import { useCallback, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './MagicBento.css';

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = '132, 0, 255';
const MOBILE_BREAKPOINT = 768;

const DASHBOARD_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDpdfmQkmgj0My3Bj_1HXZzvBEkdC5yyeb7BPxoliHF3yWGVSjH_6GPgrq0PcTCxufGbEG7KaoZn3DJlIYDR7NodC5mZwDwHPTJ6kuHjVnw-H3pqM2Dp5FgmL40wfS4XlGM_VvkvjDdMOt-eJ0CtFXTluRPKa3a0N5JgEaArErpjs_wO_N8xrJ9oKyBm2q47hK9Q50pFaWDJDJn7ERJUAgyXcfoEeF0ERhwREB5NWgZXVQqOSOOo3I5';

const sellerCardData = [
  {
    label: 'VERIFICATION',
    title: 'Verified Trust Badge',
    description:
      'GSTIN-verified sellers display a trust badge that increases buyer confidence and conversion rates. Our digital verification is instantly recognizable across partner stores.',
    icon: 'verified',
    iconTone: 'primary',
    accentIcon: 'verified',
    footer: 'ENCRYPTED ATTESTATION SYSTEM',
    footerTone: 'primary'
  },
  {
    label: 'DISCOVERY',
    title: 'Better Visibility',
    description:
      'High SC Score sellers get priority placement in search results and recommendations on partner platforms.',
    icon: 'visibility',
    iconTone: 'tertiary',
    accentIcon: 'visibility'
  },
  {
    label: 'PROTECTION',
    title: 'Fraud Protection',
    description:
      'Get protection against fraudulent buyers. We help you identify high-risk customers before shipping.',
    icon: 'security',
    iconTone: 'periwinkle',
    accentIcon: 'security'
  },
  {
    label: 'ANALYTICS',
    title: 'Performance Dashboard',
    description:
      'Track your credibility score, see what affects it, and get actionable insights to improve. Use our data to optimize your entire supply chain.',
    icon: 'dashboard',
    iconTone: 'secondary',
    backgroundImage: DASHBOARD_IMAGE,
    badges: ['RT DATA VIZ', 'AI INSIGHTS']
  },
  {
    label: 'RETENTION',
    title: 'Lower Returns',
    description:
      'Quality sellers see fewer unjustified returns as buyers trust verified products more. Trust acts as a filter for serious commerce.',
    icon: 'assignment_return',
    iconTone: 'error'
  },
  {
    label: 'CUSTOMERS',
    title: 'Quality Customers',
    description:
      'Attract high-score buyers who are less likely to abuse returns or refuse COD deliveries. We match trusted sellers with trusted shoppers.',
    icon: 'person_check',
    iconTone: 'primary-container'
  }
];

const createParticleElement = (x, y, color = DEFAULT_GLOW_COLOR) => {
  const el = document.createElement('div');
  el.className = 'magic-bento-particle';
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const calculateSpotlightValues = (radius) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75
});

const updateCardGlowProperties = (card, mouseX, mouseY, glow, radius) => {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;

  card.style.setProperty('--glow-x', `${relativeX}%`);
  card.style.setProperty('--glow-y', `${relativeY}%`);
  card.style.setProperty('--glow-intensity', glow.toString());
  card.style.setProperty('--glow-radius', `${radius}px`);
};

function MaterialIcon({ children, className = '' }) {
  return (
    <span className={`magic-bento-material ${className}`} aria-hidden="true">
      {children}
    </span>
  );
}

const ParticleCard = ({
  children,
  className = '',
  disableAnimations = false,
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  clickEffect = false,
  enableMagnetism = false,
  onActivate
}) => {
  const cardRef = useRef(null);
  const particlesRef = useRef([]);
  const timeoutsRef = useRef([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef([]);
  const particlesInitialized = useRef(false);
  const magnetismAnimationRef = useRef(null);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;

    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(
        Math.random() * width,
        Math.random() * height,
        glowColor
      )
    );
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    magnetismAnimationRef.current?.kill();

    const particles = particlesRef.current.slice();
    particlesRef.current = [];

    particles.forEach((particle) => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'back.in(1.7)',
        onComplete: () => particle.parentNode?.removeChild(particle)
      });
    });
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;

    if (!particlesInitialized.current) initializeParticles();

    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = window.setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;

        const clone = particle.cloneNode(true);
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);

        gsap.fromTo(
          clone,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' }
        );

        gsap.to(clone, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: 'none',
          repeat: -1,
          yoyo: true
        });

        gsap.to(clone, {
          opacity: 0.3,
          duration: 1.5,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true
        });
      }, index * 100);

      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return undefined;

    const element = cardRef.current;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 5,
          rotateY: 5,
          duration: 0.3,
          ease: 'power2.out',
          transformPerspective: 1000
        });
      }
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }

      if (enableMagnetism) {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    const handleMouseMove = (e) => {
      if (!enableTilt && !enableMagnetism) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(element, {
          rotateX,
          rotateY,
          duration: 0.1,
          ease: 'power2.out',
          transformPerspective: 1000
        });
      }

      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.05;
        const magnetY = (y - centerY) * 0.05;

        magnetismAnimationRef.current = gsap.to(element, {
          x: magnetX,
          y: magnetY,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    const handleClick = (e) => {
      onActivate?.(e);

      if (!clickEffect) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      );

      const ripple = document.createElement('div');
      ripple.className = 'magic-bento-ripple';
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `;

      element.appendChild(ripple);

      gsap.fromTo(
        ripple,
        { scale: 0, opacity: 1 },
        {
          scale: 1,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          onComplete: () => ripple.remove()
        }
      );
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('click', handleClick);

    return () => {
      isHoveredRef.current = false;
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('click', handleClick);
      clearAllParticles();
      gsap.killTweensOf(element);
    };
  }, [
    animateParticles,
    clearAllParticles,
    clickEffect,
    disableAnimations,
    enableMagnetism,
    enableTilt,
    glowColor,
    onActivate
  ]);

  return (
    <div
      ref={cardRef}
      className={`${className} magic-bento-particle-container`}
      style={{
        ...style,
        position: 'relative',
        overflow: 'hidden'
      }}
      role={onActivate ? 'button' : undefined}
      tabIndex={onActivate ? 0 : undefined}
      onKeyDown={
        onActivate
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onActivate(e);
              }
            }
          : undefined
      }
    >
      {children}
    </div>
  );
};

const GlobalSpotlight = ({
  gridRef,
  disableAnimations = false,
  enabled = true,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor = DEFAULT_GLOW_COLOR
}) => {
  const spotlightRef = useRef(null);

  useEffect(() => {
    if (disableAnimations || !gridRef?.current || !enabled) return undefined;

    const spotlight = document.createElement('div');
    spotlight.className = 'magic-bento-global-spotlight';
    spotlight.style.cssText = `
      position: fixed;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.15) 0%,
        rgba(${glowColor}, 0.08) 15%,
        rgba(${glowColor}, 0.04) 25%,
        rgba(${glowColor}, 0.02) 40%,
        rgba(${glowColor}, 0.01) 65%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
      will-change: transform, opacity;
    `;

    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = (e) => {
      if (!spotlightRef.current || !gridRef.current) return;

      const section = gridRef.current.closest('.magic-bento-section');
      const rect = section?.getBoundingClientRect();
      const mouseInside =
        !!rect &&
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      const cards = gridRef.current.querySelectorAll('.magic-bento-card');

      if (!mouseInside) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
        cards.forEach((card) =>
          card.style.setProperty('--glow-intensity', '0')
        );
        return;
      }

      const { proximity, fadeDistance } = calculateSpotlightValues(
        spotlightRadius
      );
      let minDistance = Infinity;

      cards.forEach((card) => {
        const cardRect = card.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const distance =
          Math.hypot(e.clientX - centerX, e.clientY - centerY) -
          Math.max(cardRect.width, cardRect.height) / 2;
        const effectiveDistance = Math.max(0, distance);

        minDistance = Math.min(minDistance, effectiveDistance);

        let glowIntensity = 0;
        if (effectiveDistance <= proximity) {
          glowIntensity = 1;
        } else if (effectiveDistance <= fadeDistance) {
          glowIntensity =
            (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
        }

        updateCardGlowProperties(
          card,
          e.clientX,
          e.clientY,
          glowIntensity,
          spotlightRadius
        );
      });

      gsap.to(spotlightRef.current, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.1,
        ease: 'power2.out'
      });

      const targetOpacity =
        minDistance <= proximity
          ? 0.8
          : minDistance <= fadeDistance
            ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8
            : 0;

      gsap.to(spotlightRef.current, {
        opacity: targetOpacity,
        duration: targetOpacity > 0 ? 0.2 : 0.5,
        ease: 'power2.out'
      });
    };

    const resetSpotlight = () => {
      gridRef.current?.querySelectorAll('.magic-bento-card').forEach((card) =>
        card.style.setProperty('--glow-intensity', '0')
      );
      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', resetSpotlight);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', resetSpotlight);
      spotlightRef.current?.remove();
      spotlightRef.current = null;
    };
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

  return null;
};

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () =>
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

const CardContent = ({ card }) => (
  <>
    {card.backgroundImage && (
      <div
        className="magic-bento-card__background"
        style={{ backgroundImage: `url("${card.backgroundImage}")` }}
        aria-hidden="true"
      />
    )}

    {card.accentIcon && (
      <MaterialIcon className="magic-bento-card__accent">
        {card.accentIcon}
      </MaterialIcon>
    )}

    <div className="magic-bento-card__header">
      <div className="magic-bento-card__label">{card.label}</div>
      <div className={`magic-bento-card__icon magic-bento-card__icon--${card.iconTone}`}>
        <MaterialIcon>{card.icon}</MaterialIcon>
      </div>
    </div>

    <div className="magic-bento-card__content">
      <h2 className="magic-bento-card__title">{card.title}</h2>
      <p className="magic-bento-card__description">{card.description}</p>
    </div>

    {card.footer && (
      <div className="magic-bento-card__footer">
        <span className={`magic-bento-card__footer-text magic-bento-card__footer-text--${card.footerTone || 'primary'}`}>
          {card.footer}
        </span>
      </div>
    )}

    {card.badges?.length > 0 && (
      <div className="magic-bento-card__badges">
        {card.badges.map((badge) => (
          <span key={badge} className="magic-bento-card__badge">
            {badge}
          </span>
        ))}
      </div>
    )}
  </>
);

 const MagicBento = ({
  cards,
  items,
  renderItem,
  columns,
  fetchUrl,
  fallbackCards = sellerCardData,
  textAutoHide = true,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  enableTilt = false,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = true,
  enableMagnetism = true,
  className = ''
}) => {
  const gridRef = useRef(null);
  const isMobile = useMobileDetection();
  const shouldDisableAnimations = disableAnimations || isMobile;

  const [fetchedCards, setFetchedCards] = useState(null);
  const [status, setStatus] = useState(cards || items || !fetchUrl ? 'ready' : 'loading');

  useEffect(() => {
    if (cards || items || !fetchUrl) return undefined;
    let cancelled = false;
    setStatus('loading');

    fetch(fetchUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (cancelled) return;
        setFetchedCards(Array.isArray(json) ? json : null);
        setStatus('ready');
      })
      .catch(() => {
        if (cancelled) return;
        setFetchedCards(null);
        setStatus('error');
      });

    return () => {
      cancelled = true;
    };
  }, [cards, fetchUrl]);

  const resolvedCards = cards || items || fetchedCards || fallbackCards;

  if (status === 'loading') {
    return (
      <div className={`magic-bento-section ${className}`}>
        <div
          className={`magic-bento-grid magic-bento-grid--skeleton${columns ? ' magic-bento-grid--fixed' : ''}`}
          style={columns ? { '--mb-columns': columns } : undefined}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="magic-bento-card magic-bento-card--skeleton" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`magic-bento-section ${className}`}>
      {enableSpotlight && (
        <GlobalSpotlight
          gridRef={gridRef}
          disableAnimations={shouldDisableAnimations}
          enabled={enableSpotlight}
          spotlightRadius={spotlightRadius}
          glowColor={glowColor}
        />
      )}

      <div
        className={`magic-bento-grid${columns ? ' magic-bento-grid--fixed' : ''}`}
        style={columns ? { '--mb-columns': columns } : undefined}
        ref={gridRef}
      >
        {resolvedCards.map((card, index) => {
          const baseClassName = [
            'magic-bento-card',
            textAutoHide ? 'magic-bento-card--text-autohide' : '',
            enableBorderGlow ? 'magic-bento-card--border-glow' : '',
            card.backgroundImage ? 'magic-bento-card--dashboard' : '',
            card.span ? `magic-bento-card--${card.span}` : ''
          ]
            .filter(Boolean)
            .join(' ');

          const cardStyle = {
            backgroundColor: card.backgroundColor || '#120F17',
            '--glow-color': glowColor,
            '--magic-bento-glow-rgb': glowColor
          };

          const content = renderItem ? renderItem(card, index) : <CardContent card={card} />;        
            // const content = renderItem ? renderItem(card, index) : <CardContent card={card} />;

          if (enableStars) {
            return (
              <ParticleCard
                key={`${card.title}-${index}`}
                className={baseClassName}
                style={cardStyle}
                disableAnimations={shouldDisableAnimations}
                particleCount={particleCount}
                glowColor={glowColor}
                enableTilt={enableTilt}
                clickEffect={clickEffect}
                 enableMagnetism={enableMagnetism}
                onActivate={card.href ? () => window.open(card.href, card.target || '_self') : undefined}
              >
                {content}
              </ParticleCard>
            );
          }

          return (
            <BentoCard
              key={`${card.title}-${index}`}
              className={baseClassName}
              style={cardStyle}
              disableAnimations={shouldDisableAnimations}
              enableTilt={enableTilt}
              enableMagnetism={enableMagnetism}
              clickEffect={clickEffect}
              glowColor={glowColor}
              onActivate={card.href ? () => window.open(card.href, card.target || '_self') : undefined}
            >
              {content}
            </BentoCard>
          );
        })}
      </div>
    </div>
  );
};

const BentoCard = ({
  children,
  className = '',
  style,
  disableAnimations = false,
  enableTilt = false,
  enableMagnetism = true,
  clickEffect = true,
  glowColor = DEFAULT_GLOW_COLOR,
  onActivate
}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (disableAnimations || !ref.current) return undefined;

    const element = ref.current;

    const handleMove = (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (enableTilt) {
        gsap.to(element, {
          rotateX: ((y - centerY) / centerY) * -10,
          rotateY: ((x - centerX) / centerX) * 10,
          duration: 0.1,
          ease: 'power2.out',
          transformPerspective: 1000
        });
      }

      if (enableMagnetism) {
        gsap.to(element, {
          x: (x - centerX) * 0.05,
          y: (y - centerY) * 0.05,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    const reset = () => {
      gsap.to(element, {
        rotateX: 0,
        rotateY: 0,
        x: 0,
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleClick = (e) => {
      onActivate?.(e);
      if (!clickEffect) return;
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      );

      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `;
      element.appendChild(ripple);
      gsap.fromTo(
        ripple,
        { scale: 0, opacity: 1 },
        { scale: 1, opacity: 0, duration: 0.8, ease: 'power2.out', onComplete: () => ripple.remove() }
      );
    };

    element.addEventListener('mousemove', handleMove);
    element.addEventListener('mouseleave', reset);
    element.addEventListener('click', handleClick);

    return () => {
      element.removeEventListener('mousemove', handleMove);
      element.removeEventListener('mouseleave', reset);
      element.removeEventListener('click', handleClick);
      gsap.killTweensOf(element);
    };
  }, [clickEffect, disableAnimations, enableMagnetism, enableTilt, glowColor, onActivate]);

  return (
    <div
      ref={ref}
      className={className}
      style={style}
      role={onActivate ? 'button' : undefined}
      tabIndex={onActivate ? 0 : undefined}
      onKeyDown={
        onActivate
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onActivate(e);
              }
            }
          : undefined
      }
    >
      {children}
    </div>
  );
};

export { sellerCardData };
export default MagicBento;
