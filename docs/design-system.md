# LangFlow Design System

## 1. Objetivo

Este documento define o padrão visual e de UX do `langflow` após a remodelagem baseada no `langflow-2`.

Ele existe para evitar regressão visual, decisões arbitrárias e componentes desalinhados. Qualquer tela nova deve nascer a partir deste sistema, e não de escolhas isoladas por componente.

Princípio central:

- sistema antes do componente
- consistência antes de criatividade
- borda, espaçamento, tipografia e alinhamento sempre vencem sombra e efeito

## 2. Direção visual

O produto deve parecer:

- limpo
- moderno
- editorial
- gamificado sem exagero
- claro e leve

O app não deve parecer:

- dashboard genérico de SaaS
- painel escuro com glow excessivo
- conjunto de cards aleatórios
- interface “montada” com alinhamento inconsistente

## 3. Fundações

### 3.0 Stack visual

Base oficial do sistema:

- `shadcn/ui` como biblioteca-base de primitives
- `Tailwind CSS` como camada de composição
- `Radix UI` para acessibilidade e comportamento
- `lucide-react` para iconografia padrão

Regra operacional:

- telas novas devem começar por componentes em `src/components/ui`
- quando faltar um primitive, ele deve ser criado no estilo `shadcn` antes de sair criando CSS isolado
- utilitários Tailwind vencem CSS específico de página sempre que o componente for novo
- CSS legado existe apenas como camada de compatibilidade para módulos ainda não convertidos

### 3.1 Tipografia

Fontes oficiais:

- `Inter` para toda a interface
- `Fira Code` apenas para elementos monospace

Hierarquia:

- `h1`: títulos de página, peso `700`, tracking negativo leve
- `h2`: hero e títulos principais de bloco, peso `700`
- `h3`: títulos de seção e card, peso `700`
- corpo: peso `500`
- labels, overlines e metadados: peso `700`, uppercase, tracking alto

Regras:

- evitar `800` e `900` como padrão
- usar bold forte apenas quando o bloco realmente precisa liderar a leitura
- não combinar texto muito bold com spacing apertado

### 3.2 Cores

Primária:

- roxo `#6C3FC5`

Acento:

- rosa `#EC4899`

Secundárias semânticas:

- warning: laranja
- success: verde
- info: azul
- muted: cinza frio

Uso:

- roxo conduz navegação, progresso e sistema
- rosa entra como acento de CTA, gradiente e destaque emocional
- laranja é reservado para streak, revisão e urgência leve

### 3.3 Surface layer

Camadas:

- fundo geral claro, quase branco
- cards brancos
- subtom lavanda/cinza em áreas secundárias
- bordas finas e visíveis

Regra:

- preferir separação por borda e contraste suave
- sombra só como apoio, nunca como estrutura principal

### 3.4 Radius

Padrão:

- controles pequenos: `14px`
- inputs e pills: `18px` a `999px`
- cards médios: `24px`
- cards hero e painéis principais: `32px`

### 3.5 Spacing

Base:

- grid de 8px

Faixas principais:

- `8`
- `16`
- `24`
- `32`
- `40`
- `48`

Regra:

- todo componente deve alinhar por blocos previsíveis
- não usar espaçamento “no olho”
- grupos visuais precisam respirar igual dentro da mesma família

## 4. Shell do aplicativo

### Sidebar

A sidebar é fixa no desktop e contém:

- marca
- menu principal
- acesso ao perfil/configurações no rodapé

Padrões:

- item ativo com fundo suave em roxo/rosa
- ícone dentro de cápsula própria
- hover discreto, sem pulo agressivo
- labels com peso `500` ou `600`

### Topbar global

A topbar global serve para:

- menu mobile
- contexto da rota em páginas internas
- notificações

Regras:

- na dashboard ela deve ser discreta
- em páginas internas ela orienta a navegação, mas não compete com o `PageHeader`

### Container de conteúdo

Padrão:

- conteúdo centralizado
- largura máxima consistente
- gutters confortáveis
- desktop com leitura ampla e alinhada

## 5. Padrões de páginas

### Dashboard

A dashboard é composta por:

- header da página
- hero principal
- progresso de nível
- trio de cards-resumo
- coluna principal com prompt, gráfico, missões, conquistas e roadmap
- coluna lateral com conquista principal e mini stats

Regras:

- grandes painéis não recebem hover chamativo
- pequenos cards clicáveis podem receber hover leve
- todos os blocos internos seguem o mesmo eixo de alinhamento
- ícone, heading, subtítulo e número devem parecer presos ao mesmo grid

### Reader

O Reader deve parecer:

- ferramenta principal de leitura
- calmo e legível
- foco no texto e na captura

Regras:

- texto com largura boa de leitura
- tooltip com borda, fundo branco e sombra controlada
- destaque de palavra por fundo suave, não por efeito agressivo

### Practice / Builder

O hub de prática deve parecer:

- ambiente de treino
- modular
- progressivo

Regras:

- tabs claras
- progresso visível
- áreas de interação com bordas e estados bem definidos
- feedback de erro/acerto claro, mas sem poluição

### Flashcards

O fluxo de revisão deve parecer:

- concentrado
- limpo
- premium

Regras:

- card principal com destaque
- botões de avaliação bem separados por intenção
- números e intervalos com leitura imediata

### Vocabulary

O Vocabulário é o lugar de:

- adicionar
- importar
- filtrar
- revisar estado do banco lexical

Regras:

- filtros no topo
- cards de item com hierarquia clara
- metadados menores e secundários
- remoção nunca deve dominar visualmente o card

### Settings

Configurações devem focar em:

- preferências
- IA
- SRS
- gamificação
- dados locais

Regras:

- não usar `Settings` como tela de gestão de conteúdo
- gestão lexical pertence a `Vocabulário`

### Evolution

A tela de evolução é analítica.

Regras:

- mesma linguagem do dashboard
- gráficos e painéis com respiro
- métricas rápidas na abertura
- painel lateral menos chamativo que o gráfico principal

## 6. Componentes-base

### PageHeader

Estrutura:

- ícone em bloco arredondado
- título
- descrição
- ações opcionais à direita

### PanelCard

Uso:

- qualquer grande bloco de conteúdo

Características:

- fundo branco
- borda fina
- radius grande
- padding generoso
- sem hover por padrão

### Mini KPI / Stat Card

Uso:

- métricas curtas
- sidebar
- resumos rápidos

Características:

- mais compacto
- pode ter hover leve se clicável
- ícone pequeno dentro de fundo tonal

### Pills e badges

Uso:

- estado
- categoria
- progresso curto
- CTA auxiliar

Características:

- formato pill
- texto pequeno, uppercase quando for label do sistema
- nunca usar pill para simular botão principal

### Inputs

Padrão:

- fundo claro
- borda visível
- radius confortável
- texto médio
- foco com ring roxo suave

## 7. Interações

### Hover

Aplicar hover forte apenas em:

- botões
- links de navegação
- linhas clicáveis
- mini cards interativos

Não aplicar hover chamativo em:

- hero
- level strip
- painéis grandes
- charts principais

### Focus

Todo campo interativo precisa de foco visível:

- borda roxa suave
- halo discreto

### Motion

Movimento deve ser:

- curto
- suave
- com propósito

Evitar:

- bounce excessivo
- rotação decorativa sem função
- scale forte em cards grandes

## 8. Ícones

Regra:

- mesmo stroke
- mesma família visual
- mesmo alinhamento óptico
- escala consistente entre menu, cards e headers

Uso:

- ícone não substitui texto
- ícone acompanha hierarquia, não a lidera sozinho

## 9. Anti-patterns

Nunca fazer:

- card grande com sombra pesada para parecer “premium”
- desalinhamento entre ícone, heading e número
- mistura de pesos tipográficos muito agressivos
- uppercase em excesso
- excesso de cores em um mesmo bloco
- múltiplos estilos de radius na mesma seção
- botões primários com linguagem diferente da tela
- criar novo componente ignorando tokens já existentes

## 10. Regra para novas telas

Qualquer nova tela deve seguir este processo:

1. escolher o padrão de shell existente
2. reutilizar `PageHeader`
3. montar com `PanelCard` e mini stats antes de criar algo novo
4. usar tokens de spacing, radius e tipografia já definidos
5. validar que o alinhamento interno está consistente com dashboard e vocabulary

Se um novo componente for criado, ele deve entrar neste documento com:

- objetivo
- anatomia
- estados
- variações
- anti-patterns

## 11. Fonte de verdade técnica

Arquivos-base do sistema atual:

- `src/theme/tokens.css`
- `src/theme/system-overrides.css`
- `src/components/shared/AppLayout.jsx`
- `src/components/shared/PageHeader.jsx`

Toda evolução visual futura deve começar por esses arquivos, não por estilos inline ou CSS isolado de página.
