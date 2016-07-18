#!/bin/ash

pid=$(lsof -i:9125 -t)
echo $pid
kill -TERM $pid || kill -KILL $pid
~/cozy-emails/bin/emails > ~/cozy-email.log 2>&1 &
while [[ "$(lsof -i:9125 -t)" == "" ]]
do
        sleep 1
done
echo 'restart cozy after post new account'
