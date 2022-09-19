# MMC e MDC
## Definições
O <e>x = mdc(a, b)</e>, ou seja, o máximo divisor comum entre <e>a</e> e <e>b</e> é o maior inteiro <e>x \ge 1</e> que <e>x | a</e> e <e>x | b</e>.

O <e>y = mmc(a, b)</e>, ou seja, o mínimo múltiplo comum entre <e>a</e> e <e>b</e> é o menor inteiro <e>y \ge 1</e> que <e>a | y</e> e <e>b | y</e>.

**Problema**: como encontrar o mmc e o mdc?

## MDC
Agora, vamos focar em como encontrar o mdc de forma eficiente. A partir do mdc podemos encontrar o mmc em <e>O(1)</e>.

### Solução Trivial <e>O(min(a, b))</e>
Como queremos encontrar o maior divisor então iremos fazer do maior para o menor. O primeiro que encontrarmos será o mdc. Sabemos também que o <e>mdc(a, b) \le min(a, b)</e>, então começamos a partir do <e>min(a, b)</e>.  

```cpp
int mdc(int a, int b){
	for(int i=min(a, b); i>=2; i--){
		if(a%i==0 and b%i==0)
			return i;
	}
	return 1;
}
```

### Solução <e>O(log(min(a, b)))</e>
Podemos encontrar o mdc de uma forma muito eficiente usando o algoritmo de **Euclides**. O algoritmo tem a seguinte definição recursiva:

<be>
mdc(a, b) = 
\begin{Bmatrix}
a                                  & \text{se} \; b = 0\\  
mdc(b, \text{a mod b}) & \text{se} \; b \ne 0
\end{Bmatrix}
</be>

#### Implementação do algoritmo

A implementação é muito simples.

```cpp
int mdc(int a, int b){
	if(b == 0)
		return a;
	return mdc(b, a%b);
}
```

#### Explicando o algoritmo
Vamos separar o algoritmo em 3 partes:

- **Caso 1**: <e>a = b</e>, vemos que este caso é trivial, o mdc entre dois números iguais é o próprio valor. Logo, o algoritmo funciona para esse caso. 
><e>mdc(a, b) = mdc(b, a \; mod \; b) =  mdc(b, 0) = b</e>

- **Caso 2**: <e>a < b</e>, vemos que nesse caso temos apenas a troca dos parâmetros da função. Então se <e>mdc(b, a)</e> estiver correto então <e>mdc(a, b)</e> também estará.
> <e>mdc(a,b) = mdc(b, a \; mod \; b) = mdc(b, a)</e>

- **Caso 3**: <e>a > b</e>, nesse último percebemos que os parâmetros vão diminuindo e em algum momento <e>b</e> será igual a 0.
> Como <e>a > b</e>, podemos escrever <e>a</e> em função de <e>b</e>. Além disso, vamos definir <e>g = mdc(a, b)</e>.
>
> <e>a = b \cdot k + r</e>, onde <e>0 \le r < b</e>. Como vimos na aula de [Divisibilidade](https://codemarathon.com.br/conteudo/matematica/divisibilidade) r é o resto da divisão de <e>a</e> por <e>b</e>.
>
> Como <e>g</e> é o <e>mdc(a, b)</e> então <e>g | a</e> e <e>g | b</e>. Vamos aplicar o mod dos dois lados da equação.
>
> <e>a \; mod \; g = (b \cdot k + r) \; mod \; g</e>
>
> <e>a \; mod \; g = ((b \cdot k) \; mod \; g + r  \; mod \; g) \; mod \; g</e>
>
> <e>0 = 0 + r  \; mod \; g</e>. Com isso, obrigatoriamente <e>g | r</e>, então podemos trocar <e>a</e> por <e>r</e>.
>
> Logo, <e>mdc(a, b) = mdc(b, \text{a mod b})</e>

## MMC
Como foi mencionado no início do texto, podemos encontrar o mmc a partir do mdc. Então para isso vamos ver outra definição para o mdc e mmc. Dado <e>a = p_1^{a_1} \cdot p_2^{a_2} \cdot p_3^{a_3}  \cdots p_n^{a_n}</e> e
<e>b = p_1^{b_1} \cdot p_2^{b_2} \cdot p_3^{b_3}  \cdots p_n^{b_n}</e>, onde <e>p_i</e> é primo, temos:

<be>
mdc(a, b) = p_1^{min(a_1, b_1)} \cdot p_2^{min(a_2, b_2)} \cdot p_3^{min(a_3, b_3)}  \cdots p_n^{min(a_n, b_n)}
<be>

<be>
mmc(a, b) = p_1^{max(a_1, b_1)} \cdot p_2^{max(a_2, b_2)} \cdot p_3^{max(a_3, b_3)}  \cdots p_n^{max(a_n, b_n)}
<be>

Uma observação interessante é que podemos encontrar o max(a, b) usando o min(a, b). 

<be>
max(a, b) = a + b - min(a, b)
<be>

Então se multiplicarmos a e b, vamos ter a soma dos expoentes primos.

<be>
a \cdot b = p_1^{a_1 + b_1} \cdot p_2^{a_2 + b_2} \cdot p_3^{a_3 + b_3}  \cdots p_n^{a_n + b_n}
</be>

Se dividirmos os dois números temos a subtração dos expoentes.

<be>
\frac{a \cdot b}{mdc(a, b)} = p_1^{a_1 + b_1 - min(a_1, b_1)} \cdot p_2^{a_2 + b_2 - min(a_2, b_2)} \cdot p_3^{a_3 + b_3 - min(a_3, b_3)}  \cdots p_n^{a_n + b_n - min(a_n, b_n)}
</be>

<be>
\frac{a \cdot b}{mdc(a, b)} = p_1^{max(a_1, b_1)} \cdot p_2^{max(a_2, b_2)} \cdot p_3^{max(a_3, b_3)}  \cdots p_n^{max(a_n, b_n)}
</be>

Logo, temos:

<be>
mmc(a, b) = \frac{a \cdot b}{mdc(a, b)}
</be>

#### Implementação do Algoritmo de MMC

```cpp
long long mmc(int a, int b){
	return (a/mdc(a, b))*1LL*b;
}
```

Usamos 1LL para evitar overflow.
