# Divisibilidade

[![Video Sobre Divisibilidade](https://img.youtube.com/vi/FM3_72brIf8/0.jpg)](https://www.youtube.com/watch?v=FM3_72brIf8)

> Esse texto não é uma alternativa ao vídeo mas sim uma revisão do vídeo.

Durante os estudos da maratona é recorrente a utilização de propriedades de divisibilidade. O principal foco deste tutorial é abordar o resto resultante da divisão inteira entre dois números. Ao fazer uma divisão inteira entre <tex>N</tex> e <tex>d</tex>, temos:

<TEX> N = q \cdot d + r </TEX>

Onde, <tex>0 \le r < |d|</tex>. 

## Propriedade e Definições

- **Definição 1**: dado dois inteiros <tex>a</tex> e <tex>b</tex>, dizemos que <tex>a</tex> divide <tex>b</tex>, usando a simbologia <tex>a | b</tex>, sse <tex>b</tex> pode ser escrito como sendo um produto de <tex>a</tex> com uma constante inteira. Além disso, sabemos que nesse caso o resto da divisão inteira é igual a 0.

<TEX> a | b  \leftrightarrow b = a \cdot q</TEX>

- **Propriedade 1**: se <tex>a | b</tex> e <tex>b | c</tex> então <tex>a | c</tex>.
> Prova:
> 
> se <tex>a|b</tex> então <tex>b = a \cdot q_1</tex>
> 
> se <tex>b|c</tex> então <tex>c = b \cdot q_2</tex> 
>
> Logo, juntando as duas equações, temos: 
<tex>c = a \cdot (q_1 \cdot q_2)</tex>, que implica em <tex>a | c</tex>.

- **Propriedade 2**: se <tex>a | b</tex> então <tex>a | (b \cdot c)</tex>.
> Prova:
> 
> se <tex>a|b</tex> então <tex>b = a \cdot q</tex>
> 
> Multiplicando os dois lados por c, temos: <tex>b \cdot c = a \cdot (q \cdot c)</tex>, logo <tex>a | (b \cdot c)</tex>.

- **Propriedade 3**: se <tex>a | b</tex> e <tex>a | c</tex> então <tex>a | (b+c)</tex>.
> Prova:
> 
> se <tex>a|b</tex> então <tex>b = a \cdot q_1</tex>
> 
> se <tex>a|c</tex> então <tex>c = a \cdot q_2</tex> 
>
> Logo, juntando as duas equações, temos: 
<tex>b + c = a (q_1 + q_2)</tex>, que implica em <tex>a | (b + c)</tex>.

- **Definição 2**: a mod n é o resto da divisão inteira de a por n. Também é comum usar a % n. 
- **Propriedade 4**: se <tex>a \; mod \; n = b \; mod \; n</tex> então <tex>n | (a - b)</tex>.
> Prova:
> 
> Podemos reescrever a como: <tex>a = n \cdot q_1 + r</tex>
> 
> Podemos reescrever b como: <tex>b = n \cdot q_2 + r</tex> 
>
> Logo, subtraindo a primeira equação pela segundo, temos: 
<tex>a - b = n \cdot (q_1 - q_2)</tex>, que implica em <tex>n | (a - b)</tex>.

- **Definição 3**: Vamos definir congruência modular, da seguinte forma:

<TEX> a \equiv b \; mod \; n \leftrightarrow  n | (a - b)</TEX>

Além disso, podemos afirmar:

<TEX> a \equiv b \; mod \; n \leftrightarrow  a \; mod \; n = b \;mod \; n</TEX>

## Problemas
Dado um número inteiro N, diga se ele é divisível por D.

### Resposta para <tex>N <= 10^9</tex>
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

### Resposta para qualquer <tex>N</tex> e para <tex>D \in \{2, 3, 5\}</tex>

Usando a string para conseguir ler valores maiores que <tex>10^{18}</tex> e aplicando propriedade de divisibilidade do 2, 3 e 5.

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

### Resposta para qualquer <tex>N</tex> e <tex>D</tex>
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