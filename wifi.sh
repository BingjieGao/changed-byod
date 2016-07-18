#/bin/shell

if [[ "$1" == "-ssid" && "$3" == "-pwd" ]]
then
        uci set wireless.@wifi-iface[-1].ssid=$2
        uci set wireless.@wifi-iface[-1].key=$4
        uci commit wireless

        echo 'wifi changed'

fi








