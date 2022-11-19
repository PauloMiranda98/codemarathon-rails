# Exponenciação Rápida

**Problema**: dado 3 valores inteiros $a$, $n$ e $m$, calcule $a^n \text{ mod } m$. 

## Vídeo do conteúdo

- Code Marathon

```youtube
hlYoB9phTfc
```

## Solução O(n)
Podemos simplesmente executar a multiplicação $n$ vezes.

```cpp
int expLenta(int base, int exp, int mod){
  int res = 1;
  for(int i=0; i<exp; i++)
    res = (res*1LL*base)%mod;
  return res;
}
```

## Solução O(log(n))
Para resolver em uma complexidade melhor, podemos fazer algumas observações. É possível dividir a exponenciação em partes. Uma possibilidade seria quebrar a exponenciação em potências de 2.

$$
A^{14} = A^8 \cdot A^4 \cdot A^2 \\
A^{30} = A^{16}  \cdot A^8 \cdot A^4 \cdot A^2 
$$

A vantagem de fazer com potência de 2 é que podemos aproveitar a representação binária do expoente.

$$
14_{10} = 00001110_2 = 2^3 + 2^2 +  2^1  = 8 + 4 + 2\\
30_{10} = 00011110_2 = 2^4 + 2^3 + 2^2 + 2^1  = 16 + 8 + 4 + 2\\
$$

Assim, nós geramos $A^1$, $A^2$, $A^4$, $A^8$, .... e usamos apenas quando o bit respectivo estiver em 1.

### Implementação

```cpp
int expRapida(int base, long long exp, int mod){
  int res = 1;
  for(int i=0; i < 63; i++){
    if(exp&(1LL << i)) 
      res = (res*1LL*base)%mod;
    base = (base*1LL*base)%mod;
  }
  return res;
}
```

Podemos deixar a implementação mais simples. Ao invés de deslocar o 1 para esquerda, podemos deslocar o expoente para a direita.

```cpp
int expRapida(int base, long long exp, int mod){
  int res = 1;
  while(exp>0){
    if(exp&1LL) 
      res = (res*1LL*base)%mod;
    base = (base*1LL*base)%mod;
    exp = exp>>1;
  }
  return res;
}
```

## Aplicações
Exponenciação rápida pode ser usada para calcular formulas fechadas. Além disso, temos outras aplicações.

### Inverso Modular
Usando o Pequeno Teorema de Fermat temos que:

$$
a^{p-1} \equiv 1 \text{ mod } p
$$
onde $a$ e $p$ são inteiro e $p$ é primo.

Assim, se multiplicarmos ambos os lados por $a^{-1}$, temos:

$$
a^{p-2} \equiv a^{-1} \text{ mod } p
$$
Logo, para calcular o inverso modular, basta fazer o seguinte código:

```cpp
int invMod(int a, int mod){
  return expRapida(a, mod-2, mod);
}
```

### Recorrência Linear
Podemos aproveitar a técnica aprendida aqui para exponenciar matrizes de forma rápida. No texto sobre [Recorrência Linear](/conteudos/variados/recorrencia-linear) você tem mais detalhe de como fazer isso.

## Material Complementar
- [Binary Exponentiation](https://cp-algorithms.com/algebra/binary-exp.html)