# Divisibilidade

## Vídeos sobre o assunto

```youtube
FM3_72brIf8
```

> Esse texto não é uma alternativa ao vídeo mas sim uma revisão do vídeo.

Durante os estudos da maratona é recorrente a utilização de propriedades de divisibilidade. O principal foco deste tutorial é abordar o resto resultante da divisão inteira entre dois números. Ao fazer uma divisão inteira entre $N$ e $d$, temos:

$$ N = q \cdot d + r $$

Onde, $0 \le r < |d|$. 

## Propriedade e Definições

- **Definição 1**: dado dois inteiros $a$ e $b$, dizemos que $a$ divide $b$, usando a simbologia $a | b$, sse $b$ pode ser escrito como sendo um produto de $a$ com uma constante inteira. Além disso, sabemos que nesse caso o resto da divisão inteira é igual a 0.

$$ a | b  \leftrightarrow b = a \cdot q$$

- **Propriedade 1**: se $a | b$ e $b | c$ então $a | c$.
> Prova:
> 
> se $a|b$ então $b = a \cdot q_1$
> 
> se $b|c$ então $c = b \cdot q_2$ 
>
> Logo, juntando as duas equações, temos: 
$c = a \cdot (q_1 \cdot q_2)$, que implica em $a | c$.

- **Propriedade 2**: se $a | b$ então $a | (b \cdot c)$.
> Prova:
> 
> se $a|b$ então $b = a \cdot q$
> 
> Multiplicando os dois lados por c, temos: $b \cdot c = a \cdot (q \cdot c)$, logo $a | (b \cdot c)$.

- **Propriedade 3**: se $a | b$ e $a | c$ então $a | (b+c)$.
> Prova:
> 
> se $a|b$ então $b = a \cdot q_1$
> 
> se $a|c$ então $c = a \cdot q_2$ 
>
> Logo, juntando as duas equações, temos: 
$b + c = a (q_1 + q_2)$, que implica em $a | (b + c)$.

- **Definição 2**: a mod n é o resto da divisão inteira de a por n. Também é comum usar a % n. 
- **Propriedade 4**: se $a \; mod \; n = b \; mod \; n$ então $n | (a - b)$.
> Prova:
> 
> Podemos reescrever a como: $a = n \cdot q_1 + r$
> 
> Podemos reescrever b como: $b = n \cdot q_2 + r$ 
>
> Logo, subtraindo a primeira equação pela segundo, temos: 
$a - b = n \cdot (q_1 - q_2)$, que implica em $n | (a - b)$.

- **Definição 3**: Vamos definir congruência modular, da seguinte forma:

$$ a \equiv b \; mod \; n \leftrightarrow  n | (a - b)$$

Além disso, podemos afirmar:

$$ a \equiv b \; mod \; n \leftrightarrow  a \; mod \; n = b \;mod \; n$$

## Problemas
Dado um número inteiro N, diga se ele é divisível por D.

### Resposta para $N <= 10^9$
Usando o operador % do C++.

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
	int n, d;
	cin >> n >> d;
	if(n%d == 0){
		cout << 'S' << endl;
	}else{
		cout << 'N' << endl;		
	}
	return 0;
}
```

### Resposta para qualquer $N$ e para $D \in \{2, 3, 5\}$

Usando a string para conseguir ler valores maiores que $10^{18}$ e aplicando propriedade de divisibilidade do 2, 3 e 5.

```cpp
#include <bits/stdc++.h>
using namespace std;
int charParaInt(char c){
	return c-'0';
}
int main() {
	string s;
	cin >> s;
	if(charParaInt(s.back())%2 == 0){
		cout << 'S' << endl;
	}else{
		cout << 'N' << endl;		
	}
	int soma = 0;
	for(int i=0; i<(int)s.size(); i++){
		soma = soma + charParaInt(s[i]);
	}
	if(soma%3 == 0){
		cout << 'S' << endl;
	}else{
		cout << 'N' << endl;		
	}
	if(charParaInt(s.back())%5 == 0){
		cout << 'S' << endl;
	}else{
		cout << 'N' << endl;		
	}
	return 0;
}
```

### Resposta para qualquer $N$ e $D$
Usando propriedade da aritmética modular mostrada no vídeo acima.

```cpp
#include <bits/stdc++.h>
using namespace std;
int charParaInt(char c){
	return c-'0';
}
int resto(string s, int d){
	int base = 1%d;
	int res = 0;
	for(int i=s.size()-1; i>=0; i--){
		res = (res + (charParaInt(s[i])*1LL*base)%d)%d;
		base = (base*10LL)%d;
	}
	return res;
}
int main() {
	string s;
	int d;
	cin >> s >> d;
	if(resto(s, d) == 0){
		cout << 'S' << endl;
	}else{
		cout << 'N' << endl;		
	}
	return 0;
}
```

## Questões para praticar

- [Critérios de Divisibilidade 1](https://neps.academy/br/exercise/266)
- [Critérios de Divisibilidade 2](https://neps.academy/br/exercise/263)
- [Critérios de Divisibilidade 3](https://neps.academy/br/exercise/272)

## Material complementar

- [Divisibilidade - Matemática Computacional - Neps Academy](https://neps.academy/br/course/matematica-computacional-(codcad)/lesson/divisibilidade)