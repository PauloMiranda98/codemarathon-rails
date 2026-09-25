# Produto Escalar e Vetorial

Neste vídeo mostramos duas operações importantes: produto vetorial e escalar. Além disso, mostramos como calcular a projeção, a área do paralelogramo e a área do triângulo. Por fim, vimos como identificar se o ângulo entre dois vetores é agudo, reto ou obtuso utilizando apenas operações com inteiros.

## Vídeos do Conteúdo

### Code Marathon

#### Teoria

```youtube
ghkq3J8lGKk
```

#### Prática

```youtube
I3-ycXXUCfA
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
  //Para usar isso pt tem que ser double
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

pt prodEscalar(Point2D a, Point2D b){
  return a.x*b.x + a.y*b.y;
}

pt prodVetorial(Point2D a, Point2D b){
  return a.x*b.y - a.y*b.x;
}

//Tamanho da projeção de A em B
double tamProjecao(Point2D a, Point2D b){
  return prodEscalar(a, b)/modulo(b);
}

//Vetor de projeção de A em B
//Para usar isso pt tem que ser double
/*double vetProjecao(Point2D a, Point2D b){
  return (b/modulo(b))*tamProjecao(a, b);
}*/

const int AGUDO = 1, RETO = 0, OBTUSO = -1; // < 90, =90, >90
// Retorna o tipo do angulo entre A e B
int tipoAngulo(Point2D a, Point2D b){
  pt res = prodEscalar(a, b);
  if(res > 0)
    return AGUDO;
  else if(res == 0)
    return RETO;
  else
    return OBTUSO;
}

pt areaParalelogramo(Point2D a, Point2D b){
  return abs(prodVetorial(a, b));
}

double areaTriangulo(Point2D a, Point2D b){
  return areaParalelograma(a, b)/2.0;
}

bool perpendicular(Point2D a, Point2D b){
  return prodEscalar(a, b) == 0;
}

bool paralelo(Point2D a, Point2D b){
  return prodVetorial(a, b) == 0;
}
```
