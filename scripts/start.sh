
#!/bin/bash
set -e

cd /home/ec2-user/bookstore

# Stop any previous Next.js server
pkill -f "[n]ode server.js" || true

# Start the standalone Next.js server
nohup node server.js > /home/ec2-user/bookstore.log 2>&1 &
