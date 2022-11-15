# Code Marathon Contents
Aqui vou descrever algumas dicas de como escreve no codemarathon.

## Markdown
O texto do codemarathon são escritos em markdown. Além disso, é possível inserir fórmulas em LaTex.

## Adicionando código
O codemarathon aceita 3 linguagens no bloco de código, sendo elas: C++, Java e Python. Para usar, basta fazer:

### Para usar C++:

```cpp
```cpp
int main(){
  cout << "Testando" << endl;
}
```// Não tem esse "//"
```

### Para usar Python

```python
```python
def test
  print("Testando")
```# Não tem esse "#"
```

### Para usar Java

```java
```java
public static void main(){
  System.out.println("Testando");
}
```// Não tem esse "//"
```

## Usando LaTex
O Code Marathon aceita o uso de LaTex no seu Markdown.

### Formulas inline
Para adicionar trechos de LaTex no meio do texto, você pode usar `$formula$`. Exemplo:

```md
Temos que $8 = 2^3$ é sempre verdade.
```

### Formulas em bloco
Para adicionar trechos de LaTex em blocos, você pode usar `$$ Equação $$`. Exemplo:

```md
Temos a seguinte equação:

$$
a \cdot x^2 + b \cdot x + c = 0
$$

Isso é a equação do segundo grau!
```

### Quebra de linha no LaTex
No latex para fazer uma quebra de linha, é possível a partir do `\\` mas no Code Marathon é necessário usar o `\\\\`.
