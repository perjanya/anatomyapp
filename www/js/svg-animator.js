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
    
    return {
      id: id.trim(),
      type: type.trim().toLowerCase(),
      iterations: type.trim().toLowerCase() === 'draw' ? parseInt(iterations) || 1 : null
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

  animations.forEach(anim => {
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

    // Apply animation class based on type
    const animationClass = `svg-animate-${anim.type}`;
    element.classList.add(animationClass);

    // Add hover effect for interactivity
    element.classList.add('svg-animate-hover');

    // Set CSS variable for iteration count if applicable
    if (anim.iterations && anim.type === 'draw') {
      element.style.setProperty('--iterations', `${anim.iterations}`);
      element.style.setProperty('--animation-delay', '0s');
    }

    console.log(`Applied ${anim.type} animation to ${anim.id}` + 
      (anim.iterations ? ` (${anim.iterations} iterations)` : ' (infinite)'));
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
    
    if (!animationString) {
      return;
    }

    // Wait for SVG to load if it's an img element
    const imgElement = container.querySelector('img[src$=".svg"]');
    
    if (imgElement) {
      imgElement.addEventListener('load', () => {
        const animations = parseAnimationDirective(animationString);
        if (animations.length > 0) {
          applySVGAnimations(container, animations);
        }
      });

      // Handle error case
      imgElement.addEventListener('error', () => {
        console.error(`Failed to load SVG: ${imgElement.src}`);
      });
    } else {
      // SVG is already embedded or container has SVG elements
      const animations = parseAnimationDirective(animationString);
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
