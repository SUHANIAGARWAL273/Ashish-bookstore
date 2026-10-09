#!/bin/bash

cd /home/ec2-user/bookstore

nohup npm run start > /home/ec2-user/bookstore.log 2>&1 &