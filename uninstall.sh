
delete_service()
{
    service="$1" 
    systemctl stop $service
    systemctl disable $service
    rm /etc/systemd/system/$service
    rm /etc/systemd/system/$service # and symlinks that might be related
    rm /usr/lib/systemd/system/$service 
    rm /usr/lib/systemd/system/$service # and symlinks that might be related
    systemctl daemon-reload
    systemctl reset-failed
}

delete_service "caddy.service"

rm ~/AiurUI -rvf
rm /etc/caddy -rvf
rm /var/www/aiurui-web -rvf

apt remove caddy -y

echo "Successfully uninstalled aiurUI on your machine!"