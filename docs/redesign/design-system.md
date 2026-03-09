# Design System Alvo

Este design system nasce da combinacao precisa das duas referencias e sera a base do novo visual do LangFlow.

## Paleta principal

### Base

| Token | Valor | Uso |
| --- | --- | --- |
| `--bg-app` | `#f5f0ea` | fundo principal do app |
| `--bg-main` | `#fbf8f4` | superficies amplas |
| `--bg-card` | `#ffffff` | cards |
| `--bg-card-soft` | `#f6f1ec` | superficies internas |
| `--bg-dark` | `#17161c` | sidebar e cards escuros |
| `--bg-dark-2` | `#231f2c` | gradientes secundarios |

### Brand / accent

| Token | Valor | Uso |
| --- | --- | --- |
| `--brand-indigo` | `#6658f5` | links, progresso, foco |
| `--brand-violet` | `#8f6fff` | destaque frio |
| `--brand-rose` | `#e3b3b8` | CTA warm, destaque premium |
| `--brand-peach` | `#ff8b62` | cards de revisao e calor |
| `--brand-gold` | `#d7a24f` | streak e conquista |
| `--brand-sky` | `#dfe8ff` | fundos frios suaves |
| `--brand-mint` | `#dcf3e5` | sucesso suave |
| `--brand-pink-soft` | `#f8e7ea` | blocos secundarios |

### Texto

| Token | Valor | Uso |
| --- | --- | --- |
| `--text-strong` | `#1e1d23` | titulos e KPIs |
| `--text-body` | `#4f4a53` | corpo |
| `--text-soft` | `#8e8791` | labels |
| `--text-inverse` | `#ffffff` | textos sobre fundo escuro |

## Tipografia

- Display: `Sora`, fallback `Inter`, sans-serif
- Body: `Inter`, fallback system-ui, sans-serif

### Escala

| Papel | Tamanho | Peso | Altura |
| --- | --- | --- | --- |
| Hero display | `clamp(2.8rem, 2.1rem + 2vw, 4.4rem)` | `800-900` | `0.98` |
| H1 | `clamp(1.8rem, 1.55rem + 0.8vw, 2.4rem)` | `800` | `1.08` |
| H2 | `1.4rem` | `800` | `1.15` |
| H3 | `1.05rem` | `700` | `1.2` |
| Body | `0.96rem` | `500` | `1.6` |
| Small | `0.82rem` | `600` | `1.45` |
| Micro | `0.7rem` | `700` | `1.3` |

## Espacamento

Escala base:

`4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64`

Aplicacao:
- cards grandes: `32`
- cards medios: `24`
- cards compactos: `18-20`
- gaps de grid: `20-24`
- pills/chips: `8-14`

## Raios

| Token | Valor | Uso |
| --- | --- | --- |
| `--radius-sm` | `14px` | campos e chips |
| `--radius-md` | `20px` | cards pequenos |
| `--radius-lg` | `28px` | cards medios |
| `--radius-xl` | `34px` | hero e paineis |
| `--radius-pill` | `999px` | pills e botoes |

## Sombras e bordas

| Token | Valor |
| --- | --- |
| `--shadow-soft` | `0 8px 24px rgba(31, 24, 32, 0.06)` |
| `--shadow-card` | `0 18px 48px rgba(31, 24, 32, 0.08)` |
| `--shadow-hero` | `0 30px 80px rgba(24, 20, 34, 0.22)` |
| `--shadow-hover` | `0 16px 40px rgba(24, 20, 34, 0.14)` |
| `--border-soft` | `1px solid rgba(40, 30, 44, 0.07)` |

## Motion

- hover lift: `translateY(-2px)`
- hero orb float: `6s ease-in-out infinite`
- bar reveal: `0.6s cubic-bezier(0.22, 1, 0.36, 1)`
- card fade-up: `0.32s cubic-bezier(0.22, 1, 0.36, 1)`
- focus glow: `0 0 0 4px rgba(102, 88, 245, 0.14)`

## Componentes alvo

### Sidebar
- fundo escuro premium;
- secoes em microcopy uppercase;
- item ativo com fundo elevado e borda/acento lateral rose;
- badges pequenos circulares.

### Topbar
- saudacao a esquerda;
- busca pill ao centro/direita;
- sino e streak pill a direita.

### Hero
- card escuro grande com gradiente;
- badge de sessao;
- headline em duas linhas;
- CTA principal claro ou rose;
- CTA secundario outline escuro;
- orbe decorativo com rings.

### KPI cards
- cards claros compactos;
- icone circular pastel;
- numero grande;
- label curta em caps.

### Cards de gamificacao
- missoes: lista com progresso e chips XP;
- conquista: trofeu central + barra;
- jornada: linha com checkpoints e estado atual;
- ritmo semanal: barras simples;
- colecoes: grid 2x2 com cards suaves.

### Modulos internos
- Reader, Builder, Flashcard e Settings devem herdar:
  - mesmo canvas claro;
  - mesmo vocabulario de card;
  - botoes pill;
  - paineis de destaque dark premium quando apropriado.
