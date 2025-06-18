#!/bin/bash

# Store the root directory
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WEB_DIR="$ROOT_DIR/apps/web"
API_DIR="$ROOT_DIR/apps/api"

# Function to cleanup background processes
cleanup() {
    echo "Shutting down services..."
    kill $(jobs -p) 2>/dev/null
    exit 1
}

# Set up trap for cleanup
trap cleanup SIGINT SIGTERM

# Start the Next.js frontend in debug mode
echo "Starting Next.js frontend in debug mode..."
if [ ! -d "$WEB_DIR" ]; then
    echo "Error: Frontend directory not found at $WEB_DIR"
    exit 1
fi

cd "$WEB_DIR"
NODE_OPTIONS='--inspect' npm run dev &
FRONTEND_PID=$!

# Wait briefly to ensure frontend starts
sleep 2
if ! kill -0 $FRONTEND_PID 2>/dev/null; then
    echo "Error: Frontend failed to start"
    cleanup
fi

echo "Frontend debugger listening on ws://127.0.0.1:9229"
echo "Open chrome://inspect in Chrome to attach to the frontend debugger"

# Start the FastAPI backend in debug mode
echo "Starting FastAPI backend in debug mode..."
if [ ! -d "$API_DIR" ]; then
    echo "Error: Backend directory not found at $API_DIR"
    cleanup
fi

cd "$API_DIR"
if [ ! -d ".venv" ]; then
    echo "Error: Python virtual environment not found in $API_DIR"
    cleanup
fi

source .venv/bin/activate
export PYTHONPATH=$API_DIR:$PYTHONPATH
python -m debugpy --listen 5678 -m uvicorn main:app --reload --port 3006 &
BACKEND_PID=$!

# Wait briefly to ensure backend starts
sleep 2
if ! kill -0 $BACKEND_PID 2>/dev/null; then
    echo "Error: Backend failed to start"
    cleanup
fi

echo "All services are running in debug mode."
echo "Frontend running at http://localhost:3005"
echo "Backend running at http://localhost:3006"
echo "Frontend debugger: Open chrome://inspect in Chrome"
echo "Backend debugger: Use VS Code Python debugger and connect to port 5678"
echo "Press Ctrl+C to stop all services"

# Print debug instructions
cat << EOF

Debug Instructions:
------------------
Frontend Debugging:
1. Open Chrome
2. Navigate to chrome://inspect
3. Click "Open dedicated DevTools for Node"
4. Your breakpoints in the Next.js code will now be hit

Backend Debugging:
1. Open VS Code
2. Go to the Debug panel (Ctrl/Cmd + Shift + D)
3. Create or select the "Python: Remote Attach" configuration:
   {
     "name": "Python: Remote Attach",
     "type": "python",
     "request": "attach",
     "connect": {
       "host": "localhost",
       "port": 5678
     }
   }
4. Start debugging (F5)
5. Your breakpoints in the FastAPI code will now be hit

EOF

# Wait for all background processes
wait 