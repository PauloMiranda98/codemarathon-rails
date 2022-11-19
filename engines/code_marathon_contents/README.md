# Code Marathon Contents

Esse é o subdiretório onde fica armazenado os conteúdos do Code Marathon.

## Inserindo conteúdo novo

Para adicionar um conteúdo novo, você vai precisar criar um pull request e seguir alguns passos.

1. Adicionar o novo conteúdo no `/contests/index.json`. Você vai identificar em qual categoria esse conteúdo se encaixa. E adicionar esse assunto novo no vetor `subjects`. Abaixo, você pode ver o significado de cada chave.

> name - é o nome do conteúdo

> slug - é o nome do conteúdo no formato de url, evitando espaços e acentos.

> obi_frequency - é a frequência desse assunto na OBI no range de 0-4.

> icpc_frequency - é a frequência desse assunto na Maratona no range de 0-4.

2. Escrever o conteúdo em markdown. Para isso, basta adicionar o arquivo em markdown com a extensão `md` no diretório correto. Seguindo `/contents/(Slug da Categoria)/(slug do assunto).md`

3. (opcional) caso você precise usar alguma imagem durante o texto, evite usar imagens de outros site. Faça a sua própria e coloque na pasta `/app/assets/imagens/code_marathon_contents/contents/(slug da categoria)/(slug do assunto)/nome_do_aquivo.algo`. Com isso, para acesso no markdown, basta usar o caminho relativo `/code_marathon_contents/contents/(slug da categoria)/(slug do assunto)/nome_do_aquivo.algo`. 

## Markdown
O texto do codemarathon são escritos em markdown. Além disso, é possível inserir fórmulas em LaTex.
### Adicionando vídeo do YouTube
Para adicionar vídeos do youtube basta usar a seguinte sintax.

~~~md
```youtube
ID_DO_VIDEO
```
~~~

### Adicionando código
Para usar, basta fazer:

~~~
```linguagem
codigo aqui
```
~~~

Exemplo em C++:

~~~cpp
```cpp
int main(){
  cout << "Testando" << endl;
}
```
~~~

### Usando o símbolo $
Como usamos LaTex, o símbolo $ fica reservado para o LaTex. Para usá-lo, você pode fazer `\$`.

## Usando LaTex
O Code Marathon aceita o uso de LaTex no seu Markdown.

### Fórmulas inline
Para adicionar trechos de LaTex no meio do texto, você pode usar `$formula$`. Exemplo:

```md
Temos que $8 = 2^3$ é sempre verdade.
```

### Fórmulas em bloco
Para adicionar trechos de LaTex em blocos, você pode usar `$$ Equação $$`. Exemplo:

```md
Temos a seguinte equação:

$$
a \cdot x^2 + b \cdot x + c = 0
$$

Isso é a equação do segundo grau!
```
