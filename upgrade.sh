aiur() { arg="$( cut -d ' ' -f 2- <<< "$@" )" && curl -sL https://github.com/AiursoftWeb/AiurScript/raw/master/$1.sh | sudo bash -s $arg; }
ui_path="/opt/apps/AiurUI"

upgrade_aiurUI()
{
    aiur git/clone_to AiursoftWeb/AiurUI ./AiurUI
    cd ./AiurUI && npm i && npm run build && cd ..
    rm $ui_path -rvf
    mkdir -p $ui_path
    mv ./AiurUI/* $ui_path && rm ./AiurUI -rf

    echo "Successfully upgraded AiurUI as a service in your machine!"
}

upgrade_aiurUI "$@"
