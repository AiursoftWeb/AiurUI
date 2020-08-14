aiur() { arg="$( cut -d ' ' -f 2- <<< "$@" )" && curl -sL https://github.com/AiursoftWeb/AiurScript/raw/master/$1.sh | sudo bash -s $arg; }
ui_path="/opt/apps/AiurUI"

install_aiurUI()
{
    if [[ $(curl -sL ifconfig.me) == *"$(dig +short $1)"* ]]; 
    then
        echo "IP is correct."
    else
        echo "$1 is not your current machine IP!"
        return 9
    fi

    aiur network/enable_bbr
    aiur install/caddy
    aiur install/node
    aiur clone_to AiursoftWeb/AiurUI ./AiurUI
    cd ./AiurUI && npm i && npm run build && cd ..
    rm $ui_path -rvf
    mkdir -p $ui_path
    mv ./AiurUI/* $ui_path && rm ./AiurUI -rf
    aiur caddy/add_file $1 $ui_path
    aiur open_port 443
    aiur  open_port 80
    aiur  enable_firewall

    echo "Successfully installed AiurUI as a service in your machine! Please open https://$1 to try it now!"
}

install_aiurUI "$@"
