import subprocess
import re
from flask import Flask, jsonify, request, render_template

app = Flask(__name__)

def strip_ansi(text):
    ansi_escape = re.compile(r'\x1B(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])')
    return ansi_escape.sub('', text)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/status', methods=['GET'])
def status():
    try:
        result = subprocess.run(
            ['sudo', '/home/santiago/msi-fan-control/isw_safe_wrapper.sh', 'read'],
            capture_output=True,
            text=True,
            check=True
        )
        output = strip_ansi(result.stdout)
        
        temps = re.findall(r'(\d+)\s*°C', output, re.IGNORECASE)
        rpms = re.findall(r'(\d+)\s*RPM', output, re.IGNORECASE)
        
        if len(temps) >= 2 and len(rpms) >= 2:
            return jsonify({
                "cpu_temp": int(temps[0]),
                "cpu_fan": int(rpms[0]),
                "gpu_temp": int(temps[1]),
                "gpu_fan": int(rpms[1])
            })
        else:
            return jsonify({"error": "Could not parse output", "output": output}), 500

    except subprocess.CalledProcessError as e:
        return jsonify({"error": "Failed to run isw", "details": e.stderr}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/set_mode', methods=['POST'])
def set_mode():
    data = request.get_json()
    if not data or 'mode' not in data:
        return jsonify({"error": "Invalid request"}), 400
        
    mode = data['mode']
    if mode not in ['on', 'off']:
        return jsonify({"error": "Mode must be 'on' or 'off'"}), 400
        
    try:
        subprocess.run(
            ['sudo', '/home/santiago/msi-fan-control/isw_safe_wrapper.sh', mode],
            capture_output=True,
            text=True,
            check=True
        )
        return jsonify({"success": True, "mode": mode})
    except subprocess.CalledProcessError as e:
        return jsonify({"error": "Failed to set mode", "details": e.stderr}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
