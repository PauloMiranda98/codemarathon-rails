## Pontos e Vetores

No vídeo abaixo mostramos algumas operações com vetores 2D. Além disso, mostramos como calcular o módulo de um vetor e o seu ângulo em relação ao eixo x. 

## Vídeo do Conteúdo

### Code Marathon

#### Teoria
[![Video Sobre Pontos e Vetores - Teoria](https://img.youtube.com/vi/cD4V9TtF9EQ/0.jpg)](https://www.youtube.com/watch?v=cD4V9TtF9EQ)

#### Prática

[![Video Sobre Pontos e Vetores - Pratica](https://img.youtube.com/vi/SJ_E_k3NkSw/0.jpg)](https://www.youtube.com/watch?v=SJ_E_k3NkSw)

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