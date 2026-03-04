# {🔬 Investigación: SLAM y Navegación Autónoma}
---
Publicado: 04-marzo-2026
---
Investigación sobre algoritmos de SLAM (Simultaneous Localization and Mapping) y navegación autónoma para robots móviles en entornos dinámicos.

---

## 📋 Información del Proyecto

| Campo | Detalle |
|-------|---------|
| **Investigador Principal** | Dr. Juan Pérez |
| **Colaboradores** | María García, Carlos López |
| **Institución** | UDLAP - Laboratorio de Robótica |
| **Duración** | Enero 2026 - Diciembre 2026 |
| **Financiamiento** | CONACYT |
| **Estado** | En Progreso |

---

## 🎯 Objetivos de Investigación

### Objetivo General

Desarrollar e implementar algoritmos avanzados de SLAM para navegación autónoma en entornos dinámicos con múltiples obstáculos móviles.

### Objetivos Específicos

1. Comparar algoritmos de SLAM existentes (GMapping, Cartographer, RTAB-Map)
2. Implementar mejoras en detección de obstáculos dinámicos
3. Optimizar planificación de trayectorias en tiempo real
4. Validar resultados en simulación y hardware real

---

## 🔧 Tecnologías y Herramientas

[![ROS](https://img.shields.io/badge/ros-%230A0FF9.svg?style=for-the-badge&logo=ros&logoColor=white)](https://www.ros.org/)
[![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)](https://www.python.org/)
[![C++](https://img.shields.io/badge/c++-%2300599C.svg?style=for-the-badge&logo=c%2B%2B&logoColor=white)](https://isocpp.org/)
[![OpenCV](https://img.shields.io/badge/opencv-%23white.svg?style=for-the-badge&logo=opencv&logoColor=white)](https://opencv.org/)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-%23FF6F00.svg?style=for-the-badge&logo=TensorFlow&logoColor=white)](https://www.tensorflow.org/)

---

## 📚 Marco Teórico

### SLAM (Simultaneous Localization and Mapping)

SLAM es el problema computacional de construir o actualizar un mapa de un entorno desconocido mientras simultáneamente se mantiene un seguimiento de la ubicación del agente dentro de él.

**Ecuación fundamental de SLAM:**

```
P(x_{1:t}, m | z_{1:t}, u_{1:t})
```

Donde:
- `x_{1:t}`: Trayectoria del robot
- `m`: Mapa del entorno
- `z_{1:t}`: Observaciones del sensor
- `u_{1:t}`: Comandos de control

> [!IMPORTANT]
> SLAM es un problema de estimación de estado que requiere resolver simultáneamente la localización y el mapeo, lo que lo convierte en un problema de "huevo y gallina".

---

## 🧪 Metodología

### Fase 1: Revisión Bibliográfica

Análisis de algoritmos SLAM estado del arte:

| Algoritmo | Tipo | Sensor | Complejidad | Precisión |
|-----------|------|--------|-------------|-----------|
| GMapping | 2D | LIDAR | O(n log n) | Alta |
| Cartographer | 2D/3D | LIDAR | O(n²) | Muy Alta |
| RTAB-Map | 3D | RGB-D | O(n) | Alta |
| ORB-SLAM3 | 3D | Cámara | O(n log n) | Muy Alta |

### Fase 2: Implementación

```python
import rospy
from nav_msgs.msg import OccupancyGrid
from geometry_msgs.msg import PoseStamped

class SLAMNavigator:
    def __init__(self):
        rospy.init_node('slam_navigator')
        
        # Suscriptores
        self.map_sub = rospy.Subscriber('/map', OccupancyGrid, self.map_callback)
        self.pose_sub = rospy.Subscriber('/amcl_pose', PoseStamped, self.pose_callback)
        
        # Publicadores
        self.goal_pub = rospy.Publisher('/move_base_simple/goal', PoseStamped, queue_size=10)
        
        self.current_map = None
        self.current_pose = None
        
    def map_callback(self, msg):
        """Procesar mapa actualizado"""
        self.current_map = msg
        self.analyze_map()
        
    def pose_callback(self, msg):
        """Actualizar pose del robot"""
        self.current_pose = msg
        
    def analyze_map(self):
        """Analizar mapa para detectar obstáculos dinámicos"""
        if self.current_map is None:
            return
            
        # Algoritmo de detección de cambios
        dynamic_obstacles = self.detect_dynamic_obstacles()
        
        if dynamic_obstacles:
            self.replan_trajectory()
```

> [!TIP]
> Utiliza filtros de Kalman para mejorar la estimación de pose en presencia de ruido en los sensores.

### Fase 3: Experimentación

Configuración experimental:

```yaml
# Parámetros de GMapping
slam_gmapping:
  base_frame: base_link
  odom_frame: odom
  map_update_interval: 5.0
  maxUrange: 10.0
  sigma: 0.05
  kernelSize: 1
  lstep: 0.05
  astep: 0.05
  iterations: 5
  lsigma: 0.075
  ogain: 3.0
  lskip: 0
  minimumScore: 50
  srr: 0.1
  srt: 0.2
  str: 0.1
  stt: 0.2
```

---

## 📊 Resultados Preliminares

### Comparación de Algoritmos

| Métrica | GMapping | Cartographer | RTAB-Map | ORB-SLAM3 |
|---------|----------|--------------|----------|-----------|
| Tiempo de mapeo (s) | 45.2 | 52.8 | 38.5 | 41.3 |
| Error de pose (m) | 0.12 | 0.08 | 0.15 | 0.09 |
| Uso de CPU (%) | 35 | 68 | 42 | 55 |
| Uso de RAM (MB) | 450 | 820 | 680 | 590 |
| Precisión del mapa | 92% | 96% | 89% | 94% |

> [!NOTE]
> Los resultados son promedios de 10 ejecuciones en el mismo entorno de prueba.

### Gráficas de Desempeño

**Trayectoria estimada vs. Ground Truth:**

```
Error promedio: 0.095m
Desviación estándar: 0.032m
Error máximo: 0.24m
```

---

## 🔍 Análisis de Resultados

### Hallazgos Principales

1. **Cartographer** muestra la mayor precisión pero requiere más recursos computacionales
2. **RTAB-Map** es el más rápido pero menos preciso en entornos con poca textura
3. **ORB-SLAM3** ofrece el mejor balance entre precisión y eficiencia
4. **GMapping** es ideal para aplicaciones con recursos limitados

> [!WARNING]
> Los algoritmos basados en cámara (ORB-SLAM3) son sensibles a condiciones de iluminación variables.

### Limitaciones Identificadas

- Dificultad en detección de obstáculos transparentes
- Degradación de desempeño en entornos altamente dinámicos
- Necesidad de calibración precisa de sensores
- Problemas de cierre de bucle en trayectorias largas

---

## 🚀 Trabajo Futuro

### Corto Plazo (3 meses)

- [ ] Implementar fusión de sensores (LIDAR + Cámara)
- [ ] Optimizar algoritmo de detección de obstáculos dinámicos
- [ ] Realizar pruebas en entornos reales

### Mediano Plazo (6 meses)

- [ ] Integrar aprendizaje profundo para clasificación de obstáculos
- [ ] Desarrollar sistema de navegación social
- [ ] Publicar resultados en conferencia internacional

### Largo Plazo (12 meses)

- [ ] Implementar SLAM multi-robot
- [ ] Validar en aplicaciones industriales
- [ ] Publicar artículo en revista indexada

---

## 📄 Publicaciones

### Artículos en Preparación

1. **"Enhanced SLAM for Dynamic Environments using Deep Learning"**
   - Estado: En revisión
   - Revista: IEEE Robotics and Automation Letters

2. **"Comparative Analysis of SLAM Algorithms for Mobile Robots"**
   - Estado: Borrador
   - Conferencia: ICRA 2027

---

## 💾 Código y Datasets

### Repositorio

```bash
git clone https://github.com/udlap-robotics/slam-research.git
cd slam-research
catkin_make
source devel/setup.bash
```

### Datasets Utilizados

| Dataset | Entorno | Tamaño | Formato |
|---------|---------|--------|---------|
| TUM RGB-D | Interior | 2.5 GB | ROS bag |
| KITTI | Exterior | 15 GB | ROS bag |
| Custom UDLAP | Laboratorio | 1.2 GB | ROS bag |

> [!TIP]
> Los datasets están disponibles en el repositorio del proyecto para reproducibilidad.

---

## 👥 Colaboradores

- **Dr. Juan Pérez** - Investigador Principal
- **M.C. María García** - Desarrollo de algoritmos
- **Ing. Carlos López** - Experimentación y validación
- **Est. Ana Martínez** - Análisis de datos

---

## 🏆 Reconocimientos

Este proyecto es financiado por CONACYT bajo el proyecto número CB-2025-123456.

Agradecemos al Laboratorio de Robótica de la UDLAP por proporcionar la infraestructura y equipamiento necesario.

---

## 📚 Referencias

1. Thrun, S., Burgard, W., & Fox, D. (2005). *Probabilistic Robotics*. MIT Press.
2. Durrant-Whyte, H., & Bailey, T. (2006). "Simultaneous localization and mapping: part I". *IEEE Robotics & Automation Magazine*, 13(2), 99-110.
3. Mur-Artal, R., & Tardós, J. D. (2017). "ORB-SLAM2: An open-source SLAM system for monocular, stereo, and RGB-D cameras". *IEEE Transactions on Robotics*, 33(5), 1255-1262.
4. Hess, W., et al. (2016). "Real-time loop closure in 2D LIDAR SLAM". *IEEE International Conference on Robotics and Automation*.

---

## 📧 Contacto

Para más información sobre esta investigación:

- **Email**: robotics@udlap.mx
- **Lab**: Laboratorio de Robótica UDLAP
- **Website**: https://robotics.udlap.mx
