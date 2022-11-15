# Crivo de Eratóstenes

## Video do conteúdo

- Code Marathon

[![Video Sobre Crivo de Eratóstenes](https://img.youtube.com/vi/UGNbq3KeoKM/0.jpg)](https://www.youtube.com/watch?v=UGNbq3KeoKM)

## Problema
Dado um valor inteiro $N$ queremos saber quais valores entre $1$ e $N$ são primos.

## Solução Trivial: $O(N \cdot \sqrt N)$
Usando o que aprendemos na aula sobre [primos](/conteudos/matematica/numeros-primos) podemos descobrir se um número é primo ou não em $O(\sqrt n)$. Assim, podemos fazer isso para cada valor $i$ de $1$ até $N$.

```cpp
bool ehPrimo(int n){
	if(n<2)
		return false;
	for(int i=2; i<=n/i; i++){
		if(n%i == 0)
			return false;
	}
	return true;
}
vector<bool> primosAteN(int n){
	vector<bool> eh_primo(n+1);
	for(int i=0; i<=n; i++)
		eh_primo[i] = ehPrimo(i);
	return eh_primo;
}

```

## Usando o Crivo: $O(N \cdot log(log(N)))$
A ideia por trás do Crivo de Eratóstenes é bastante simples. Para verificar se um número $x$ não é primo então basta verificar se ele possue um divisor entre $2$ e $x-1$. Então, para cada número $i$ iremos marcar os seus múltiplos(j = i*k) como não primo. Assim, no final, quem não for marcado é declarado como primo.

### Implementação $O(N \cdot log(N))$
```cpp
vector<bool> crivo(int n){
	vector<bool> eh_primo(n+1, true); // Iniciando todos como verdadeiro
	eh_primo[0] = eh_primo[1] = false;
	for(int i=2; i<=n; i++){
		for(int j=i+i; j<=n; j+=i){
			eh_primo[j] = false;
 		}			
	}
	return eh_primo;
}
```
A função de complexidade $f$ pode ser descrita como: 

$$f(N) =  \sum_{i=2}^{N} \frac{N}{i} = \frac{N}{1} + \frac{N}{2} + \frac{N}{3} + \frac{N}{4} + \frac{N}{5} + \frac{N}{6} + \frac{N}{7} + \frac{N}{8} +\cdots + \frac{N}{N}$$ 
$$f(N) \le  \frac{N}{1} + \frac{N}{2} + \frac{N}{2} + \frac{N}{4} + \frac{N}{4} + \frac{N}{4} + \frac{N}{4} + \frac{N}{8} +\cdots + \frac{N}{N} = N \cdot log_2(N)$$ 
Logo, podemos afirmar que o algoritmo acima é $O(N \cdot log(N))$.

### Implementação $O(N \cdot log(log(N)))$
Fazendo apenas algumas observações simples melhoramos a complexidade do algoritmo. Primeira observação é que só precisamos marcar os múltiplos usando valores primos, pois todo número composto tem um divisor primo. A segunda modificação é que só é necessário fazer isso até o primo que seja menor ou igual a $\sqrt N$.

```cpp
vector<bool> crivo(int n){
	vector<bool> eh_primo(n+1, true);
	eh_primo[0] = eh_primo[1] = false;
	for(int i=2; i<=n/i; i++){
		if(eh_primo[i]){
			for(int j=i+i; j<=n; j+=i){
				eh_primo[j] = false;
			}			
 		}
	}
	return eh_primo;
}
```

## Adaptando para outros problemas
### Quantidade de divisores
Dado um valor inteiro $N$ queremos saber quantos divisores cada valor entre $1$ e $N$ possui.

Para esse problema podemos usar um algoritmo semelhante ao crivo e conseguir um algoritmo  $O(N \cdot log(N))$.

```cpp
vector<int> qtdDivisoresDe1AteN(int n){
	vector<int> qtd_divisores(n+1, 0);
	for(int i=1; i<=n; i++){
		for(int j=i; j<=n; j+=i){
			qtd_divisores[j]++;
 		}			
	}
	return qtd_divisores;
}

```

### Soma dos divisores
Dado um valor inteiro $N$ queremos saber qual a soma dos divisores de cada valor entre $1$ e $N$.

Para esse problema podemos usar um algoritmo semelhante ao crivo e conseguir um algoritmo  $O(N \cdot log(N))$.

```cpp
vector<long long> somaDivisoresDe1AteN(int n){
	vector<long long> soma_divisores(n+1, 0);
	for(int i=1; i<=n; i++){
		for(int j=i; j<=n; j+=i){
			soma_divisores[j]+=i;
 		}			
	}
	return soma_divisores;
}
```

### Outros 
Além dos mostrados aqui podemos adaptar o crivo para resolver vários outros problemas como, por exemplo, phi de Euler e fatores primos.

## Material Complementar

[Crivo de Erastótenes (Neps Academy)](https://neps.academy/br/course/matematica-computacional-(codcad)/lesson/crivo-de-erastotenes)

[Sieve of Eratosthenes (CP-Algorithm)](https://cp-algorithms.com/algebra/sieve-of-eratosthenes.html)

[Sieve of Eratosthenes Having Linear Time Complexity  (CP-Algorithm)](https://cp-algorithms.com/algebra/prime-sieve-linear.html)
