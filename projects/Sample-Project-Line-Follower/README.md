# {🤖 Proyecto: Robot Seguidor de Línea}
---
Publicado: 04-marzo-2026
---
Proyecto de robot autónomo seguidor de línea utilizando Arduino, sensores infrarrojos y control PID para navegación precisa.

---

## 📋 Componentes del Proyecto

| Componente | Cantidad | Especificaciones | Costo Aprox. |
|------------|----------|------------------|--------------|
| Arduino Uno | 1 | ATmega328P, 16MHz | $25 USD |
| Sensor IR | 5 | TCRT5000, Digital | $10 USD |
| Motor DC | 2 | 6V, 200RPM | $15 USD |
| Driver L298N | 1 | Dual H-Bridge | $8 USD |
| Batería LiPo | 1 | 7.4V, 2200mAh | $20 USD |
| Chasis | 1 | Acrílico 3mm | $12 USD |

**Costo Total**: ~$90 USD

---

## 🎯 Objetivos

- Diseñar y construir un robot seguidor de línea
- Implementar control PID para navegación suave
- Calibrar sensores infrarrojos
- Optimizar velocidad y precisión

---

## 🔧 Tecnologías Utilizadas

[![Arduino](https://img.shields.io/badge/-Arduino-00979D?style=for-the-badge&logo=Arduino&logoColor=white)](https://www.arduino.cc/)
[![C++](https://img.shields.io/badge/c++-%2300599C.svg?style=for-the-badge&logo=c%2B%2B&logoColor=white)](https://isocpp.org/)

---

## 📐 Diseño del Sistema

### Arquitectura de Hardware

```
┌─────────────────────────────────────────┐
│           Arduino Uno (Cerebro)          │
└─────────────────────────────────────────┘
         │              │              │
         ▼              ▼              ▼
    ┌────────┐    ┌─────────┐    ┌────────┐
    │Sensores│    │ Driver  │    │Batería │
    │   IR   │    │ L298N   │    │  7.4V  │
    └────────┘    └─────────┘    └────────┘
                       │
                       ▼
                  ┌─────────┐
                  │ Motores │
                  │   DC    │
                  └─────────┘
```

---

## 💻 Código Principal

### Configuración de Pines

```cpp
// Pines de sensores IR
#define IR1 2
#define IR2 3
#define IR3 4
#define IR4 5
#define IR5 6

// Pines del motor izquierdo
#define ENA 9
#define IN1 7
#define IN2 8

// Pines del motor derecho
#define ENB 10
#define IN3 11
#define IN4 12
```

### Control PID

```cpp
// Variables PID
float Kp = 25;
float Ki = 0;
float Kd = 15;

int lastError = 0;
int integral = 0;

void PID_control() {
  int error = calculateError();
  integral += error;
  int derivative = error - lastError;
  
  int correction = Kp * error + Ki * integral + Kd * derivative;
  
  int leftSpeed = baseSpeed + correction;
  int rightSpeed = baseSpeed - correction;
  
  // Limitar velocidades
  leftSpeed = constrain(leftSpeed, 0, 255);
  rightSpeed = constrain(rightSpeed, 0, 255);
  
  setMotorSpeed(leftSpeed, rightSpeed);
  lastError = error;
}
```

> [!WARNING]
> Asegúrate de calibrar los valores de Kp, Ki y Kd según tu pista y robot específico.

---

## 🔍 Calibración de Sensores

### Proceso de Calibración

1. Colocar el robot sobre superficie blanca
2. Leer valores de sensores (HIGH)
3. Colocar el robot sobre línea negra
4. Leer valores de sensores (LOW)
5. Establecer umbral: `(HIGH + LOW) / 2`

```cpp
void calibrateSensors() {
  Serial.println("Calibrando sensores...");
  
  // Leer valores en blanco
  int whiteValues[5];
  for(int i = 0; i < 5; i++) {
    whiteValues[i] = analogRead(sensorPins[i]);
  }
  
  delay(2000);
  
  // Leer valores en negro
  int blackValues[5];
  for(int i = 0; i < 5; i++) {
    blackValues[i] = analogRead(sensorPins[i]);
  }
  
  // Calcular umbrales
  for(int i = 0; i < 5; i++) {
    threshold[i] = (whiteValues[i] + blackValues[i]) / 2;
  }
  
  Serial.println("Calibración completa!");
}
```

---

## 🧪 Pruebas y Resultados

### Configuraciones Probadas

| Configuración | Kp | Ki | Kd | Velocidad Base | Resultado |
|---------------|----|----|----|--------------:|-----------|
| Config 1 | 20 | 0 | 10 | 150 | Oscilaciones |
| Config 2 | 25 | 0 | 15 | 180 | Estable ✅ |
| Config 3 | 30 | 0.5 | 20 | 200 | Muy rápido |

> [!TIP]
> Comienza con valores bajos de Kp y aumenta gradualmente hasta obtener un seguimiento suave.

---

## 📊 Análisis de Desempeño

### Métricas

- **Tiempo de vuelta**: 12.5 segundos
- **Precisión**: 95% de la pista seguida correctamente
- **Velocidad promedio**: 0.8 m/s
- **Consumo de batería**: 45 minutos de operación continua

---

## 🎥 Demostración

> [!NOTE]
> Video de demostración disponible en el repositorio del proyecto.

---

## 🚀 Mejoras Futuras

1. Implementar detección de intersecciones
2. Agregar sensor ultrasónico para evitar obstáculos
3. Comunicación Bluetooth para control remoto
4. Pantalla LCD para mostrar estado del robot
5. Modo de aprendizaje automático para optimizar PID

---

## ✅ Conclusiones

El robot seguidor de línea fue implementado exitosamente con:
- Control PID funcional y calibrado
- Navegación precisa y estable
- Código modular y escalable
- Documentación completa del proceso

---

## 📚 Referencias y Recursos

- [Arduino PID Library](https://github.com/br3ttb/Arduino-PID-Library)
- [Line Follower Tutorial](https://www.instructables.com/Line-Follower-Robot/)
- [Motor Control with L298N](https://lastminuteengineers.com/l298n-dc-stepper-driver-arduino-tutorial/)

---

## 👥 Equipo

- **Desarrollador Principal**: Laboratorio UDLAP Robotics
- **Fecha**: Marzo 2026
- **Versión**: 1.0
