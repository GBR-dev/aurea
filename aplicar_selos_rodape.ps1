$ErrorActionPreference = 'Stop'

# Eu aplico os selos somente nos cinco HTMLs e no CSS principal da Áurea.
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$arquivosHtml = @(
    'index.html',
    'colecao.html',
    'produto.html',
    'sobre.html',
    'contato.html'
)
$arquivoCss = Join-Path $root 'css/style.css'

# Eu confiro os arquivos antes de fazer qualquer alteração.
foreach ($nome in $arquivosHtml) {
    $caminho = Join-Path $root $nome
    if (-not (Test-Path -LiteralPath $caminho -PathType Leaf)) {
        throw "Não encontrei '$nome' em '$root'. Extraia este script na raiz da pasta AUREA-SITE, ao lado de index.html. Nenhum arquivo foi alterado ainda."
    }
}
if (-not (Test-Path -LiteralPath $arquivoCss -PathType Leaf)) {
    throw "Não encontrei 'css/style.css' em '$root'. Nenhum arquivo foi alterado ainda."
}

# Eu guardo cópias dos arquivos que podem ser alterados, para poder voltar atrás.
$instante = Get-Date -Format 'yyyyMMdd_HHmmss'
$pastaBackup = Join-Path $root ('.backup-selos-rodape_' + $instante)
New-Item -ItemType Directory -Path $pastaBackup | Out-Null
foreach ($nome in ($arquivosHtml + 'css/style.css')) {
    $origem = Join-Path $root $nome
    $destino = Join-Path $pastaBackup $nome
    $destinoPasta = Split-Path -Parent $destino
    New-Item -ItemType Directory -Path $destinoPasta -Force | Out-Null
    Copy-Item -LiteralPath $origem -Destination $destino
}

$blocoSelos = @'
        <!-- Eu destaco as informações principais de compra no rodapé. -->
        <div class="rodape-confianca" aria-label="Informações de compra">
            <div class="selo-confianca">
                <svg class="icone-selo-confianca" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="Ícone de pagamento">
                    <path d="M12 3 19 6v5c0 4.4-2.8 7.9-7 10-4.2-2.1-7-5.6-7-10V6l7-3Z"/>
                    <path d="m8.5 12 2.3 2.3 4.7-4.8"/>
                </svg>
                <span class="selo-confianca-texto">
                    <strong>Pagamento via Pix ou cartão</strong>
                    <small>Escolha sua forma de pagamento</small>
                </span>
            </div>

            <div class="selo-confianca">
                <svg class="icone-selo-confianca" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="Ícone de clique">
                    <path d="M5 3v14l4-4 3 6 3-1.5-3-6h5L5 3Z"/>
                    <path d="m15.5 18.2 2 2 3.5-3.7"/>
                </svg>
                <span class="selo-confianca-texto">
                    <strong>Pedido em poucos cliques</strong>
                    <small>Prático do início ao fim</small>
                </span>
            </div>
        </div>

'@

# Eu escrevo os HTMLs em UTF-8 e só insiro o bloco antes dos direitos autorais.
$utf8SemBOM = New-Object System.Text.UTF8Encoding -ArgumentList $false
foreach ($nome in $arquivosHtml) {
    $caminho = Join-Path $root $nome
    $conteudo = [System.IO.File]::ReadAllText($caminho)

    if ($conteudo.Contains('class="rodape-confianca"')) {
        Write-Host "Já existe: $nome (não alterei para não duplicar os selos)." -ForegroundColor Yellow
        continue
    }

    $marcador = '<div class="footer-bottom">'
    $primeiraPosicao = $conteudo.IndexOf($marcador, [System.StringComparison]::Ordinal)
    if ($primeiraPosicao -lt 0) {
        throw "Não encontrei o bloco footer-bottom em '$nome'. A cópia de segurança está em '$pastaBackup'."
    }
    if ($conteudo.IndexOf($marcador, $primeiraPosicao + $marcador.Length, [System.StringComparison]::Ordinal) -ge 0) {
        throw "Encontrei mais de um footer-bottom em '$nome'; interrompi para evitar uma alteração incorreta. A cópia de segurança está em '$pastaBackup'."
    }

    $conteudoNovo = $conteudo.Insert($primeiraPosicao, $blocoSelos)
    [System.IO.File]::WriteAllText($caminho, $conteudoNovo, $utf8SemBOM)
    Write-Host "Atualizado: $nome" -ForegroundColor Green
}

# Eu acrescento os estilos apenas uma vez ao fim do CSS principal.
$conteudoCss = [System.IO.File]::ReadAllText($arquivoCss)
if ($conteudoCss.Contains('.rodape-confianca')) {
    Write-Host 'Os estilos dos selos já existem em css/style.css; não dupliquei as regras.' -ForegroundColor Yellow
} else {
    $estilos = @'

/* ==========================================
   SELOS DE CONFIANÇA DO RODAPÉ
   Eu destaco informações de compra com ícones
   discretos que combinam com a identidade Áurea.
   ========================================== */

.rodape-confianca {
    width: min(1180px, 92%);
    margin: 0 auto 24px;
    padding: 24px 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 20px 56px;
    border-top: 1px solid rgba(255, 255, 255, 0.14);
    border-bottom: 1px solid rgba(255, 255, 255, 0.14);
}

.selo-confianca {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
    color: var(--creme);
}

.icone-selo-confianca {
    width: 31px;
    height: 31px;
    flex: 0 0 auto;
    color: var(--creme-escuro);
}

.selo-confianca-texto {
    display: flex;
    flex-direction: column;
    gap: 3px;
}

.selo-confianca-texto strong {
    color: var(--creme);
    font-size: 13px;
    font-weight: 600;
    line-height: 1.4;
}

.selo-confianca-texto small {
    color: #dbcbbd;
    font-size: 11px;
    line-height: 1.4;
}

@media (max-width: 600px) {
    .rodape-confianca {
        align-items: flex-start;
        flex-direction: column;
        gap: 18px;
        padding: 22px 0;
    }

    .selo-confianca {
        width: 100%;
        max-width: 340px;
    }
}
'@
    [System.IO.File]::WriteAllText($arquivoCss, ($conteudoCss + $estilos), $utf8SemBOM)
    Write-Host 'Atualizado: css/style.css' -ForegroundColor Green
}

Write-Host ''
Write-Host 'Concluído! Os selos foram inseridos sem alterar JavaScript, produtos ou carrinho.' -ForegroundColor Cyan
Write-Host "Cópias de segurança salvas em: $pastaBackup" -ForegroundColor Cyan
Write-Host 'Agora confira a página inicial e as páginas internas no Live Server. Use Ctrl+F5 para recarregar.' -ForegroundColor Cyan
