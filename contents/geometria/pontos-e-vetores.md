## Pontos e Vetores

No vídeo abaixo mostramos algumas operações com vetores 2D. Além disso, mostramos como calcular o módulo de um vetor e o seu ângulo em relação ao eixo x. 

## Vídeo do Conteúdo

### Code Marathon

#### Teoria

```youtube
cD4V9TtF9EQ
```
#### Prática

```youtube
SJ_E_k3NkSw
```
#### Implementação em C++

```cpp
#include <bits/stdc++.h>
using namespace std;

typedef long long pt;
struct Point2D{
  pt x, y;
  Point2D(){
    x = y = 0;
  }
  Point2D(pt x1, pt y1){
    x = x1;
    y = y1;
  }
  Point2D operator+(Point2D oth){
    return Point2D(x + oth.x, y + oth.y);
  }
  Point2D operator-(Point2D oth){
    return Point2D(x - oth.x, y - oth.y);
  }
  Point2D operator*(pt k){
    return Point2D(x*k, y*k);
  }
  Point2D operator/(pt k){
    return Point2D(x/k, y/k);
  }
};

Point2D pointToVector(Point2D a, Point2D b){
  return b-a;
}
double modulo(Point2D v){
  return sqrt(v.x*v.x + v.y*v.y);
}
```