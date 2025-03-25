#!/bin/bash

# Configurações
REPO_PATH="."
BRANCH="main"

# Função para fazer o build da API
build_api() {
    echo "🔄 Detectada mudança na branch $BRANCH. Iniciando build da API..."
    docker compose up api -d --build
    echo "✅ Build concluído com sucesso!"
}

# Função para verificar mudanças no repositório
check_changes() {
    # Atualiza o repositório local
    git fetch origin
    
    # Verifica se há mudanças na branch master
    if [ "$(git rev-parse HEAD)" != "$(git rev-parse origin/$BRANCH)" ]; then
        echo "📝 Novas mudanças detectadas!"
        git pull origin $BRANCH
        build_api
    fi
}

echo "🚀 Verificando mudanças no repositório..."
echo "📌 Branch monitorada: $BRANCH"

# Executa a verificação
check_changes 