#!/usr/bin/env bash

set -e

function processCurlData() {
  local res=$1
  local body=${res::-3}
  local status=$(printf "%s" "$res" | tail -c 3)

  if [ "$status" -ne "200" ]; then
    echo "Error: HTTP response is $status, body: $body"
    exit $status
  fi
  RESULT="$status - $body"
}

FILE='/usr/share/nginx/html/{PROJECT_NAME}/assets/menu.json'

if [ -f "$FILE" ]; then
  if [ -z "$CLIENT_ID" ]; then
    echo "Sem ENV CLIENT_ID definida, assumindo valor padrão '{PROJECT_CLIENT_ID}'!"
    CLIENT_ID="{PROJECT_CLIENT_ID}" #default
  fi

  if [ -z "$TRIERCLOUD_API_URL" ] || [ -z "$REGISTRAR_MENU_CLIENT_ID" ] || [ -z "$REGISTRAR_MENU_CLIENT_SECRET" ] || [ -z "$CLIENT_ID" ]; then
    echo "É necessário informar as variáveis TRIERCLOUD_API_URL, REGISTRAR_MENU_CLIENT_ID, REGISTRAR_MENU_CLIENT_SECRET e CLIENT_ID para fazer o registro dos menus..."
  else
    INSECURE_TYPE=""
    URL=$TRIERCLOUD_API_URL

    if [ "$INSECURE" = "true" ]; then
      echo "Configurando para registrar menu em https local"
      INSECURE_TYPE="-k"
      URL="https://loadbalance"
      echo "Setou insecure $INSECURE_TYPE"
      echo ""
    fi

    echo "Obtendo token de segurança V2"
    BASIC_AUTH=$(echo -n "$REGISTRAR_MENU_CLIENT_ID:$REGISTRAR_MENU_CLIENT_SECRET" | base64 -w 0)
    RESPONSE=$(curl $INSECURE_TYPE -s -w "%{http_code}" -X POST "$URL/api/oauth/token" -H "Authorization: Basic $BASIC_AUTH" -H "Content-Type: application/x-www-form-urlencoded" -d "grant_type=client_credentials")
    processCurlData "$RESPONSE"
    TOKEN=$(echo -e "$RESULT" | sed -e 's/[{}]\|"/''/g' | awk -v RS=',' -F ':' '/access_token/{print $2}')
    echo "Result token -> $RESULT"
    echo "Token -> $TOKEN"

    echo ""
    echo "Registrando itens de menu para clientId: '$CLIENT_ID', pela API: '$URL'..."

    #Injeta o valor da env CLIENT_ID no valor do campo clientId no payload do JSON para registro de menu
    RESPONSE=$(sed "0,/@@CLIENT_ID@@/{s//$CLIENT_ID/}" $FILE | curl $INSECURE_TYPE -s -w "%{http_code}" -X POST "$URL/api/platform/menu/actions/registrarMenu" -H "Registrar-Menu-ClientId: $CLIENT_ID" -H "Content-Type: application/json" -H "Authorization: Bearer $TOKEN" -d @-)
    processCurlData "$RESPONSE"
    echo "Result registrarMenu -> $RESULT"

    echo ""
    echo "Registro de menu finalizado!"
  fi
else
  echo "Não foi necessário registrar itens de menu."
fi
