# Manipulação de Bits
Como sabemos, todos os valores são guardados em binário no computador. Por exemplo, $40_{10} = 10100_2$. Em C++, temos alguns operadores que trabalham sobre os bits dos números.

## Vídeo do conteúdo

- Code Marathon

[![Video Sobre Divisibilidade](https://img.youtube.com/vi/upNeEIWrw84/0.jpg)](https://www.youtube.com/watch?v=upNeEIWrw84)

## Operações bit-a-bit
### AND
Dado dois valores $A$ e $B$, queremos saber o resultado da operação de AND(E) entre cada bit. Em C++, usamos o operador &. Logo, basta fazer (A & B).

$$
\begin{matrix}
 Variável & Decimal & Binário          \\ 
 A           &  10_{10} &  00001010_2 \\ 
 B           &  13_{10} &  00001101_2 \\ 
----          &     ----     &     -----            \\
 (A \& B) &  8_{10}   &  00001000_2 \\ 
\end{matrix}
$$

### OR
Dado dois valores $A$ e $B$, queremos saber o resultado da operação de OR(Ou) entre cada bit. Em C++, usamos o operador |. Logo, basta fazer (A | B).

$$
\begin{matrix}
 Variável & Decimal & Binário          \\ 
 A           &  10_{10} &  00001010_2 \\ 
 B           &  13_{10} &  00001101_2 \\ 
----          &     ----     &     -----            \\
 (A | B)   &  15_{10}   &  00001111_2 \\ 
\end{matrix}
$$

### XOR
Dado dois valores $A$ e $B$, queremos saber o resultado da operação de XOR(Ou Exclusivo) entre cada bit. Em C++, usamos o operador ^(acento circunflexo). Logo, basta fazer (A ^ B).

$$
\begin{matrix}
 Variável & Decimal & Binário          \\ 
 A           &  10_{10} &  00001010_2 \\ 
 B           &  13_{10} &  00001101_2 \\ 
----          &     ----     &     -----            \\
 (A \land B)   &  7_{10}   &  00000111_2 \\ 
\end{matrix}
$$

> Observação: O simbolo $\land$ é bastante usando na lógica para representar o operador AND, mas o que queremos representar é o simbolo do operador da XOR usado em C++ ^.

### Inversão dos Bits
Dado o valor $A$, queremos inverter todos os bits. Em C++, usamos o operador ~. Logo, basta fazer (~A).

$$
\begin{matrix}
 Variável & Decimal & Binário          \\ 
 A           &  10_{10} &  00001010_2 \\ 
----          &     ----     &     -----            \\
 (\sim A)       & 245_{10}&  11110101_2 \\ 
\end{matrix}
$$

### Deslocamento para Esquerda
Dado o valor $A$, queremos deslocar todos os bits para a esquerda k posições. Em C++, usamos o operador <<. Logo, basta fazer (A<<k).

$$
\begin{matrix}
 Variável & Decimal & Binário          \\ 
 A           &  10_{10} &  00001010_2 \\ 
----          &     ----     &     -----            \\
 (A<<2)       & 40_{10}&  00101000_2 \\ 
\end{matrix}
$$

> Observação: A operação (A<<k) é equivalente a $A\cdot 2^k$ se não houver perda de bit.

### Deslocamento para Direita
Dado o valor $A$, queremos deslocar todos os bits para a direita k posições. Em C++, usamos o operador >>. Logo, basta fazer (A>>k).

$$
\begin{matrix}
 Variável & Decimal & Binário          \\ 
 A           &  10_{10} &  00001010_2 \\ 
----          &     ----     &     -----            \\
 (A>>3)       & 1_{10}&  00000001_2 \\ 
\end{matrix}
$$

> Observação: A operação (A>>k) é equivalente a $\lfloor\frac{A}{2^k}\rfloor$.

## Representação de Conjuntos
Uma aplicação bastante interessante é a possibilidade de representar um conjunto utilizando os bits de uma variável. Podemos transformar o conjunto $A = \{1, 3, 4\}$ em $00011010_2$. Com isso, algumas operações de conjuntos ficam triviais.

### Inserção
Para inserir um novo elemento $x$ no conjunto $A$, basta colocar em 1 o bit da posição $x$ na variável.

```cpp
int inserir(int A, int x){
  return A | (1 << x);
}
```

### Remoção
Para remover um elemento $x$ no conjunto $A$, basta colocar em 0 o bit da posição $x$ na variável.

```cpp
int remover(int A, int x){
  return A & (~(1 << x));
}
```

### Interseção
Dado dois conjuntos $A$ e $B$, queremos saber o resultado da operação de interseção entre os conjuntos. Para isso, podemos usar a operação de AND bit-a-bit.

```cpp
int intersecao(int A, int B){
  return A & B;
}
```

### União
Dado dois conjuntos $A$ e $B$, queremos saber o resultado da operação de união entre os conjuntos. Para isso, podemos usar a operação de OR bit-a-bit.

```cpp
int uniao(int A, int B){
  return A | B;
}
```

### Complemento
Dado um conjunto $A$ encontre o complemento desse conjunto. Para isso, podemos usar a operação de inversão dos bits.

```cpp
int complemento(int A){
  return ~A;
}
```

## Limitações
Utilizando uma variável do tipo int só conseguimos representar valores entre 0 e 31. Podemos estender esse valor para o intervalo de 0 até 63 utilizando long long int. Se precisarmos representar um intervalo maior podemos utilizar o bitset<TAMANHO> do C++. Para mais detalhe sobre bitset acesse a [documentação](http://www.cplusplus.com/reference/bitset/bitset/).

## Material Complementar
- [Operadores Binários](https://neps.academy/br/course/matematica-computacional-(codcad)/lesson/operadores-binarios)
- [Manipulação de Bits](https://neps.academy/br/course/matematica-computacional-(codcad)/lesson/manipulacao-de-bits)
- [Mascara de Bits](https://neps.academy/br/course/matematica-computacional-(codcad)/lesson/mascara-de-bits)
- [BitSet](http://www.cplusplus.com/reference/bitset/bitset/)