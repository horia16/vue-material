const ANIMATION_DURATION = 200;

/**
 * Creates a ripple effect on the given element. Note that you must also add the `md-ripple` class to the element.
 */
export default function () {
  // Timeouts used for the ripple animation.
  let animationTimeout: NodeJS.Timeout;
  let opacityTimeout: NodeJS.Timeout;

  /**
   * The ripple effect is controlled with this reactive object.
   */
  const ripple = reactive({
    x: 0,
    y: 0,
    width: 40,
    height: 40,
    opacity: 0,
    scale: 1,
    transition: "transform"
  });

  /**
   * Start time of the last ripple animation.
   */
  let start: Date;

  /**
   * Trigger the ripple animation.
   */
  function onDown(e: MouseEvent | TouchEvent) {
    const target = e.target as HTMLElement | null;

    // Mouse or touch event.
    const { clientX, clientY } = e instanceof MouseEvent ? e : e.touches[0];

    if (target) {
      const { left, top, width, height } = target.getBoundingClientRect();
      const x = clientX === 0 ? width / 2 : clientX - left;
      const y = clientY === 0 ? height / 2 : clientY - top;
      const size = width !== height ? Math.min(width, height) : width / 2;
      const translateX = x - size / 2;
      const translateY = y - size / 2;

      clearTimeout(opacityTimeout);
      clearTimeout(animationTimeout);

      ripple.transition = "transform";
      ripple.x = translateX;
      ripple.y = translateY;
      ripple.width = size;
      ripple.height = size;
      ripple.opacity = 0.2;
      ripple.scale = Math.max(width, height) / 20;
      start = new Date();
    }
  }

  /**
   * Stop and cleanup the ripple animation.
   */
  function onUp() {
    const end = new Date();
    const elapsed = Math.max(end.getMilliseconds() - start.getMilliseconds(), 0);

    const timeLeft = ANIMATION_DURATION - elapsed;

    animationTimeout = setTimeout(() => {
      ripple.transition = "opacity";
      ripple.opacity = 0;
      opacityTimeout = setTimeout(() => {
        ripple.scale = 1;
        ripple.width = 40;
        ripple.height = 40;
      }, ANIMATION_DURATION);
    }, timeLeft);
  }

  const rippleStyleObject = computed(() => ({
    "--ripple-pos-x": `${ripple.x}%`,
    "--ripple-pos-y": `${ripple.y}%`,
    "--ripple-width": `${ripple.width}px`,
    "--ripple-height": `${ripple.height}px`,
    "--ripple-opacity": `${ripple.opacity}`,
    "--ripple-scale": `${ripple.scale}`,
    "--transition-property": `${ripple.transition}`
  }));

  const events = {
    onMousedown: onDown,
    onTouchdown: onDown,
    onMouseup: onUp,
    onTouchup: onUp
  };

  return { rippleStyleObject, events };
}
