/**
 * Interactive Quadrant SVG Handler
 * Adds click interactivity and highlighting to SVG quadrant diagrams
 */

document.addEventListener('DOMContentLoaded', function() {
  // Find all SVG containers with quadrant lines
  const svgContainers = document.querySelectorAll('.svg-container');
  
  svgContainers.forEach(container => {
    const svg = container.querySelector('svg');
    if (!svg) return;
    
    // Check if this SVG has quadrant lines (Layer_2)
    const layer2 = svg.getElementById('Layer_2');
    if (!layer2) return;
    
    // Define quadrant regions (RUQ, LUQ, RLQ, LLQ)
    const quadrants = [
      { id: 'ruq', name: 'Right Upper Quadrant (RUQ)', x: 229, y: 62 },
      { id: 'luq', name: 'Left Upper Quadrant (LUQ)', x: 545, y: 62 },
      { id: 'rlq', name: 'Right Lower Quadrant (RLQ)', x: 229, y: 390 },
      { id: 'llq', name: 'Left Lower Quadrant (LLQ)', x: 545, y: 390 }
    ];
    
    // Add click handlers to lines
    const lines = layer2.querySelectorAll('line');
    lines.forEach(line => {
      line.style.cursor = 'pointer';
      
      line.addEventListener('click', (e) => {
        e.stopPropagation();
        highlightLineInteraction(line);
      });
    });
    
    // Add clickable quadrant regions
    const viewBox = svg.getAttribute('viewBox').split(' ');
    const svgWidth = viewBox[2];
    const svgHeight = viewBox[3];
    
    quadrants.forEach(quad => {
      // Create invisible rect for clickable area
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', quad.id === 'ruq' || quad.id === 'rlq' ? '189.9' : '288.4');
      rect.setAttribute('y', quad.id === 'ruq' || quad.id === 'luq' ? '0' : '123.9');
      rect.setAttribute('width', quad.id === 'ruq' || quad.id === 'rlq' ? '98.5' : '177.9');
      rect.setAttribute('height', quad.id === 'ruq' || quad.id === 'luq' ? '123.9' : '369.6');
      rect.setAttribute('fill', 'transparent');
      rect.setAttribute('class', `quadrant-region ${quad.id}`);
      rect.setAttribute('data-quadrant', quad.name);
      rect.style.cursor = 'pointer';
      
      rect.addEventListener('click', (e) => {
        e.stopPropagation();
        highlightQuadrant(svg, quad, e);
      });
      
      // Add hover effect
      rect.addEventListener('mouseover', () => {
        rect.style.fill = 'rgba(236, 0, 140, 0.05)';
      });
      
      rect.addEventListener('mouseout', () => {
        rect.style.fill = 'transparent';
      });
      
      svg.appendChild(rect);
    });
    
    // Add optional labels to quadrants
    addQuadrantLabels(svg, quadrants);
  });
  
  function highlightLineInteraction(line) {
    // Briefly brighten the line
    const originalStrokeWidth = line.getAttribute('stroke-width') || '3';
    line.setAttribute('stroke-width', '6');
    
    setTimeout(() => {
      line.setAttribute('stroke-width', originalStrokeWidth);
    }, 300);
  }
  
  function highlightQuadrant(svg, quadrant, event) {
    // Create highlight effect
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', quadrant.x);
    circle.setAttribute('cy', quadrant.y);
    circle.setAttribute('r', '5');
    circle.setAttribute('fill', '#EC008C');
    circle.setAttribute('class', 'quadrant-highlight');
    circle.setAttribute('pointer-events', 'none');
    
    svg.appendChild(circle);
    
    // Remove after animation
    setTimeout(() => {
      circle.remove();
    }, 600);
    
    // Optional: Show quadrant info
    showQuadrantInfo(quadrant);
  }
  
  function showQuadrantInfo(quadrant) {
    // Remove existing info if present
    const existingInfo = document.querySelector('.quadrant-info');
    if (existingInfo) {
      existingInfo.remove();
    }
    
    // Create info popup (optional - can be customized)
    const info = document.createElement('div');
    info.className = 'quadrant-info';
    info.textContent = quadrant.name;
    info.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: linear-gradient(135deg, #EC008C 0%, #e91e63 100%);
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      font-weight: 600;
      box-shadow: 0 4px 12px rgba(236, 0, 140, 0.3);
      animation: slideInUp 0.4s ease-out;
      z-index: 100;
    `;
    
    document.body.appendChild(info);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      info.style.animation = 'slideOutDown 0.3s ease-in';
      setTimeout(() => info.remove(), 300);
    }, 3000);
  }
  
  function addQuadrantLabels(svg, quadrants) {
    // Check if SVG already has labels
    if (svg.querySelector('.quadrant-label')) return;
    
    quadrants.forEach(quad => {
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      const label = quad.id.toUpperCase();
      
      text.setAttribute('x', quad.x);
      text.setAttribute('y', quad.y);
      text.setAttribute('class', 'quadrant-label');
      text.setAttribute('data-quadrant', quad.id);
      text.textContent = label;
      text.style.fontSize = '14px';
      text.style.fontWeight = 'bold';
      text.style.opacity = '0.5';
      
      svg.appendChild(text);
    });
  }
});

// Add animation styles dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutDown {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(20px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
