# {📚 Tutorial: ROS Basics}
---
Publicado: 04-marzo-2026
---
Este tutorial cubre los conceptos básicos de ROS (Robot Operating System), incluyendo la instalación, configuración de nodos, publicadores, suscriptores y servicios.

---

## 📋 Requisitos Previos

- Ubuntu 20.04 o superior
- Python 3.8+
- Conocimientos básicos de Linux y terminal

---

## 📖 Introducción

ROS (Robot Operating System) es un framework flexible para escribir software de robots. Es una colección de herramientas, bibliotecas y convenciones que tienen como objetivo simplificar la tarea de crear comportamientos robóticos complejos y robustos en una amplia variedad de plataformas robóticas.

[![ROS](https://img.shields.io/badge/ros-%230A0FF9.svg?style=for-the-badge&logo=ros&logoColor=white)](https://www.ros.org/)
[![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)](https://www.python.org/)
[![Ubuntu](https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white)](https://ubuntu.com/)

---

## 🛠️ Instalación de ROS

### Configurar sources.list

```bash
sudo sh -c 'echo "deb http://packages.ros.org/ros/ubuntu $(lsb_release -sc) main" > /etc/apt/sources.list.d/ros-latest.list'
```

### Configurar keys

```bash
sudo apt install curl
curl -s https://raw.githubusercontent.com/ros/rosdistro/master/ros.asc | sudo apt-key add -
```

### Instalación

```bash
sudo apt update
sudo apt install ros-noetic-desktop-full
```

> [!IMPORTANT]
> Asegúrate de tener suficiente espacio en disco. La instalación completa requiere aproximadamente 3GB.

---

## 🚀 Configuración del Entorno

### Inicializar rosdep

```bash
sudo rosdep init
rosdep update
```

### Configurar variables de entorno

```bash
echo "source /opt/ros/noetic/setup.bash" >> ~/.bashrc
source ~/.bashrc
```

> [!TIP]
> Agrega el source al .bashrc para no tener que ejecutarlo en cada terminal nueva.

---

## 📦 Crear un Workspace

```bash
mkdir -p ~/catkin_ws/src
cd ~/catkin_ws/
catkin_make
source devel/setup.bash
```

---

## 🤖 Primer Nodo: Publisher

Crear un nodo que publique mensajes:

```python
#!/usr/bin/env python3
import rospy
from std_msgs.msg import String

def talker():
    pub = rospy.Publisher('chatter', String, queue_size=10)
    rospy.init_node('talker', anonymous=True)
    rate = rospy.Rate(10) # 10hz
    
    while not rospy.is_shutdown():
        hello_str = "hello world %s" % rospy.get_time()
        rospy.loginfo(hello_str)
        pub.publish(hello_str)
        rate.sleep()

if __name__ == '__main__':
    try:
        talker()
    except rospy.ROSInterruptException:
        pass
```

---

## 📡 Primer Nodo: Subscriber

Crear un nodo que se suscriba a mensajes:

```python
#!/usr/bin/env python3
import rospy
from std_msgs.msg import String

def callback(data):
    rospy.loginfo(rospy.get_caller_id() + "I heard %s", data.data)
    
def listener():
    rospy.init_node('listener', anonymous=True)
    rospy.Subscriber("chatter", String, callback)
    rospy.spin()

if __name__ == '__main__':
    listener()
```

---

## 🔧 Comandos Útiles

| Comando | Descripción |
|---------|-------------|
| `roscore` | Inicia el master de ROS |
| `rosrun` | Ejecuta un nodo |
| `rosnode list` | Lista nodos activos |
| `rostopic list` | Lista topics activos |
| `rostopic echo` | Muestra mensajes de un topic |
| `rosservice list` | Lista servicios disponibles |

---

## ✅ Conclusión

Has aprendido los conceptos básicos de ROS:
- Instalación y configuración
- Creación de workspace
- Nodos publisher y subscriber
- Comandos básicos de ROS

> [!NOTE]
> Este es solo el comienzo. ROS tiene muchas más características avanzadas como servicios, acciones, tf, y más.

---

## 📚 Referencias

- [ROS Wiki](http://wiki.ros.org/)
- [ROS Tutorials](http://wiki.ros.org/ROS/Tutorials)
- [ROS Answers](https://answers.ros.org/)
