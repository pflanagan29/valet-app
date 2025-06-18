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

# Start the Next.js frontend
echo "Starting Next.js frontend..."
if [ ! -d "$WEB_DIR" ]; then
    echo "Error: Frontend directory not found at $WEB_DIR"
    exit 1
fi

cd "$WEB_DIR"
npm run dev &
FRONTEND_PID=$!

# Wait briefly to ensure frontend starts
sleep 2
if ! kill -0 $FRONTEND_PID 2>/dev/null; then
    echo "Error: Frontend failed to start"
    cleanup
fi

# Start the FastAPI backend
echo "Starting FastAPI backend..."
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
uvicorn main:app --reload --port 3006 &
BACKEND_PID=$!

# Wait briefly to ensure backend starts
sleep 2
if ! kill -0 $BACKEND_PID 2>/dev/null; then
    echo "Error: Backend failed to start"
    cleanup
fi

echo "All services are running."
echo "Frontend running at http://localhost:3005"
echo "Backend running at http://localhost:3006"
echo "Press Ctrl+C to stop all services"

# Wait for all background processes
wait 