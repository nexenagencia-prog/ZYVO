# ZYVO Home Reference Redesign

## Objetivo
Substituir a estrutura visual da Home atual do ZYVO por uma nova Home fiel ao anexo aprovado pelo usuário, mantendo as rotas e funcionalidades existentes do app.

## Escopo visual
- Fundo escuro sofisticado com iluminação difusa e tons grafite/preto.
- Barra superior com marca `ZYVO`, campo de busca e links `Recursos`, `Tecnologia`, `Performance`, `Sobre nós` e botão `Acessar`.
- Hero principal à esquerda com eyebrow `TECNOLOGIA QUE TRANSFORMA`, título `Reuniões com Performance Pro`, texto de apoio e dois CTAs visuais iguais ao anexo: `Criar reunião` e `Assistir gravação`.
- Bloco inferior de quatro atalhos: `Minhas anotações`, `Criar slides`, `Gravações recentes`, `Criar reunião`.
- Grid à direita com seis cards grandes, bordas finas, visual glass/dark e composição de imagem/ícone/texto no padrão do anexo.
- Manter composição, proporções, hierarquia, espaçamentos, tipografia, bordas e densidade visual o mais fiel possível à imagem de referência.

## Sidebar
- Sidebar estreita e vertical por padrão, posicionada à esquerda, com cantos arredondados e avatar no topo.
- Ícones finos, monocromáticos e centralizados.
- Ação principal destacada em círculo rosa/gradiente conforme referência.
- Sidebar deve poder expandir lateralmente por interação do usuário, revelando os nomes das opções sem quebrar nem deslocar a composição principal da Home.
- Ao recolher, volta ao estado visual compacto igual ao anexo.
- Preservar os destinos das rotas existentes do ZYVO para os itens do menu sempre que houver correspondência funcional.

## Comportamento
- `Criar reunião` deve continuar abrindo `/reuniao-instantanea`.
- `Assistir gravação` e `Gravações recentes` devem apontar para `/gravacoes`.
- `Minhas anotações` deve apontar para `/minhas-anotacoes`.
- `Criar slides` deve apontar para `/criar-slides`.
- Busca deve continuar encaminhando pesquisa para `/reunioes?q=...`.
- Menu expandido/recolhido é controlado no cliente e não deve remover as funcionalidades existentes da Home.

## Restrições
- Não alterar páginas internas fora do necessário para manter links funcionais.
- Não alterar lógica de perfil, reuniões, gravações, skills, LiveKit, Supabase ou APIs.
- Não introduzir redesign nas páginas internas.
- Não substituir a identidade visual do anexo por outro estilo.
- Implementação deve permanecer em Next.js/React existente, sem nova dependência de UI.

## Arquivos previstos
- Modificar `src/app/page.tsx` para a nova estrutura da Home.
- Modificar `src/app/home-reference.module.css` para reproduzir o layout e os estados responsivos/expansivos da nova Home.
- Criar componentes auxiliares somente se necessários para manter `page.tsx` legível, sem refatorações não relacionadas.

## Critérios de aceite
1. Em desktop, a Home deve visualmente se aproximar do anexo em estrutura, escala, contraste, alinhamento, tipografia e cards.
2. A sidebar abre e fecha com transição suave, preservando o estado compacto da referência.
3. Os botões e atalhos principais continuam funcionais e apontam para as rotas corretas.
4. A busca continua funcional.
5. O projeto deve concluir `next build` sem erros.
6. O commit deve ser enviado para `nexenagencia-prog/ZYVO`, branch `main`.
