#!/bin/bash
set -e

cd /home/ec2-user/bookstore

npm ci --omit=dev

nohup npm run start > /home/ec2-user/bookstore.log 2>&1 &