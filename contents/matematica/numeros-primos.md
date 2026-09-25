# Números Primos

## Videos do conteúdo

- Code Marathon

```youtube
GIyHJtX9wpM
```

## Definição
Dizemos que um número $n \gt 1$ é primo se e somente se $n$ é divisível apenas por $1$ e $n$. Então para verificar se um número é primo basta verificar se os números entre $2$ e $n-1$ dividem $n$. Se algum número conseguir dividir $n$ então a resposta é não, caso contrário é sim. Com isso, podemos desenvolver o primeiro algoritmo.

```cpp
bool ehPrimo(int n){
	if(n < 2)
		return false;
	for(int i=2; i < n; i++){
		if(n%i == 0)
			return false;
	}
	return true;
}
```

Entretanto, esse algoritmo possui complexidade $O(n)$.

### Melhorando o algoritmo
Para melhorar o algoritmo vamos analisar uma característica dos números que não são primos, chamado de números compostos. Se $n > 1$ é composto, então pode ser escrito como $n = a \cdot b$, onde $a > 1$ e $b > 1$. Podemos afirmar que se $n$ é composto então ele possui um divisor menor ou igual a $\sqrt{n}$. Prova: 
>  Suponha por absurdo que $a > \sqrt{n}$ e  $b > \sqrt{n}$.
> 
>  Multiplicando as duas inequações, temos: $a \cdot b > \sqrt{n} \cdot \sqrt{n}$
>
> Sabemos que $n = a \cdot b$ e $n = \sqrt{n} \cdot \sqrt{n}$. Substituindo na expressão de cima, chegamos que $n > n$, ABSURDO!
> 
> Logo, não é verdade que $a > \sqrt{n}$ e  $b > \sqrt{n}$. Assim, podemos afirmar que se um número $n$ é composto então ele tem um divisor menor ou igual a $\sqrt{n}$.

Com isso, podemos desenvolver o seguinte algoritmo que possui complexidade $O(\sqrt{n})$.

```cpp
bool ehPrimo(long long n){
	if(n < 2)
		return false;
	for(int i=2; i<=n/i; i++){
		if(n%i == 0)
			return false;
	}
	return true;
}
```
Note que no `for` trocamos a condição de `i<=sqrt(n)` por `i<=n/i`, eles são equivalentes.

## Quantidade de Divisores
Dado um número $n$ queremos saber a quantidade de divisores que $n$ possui. Inicialmente podemos desenvolver um algoritmo simples semelhante a primeira versão do código para saber se um número é primo ou não.


```cpp
int qtdDiv(int n){
	int res = 0;
	for(int i=1; i<=n; i++){
		if(n%i==0)
			res++;
	}
	return res;
}
```
Entretanto, a complexidade desse código é $O(n)$, podemos melhorar :)

### Melhorando o algoritmo
Qualquer número positivo $n$ pode ser escrito como sendo $n = a \cdot b$, onde $a$ e $b$ são divisores de $n$. De forma semelhante ao que foi feito no primo, podemos provar que $a$ ou $b$ é menor, ou igual a $\sqrt{n}$. Então, com isso, podemos encontrar todos os divisores de $n$ olhando só até $\sqrt{n}$. Vamos supor, sem perda de generalidade, que $a < b$, então $a \le \sqrt{n}$. Logo, para encontrar b, basta fazer $b = \frac{n}{a}$. Como isso, temos o seguinte algoritmo.


```cpp
int qtdDiv(long long n){
	int res = 0;
	for(int i=1; i<=n/i; i++){
		if(n%i == 0){
			if(i*1LL*i == n)
				res = res + 1;
			else
				res = res + 2;
		}
	}
	return res;
}
```
Quando encontramos que $i$ divide $n$ contamos $+1$ se $i = \sqrt{n}$ e $+2$ se $i$ não é a raiz de $n$.

## Fatorar um número
Dado um número $n$ queremos encontrar os fatores primos do número. Por exemplo, $36 = 2^2 \cdot 3^2$. De forma mais geral, $n = p_1^{a_1} \cdot p_2^{a_2} \cdots  p_k^{a_k}$ onde $p_1, p_2, ... , p_k$ são primos.

Usando pesamentos semelhantes aos raciocínios anteriores, só existe no máximo um fator primo maior que a raiz de $n$. Com isso, podemos fazer um algoritmo com complexidade $O(\sqrt{n})$. 

### Explicando algoritmo
Vamos extrair os fatores primos do menor para o maior. Para tirar o fator $p$ de um número $n$ basta fazer $n_{novo} = \frac{n}{p}$ enquanto o $n$ for divisível por $p$. Após fazer isso até $\sqrt{n}$, pode acontecer dois casos:

- $n_{final} = 1$: já foi extraído todos os fatores  e não precisa fazer mais nada.

- $n_{final} \ne 1$: $n_{final}$ é primo e devemos adicioná-lo a resposta.

Como isso, temos o código que implementa essa ideia:

```cpp
vector<long long> fatores(long long n){
	vector<long long> res;
	for(int i=2; i<=n/i; i++){
		while(n%i == 0){
			res.push_back(i);
			n = n/i;
		}
	}
	if(n > 1)
		res.push_back(n);
	return res;
}
```

## Praticar

- [É Primo?](https://neps.academy/br/exercise/280)
- [Selos](https://neps.academy/br/exercise/282)
- [Primos Menores Que Uma Dada Magnitude](https://neps.academy/br/exercise/269)

## Material complementar
[Primos - Matemática Computacional - Neps Academy](https://neps.academy/lesson/224)