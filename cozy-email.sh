#!/bin/ash

pid=$(lsof -i:9125 -t) 
kill -TERM $pid || kill -KILL $pid
echo 'killed cozy on $pid'
rm -rf ~/.emails/
rm -r /root/cozy-email.log
echo 'removed odl dataset'
/root/cozy-emails/bin/emails > /root/cozy-email.log 2>&1 &
echo 'cozy resarting...'
while [[ "$(lsof -i:9125 -t)" == "" ]]
do
	sleep 1
done
echo 'cozy-email restarted'
