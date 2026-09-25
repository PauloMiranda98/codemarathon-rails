# Code Marathon Contents

Este é o diretório onde ficam armazenados os conteúdos didáticos do Code Marathon.

## 📝 Inserindo conteúdo novo

Para adicionar um conteúdo novo, crie um Pull Request seguindo os passos abaixo:

1. **Adicionar o novo conteúdo no `/contents/index.json`**:
   Identifique em qual categoria o conteúdo se encaixa e adicione o assunto no array `subjects`.

   - `name`: Nome do conteúdo exibido no site.
   - `slug`: Identificador na URL (sem espaços ou acentos).
   - `obi_frequency`: Frequência do assunto na OBI (escala de 0 a 4).
   - `icpc_frequency`: Frequência do assunto na Maratona de Programação (escala de 0 a 4).

2. **Escrever o conteúdo em Markdown**:
   Adicione o arquivo Markdown `.md` no caminho correspondente à categoria:
   `/contents/(slug-da-categoria)/(slug-do-assunto).md`

3. *(Opcional)* **Imagens**:
   Coloque imagens em `/contents/categories/` ou na pasta do assunto.

## ✍️ Sintaxe Markdown & Recursos Suportados

### Vídeo do YouTube
Para incorporar um vídeo do YouTube, utilize um bloco de código com a linguagem `youtube` contendo apenas o ID do vídeo:

~~~md
```youtube
ID_DO_VIDEO
```
~~~

### Blocos de Código
Para realçar código com Highlight.js:

~~~cpp
```cpp
int main() {
    cout << "Code Marathon" << endl;
    return 0;
}
```
~~~

### Fórmulas Matemáticas em LaTeX (KaTeX)

- **Fórmulas Inline**: use `$ ... $`. Exemplo: `$8 = 2^3$`
- **Fórmulas em Bloco**: use `$$ ... $$`. Exemplo:

~~~md
$$
a \cdot x^2 + b \cdot x + c = 0
$$
~~~

- **Símbolo de Cifrão Literário**: use `\$` para exibir um `$` comum.
