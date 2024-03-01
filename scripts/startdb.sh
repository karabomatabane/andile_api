#!/bin/bash

mongod --dbpath data/ --logpath data/mongod.log &

echo "mongod process has been started..."