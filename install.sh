
enable_bbr()
{
    enable_bbr_force()
    {
        echo "BBR not enabled. Enabling BBR..."
        echo 'net.core.default_qdisc=fq' | tee -a /etc/sysctl.conf
        echo 'net.ipv4.tcp_congestion_control=bbr' | tee -a /etc/sysctl.conf
        sysctl -p
    }
    sysctl net.ipv4.tcp_available_congestion_control | grep -q bbr ||  enable_bbr_force
}

open_port()
{
    port_to_open="$1"
    if [[ "$port_to_open" == "" ]]; then
        echo "You must specify a port!'"
        return 9
    fi

    ufw allow $port_to_open/tcp
    ufw reload
}

enable_firewall()
{
    open_port 22
    echo "y" | ufw enable
    echo "Firewall enabled!"
    ufw status
}

add_caddy()
{
    domain_name="$1"
    path="$2"
    cat /etc/caddy/Caddyfile | grep -q "an easy way" && echo "" > /etc/caddy/Caddyfile
    echo "
$domain_name {
    root * $path
    file_server
}" >> /etc/caddy/Caddyfile
    systemctl restart caddy.service
}

add_source()
{
    # caddy
    cat /etc/apt/sources.list.d/caddy-fury.list | grep -q caddy || echo "deb [trusted=yes] https://apt.fury.io/caddy/ /" | tee -a /etc/apt/sources.list.d/caddy-fury.list
    # node js
    curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
}

install_aiurUI()
{
    server="$1"
    echo "Installing AiuUI to domain $server..."

    # Valid domain is required
    ip=$(dig +short $server)
    if [[ "$server" == "" ]] || [[ "$ip" == "" ]]; then
        echo "You must specify your valid server domain. Try execute with 'bash -s www.a.com'"
        return 9
    fi

    if [[ $(ifconfig) == *"$ip"* ]]; 
    then
        echo "$server resolves $ip and it is a valid current machine IP."
    else
        echo "The ip result from domian $server is: $ip and it seems not to be your current machine's IP!"
        return 9
    fi

    cd ~

    # Enable BBR
    enable_bbr

    # Install basic packages
    echo "Installing git vim caddy nodejs ufw..."
    add_source > /dev/null
    apt install -y git vim caddy nodejs ufw > /dev/null

    # Download the source code
    ls | grep -q AiurUI && rm ./AiurUI -rf
    git clone -b master https://github.com/AiursoftWeb/AiurUI.git

    # Build the code
    echo 'Building the source code...'
    ui_path="/var/www/aiurui-web"
    cd ~/AiurUI
    npm i && npm run build
    cd ~

    mkdir /var/www
    mkdir /var/www/virtual-web
    mv ~/AiurUI/* $ui_path
    rm ./

    # Config caddy
    echo 'Configuring the web proxy...'
    add_caddy $server $ui_path
    sleep 2

    # Config firewall
    echo 'Configuring the firewall...'
    open_port 443
    open_port 80
    enable_firewall
    sleep 2

    # Finish the installation
    echo "Successfully installed AiurUI as a service in your machine! Please open https://$server to try it now!"
    sleep 1
    echo "Your web data file is located at: $ui_path"
    echo "Strongly suggest run 'sudo apt upgrade' and reboot when convience!"
}

install_aiurUI "$@"
