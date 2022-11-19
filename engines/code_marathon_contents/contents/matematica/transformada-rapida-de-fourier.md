# Transformada Rápida de Fourier (FFT)
Devido a complexidade do assunto, no momento, decidi não fazer a parte escrita sobre FFT. Talvez eu faça no futuro. Para mais detalhe sobre a implementação, assista o vídeo abaixo.

## Videos do conteúdo

- Code Marathon

```youtube
CB-uzeDkiEs
```

### Implementação da vídeo aula

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef complex<double> cd;
const double PI = acos(-1); 
vector<cd> fft(vector<cd> a){
  int n = a.size();
  if(n == 1)
    return a;
  vector<cd> a0(n/2);
  vector<cd> a1(n/2);
  for(int i=0; i<n/2; i++){
    a0[i] = a[2*i];
    a1[i] = a[2*i + 1];
  }
  a0 = fft(a0); 
  a1 = fft(a1);
  cd w(1);
  cd wn(cos((2*PI)/n), sin((2*PI)/n));
  for(int i=0; i < n; i++){
    a[i] = a0[i%(n/2)] + w*a1[i%(n/2)];
    w = w*wn;
  }
  return a;
}
vector<cd> inv_fft(vector<cd> a){
  int n = a.size();
  if(n == 1)
    return a;
  vector<cd> a0(n/2);
  vector<cd> a1(n/2);
  for(int i=0; i<n/2; i++){
    a0[i] = a[2*i];
    a1[i] = a[2*i + 1];
  }
  a0 = inv_fft(a0); 
  a1 = inv_fft(a1);
  cd w(1);
  cd wn(cos((-2*PI)/n), sin((-2*PI)/n));
  for(int i=0; i < n; i++){
    a[i] = a0[i%(n/2)] + w*a1[i%(n/2)];
    a[i] /= 2;
    w = w*wn;
  }
  return a;
}
//C(x) = A(x)*B(x)
vector<long long> multiply(vector<int> a, vector<int> b){
  int n=1;
  while(n < a.size() + b.size())
    n *= 2;
  vector<cd> va(a.begin(), a.end());
  vector<cd> vb(b.begin(), b.end());
  va.resize(n);
  vb.resize(n);
  va = fft(va);
  vb = fft(vb);
  vector<cd> vc(n);
  for(int i=0; i < n; i++)
    vc[i] = va[i]*vb[i];
  vc = inv_fft(vc);
  vector<long long> c(n);
  for(int i=0; i < n; i++)
    c[i] = roundl(vc[i].real());
  return c;
}
```

## Implementação mais eficiente
Para melhorar a eficiência podemos implementar a versão iterativa da Transformada Rápida de Fourier. Além disso, implementar o próprio número complexo melhora o tempo de execução. Para mais detallhe, acesse o [CP-Algorithm](https://cp-algorithms.com/algebra/fft.html#toc-tgt-5).

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
typedef pair<int,int> pii;
typedef pair<ll, ll> pll;
struct complex_t {
  double a {0.0}, b {0.0};
  complex_t(){}
  complex_t(double na) : a{na}{}  
  complex_t(double na, double nb) : a{na}, b{nb} {}  
  const complex_t operator+(const complex_t &c) const {
    return complex_t(a + c.a, b + c.b);
  }
  const complex_t operator-(const complex_t &c) const {
    return complex_t(a - c.a, b - c.b);
  }
  const complex_t operator*(const complex_t &c) const {
    return complex_t(a*c.a - b*c.b, a*c.b + b*c.a);
  }
  const complex_t operator/(const int &c) const {
    return complex_t(a/c, b/c);
  }
};
using cd = complex_t;
const double PI = acos(-1);
void fft(vector<cd> & a, bool invert) {
  int n = a.size();
  for (int i = 1, j = 0; i < n; i++) {
    int bit = n >> 1;
    for (; j & bit; bit >>= 1)
      j ^= bit;
    j ^= bit;
    if (i < j)
      swap(a[i], a[j]);
  }
  for (int len = 2; len <= n; len <<= 1) {
    double ang = 2 * PI / len * (invert ? -1 : 1);
    cd wlen(cos(ang), sin(ang));
    for (int i = 0; i < n; i += len) {
      cd w(1);
      for (int j = 0; j < len / 2; j++) {
        cd u = a[i+j], v = a[i+j+len/2] * w;
        a[i+j] = u + v;
        a[i+j+len/2] = u - v;
        w = w * wlen;
      }
    }
  }
  if (invert) {
    for (cd & x : a){
      x = x / n;
    }
  }
}
vector<ll> multiply(vector<int> const& a, vector<int> const& b) {
  vector<cd> fa(a.begin(), a.end()); 
  vector<cd> fb(b.begin(), b.end());   
  int n = 1;
  while(n < int(a.size() + b.size()) ) 
    n <<= 1;    
  fa.resize(n);
  fb.resize(n);
  fft(fa, false);
  fft(fb, false);  
  for (int i = 0; i < n; i++)
    fa[i] = fa[i]*fb[i];  
  fft(fa, true);
  vector<ll> result(n);
  for (int i = 0; i < n; i++)
    result[i] = round(fa[i].a);        
  return result;
}
```

## Material Complementar
- [O Slide Mais Didático de Todos os Tempos](http://web.cecs.pdx.edu/~maier/cs584/Lectures/lect07b-11-MG.pdf)
- [Fast Fourier Transform](https://cp-algorithms.com/algebra/fft.html)
- [Tutorial on FFT/NTT — The tough made simple. ( Part 1 )](https://codeforces.com/blog/entry/43499)
- [Tutorial on FFT/NTT — The tough made simple. ( Part 2 )](https://codeforces.com/blog/entry/48798)