#!/bin/bash

# Store the base directory path
BASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WEB_DIR="$BASE_DIR/web"
API_DIR="$BASE_DIR/api"

# Function to check and kill process using a port
kill_port_process() {
    local port=$1
    if command -v lsof >/dev/null 2>&1; then
        local pid=$(lsof -ti:$port)
        if [ ! -z "$pid" ]; then
            echo "Found process using port $port, attempting to kill..."
            kill -9 $pid 2>/dev/null
        fi
    fi
}

# Function to cleanup processes on exit
cleanup() {
    echo "Cleaning up processes..."
    # Kill processes by PID if we have them
    if [ ! -z "$WEB_PID" ]; then
        echo "Killing frontend process..."
        kill -9 $WEB_PID 2>/dev/null
    fi
    if [ ! -z "$API_PID" ]; then
        echo "Killing backend process..."
        kill -9 $API_PID 2>/dev/null
    fi
    
    # Also kill any processes using our ports as backup
    kill_port_process 3005
    kill_port_process 3006
    
    exit 1
}

# Set up trap for cleanup
trap cleanup SIGINT SIGTERM

echo "Starting Valet App development servers..."

# Kill any existing processes using our ports
kill_port_process 3005
kill_port_process 3006

# Start frontend
echo "Starting frontend web app..."
cd "$WEB_DIR" && npm run dev &
WEB_PID=$!

# Wait for frontend to start
sleep 5
if ! kill -0 $WEB_PID 2>/dev/null; then
    echo "Error: Frontend failed to start"
    cleanup
fi

# Check if frontend is accessible
if ! curl -s http://localhost:3005 > /dev/null; then
    echo "Error: Frontend is not responding at http://localhost:3005"
    cleanup
fi

echo "Frontend started successfully at http://localhost:3005"

# Start backend
echo "Starting backend API..."
cd "$API_DIR"
source .venv/bin/activate
uvicorn app.main:app --reload --port 3006 &
API_PID=$!

# Wait for backend to start
sleep 5
if ! kill -0 $API_PID 2>/dev/null; then
    echo "Error: Backend failed to start"
    cleanup
fi

# Check if backend is accessible
if ! curl -s http://localhost:3006 > /dev/null; then
    echo "Error: Backend is not responding at http://localhost:3006"
    cleanup
fi

echo "Backend started successfully at http://localhost:3006"
echo "Development environment is ready!"

# Keep script running
wait 