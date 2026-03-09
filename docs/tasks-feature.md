# Tasks Feature

## Objetivo
- Fechar o PRD atual descrito em `Tasks feature 1` sem entrar em backend, sync, PWA ou TTS.
- Manter uma trilha simples de implementação, validação e decisões para futuras iterações.

## Matriz PRD x Estado Atual
| Área | Status | Observação |
| --- | --- | --- |
| Reader com captura contextual | Implementado | Clique promove palavra para `reconhecida` e mantém cache de explicação. |
| Builder com 3 variações por palavra | Implementado | Sessão usa montagem por tokens com drag-and-drop, fallback por clique e seleção `Reader > banco local > seed`. |
| Banco de palavras com upload em massa | Implementado | Importa por vírgula/quebra de linha, informa adicionadas/ignoradas e aceita `word` ou `collocation`. |
| Flashcard SRS | Implementado | Revisões ordenadas por atraso e menor `easeFactor`. |
| Reader com importação de legenda do YouTube | Implementado | Extrai `videoId`, tenta `timedtext` em inglês e preenche o textarea com fallback claro. |
| Configuração persistida do Builder | Implementado | Migração de `wordBankWeight` para `config.builder`. |
| Seed CEFR/NGSL | Implementado | Dataset local em `src/data/ngslSeed.js` com importação por nível atual ou até o nível atual. |
| Collocations | Implementado | Entram no mesmo banco do vocabulário, suportam bulk/manual e podem aparecer em Builder/Cloze/Prompt. |
| Sentence Transform | Implementado | Hub de prática gera pares determinísticos com resposta digitada e correção normalizada. |
| Cloze | Implementado | Hub de prática gera lacunas em palavra ou expressão foco com validação textual. |
| Daily Prompt | Implementado | Seleciona 3 termos do dia, valida o uso em frases e bloqueia ganho duplicado por `dayKey`. |
| Dashboard de evolução | Implementado | Exibe série de palavras dominadas por snapshot, retenção semanal, missões, streak, conquista e resumo do auto-ajuste. |
| Streak configurável | Implementado | A streak usa `config.study.minSessionMinutes` e mostra sequência atual e recorde. |
| Auto-ajuste de dificuldade | Implementado | Janela de 20 exercícios do Builder sobe ou reduz `userLevel` com base na precisão. |
| XP, missões e conquistas | Implementado | Painel integra progresso diário, XP acumulado, metas e próxima conquista. |
| Testes automatizados mínimos | Implementado | Parser, SRS, migrações, seed store, sessão do Builder, practice modes, dashboard metrics e fluxo UI do Builder. |

## Checklist de Fases
- [x] Fase 0: corrigir lint do Builder e preparar documentação.
- [x] Fase 0: adicionar suíte mínima com Vitest + jsdom + Testing Library.
- [x] Fase 1: migrar stores persistidos (`config`, `progress`, `words`).
- [x] Fase 1: alinhar ciclo base da palavra entre Reader, Builder e SRS.
- [x] Fase 1: estender `Word` persistido com `entryType`, `cefrLevel`, `source` e `isSeeded`.
- [x] Fase 1: importar seed local `NGSL` por nível e limpar seed não estudado.
- [x] Fase 1: suportar collocations como item manual e bulk do banco.
- [x] Fase 2: substituir a resposta livre do Builder por montagem com tokens.
- [x] Fase 2: suportar até 3 variações por palavra e seleção `Reader > banco local > seed`.
- [x] Fase 2: transformar a rota de prática em hub com `Montagem`, `Transform`, `Cloze` e `Prompt`.
- [x] Fase 2: adicionar upload em massa no banco de palavras.
- [x] Fase 3: expor streak no dashboard/settings e ordenar cards devidos.
- [x] Fase 3: alinhar o gráfico principal ao snapshot de palavras dominadas.
- [x] Fase 3: expor retenção semanal, missões do dia e resumo do auto-ajuste na dashboard.
- [x] Fase 3: tornar a streak configurável por sessão mínima.
- [x] Fase 3: integrar auto-ajuste de dificuldade ao Builder e ao dashboard.
- [x] Fase 3: integrar XP, missões e conquistas ao painel principal.
- [x] Fase 3: preservar export/import via stores persistidos versionados.

## Decisões
- O streak conta quando o usuário acumula o mínimo configurado em `config.study.minSessionMinutes`.
- O peso do banco de difíceis limita quantas palavras locais extras entram na sessão; o seed completa as lacunas restantes.
- O seed deste ciclo usa dataset local `NGSL` classificado de `A1` a `C1`; Oxford não entra neste pacote.
- Collocations entram no mesmo schema do banco usando `word` como texto canônico e `entryType: 'collocation'`.
- A validação de interação do Builder usa o fallback por clique; o drag-and-drop fica coberto no comportamento manual do app.
- O auto-ajuste usa uma janela móvel de 20 exercícios do Builder: `>= 90%` tenta subir o nível e `<= 40%` tenta simplificar.
- O `Daily Prompt` valida presença do termo-alvo na frase e não faz correção gramatical por IA.

## Log de Validação
- `npm run lint` ✅
- `npm run test` ✅
- `npm run build` ✅
- Observação: o Vitest emitiu warnings do runtime (`--localstorage-file`) no ambiente local, mas a suíte concluiu com 27 testes passando e sem falhas funcionais.

## Fora deste ciclo
- TTS com cache
- Seed Oxford 3000/5000 licenciado
