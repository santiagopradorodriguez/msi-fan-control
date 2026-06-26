document.addEventListener('DOMContentLoaded', () => {
    const cpuTempEl = document.getElementById('cpu-temp');
    const cpuFanEl = document.getElementById('cpu-fan');
    const gpuTempEl = document.getElementById('gpu-temp');
    const gpuFanEl = document.getElementById('gpu-fan');
    
    const cpuFanIcon = document.getElementById('cpu-fan-icon');
    const gpuFanIcon = document.getElementById('gpu-fan-icon');
    
    const statusEl = document.getElementById('connection-status');
    const statusText = document.getElementById('status-text');
    
    const btnMax = document.getElementById('btn-max');
    const btnAuto = document.getElementById('btn-auto');

    const updateFanSpeed = (elementId, iconEl, rpm) => {
        document.getElementById(elementId).textContent = rpm;
        if (rpm > 0) {
            const duration = Math.max(0.15, 3000 / rpm); // Maps RPM to animation speed smoothly
            iconEl.style.animationDuration = `${duration}s`;
            iconEl.style.color = rpm > 4000 ? '#ef4444' : '#3b82f6'; // Turn red if extremely fast
        } else {
            iconEl.style.animationDuration = '0s';
            iconEl.style.color = '#94a3b8'; // Grey out if stopped
        }
    };

    const updateUI = (data) => {
        if (data.cpu_temp !== undefined) cpuTempEl.textContent = data.cpu_temp;
        if (data.gpu_temp !== undefined) gpuTempEl.textContent = data.gpu_temp;
        
        if (data.cpu_fan !== undefined) updateFanSpeed('cpu-fan', cpuFanIcon, data.cpu_fan);
        if (data.gpu_fan !== undefined) updateFanSpeed('gpu-fan', gpuFanIcon, data.gpu_fan);

        statusText.textContent = 'Connected';
        statusEl.style.color = '#10b981'; 
        statusEl.style.borderColor = 'rgba(16, 185, 129, 0.3)';
    };

    const fetchStatus = async () => {
        try {
            const response = await fetch('/status');
            if (!response.ok) throw new Error('Network error');
            const data = await response.json();
            updateUI(data);
        } catch (error) {
            console.error('Error fetching status:', error);
            statusText.textContent = 'Disconnected';
            statusEl.style.color = '#ef4444';
            statusEl.style.borderColor = 'rgba(239, 68, 68, 0.3)';
            
            // Stop fans visually when disconnected
            cpuFanIcon.style.animationDuration = '0s';
            gpuFanIcon.style.animationDuration = '0s';
        }
    };

    const setMode = async (mode) => {
        try {
            const response = await fetch('/set_mode', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mode })
            });
            if (!response.ok) throw new Error('Failed to set mode');
            console.log(`Mode set to ${mode}`);
            // Fetch immediately after setting mode for responsiveness
            setTimeout(fetchStatus, 500); 
        } catch (error) {
            console.error('Error setting mode:', error);
            alert(`Could not set mode to ${mode}. Check connection.`);
        }
    };

    btnMax.addEventListener('click', () => setMode('on'));
    btnAuto.addEventListener('click', () => setMode('off'));

    // Initial fetch
    fetchStatus();

    // Fetch loop every 2 seconds
    setInterval(fetchStatus, 2000);
});
