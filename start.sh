#!/bin/bash

# Navigate to the app directory
cd /home/santiago/msi-fan-control

# Activate virtual environment
source venv/bin/activate

# Start the Flask app in the background
python3 app.py &
FLASK_PID=$!

# Give Flask a second to start
sleep 1

# Start the native PyQt5 window
python3 native_window.py

# When the native window is closed, kill the Flask server
kill $FLASK_PID
