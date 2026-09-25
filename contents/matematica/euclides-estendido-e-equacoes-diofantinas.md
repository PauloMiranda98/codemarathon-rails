# Euclides Estendido

## Problema
Dado dois inteiros $a$ e $b$ encontre os inteiros $x$ e $y$ que satisfazem a seguinte equação:

$$a \cdot x + b \cdot y = mdc(a, b)$$

## Vídeos do conteúdo

```youtube
ctEMoBkZBQc
```

## Algoritmo de Euclides
Antes de falar da versão estendida, vamos relembrar a versão simples do algoritmo de Euclides. Temos que o MDC entre $a$ e $b$ pode ser encontrado com a seguinte função:

$$
mdc(a, b) = 
\begin{Bmatrix}
a                                  & \text{se} \; b = 0\\  
mdc(b, \text{a mod b}) & \text{se} \; b \ne 0
\end{Bmatrix}
$$

## Algoritmo de Euclides Estendido

Agora vamos retornar uma tupla que possui 3 valores, o $mdc$, o $x$ e o $y$. O Euclides Estendido pode ser resolvido com o seguinte pseudocódigo:
 
```cpp
Tupla euclidesEst(a, b){
   if(b == 0){
      x = 1;
      y = 0;
      return (a, x, y);
   }
   (g, x1, y1) = euclidesEst(b, a%b);
   x = y1;
   y = x1 - piso(a/b)*y1;
   return (g, x, y);
}
```

### Explicando o algoritmo
Como já vimos na aula de [MDC e MMC](/conteudos/matematica/mdc-e-mmc) o algoritmo de Euclides calcula corretamente o $mdc$. Então devemos nos preocupar apenas com os valores de $x$ e $y$.

- **Caso Base**: $euclidesEst(a, 0)$. Vemos que esse caso é trivial. 
> $a \cdot x + b \cdot y = mdc(a, b)$
> 
> $a \cdot x + 0 \cdot y = mdc(a, 0) = a$. Logo, só precisamos adicionar $x=1$ e $y=0$.
>
>  $a \cdot 1 + 0 \cdot 0 = a$

- **Caso Geral**: $euclidesEst(a, b)$. Agora, vamos assumir por hipótese indutiva que o algoritmo calculou de forma correta a instância $euclidesEst(b, a\; mod\; b)$. Como isso, temos:
> $b \cdot x_1 + (a\; mod\; b) \cdot y_1 = g$
>
> Sabemos que $(a\; mod\; b) = a - \lfloor \frac{a}{b} \rfloor \cdot b$. Vamos substituir e fazer a distributiva.
>
> $b \cdot x_1 + (a - \lfloor \frac{a}{b} \rfloor \cdot b) \cdot y_1 = g$
>
> $b \cdot x_1 + a \cdot y_1 - \lfloor \frac{a}{b} \rfloor \cdot b \cdot y_1 = g$. Agora vamos coloca o $a$ e $b$ em evidência.
>
> $a \cdot y_1 + b \cdot (x_1  - \lfloor \frac{a}{b} \rfloor \cdot y_1) = g$
>
> Logo, $x = y_1$ e $y = x_1  - \lfloor \frac{a}{b} \rfloor \cdot y_1$.

### Implementação em C++
Agora, vamos ver como implementar isso em C++. Ao invés de retornar 3 valores, vamos retornar apenas o $mdc$ e o valor de $x$ e $y$ serão [alterados por referência](https://pt.wikibooks.org/wiki/Programar_em_C%2B%2B/Refer%C3%AAncias_de_dados). 

```cpp
int euclidesEstendido(int a, int b, int &x, int &y){
  if(b == 0){
    x = 1;
    y = 0;
    return a;
  }
  int x1, y1;
  int g = euclidesEstendido(b, a%b, x1, y1);
  x = y1;
  y = x1 - (a/b)*y1;
  return g;
}
```

## Aplicações

### Equações Diofantinas
Dado $a$, $b$ e $c$ encontre os inteiros $x$ e $y$ que satisfazem a seguinte equação:

$$a \cdot x + b \cdot y = c$$

Essa equação só possui solução inteira se $mdc(a, b) | c$. Sabemos resolver o problema para a equação $a \cdot x + b \cdot y = mdc(a, b)$. Então bastar encontrar a solução para o $mdc(a, b)$ e depois multiplicar ambos os lados da equação por $\frac{c}{mdc(a, b)}$.

#### Implementação

```cpp
bool equacaoDiofantina(int a, int b, int c, int &x, int &y){
  int g = euclidesEstendido(a, b, x, y);
  if(c%g != 0)
    return false;
  x = x * (c/g);
  y = y * (c/g);
  return true;
}
```
### Encontrando o Inverso Modular

Dado dois inteiros $A$ e $M$ coprimos entre si, encontre $A^{-1}\; mod \; M$ (o inverso modular de $A$ em relação ao módulo $M$), tal que $(A \cdot A^{-1}) \; mod \; M \equiv 1$. 

O inverso modular é muito usando para fazer divisões modulares. Ao invés de fazer $\frac{A}{B}  \; mod \; M$ você pode fazer $(A \cdot B^{-1}) \; mod \; M$.

Como $A$ e $M$ são coprimos entre si, então o $mdc(A, M) = 1$. Aplicando o Euclides Entendido, temos:

$$A \cdot x + M \cdot y = 1$$

Agora vamos aplicar o módulo M dos dois lados da equação.

$$(A \cdot x) \; mod \; M + (M \cdot y) \; mod \; M = 1 \; mod \; M$$
$$(A \cdot x) \; mod \; M + 0 = 1$$
Logo, $A^{-1} = x$.

#### Implementação

```cpp
int inversoModular(int a, int modulo){
  int x, y;
  euclidesEstendido(a, modulo, x, y);
  return ((x%modulo)+modulo)%modulo;
}
```
### Gerando todas as soluções
Dado uma solução do Euclides Estendido você pode manipular ela para conseguir aumentar o x e diminuir o y ou diminuir o x e aumentar o y. 

$$a \cdot x + b \cdot y = mdc(a, b)$$
Vamos somar $\frac{a \cdot b}{mdc(a, b)} - \frac{a \cdot b}{mdc(a, b)}$ do lado esquerdo. Isso é permitido porque é equivalente a somar 0.

$$a \cdot x + b \cdot y + \frac{a \cdot b}{mdc(a, b)} - \frac{a \cdot b}{mdc(a, b)} = mdc(a, b)$$
Vamos colocar $a$ e $b$ em evidência.

$$a \cdot(x +\frac{b}{mdc(a, b)}) + b \cdot(y - \frac{a}{mdc(a, b)}) = mdc(a, b)$$

Logo, podemos criar outras soluções.

## Material Complementar
- [Extended Euclidean Algorithm](https://cp-algorithms.com/algebra/extended-euclid-algorithm.html)
- [Linear Diophantine Equation](https://cp-algorithms.com/algebra/linear-diophantine-equation.html)