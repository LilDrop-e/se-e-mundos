# Pedro's Bauhaus Inquiry

Crie um portfólio pessoal em React para Pedro, com identidade Bauhaus/construtivista e conceito central “E SE?”. Prioridade hoje: deixar hero (seção 1) e a seção 4 de mundos com hover/tap-to-reveal realmente fortes e funcionando; estruturar as demais seções como placeholders coesos.

Regras visuais inegociáveis: fundo branco e apenas #D4157E magenta, #1F6FEB azul, #F5C518 amarelo como destaques. Tipografia: Archivo Black em títulos caixa alta com tracking apertado; Archivo Regular em texto. Contraste deliberadamente extremo entre títulos e corpo. Use exclusivamente losango, círculo, anel vazado, linhas grossas 8-10px+, e triângulos/sets para baixo como vocabulário gráfico. Máximo de 4 elementos gráficos de destaque por seção. Use placeholders geométricos para fotos.

Implemente componentes reutilizáveis e parametrizáveis para Diamond, Circle, Ring, ThickLine, Triangle. Implemente scroll-linked transforms reais em React/Framer Motion (useScroll/useTransform ou equivalente): blocos sólidos coloridos que sangram para fora da borda, alternando lado a cada duas seções, e um fio condutor grosso em zigue-zague que atravessa boa parte da largura das 7 seções, com marcadores triangulares nas transições. Em mobile simplifique, preservando a lógica.

7 seções e copy:
1 E SE? Hero, provocação visual, título gigantesco e primeiro sangramento de cor.
2 EU COSTUMO PERGUNTAR. Apresentação: Pedro, estudante de Comunicação Digital FGV Rio (2028), fundador FGV Quest, Lacom Jr., Candê, +6 anos food & beverage, skate e RPG. Questione categorias.
3 E SE NÃO PRECISASSEM SER OPOSTAS? Integração skate/RPG/universidade/trabalho, com pista visual de comunicação/universidade.
4 TALVEZ SEJA POR ISSO QUE EU NUNCA TENHA CABIDO EM UMA COISA SÓ. Esta é complexa: três formas grandes hover-to-reveal e tap equivalente em touch, sem navegação: losango → RPG / fundador FGV Quest; círculo → Skate; anel vazado → Candê / trabalho. Tem que ser visualmente memorável e acessível.
5 E EU LEVO ESSAS PERGUNTAS PARA O QUE EU CRIO. Projetos: Chama (ativações culturais urbanas que conectam marcas e comunidades), Frank 2.0 (assistente IA no Telegram Make.com + Groq/LLaMA 3.3 70B + Google Calendar), Lacom Jr., FGV Quest.
6 ENTÃO EU TESTO. Validação: processos seletivos, apresentação Futuros Líderes, aprendizado contínuo.
7 VAMOS CONVERSAR. Círculo parcialmente cortado pela borda, dividido em três faixas diagonais das três cores, CTA contato.

A sensação deve ser não-linear e exploratória apesar do scroll vertical. Inclua parallax leve, rotação/escala de formas no cursor e scroll, transições de cor narrativas e pequenos easter eggs. Não crie uma estética template nem invente formas decorativas fora da lista. Faça responsivo e rode build/lint.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b681bdc2-cbfb-4b7c-9999-2ff8b90283ba).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
