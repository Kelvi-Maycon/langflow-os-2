# LangFlow — Explicação Completa do Sistema

## 1. O que é este projeto

O **LangFlow** é uma aplicação de estudo de inglês orientada a ciclo de aprendizado.
Ela foi pensada para funcionar de forma **local-first**, isto é:

- os dados principais ficam salvos localmente no navegador
- o usuário pode estudar sem depender de um backend próprio
- o sistema organiza leitura, prática guiada, produção e revisão em um fluxo contínuo

O objetivo do produto é transformar vocabulário encontrado em leitura real em material de estudo ativo, com progressão, gamificação e repetição espaçada.

Em termos práticos, o sistema pega este caminho:

1. o usuário lê um texto e clica em palavras
2. essas palavras entram no banco de vocabulário
3. o Builder usa essas palavras para gerar exercícios
4. frases úteis podem ser salvas como flashcards
5. os flashcards entram em revisão SRS
6. o dashboard e a tela de evolução mostram progresso, retenção, streak e conquistas

---

## 2. Qual é a proposta do produto

O produto representa uma jornada de estudo dividida em módulos complementares:

- **Leitura com contexto**
- **Prática guiada com frases**
- **Revisão inteligente**
- **Produção escrita**
- **Acompanhamento de evolução**

O foco não é apenas “decorar palavras”, mas mover itens por um ciclo de domínio:

- `desconhecida`
- `reconhecida`
- `em_treino`
- `ativa`
- `dominada`

Esse ciclo é controlado por interação real do usuário no Reader, no Builder e no SRS.

---

## 3. Estrutura geral da interface

O app hoje tem estas áreas principais na navegação lateral:

- `Dashboard`
- `Biblioteca`
- `Prática Rápida`
- `Estatísticas`
- `Evolução`
- `Configurações` via card do perfil no rodapé da sidebar

### Papel de cada rota

- **Dashboard**
  - é a visão geral do dia
  - concentra streak, XP, missão, revisão pendente, progresso de nível e próximos passos

- **Biblioteca**
  - é o Reader
  - serve para inserir texto, importar legenda do YouTube e capturar vocabulário em contexto

- **Prática Rápida**
  - é o Builder / Hub de Prática
  - reúne montagem de frase, transform, cloze e daily prompt

- **Estatísticas**
  - hoje aponta para a tela de Flashcards SRS
  - funciona como central de revisão

- **Evolução**
  - mostra histórico de progresso, engajamento, vocabulário e marcos

- **Configurações**
  - define nível, IA, limites, seed, metas diárias, gamificação e dados locais

---

## 4. Arquitetura funcional do produto

O sistema é baseado em quatro blocos principais de dados:

- **Configuração do usuário**
- **Banco de palavras**
- **Banco de frases e flashcards**
- **Métricas de progresso**

Esses blocos são gerenciados com **Zustand** e persistidos localmente.

### Stores principais

- `src/store/useConfig.js`
  - guarda configurações gerais do app

- `src/store/useWordStore.js`
  - guarda o banco de palavras e expressões

- `src/store/useCardStore.js`
  - guarda frases geradas e flashcards salvos

- `src/store/useProgressStore.js`
  - guarda XP, streak, métricas diárias, conquistas e histórico de prompt diário

---

## 5. Como os dados são persistidos

O projeto usa persistência local com Zustand + storage customizado.

Na prática, isso significa:

- configurações ficam salvas entre sessões
- palavras não são perdidas ao recarregar a página
- flashcards continuam existindo depois do fechamento do navegador
- progresso diário e XP continuam persistidos

### O que isso resolve

- dispensa backend para o MVP
- deixa o app rápido e simples de usar
- permite exportar/importar dados localmente

### Limitação atual

- os dados ficam ligados ao navegador/dispositivo local
- não existe sync em nuvem nativo no estado atual

---

## 6. Tela: Dashboard

Arquivo principal:

- `src/components/shared/Dashboard.jsx`

### O que essa tela representa

A dashboard representa o **centro operacional da jornada de estudo**.
Ela não é apenas um painel bonito; ela serve para responder rapidamente:

- o que estudar agora
- como está minha retenção
- como está minha sequência
- quanto já avancei
- qual é a próxima recompensa/conquista

### O que existe nessa tela hoje

#### 1. Topbar

- saudação do usuário
- data atual
- campo de busca visual
- pill de streak atual
- botão de notificações

#### 2. Hero principal

- mensagem principal de motivação e continuidade
- CTA para continuar a jornada
- CTA para ver o caminho / revisar

#### 3. Faixa de nível

- nível atual do usuário
- XP acumulado
- barra de progresso de nível
- indicação de quanto falta para o próximo nível

#### 4. Blocos principais de resumo

- **Retenção & Revisão**
  - mostra revisões pendentes
  - mostra conteúdo novo na fila
  - mostra quantas missões do dia já foram concluídas

- **Força da Memória**
  - mostra taxa de retenção
  - exibe barra visual de retenção
  - resume cards de longo prazo e revisão

- **Ofensiva de Estudo**
  - mostra streak atual
  - mostra recorde
  - mostra sessão mínima configurada
  - mostra a semana com bolhas de estudo diário

#### 5. Missões do dia

- mostra as metas diárias configuradas
- cada missão exibe:
  - nome
  - descrição
  - progresso
  - XP associado

#### 6. Evolução do vocabulário

- gráfico de palavras dominadas ao longo do tempo
- janela por 7, 30 ou 90 dias

#### 7. Jornada de maestria

- mostra a trilha CEFR do usuário
- destaca o nível atual

#### 8. Próxima conquista

- mostra a conquista mais próxima de ser desbloqueada
- mostra progresso percentual para ela

#### 9. Resumo rápido

- vocabulário total
- XP total
- palavras ativas
- palavras dominadas
- cards de curto prazo
- cards novos

#### 10. Auto-ajuste

- mostra se o auto-ajuste está ativo
- mostra o último ajuste de dificuldade
- mostra contexto de retenção, ofensiva e prompt

#### 11. Conquistas e emblemas

- mostra conquistas desbloqueadas e bloqueadas

### Qual é a função da dashboard no produto

Ela serve como:

- painel diário de decisão
- camada de gamificação
- resumo executivo do ciclo de estudo

---

## 7. Tela: Biblioteca / Reader

Arquivo principal:

- `src/components/Reader/Reader.jsx`

### O que essa tela representa

Essa tela representa o momento de **input real do idioma**.
É onde o usuário traz texto de fora e transforma leitura em material de estudo.

### O que ela faz

- recebe texto manual via textarea
- recebe URL de YouTube
- tenta importar a legenda do vídeo
- quebra o texto em tokens clicáveis
- permite clicar em palavras individuais
- mostra explicação contextual em tooltip
- salva palavras no banco
- monta uma sessão de palavras do texto atual
- envia essas palavras para o Builder

### Fluxo funcional

1. usuário cola texto ou link do YouTube
2. sistema gera tokens
3. usuário clica numa palavra
4. sistema:
   - verifica se a palavra já existe
   - salva no banco se necessário
   - marca a palavra como vista no Reader
   - registra métrica de progresso
   - busca explicação contextual
5. palavras clicadas entram na sessão atual
6. usuário pode clicar em `Praticar com este texto`

### Integração com YouTube

Arquivo:

- `src/services/youtube.js`

### Como funciona

- extrai `videoId` de diferentes formatos de URL
- tenta buscar transcript em inglês via endpoint público `timedtext`
- tenta idiomas:
  - `en`
  - `en-US`
  - `en-GB`
- tenta legenda normal e `asr`

### O que resolve

- permite transformar vídeos em material de leitura
- acelera a entrada de conteúdo real

### Limitação

- depende de o vídeo ter legenda disponível
- alguns vídeos podem falhar mesmo com URL válida

### Integração com IA no Reader

Arquivo:

- `src/services/ai.js`

### O que a IA faz aqui

- explica o significado da palavra no contexto da frase
- a explicação é em inglês simples
- se não houver IA configurada, o app usa fallback de dicionário local

### Papel pedagógico da tela

- descoberta de vocabulário
- contextualização
- coleta de insumos reais para o restante do sistema

---

## 8. Tela: Prática Rápida / Builder / Hub de Prática

Arquivo principal:

- `src/components/Builder/Builder.jsx`

### O que essa tela representa

Essa é a central de **produção guiada** do sistema.
Ela pega vocabulário coletado e transforma em prática ativa.

### Modos existentes

- `Montagem`
- `Transform`
- `Cloze`
- `Prompt`

### Como a sessão é montada

A seleção do vocabulário usa esta prioridade:

1. palavras vindas da sessão do Reader
2. banco local não dominado
3. seed importado por nível

### Configurações importantes que afetam esta tela

- `difficultWordsWeight`
- `phrasesPerWord`
- `sessionWordLimit`

### 8.1 Montagem

#### O que faz

- gera frases em inglês
- embaralha os tokens
- usuário monta a frase correta

#### Interação

- drag and drop
- clique para mover tokens
- validação por ordem correta

#### O que acontece ao acertar ou errar

- registra tentativa
- atualiza métricas do progresso
- atualiza status da palavra
- pode abrir produção livre
- permite salvar frase no flashcard

### 8.2 Sentence Transform

#### O que faz

- mostra uma frase base
- pede ao usuário para reescrever em outra forma
- exemplos:
  - afirmativa para negativa
  - afirmativa para passado
  - negativa para afirmativa

#### Como valida

- comparação textual normalizada

### 8.3 Cloze

#### O que faz

- mostra uma frase com lacuna
- usuário digita a palavra ou expressão faltante

#### Como valida

- comparação normalizada do texto esperado

### 8.4 Daily Prompt

#### O que faz

- gera 3 alvos de escrita do dia
- usuário escreve 3 frases
- cada frase precisa conter o termo-alvo correspondente

#### Regras

- não pode ganhar o prompt do mesmo dia duas vezes
- a submissão fica registrada por `dayKey`

### Geração de frases

Serviço:

- `src/services/ai.js`

#### Se houver IA configurada

- gera 3 frases por palavra:
  - `positive`
  - `negative`
  - `past`

#### Se não houver IA

- usa fallback local simples

### Papel pedagógico da tela

- mover reconhecimento para produção
- fixar ordem, estrutura e uso natural
- gerar material real para revisão futura

---

## 9. Tela: Flashcards SRS

Arquivo principal:

- `src/components/Flashcard/Flashcard.jsx`

### O que essa tela representa

É o módulo de **revisão espaçada**.
Ele pega frases salvas e as transforma em revisão recorrente.

### O que a tela faz

- mostra resumo de cards pendentes
- mostra total de cards
- estima tempo de revisão
- inicia sessão de revisão
- permite virar card
- permite avaliar lembrança
- recalcula intervalo SRS

### Escala de avaliação

- `nao_lembro`
- `dificil`
- `bom`
- `facil`

### Algoritmo SRS

Arquivo:

- `src/services/srs.js`

### Como funciona

É uma implementação simplificada inspirada em **SM-2**:

- `nao_lembro`
  - volta para 1 dia
  - reduz ease factor
  - aumenta lapses

- `dificil`
  - cresce pouco
  - reduz um pouco o ease factor

- `bom`
  - cresce por multiplicação do ease factor

- `facil`
  - cresce mais
  - aumenta ease factor

### Ordenação dos cards

Os cards devidos são ordenados por:

1. mais atrasados primeiro
2. menor ease factor
3. mais antigos

### Relação com o ciclo da palavra

A revisão também influencia status do vocabulário:

- acertos ajudam a promover
- `nao_lembro` pode rebaixar

### Papel pedagógico da tela

- manter retenção de longo prazo
- revisitar frases salvas no momento certo
- consolidar domínio ativo

---

## 10. Tela: Evolução

Arquivo principal:

- `src/components/shared/Evolution.jsx`

### O que essa tela representa

É uma visualização mais analítica do desempenho geral.
Enquanto a dashboard responde “o que faço agora?”, a Evolução responde “como estou crescendo?”

### O que existe nela

- cartões de métricas gerais
- histórico de engajamento
- marcos históricos
- radar de habilidades
- funil de vocabulário
- insights rápidos

### Blocos principais

#### 1. Métricas

- quantidade de palavras
- XP
- retenção
- nível CEFR atual

#### 2. Histórico de engajamento

- gráfico de atividade dos últimos 30 dias

#### 3. Marcos históricos

- primeiras palavras
- início da streak
- primeiras conquistas

#### 4. Equilíbrio de habilidades

- radar com:
  - vocabulário
  - retenção
  - precisão
  - escrita
  - consistência

#### 5. Funil de vocabulário

- aprendido
- construção
- revisão
- dominadas

#### 6. Leitura rápida

- vocabulário ativo
- palavras dominadas
- sessões salvas
- progresso recente

### Papel dessa tela

- leitura analítica
- feedback de longo prazo
- percepção de crescimento do usuário

---

## 11. Tela: Configurações

Arquivo principal:

- `src/components/Settings/Settings.jsx`

### O que essa tela representa

É a central de parametrização do sistema.
Ela controla a forma como o app funciona.

### Abas existentes

- `Geral`
- `API de IA`
- `Banco de Palavras`
- `SRS`
- `Gamificação`

### 11.1 Aba Geral

#### O que faz

- define nível CEFR do usuário
- mostra uso do armazenamento local
- exporta dados
- importa dados

### 11.2 Aba API de IA

#### O que faz

- escolhe provedor:
  - OpenAI
  - Gemini
  - nenhum
- define chave
- define modelo
- testa conexão

### O que isso resolve

- permite ativar explicações contextuais reais
- permite gerar frases com IA

### 11.3 Aba Banco de Palavras

#### O que faz

- mostra estatísticas do banco
- adiciona palavra manual
- adiciona collocation manual
- faz upload em massa
- filtra por status
- pesquisa por texto
- importa seed NGSL por nível
- importa seed até o nível atual
- limpa seed sem progresso
- remove item individual

### 11.4 Aba SRS

#### O que faz

- define limite diário de revisões
- define peso do banco difícil no Builder
- define variações por palavra
- define número de palavras por sessão

### 11.5 Aba Gamificação

#### O que faz

- mostra nível, XP, streak e conquistas
- ajusta metas diárias
- ajusta tempo mínimo da streak
- ativa/desativa auto-ajuste
- mostra último ajuste de dificuldade
- mostra métricas agregadas
- permite resetar apenas a gamificação

---

## 12. Banco de vocabulário

Store:

- `src/store/useWordStore.js`

### O que uma palavra guarda hoje

- `id`
- `word`
- `status`
- `tag`
- `originalSentence`
- `tooltipExplanation`
- `entryType`
- `cefrLevel`
- `source`
- `isSeeded`
- métricas de acerto/erro
- `easeFactor`
- `reviewCount`
- `recentLapses`

### Tipos de entrada

- `word`
- `collocation`

### Fontes possíveis

- `manual`
- `ngsl`
- outras derivadas do fluxo

### O que isso permite

- vocabulário simples
- expressões multi-palavra
- seed por nível
- rastreio de evolução real por item

---

## 13. Seed de vocabulário por nível

Arquivo base:

- `src/data/ngslSeed.js`

### O que é

É uma base local de vocabulário organizada por nível.

### Para que serve

- preencher o Builder quando faltam palavras da sessão atual
- acelerar o arranque de usuários novos
- permitir prática por nível mesmo antes de muita leitura

### O que o app faz com esse seed

- importa por nível atual
- importa até o nível atual
- evita duplicidade
- marca itens como `isSeeded`

---

## 14. Gamificação

A gamificação está espalhada principalmente na dashboard e no `useProgressStore`.

### Elementos existentes

- XP
- nível
- streak atual
- recorde
- missões diárias
- conquistas
- progresso por dia
- resumo de prompt diário

### XP

O sistema ganha XP em diferentes eventos:

- leitura de palavra nova
- leitura de palavra já conhecida
- exercício do builder
- acerto de primeira
- produção livre
- prompt diário
- salvar card
- revisar flashcard

### Missões

As missões usam estas chaves:

- `readerWords`
- `builderExercises`
- `flashcardReviews`
- `productionWrites`
- `recycledWords`

### Conquistas

O sistema hoje tem conquistas como:

- primeira descoberta
- arquiteto de frases
- guardião do banco
- reciclador
- fluxo perfeito
- ritmo semanal
- vocabulário ativo
- prompt do dia

---

## 15. Auto-ajuste de dificuldade

O auto-ajuste mora em:

- `src/store/useProgressStore.js`

### Como funciona

O sistema observa uma janela recente de exercícios do Builder.

### Regras

- janela de observação: `20` exercícios
- se a precisão for `>= 90%`, tenta subir o nível
- se a precisão for `<= 40%`, tenta simplificar o nível

### O que ele altera

- ajusta `userLevel` para cima ou para baixo dentro de:
  - `A1`
  - `A2`
  - `B1`
  - `B2`
  - `C1`

### O que isso resolve

- evita prática muito fácil por muito tempo
- evita prática muito difícil por tempo demais

---

## 16. Jornada da palavra

O sistema usa progressão automática de status.

### Status possíveis

- `desconhecida`
- `reconhecida`
- `em_treino`
- `ativa`
- `dominada`

### Como a promoção acontece

- Reader move `desconhecida` para `reconhecida`
- Builder move `reconhecida`/`desconhecida` para `em_treino`
- acertos + revisões consistentes podem levar a `ativa`
- bom desempenho continuado pode levar a `dominada`

### Como a regressão acontece

- erros repetidos no Builder podem rebaixar
- `nao_lembro` no SRS pode rebaixar

---

## 17. Integrações externas

### 17.1 OpenAI

Usada para:

- explicação contextual de palavras
- geração estruturada de frases

### 17.2 Gemini

Usada para:

- explicação contextual
- geração de frases

### 17.3 YouTube

Usado para:

- importar legenda pública do vídeo

### Fallbacks importantes

- sem IA:
  - dicionário local simples
  - frases locais de fallback

- sem legenda:
  - usuário pode colar o texto manualmente

---

## 18. O que o sistema resolve como produto

### Problemas que ele resolve

- transformar leitura real em estudo reaproveitável
- evitar estudar vocabulário fora de contexto
- unir input, prática e revisão no mesmo produto
- rastrear progresso real com gamificação
- manter uso simples sem depender de backend

### Diferença principal da experiência

O app não é só um banco de palavras.
Ele é um sistema de transformação:

- texto real -> palavra clicada
- palavra clicada -> exercício
- exercício -> frase salva
- frase salva -> revisão SRS
- revisão -> retenção e domínio

---

## 19. O que cada tela “significa” dentro da jornada

### Dashboard

Significa: “o que importa hoje”

### Biblioteca / Reader

Significa: “de onde o aprendizado nasce”

### Prática Rápida / Builder

Significa: “onde o conhecimento vira uso”

### Flashcards SRS

Significa: “onde a memória é consolidada”

### Evolução

Significa: “como a jornada está evoluindo no tempo”

### Configurações

Significa: “como o motor do sistema é controlado”

---

## 20. Resumo executivo

Se fosse para explicar o LangFlow para alguém em uma frase:

> O LangFlow é um sistema local-first de estudo de inglês que transforma leitura real em vocabulário ativo, prática guiada, revisão espaçada e progresso gamificado.

Se fosse para explicar em três pontos:

- ele captura vocabulário em contexto
- ele pratica esse vocabulário com exercícios e escrita
- ele consolida retenção com SRS, XP, streak e acompanhamento de evolução

---

## 21. Arquivos mais importantes para entender o projeto

- `src/App.jsx`
  - navegação principal e composição das telas

- `src/components/shared/Dashboard.jsx`
  - visão operacional e gamificação

- `src/components/Reader/Reader.jsx`
  - leitura, clique em palavras e integração com YouTube/IA

- `src/components/Builder/Builder.jsx`
  - hub de prática

- `src/components/Flashcard/Flashcard.jsx`
  - revisão espaçada

- `src/components/shared/Evolution.jsx`
  - evolução analítica

- `src/components/Settings/Settings.jsx`
  - parametrização completa do sistema

- `src/store/useWordStore.js`
  - banco de vocabulário

- `src/store/useCardStore.js`
  - frases e flashcards

- `src/store/useProgressStore.js`
  - XP, streak, métricas e conquistas

- `src/store/useConfig.js`
  - configuração do motor do app

- `src/services/ai.js`
  - integração com IA e fallbacks

- `src/services/youtube.js`
  - importação de transcript

- `src/services/srs.js`
  - lógica de revisão espaçada e status da palavra

---

## 22. Conclusão

Este projeto já cobre um fluxo de estudo relativamente completo:

- captura
- prática
- produção
- revisão
- progressão
- análise

Ele ainda é um produto local-first e sem backend próprio, mas a estrutura atual já suporta uma experiência de aprendizado bastante rica, com integração de IA, seed por nível, gamificação e ciclo pedagógico consistente.
