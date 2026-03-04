# {🧪 Phase 2 Features Demo}
---
Publicado: 04-marzo-2026
---
Este documento demuestra todas las mejoras de renderizado de Markdown implementadas en la Fase 2 del proyecto UDLAP Robotics. Incluye tablas avanzadas, bloques de código con botón de copiar, renderizado de badges, bloques de alerta/admonición, centrado de imágenes y justificación de texto.

---

## 📊 Advanced Table Rendering

Las tablas ahora se renderizan con estilo mejorado, soporte para 4+ columnas y scroll horizontal cuando es necesario.

| Component | Type | Quantity | Status | Location |
|-----------|------|----------|--------|----------|
| Arduino Uno | Microcontroller | 5 | Available | Lab A |
| Servo Motor | Actuator | 10 | Available | Lab B |
| Ultrasonic Sensor | Sensor | 8 | In Use | Lab A |
| Raspberry Pi 4 | Computer | 3 | Available | Lab C |
| ESP32 | Microcontroller | 12 | Available | Lab B |

---

## 💻 Code Block with Copy Button

Todos los bloques de código ahora incluyen un botón "Copy" en la esquina superior derecha, similar a GitHub.

```python
def calculate_trajectory(start, end, steps):
    """
    Calculate robot trajectory points between two positions.
    
    Args:
        start: Starting position (x, y, z)
        end: Ending position (x, y, z)
        steps: Number of intermediate points
    
    Returns:
        List of trajectory points
    """
    trajectory = []
    for i in range(steps):
        t = i / steps
        point = {
            'x': start['x'] + (end['x'] - start['x']) * t,
            'y': start['y'] + (end['y'] - start['y']) * t,
            'z': start['z'] + (end['z'] - start['z']) * t
        }
        trajectory.append(point)
    return trajectory
```

```javascript
// Example: ROS node initialization
const rosnodejs = require('rosnodejs');

async function initRosNode() {
  await rosnodejs.initNode('/udlap_robotics_node');
  const nh = rosnodejs.nh;
  
  const pub = nh.advertise('/robot/cmd_vel', 'geometry_msgs/Twist');
  const sub = nh.subscribe('/robot/odom', 'nav_msgs/Odometry', (msg) => {
    console.log('Position:', msg.pose.pose.position);
  });
}
```

---

## 🏷️ Badge Rendering

Los badges se muestran en una fila horizontal sin saltos de línea, con scroll horizontal si es necesario. Los badges son clickeables y mantienen sus enlaces.

[![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)](https://www.python.org/)
[![ROS](https://img.shields.io/badge/ros-%230A0FF9.svg?style=for-the-badge&logo=ros&logoColor=white)](https://www.ros.org/)
[![Arduino](https://img.shields.io/badge/-Arduino-00979D?style=for-the-badge&logo=Arduino&logoColor=white)](https://www.arduino.cc/)
[![Raspberry Pi](https://img.shields.io/badge/-RaspberryPi-C51A4A?style=for-the-badge&logo=Raspberry-Pi)](https://www.raspberrypi.org/)
[![C++](https://img.shields.io/badge/c++-%2300599C.svg?style=for-the-badge&logo=c%2B%2B&logoColor=white)](https://isocpp.org/)

---

## 🔔 Alert / Admonition Blocks

El sistema ahora soporta 5 tipos de bloques de alerta con iconos y colores distintivos.

> [!NOTE]
> Este es un bloque informativo. Se utiliza para proporcionar información adicional o contexto importante.

> [!TIP]
> Consejo útil: Siempre usa el simulador antes de probar en hardware real para evitar daños al equipo.

> [!IMPORTANT]
> Información crítica: Todos los sensores deben ser calibrados antes de iniciar cualquier experimento.

> [!WARNING]
> Advertencia: Los componentes de alto voltaje requieren equipo de seguridad apropiado. Nunca trabajes con circuitos energizados sin protección.

> [!CAUTION]
> Precaución extrema: Nunca desconectes la alimentación mientras el robot está en movimiento. Esto puede causar daños permanentes al hardware.

---

## 🖼️ Centered Images

Las imágenes ahora se centran automáticamente en la página.

![UR5 Robot](https://github.com/cesar-martinez-torres/UDLAP_Robotics/blob/master/projects/tutorial-Pick_and_Place_URSIM/media/images/UR5.png)

---

## 📝 Text Justification

Los párrafos de texto ahora se justifican completamente para una mejor presentación.

En el campo de la robótica moderna, la integración de sistemas embebidos con algoritmos de inteligencia artificial representa uno de los mayores desafíos tecnológicos de nuestra era. La capacidad de procesar información en tiempo real, tomar decisiones autónomas y adaptarse a entornos cambiantes requiere una combinación sofisticada de hardware y software que debe trabajar en perfecta armonía.

Los sistemas robóticos actuales deben ser capaces de percibir su entorno mediante una variedad de sensores, procesar esta información de manera eficiente utilizando algoritmos avanzados, y ejecutar acciones precisas que cumplan con los objetivos establecidos. Esta complejidad requiere un enfoque multidisciplinario que combine conocimientos de mecánica, electrónica, programación y matemáticas aplicadas.

En el Laboratorio de Robótica de la UDLAP, nos enfocamos en desarrollar soluciones innovadoras que aborden estos desafíos, proporcionando a nuestros estudiantes las herramientas y conocimientos necesarios para convertirse en líderes en el campo de la robótica y la automatización industrial.

---

## ✅ Conclusión

Todas las características de la Fase 2 han sido implementadas exitosamente:

1. ✅ Renderizado avanzado de tablas (4+ columnas, estilizado)
2. ✅ Botón de copiar en bloques de código
3. ✅ Renderizado de badges en fila horizontal
4. ✅ Bloques de alerta/admonición (NOTE, TIP, IMPORTANT, WARNING, CAUTION)
5. ✅ Centrado automático de imágenes
6. ✅ Justificación de texto en párrafos

---

## 📚 Referencias

- [React Markdown Documentation](https://github.com/remarkjs/react-markdown)
- [remark-gfm Plugin](https://github.com/remarkjs/remark-gfm)
- [Chakra UI Components](https://chakra-ui.com/)
