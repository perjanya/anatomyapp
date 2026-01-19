/**
 * SVG Animator - Reusable animation system for all SVG diagrams
 * 
 * Parses animation directives from data attributes and applies CSS classes
 * Supports multiple animation types: draw (repeating), pulse (infinite)
 * 
 * Usage in HTML:
 *   <div class="svg-container" data-animations="lineID:draw:5|pulseID:pulse">
 *     <img src="diagram.svg" alt="Diagram">
 *   </div>
 */

/**
 * Parse animation directive string into structured format
 * @param {string} animationString - Format: "id1:type:count|id2:type"
 * @returns {Array} Array of animation objects
 * 
 * Example:
 *   "h-line-1:draw:5|h-line-2:pulse"
 *   Returns: [
 *     { id: 'h-line-1', type: 'draw', iterations: 5 },
 *     { id: 'h-line-2', type: 'pulse', iterations: null }
 *   ]
 */
function parseAnimationDirective(animationString) {
  if (!animationString || typeof animationString !== 'string') {
    console.warn('Invalid animation directive:', animationString);
    return [];
  }

  return animationString.split('|').map(spec => {
    const parts = spec.trim().split(':');
    
    if (parts.length < 2) {
      console.warn('Invalid animation spec format:', spec);
      return null;
    }

    const [id, type, iterations] = parts;
    
    // Handle iteration count: number, "infinite", or default
    let iterationCount = null;
    if (type.trim().toLowerCase() === 'draw') {
      if (iterations && iterations.toLowerCase() === 'infinite') {
        iterationCount = 'infinite';
      } else {
        iterationCount = parseInt(iterations) || 1;
      }
    }
    
    return {
      id: id.trim(),
      type: type.trim().toLowerCase(),
      iterations: iterationCount
    };
  }).filter(item => item !== null);
}

/**
 * Apply animations to SVG elements based on parsed directives
 * @param {HTMLElement} svgContainer - Container with SVG or img element
 * @param {Array} animations - Parsed animation directives
 */
function applySVGAnimations(svgContainer, animations) {
  if (!svgContainer || !Array.isArray(animations)) {
    console.warn('Invalid arguments to applySVGAnimations');
    return;
  }

  // Use a consistent base duration to compute sequential delays
  const baseDrawDurationSec = 1.2;

  animations.forEach((anim, idx) => {
    // Try to find element by ID in SVG (if embedded) or in container
    let element = svgContainer.querySelector(`#${CSS.escape(anim.id)}`);
    
    // Fallback: look for data attribute
    if (!element) {
      element = svgContainer.querySelector(`[data-animate-id="${CSS.escape(anim.id)}"]`);
    }

    if (!element) {
      console.warn(`Animation target not found: ${anim.id}`);
      return;
    }

    // For draw animations, pre-compute path length and prime stroke dash
    if (anim.type === 'draw') {
      try {
        // Many SVG shapes implement getTotalLength (path, line, polyline, polygon)
        if (typeof element.getTotalLength === 'function') {
          const len = element.getTotalLength();
          element.style.setProperty('--path-length', `${len}`);
          element.style.strokeDasharray = `${len}`;
          element.style.strokeDashoffset = `${len}`;
        } else {
          // Fallback to a sensible default
          element.style.setProperty('--path-length', `1000`);
          element.style.strokeDasharray = `1000`;
          element.style.strokeDashoffset = `1000`;
        }
      } catch (e) {
        console.warn('Could not compute path length for', anim.id, e);
      }
      
      // For infinite animations, stagger them; for finite iterations, no stagger
      let delay = 0;
      if (anim.iterations === 'infinite') {
        delay = idx * baseDrawDurationSec;
      }
      element.style.setProperty('--animation-delay', `${delay}s`);
      element.style.setProperty('--draw-duration', `${baseDrawDurationSec}s`);
    }

    // Apply animation class based on type
    const animationClass = `svg-animate-${anim.type}`;
    element.classList.add(animationClass);

    // Add hover effect for interactivity
    element.classList.add('svg-animate-hover');

    // Set animation iteration count directly on the element style
    if (anim.type === 'draw' && anim.iterations !== null) {
      // For infinite iterations, use 'infinite' keyword; otherwise use the number
      const iterationValue = anim.iterations === 'infinite' ? 'infinite' : anim.iterations;
      element.style.animationIterationCount = iterationValue;
      element.style.setProperty('--iterations', iterationValue);
      console.log(`Applied ${anim.type} animation to ${anim.id} (${iterationValue} iterations)`, 
        `computed: ${window.getComputedStyle(element).animationIterationCount}`);
    } else {
      console.log(`Applied ${anim.type} animation to ${anim.id}`);
    }
  });
}

/**
 * Initialize animations on all SVG containers on page load
 * Scans for elements with data-animations attribute and applies animations
 */
function initializeSVGAnimations() {
  const svgContainers = document.querySelectorAll('[data-animations]');
  
  if (svgContainers.length === 0) {
    console.log('No SVG animation containers found on page');
    return;
  }

  console.log(`Initializing animations for ${svgContainers.length} container(s)`);

  svgContainers.forEach((container, index) => {
    const animationString = container.dataset.animations;
    console.log(`Container ${index}: data-animations="${animationString}"`);
    
    if (!animationString) {
      console.warn(`Container ${index}: No animation string found`);
      return;
    }

    // Check for <object> tag first (preferred for animations)
    // For object elements, fetch and embed the SVG inline for animation support
    const objectElement = container.querySelector('object[data$=".svg"]');
    if (objectElement) {
      console.log(`Container ${index}: Found object element with SVG`);
      const svgPath = objectElement.getAttribute('data');
      console.log(`Container ${index}: Object SVG path = ${svgPath}`);
      
      // Fetch the SVG and embed it inline for animation support
      fetch(svgPath)
        .then(response => {
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          return response.text();
        })
        .then(svgData => {
          console.log(`Container ${index}: SVG fetched from object, length: ${svgData.length}`);
          // Parse SVG
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = svgData;
          const svgElement = tempDiv.querySelector('svg');
          
          if (svgElement) {
            console.log(`Container ${index}: Embedding SVG inline...`);
            svgElement.classList.add('responsive-svg');
            objectElement.replaceWith(svgElement);
            
            // Apply animations to embedded SVG
            const animations = parseAnimationDirective(animationString);
            console.log(`Container ${index}: Parsed animations:`, animations);
            if (animations.length > 0) {
              applySVGAnimations(container, animations);
            } else {
              console.warn(`Container ${index}: No animations parsed from: ${animationString}`);
            }
          } else {
            console.warn(`Container ${index}: Could not parse SVG from object`);
          }
        })
        .catch(err => {
          console.error(`Container ${index}: Failed to fetch object SVG: ${svgPath}`, err);
        });
      return;
    }

    // Wait for SVG to load if it's an img element
    const imgElement = container.querySelector('img[src$=".svg"]');
    console.log(`Container ${index}: Found img element?`, !!imgElement, imgElement?.src);
    
    if (imgElement) {
      // For external SVG files, we need to fetch and embed them to access their elements
      const svgPath = imgElement.src;
      console.log(`Container ${index}: SVG path = ${svgPath}`);
      
      // Function to process the SVG
      const processSVG = () => {
        console.log(`Container ${index}: Processing SVG...`);
        // After image loads, try to fetch and embed the SVG for proper animation
        fetch(svgPath)
          .then(response => {
            console.log(`Container ${index}: Fetch response:`, response.status, response.ok);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.text();
          })
          .then(svgData => {
            console.log(`Container ${index}: SVG fetched, length:`, svgData.length);
            // Create a temporary div to parse the SVG
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = svgData;
            const svgElement = tempDiv.querySelector('svg');
            console.log(`Container ${index}: SVG parsed?`, !!svgElement);
            
            if (svgElement) {
              console.log(`Container ${index}: Embedding SVG inline...`);
              // Replace the img with the embedded SVG
              svgElement.classList.add('responsive-svg');
              imgElement.replaceWith(svgElement);
              
              // Now apply animations to the embedded SVG
              const animations = parseAnimationDirective(animationString);
              console.log(`Container ${index}: Parsed animations:`, animations);
              if (animations.length > 0) {
                applySVGAnimations(container, animations);
              } else {
                console.warn(`Container ${index}: No animations parsed from: ${animationString}`);
              }
            } else {
              // Fallback if SVG parsing fails
              console.warn(`Container ${index}: Could not parse SVG - trying without embedding`);
              const animations = parseAnimationDirective(animationString);
              if (animations.length > 0) {
                applySVGAnimations(container, animations);
              }
            }
          })
          .catch(err => {
            console.error(`Container ${index}: Failed to fetch SVG: ${svgPath}`, err);
            // Continue with regular animation attempt
            const animations = parseAnimationDirective(animationString);
            if (animations.length > 0) {
              applySVGAnimations(container, animations);
            }
          });
      };
      
      // Check if image is already loaded (cached/already in DOM)
      if (imgElement.complete) {
        console.log(`Container ${index}: Image already loaded (complete=true), processing immediately`);
        processSVG();
      } else {
        console.log(`Container ${index}: Waiting for image load event`);
        // Otherwise wait for load event
        imgElement.addEventListener('load', () => {
          console.log(`Container ${index}: Image load event fired`);
          processSVG();
        });
      }

      // Handle error case
      imgElement.addEventListener('error', (e) => {
        console.error(`Container ${index}: Failed to load SVG image: ${imgElement.src}`, e);
      });
    } else {
      console.log(`Container ${index}: No img element found, trying direct SVG/animation apply`);
      // SVG is already embedded or container has SVG elements
      const animations = parseAnimationDirective(animationString);
      console.log(`Container ${index}: Animations:`, animations);
      if (animations.length > 0) {
        applySVGAnimations(container, animations);
      }
    }
  });
}

/**
 * Apply staggered animation delays to multiple elements
 * Useful for sequential animations (e.g., multiple lines drawing in sequence)
 * @param {HTMLElement} svgContainer - Container with SVG
 * @param {Array<string>} elementIds - Array of element IDs in order
 * @param {number} delayMs - Delay between each element in milliseconds
 */
function applyStaggeredDelay(svgContainer, elementIds, delayMs = 300) {
  elementIds.forEach((id, index) => {
    const element = svgContainer.querySelector(`#${CSS.escape(id)}`);
    
    if (element) {
      const delay = index * delayMs;
      element.style.setProperty('--animation-delay', `${delay}ms`);
    }
  });
}

/**
 * Get animation status for an element (for testing/debugging)
 * @param {HTMLElement} element - Element to check
 * @returns {Object} Animation status info
 */
function getAnimationStatus(element) {
  if (!element) return null;

  return {
    id: element.id,
    classes: Array.from(element.classList).filter(c => c.startsWith('svg-animate')),
    delay: element.style.getPropertyValue('--animation-delay'),
    iterations: element.style.getPropertyValue('--iterations')
  };
}

// ============================================================
// Auto-initialize on DOMContentLoaded
// ============================================================

// Initialize animations when DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeSVGAnimations);
} else {
  // DOM already loaded (e.g., script loaded late)
  initializeSVGAnimations();
}

// Export functions for external use (if using modules)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    parseAnimationDirective,
    applySVGAnimations,
    initializeSVGAnimations,
    applyStaggeredDelay,
    getAnimationStatus
  };
}
