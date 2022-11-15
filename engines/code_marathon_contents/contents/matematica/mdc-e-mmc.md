# MDC e MMC

## Vídeos sobre o assunto

[![Video Sobre MDC e MMC](https://img.youtube.com/vi/M7QmSzSJtbk/0.jpg)](https://www.youtube.com/watch?v=M7QmSzSJtbk)

## Definições
O **máximo divisor comum** entre $a$ e $b$ é o maior inteiro $x \ge 1$ que $x | a$ e $x | b$. 

$$x = mdc(a, b)$$

O **mínimo múltiplo comum** entre $a$ e $b$ é o menor inteiro $y \ge 1$ que $a | y$ e $b | y$.

$$y = mmc(a, b)$$

**Problema**: como encontrar o mmc e o mdc?

## Máximo Divisor Comum (MDC)
Vamos focar em como encontrar o mdc de forma eficiente. A partir do mdc podemos encontrar o mmc em $O(1)$.

### Solução Trivial $O(min(a, b))$
Como queremos encontrar o maior divisor então iremos fazer do maior para o menor. O primeiro que encontrarmos será o mdc. Sabemos também que o $mdc(a, b) \le min(a, b)$, então começamos a partir do $min(a, b)$.

```cpp
// Funciona apenas para a > 0 e b > 0
int mdc(int a, int b){
	for(int i=min(a, b); i>=2; i--){
		if(a%i==0 and b%i==0)
			return i;
	}
	return 1;
}
```

### Solução $O(log(a + b))$
Podemos encontrar o mdc de uma forma muito eficiente usando o algoritmo de **Euclides**. O algoritmo tem a seguinte definição recursiva:

$$
mdc(a, b) = 
\begin{Bmatrix}
a                      & \text{se} \; b = 0 \\\\
mdc(b, \text{a mod b}) & \text{se} \; b \ne 0
\end{Bmatrix}
$$

### Implementação do algoritmo
A implementação é muito simples.

```cpp
int mdc(int a, int b){
	if(b == 0)
		return a;
	return mdc(b, a%b);
}
```

### Explicando o algoritmo
Vamos separar o algoritmo em 3 partes:

- **Caso 1**: $a = b$, vemos que este caso é trivial, o mdc entre dois números iguais é o próprio valor. Logo, o algoritmo funciona para esse caso. 
> $mdc(a, b) = mdc(b, a \; mod \; b) =  mdc(b, 0) = b$

- **Caso 2**: $a < b$, vemos que nesse caso temos apenas a troca dos parâmetros da função. Então se $mdc(b, a)$ estiver correto então $mdc(a, b)$ também estará.
> $mdc(a,b) = mdc(b, a \; mod \; b) = mdc(b, a)$

- **Caso 3**: $a > b$, nesse último percebemos que os parâmetros vão diminuindo e em algum momento $b$ será igual a 0.
> Como $a > b$, podemos escrever $a$ em função de $b$. Além disso, vamos definir $g = mdc(a, b)$.
>
> $a = b \cdot k + r$, onde $0 \le r < b$. Como vimos na aula de [Divisibilidade](https://codemarathon.com.br/conteudo/matematica/divisibilidade) r é o resto da divisão de $a$ por $b$.
>
> Como $g$ é o $mdc(a, b)$ então $g | a$ e $g | b$. Vamos aplicar o mod dos dois lados da equação.
>
> $a \; mod \; g = (b \cdot k + r) \; mod \; g$
>
> $a \; mod \; g = ((b \cdot k) \; mod \; g + r  \; mod \; g) \; mod \; g$
>
> $0 = 0 + r  \; mod \; g$. Com isso, obrigatoriamente $g | r$, então podemos trocar $a$ por $r$.
>
> Logo, $mdc(a, b) = mdc(b, \text{a mod b})$

# MMC
Como foi mencionado no início do texto, podemos encontrar o mmc a partir do mdc. Então para isso vamos ver outra definição para o mdc e mmc. Dado $a = p_1^{a_1} \cdot p_2^{a_2} \cdot p_3^{a_3}  \cdots p_n^{a_n}$ e
$b = p_1^{b_1} \cdot p_2^{b_2} \cdot p_3^{b_3}  \cdots p_n^{b_n}$, onde $p_i$ é primo, temos:

$$mdc(a, b) = p_1^{min(a_1, b_1)} \cdot p_2^{min(a_2, b_2)} \cdot p_3^{min(a_3, b_3)}  \cdots p_n^{min(a_n, b_n)}$$

$$mmc(a, b) = p_1^{max(a_1, b_1)} \cdot p_2^{max(a_2, b_2)} \cdot p_3^{max(a_3, b_3)}  \cdots p_n^{max(a_n, b_n)}$$

Uma observação interessante é que podemos encontrar o max(a, b) usando o min(a, b). 

$$max(a, b) = a + b - min(a, b)$$

Então se multiplicarmos a e b, vamos ter a soma dos expoentes primos.

$$a \cdot b = p_1^{a_1 + b_1} \cdot p_2^{a_2 + b_2} \cdot p_3^{a_3 + b_3}  \cdots p_n^{a_n + b_n}$$

Se dividirmos os dois números temos a subtração dos expoentes.

$$\frac{a \cdot b}{mdc(a, b)} = p_1^{a_1 + b_1 - min(a_1, b_1)} \cdot p_2^{a_2 + b_2 - min(a_2, b_2)} \cdot p_3^{a_3 + b_3 - min(a_3, b_3)}  \cdots p_n^{a_n + b_n - min(a_n, b_n)}$$

$$\frac{a \cdot b}{mdc(a, b)} = p_1^{max(a_1, b_1)} \cdot p_2^{max(a_2, b_2)} \cdot p_3^{max(a_3, b_3)}  \cdots p_n^{max(a_n, b_n)}$$

Logo, temos:

$$mmc(a, b) = \frac{a \cdot b}{mdc(a, b)}$$

### Implementação do Algoritmo de MMC

```cpp
long long mmc(int a, int b){
	return (a/mdc(a, b))*1LL*b;
}
```
Usamos 1LL para evitar overflow.
