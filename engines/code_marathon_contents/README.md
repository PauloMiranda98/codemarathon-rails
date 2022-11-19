# Code Marathon Contents
Aqui vou descrever algumas dicas de como escrever no codemarathon.

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
O codemarathon aceita 3 linguagens no bloco de código, sendo elas: C++, Java e Python. Para usar, basta fazer:

#### Para usar C++:

~~~cpp
```cpp
int main(){
  cout << "Testando" << endl;
}
```
~~~

#### Para usar Python

~~~cpp
```python
def test
  print("Testando")
```
~~~

#### Para usar Java

~~~java
```java
public static void main(){
  System.out.println("Testando");
}
```
~~~

### Usando o símbolo $
Como usamos latex o símbolo $ fica reservado para o latex. Para usa-lo, você pode fazer `\$`.

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
