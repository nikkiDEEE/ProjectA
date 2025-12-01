/**
 * Dhoom 2 Inspired "A" Insignia - 3D Render
 * Interactive JavaScript for 3D rotation and effects
 */

document.addEventListener('DOMContentLoaded', function() {
    const insignia = document.getElementById('insignia');
    const rotateBtn = document.getElementById('rotateBtn');
    const glowBtn = document.getElementById('glowBtn');
    const glow = document.querySelector('.glow');
    
    let isRotating = true;
    let isGlowing = true;
    let mouseDown = false;
    let startX, startY;
    let rotationX = 10;
    let rotationY = 0;
    
    // Toggle automatic rotation
    rotateBtn.addEventListener('click', function() {
        isRotating = !isRotating;
        if (isRotating) {
            insignia.classList.remove('paused');
            insignia.style.removeProperty('transform');
            insignia.style.cursor = '';
            rotateBtn.textContent = 'Toggle Rotation';
        } else {
            insignia.classList.add('paused');
            // Get current rotation and freeze
            const computedStyle = window.getComputedStyle(insignia);
            const matrix = computedStyle.transform;
            insignia.style.transform = matrix;
            insignia.style.cursor = 'grab';
            rotateBtn.textContent = 'Resume Rotation';
        }
    });
    
    // Toggle glow effect
    glowBtn.addEventListener('click', function() {
        isGlowing = !isGlowing;
        if (isGlowing) {
            glow.classList.remove('hidden');
            glowBtn.textContent = 'Toggle Glow';
        } else {
            glow.classList.add('hidden');
            glowBtn.textContent = 'Enable Glow';
        }
    });
    
    // Mouse/Touch drag for manual rotation (when auto-rotation is paused)
    insignia.addEventListener('mousedown', function(e) {
        if (!isRotating) {
            mouseDown = true;
            startX = e.clientX;
            startY = e.clientY;
            insignia.style.cursor = 'grabbing';
        }
    });
    
    document.addEventListener('mousemove', function(e) {
        if (mouseDown && !isRotating) {
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            
            rotationY += deltaX * 0.5;
            rotationX -= deltaY * 0.5;
            
            // Limit X rotation
            rotationX = Math.max(-60, Math.min(60, rotationX));
            
            insignia.style.transform = `rotateY(${rotationY}deg) rotateX(${rotationX}deg)`;
            
            startX = e.clientX;
            startY = e.clientY;
        }
    });
    
    document.addEventListener('mouseup', function() {
        mouseDown = false;
        insignia.style.cursor = 'grab';
    });
    
    // Touch support for mobile
    insignia.addEventListener('touchstart', function(e) {
        if (!isRotating && e.touches.length === 1) {
            mouseDown = true;
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }
    });
    
    document.addEventListener('touchmove', function(e) {
        if (mouseDown && !isRotating && e.touches.length === 1) {
            const deltaX = e.touches[0].clientX - startX;
            const deltaY = e.touches[0].clientY - startY;
            
            rotationY += deltaX * 0.5;
            rotationX -= deltaY * 0.5;
            
            rotationX = Math.max(-60, Math.min(60, rotationX));
            
            insignia.style.transform = `rotateY(${rotationY}deg) rotateX(${rotationX}deg)`;
            
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }
    });
    
    document.addEventListener('touchend', function() {
        mouseDown = false;
    });
    
    // Add sparkle effect on click
    document.querySelector('.scene').addEventListener('click', function(e) {
        createSparkle(e.clientX, e.clientY);
    });
    
    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 10px;
            height: 10px;
            background: #d4af37;
            border-radius: 50%;
            pointer-events: none;
            animation: sparkleAnim 0.6s ease-out forwards;
            box-shadow: 0 0 10px #d4af37, 0 0 20px #d4af37;
            z-index: 1000;
        `;
        document.body.appendChild(sparkle);
        
        // Create multiple sparkle particles
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            const angle = (i / 8) * Math.PI * 2;
            const distance = 30 + Math.random() * 20;
            
            particle.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                width: 4px;
                height: 4px;
                background: #f4e4bc;
                border-radius: 50%;
                pointer-events: none;
                animation: particleAnim 0.5s ease-out forwards;
                --tx: ${Math.cos(angle) * distance}px;
                --ty: ${Math.sin(angle) * distance}px;
                box-shadow: 0 0 5px #d4af37;
                z-index: 1000;
            `;
            document.body.appendChild(particle);
            
            setTimeout(() => particle.remove(), 500);
        }
        
        setTimeout(() => sparkle.remove(), 600);
    }
    
    // Keyboard controls
    document.addEventListener('keydown', function(e) {
        if (e.key === ' ' || e.key === 'Spacebar') {
            e.preventDefault();
            rotateBtn.click();
        } else if (e.key === 'g' || e.key === 'G') {
            glowBtn.click();
        }
    });
    
    // Console message
    console.log('%c🔥 DHOOM 2 - Mr. A Insignia 🔥', 
        'font-size: 24px; font-weight: bold; color: #d4af37; text-shadow: 2px 2px 4px #000;');
    console.log('%cPress SPACE to toggle rotation, G to toggle glow', 
        'font-size: 14px; color: #888;');
});
