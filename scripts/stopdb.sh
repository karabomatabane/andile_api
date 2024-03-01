#!/bin/bash

# Find the process ID (PID) of the running mongod process
MONGO_PID=$(ps -ef | grep "mongod" | grep -v "grep" | awk '{print $2}')

if [ -z "$MONGO_PID" ]; then
  echo "No mongod process found."
else
  # Send a termination signal to the mongod process
  kill -15 $MONGO_PID

  # Wait for the process to be terminated
  wait $MONGO_PID

  echo "mongod process has been stopped."
fi
