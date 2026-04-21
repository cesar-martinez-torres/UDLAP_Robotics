# {Tutorial: Pick and place con ROS y Gazebo}
El siguiente tutorial tiene como objetivo desarrollar la simulación de un "Pick and Place" para el brazo robótico industrial de 6 grados de libertad con muñeca esférica "ABB IRB 140", todo el programa es desarrollado a través del sistema operativo robótico "ROS" y el simulador 3D de robótica "Gazebo", además de la herramienta de visualización en 3D para robots "RViz".

A lo largo de este tutorial aprenderás a cofigurar y simular el robot industrial **ABB IRB 140** en ROS y Gazebo. A lo largo del proceso:
- Crearás un workspace.
- Clonarás repositorios.
- Aprenderás a lanzar el robot en **RViz** y **Gazebo** correctamente.
- Ejecutarás movimientos tipo *pick and place*.
---

## 🧰 Requisitos Previos
Este tutorial esta pensado para personas que tiene poco o nula experiencia previa con ROS, pero que tienen interés en aprender cómo simular un robot industrial desde cero. Antes de comenzar, necesitas cumplir con lo siguiente:

💻 **Requisitos de hardware**
- Computadora con al menos 2 núcleos de procesador
- Contar 30 a 40 GB de espacio libre en disco duro
- 8 GB de RAM como mínimo
  
📋 **Requisitos de software**
- Sistema operativo: **Ubuntu 20.04** (versión compatible con ROS Noetic)
- Conexión a internet estable
- Editor de texto (VS Code, Gedit, o el que prefieras)
  
🔧 **Instalaciones necesarias**

**NOTA:** Si no tienes instalado nada de esto, puedes ver diferentes tutoriales como [Install Ubuntu Desktop | Ubuntu](https://ubuntu.com/tutorials/install-ubuntu-desktop#1-overview)
- ROS Noetic
- Gazebo
- RViz

✅ No necesitas saber programar en ROS o conocer el robot ABB IRB 140. Este tutorial te explicará desde lo más básico cómo configurarlo, moverlo y simular una tarea tipo pick and place.

---

## 📖  Introducción

**ABB Robotics** es una empresa líder en automatización industrial, reconocida por el desarrollo de soluciones robóticas avanzadas para entornos de manufactura exigentes. 

Uno de sus modelos es el **ABB IRB 140**, un robot industrial compacto de seis grados de libertad, diseñado para operar en espacios reducidos con alta velocidad, precisión y repetibilidad. Es ampliamente empleado en tareas como ensamblae, soldadura, manipulación de piezas y mucnas otras aplicaciones en espacios reducidos. 
![IRB140](https://github.com/EvaItzcoatl/ABB-IRBB-140-ROS-y-Gazebo-/blob/main/media/ABB_IRB_140_0001.png)

Sabiendo esto, el tema que abordaremos en este tutorial es la simulación del *ABB IRB 140** en un entorno virtual utilizando ROS y Gazebo, con el objetivo de diseñar y programar un rutina de **"Pick and Placle"**. Esta rutina es una de las tareas más comunes en robótica industrial, y consiste en tomar un objeto de un punto A y colocarlo en un punto B, de forma automática, precisa y repetitiva.

Esto mediante la programción de los movimientos de los jonits, simulando movimientos como:
- **MoveL:** Movimiento en línea recta, se ocupa para movimientos, como subir y bajar, donde el robot se mueve de la forma más rápida y efectiva posible.
- **MoveJ:** Rotación de las juntas del robot para una trayectoría mása rápida.

Además, debemos tener en cuenta que al robot se le pueden agregar diferentes tipos de herramientas dependiendo de la actividad que se quiere realizar.

Sin embargo, para este tutorial, no se logró incorportar la herramienta (pinzas de agarre), por lo que se colocó un rectangulo al final del brazo para simualr el uso de la herramienta.

Este tutorial es ideal para quienes desean iniciarse en la robótica industrial desde la siulación, sin necesidad de contar con el robot físico. A lo largo de los pasos, irás comprendiendo cómo controlar los movimientos de forma programada.

---

## 🛠️ Configuración del Entorno

Pasos para configurar el entorno de desarrollo:

* Abriremos la terminal en Ubuntu

* Es necesario eliminar el catkin_ws que se tiene

* Crea un nuevo workspace (para este tutorial se nombro **prueba1_ws**
  
---

## 🏗️ Instrucciones

**NOTA:** Todos estos pason se deben realizar en la terminal de Ubuntu

**Paso 1:** Crear un nuevo workspace

Es recomendable eliminar el "catkin_ws" generado completamente y volver a generarlo desde cero.

Abrimos la terminal y colocaremos los siguientes comando, recuerda colocarlo uno por uno y presionar "enter" en cada comando. Como ejemplo se utilizara el nombre de prueba1_ws para el workspace, pero debes cambiarlo por el nombre de tu preferencia (debe terminar con _ws)
- mkdir -p ~/prueba1_ws/src 
- cd ~/prueba1_ws/src #Entrar a la carpeta src
- catkin_init_workspace #Crea un archivo simbolico CMakeLists.txt
- cd ~/prueba1_ws #Regresas a la carpeta del ws
- catkin_make #Genera los archivos build y devel, además de preparar el entorno de desarrollo
  
**Paso 2:** Eliminar archivos

Una vez terminado el "catkin_make" entramos a la carpeta del ws (workspace) y eliminamos las carpetas **"build"** y **"devel"**

**Paso 3:** Clonar repositorio

Para esto es necesario regresar a la carpeta personal
- cd #Te dirige a tu carpeta personal
- git clone https://github.com/EvaItzcoatl/ABB-IRB140-ROS-y-Gazebo.git #Copia el repositorio en tu carpeta personal

**Paso 4:** Mover archivos

Abrimos la carpeta que fue duplicada en tu carpeta personal con el nombre de **ABB-IRB140-ROS-y-Gazebo"**, dentros de esta carpeta vamos a seleccionar las sub-carpetas:
- build
- devel

Vamos a dar clic derecho y seleccionamos la opción **"mover a"**

Se debe abrir una nueva ventana, donde seleccionaremos:
- Carpeta personal
- prueba1_ws

Dentro de la carpeta **ABB-IRB140-ROS-y-Gazebo** tenemos la carpeta **"src"**, aquí podras encontrar un archivo con el nombre de **"abb_irb140_support"**:
- mover a
- Carpeta personal
- prueba1_ws
- src
- Le damos al botón verde que dice **"Seleccionar"**

Ahora ya podemos eliminar la carpeta completa de **"ABB-IRB140-ROS-y-Gazebo"**.

En la terminal, colocamos:
- cd ~/prueba1_ws
- rm -rf build devel #Elimina algunas configuraciones para evitar errores
- catkin_make #Prepara el entorno de desarrollo

**Paso 5:** Ejecución de Gazebo

En la terminal
- cd
- cd ~/prueba1_ws
- catkin_make
- source devel/setup.bash #Permite utilizar comandos ROS, asegura las conecciones entre los archivos y configura el entorno de trabajo
- roslaunch abb_irb140_support irb140_gazebo.launch #Este archivo abre Gazebo y muestra el robot.

Con esto se abrira Gazebo y lograremos visualizar el robot ABB IRB140, no te preocupes si el robot aparece en con si estuviera tirado o mal acomodado, lo arreglaremos en los siguientes pasos.

**Paso 6:** Poner en posición cero el robot

Abre otro terminal y coloca los siguientes comandos:
- rosservice call /gazebo/pause_physics "{}" #Pausa la simulación física en Gazebo
- rosservice call /gazebo/dele_model "model_name: 'irb140'" #Elimina el robot
- rosparam get /robot_description #Permite simular el comportamiento del robot en Gazebo
- rosrun gazebo_ros spawn_model -urdf -param robot_description -model irb140 -x 0 -y 0 -z 0 #Coloca el robot en Gazebo y lo pone en configuración cero

**Paso 7:** Mover el robot mediante un código en Phyton

Debemos entrar a la carpeta "scripts", para esto colocamos en la terminal lo siguiente:
- cd ~/prueba1_ws/src/abb_irb140_support/scripts/
- ./mover_irb140.py

Para poder ver el robor funcionar, es recomendable minimizar la terminal justa después de darle enter al comando.

Si sale algun error como **Permiso denegado** es necesario ir a la carpeta donde se encuentra el archivo (prueba1_ws/src/abb_irb140_support/scripts), le damos clic derecho al archivo y en seleccionamos *"propiedades"*, esto abre una nueva ventana, le damos en *"Permisos"* y seleccionamos **"Permitir ejecutar el archivo como programa"**.

**Explicacaión del código** 

## 💾 Script Pick And Place en Python para ROS

El script que hace funcionar la simulación del Pick And Place es el siguiente:

```python
#!/usr/bin/env python3
import rospy
import time
from gazebo_msgs.srv import SetModelConfiguration

def move_robot(joint_positions):
    try:
        set_config = rospy.ServiceProxy('/gazebo/set_model_configuration', SetModelConfiguration)
        joint_names = ['joint_1', 'joint_2', 'joint_3', 'joint_4', 'joint_5', 'joint_6']
        
        resp = set_config(
            model_name='irb140',
            urdf_param_name='robot_description',
            joint_names=joint_names,
            joint_positions=joint_positions
        )
        
        if resp.success:
            rospy.loginfo("¡Movimiento completado!")
        else:
            rospy.logerr("Error al mover el robot: " + resp.status_message)
    
    except rospy.ServiceException as e:
        rospy.logerr("Error en el servicio: %s" % e)

def pick_and_place_sequence():
    # Home position
    home = [0.0, 0.0, 0.0, 0.0, 0.0, 3.14]
    home_a_pre1 = [0.1, 0.1, -0.03, 0.0, -0.1, 3.14]
    home_a_pre2 = [0.2, 0.2, -0.05, 0.0, -0.2, 3.14]
    home_a_pre3 = [0.3, 0.3, -0.08, 0.0, -0.3, 3.14]
    home_a_pre4 = [0.4, 0.4, -0.1, 0.0, -0.4, 3.14]
    home_a_pre5 = [0.5, 0.5, -0.13, 0.0, -0.5, 3.14]
    home_a_pre6 = [0.6, 0.6, -0.15, 0.0, -0.6, 3.14]
    home_a_pre7 = [0.7, 0.7, -0.18, 0.0, -0.7, 3.14]
    home_a_pre8 = [0.8, 0.8, -0.2, 0.0, -0.8, 3.14]
    home_a_pre9 = [0.9, 0.9, -0.25, 0.0, -0.9, 3.14]
    home_a_pre10 = [0.95, 0.95, -0.28, 0.0, -0.95, 3.14]
    # Posición sobre el objeto a recoger
    pre_pick = [1.0, 1.0, -0.3, 0.0, -1.0, 3.14]
    pre_a_pick1 = [1.0, 1.0, -0.28, 0.0, -1.0, 3.14]
    pre_a_pick2 = [1.0, 1.0, -0.25, 0.0, -1.0, 3.14]
    pre_a_pick3 = [1.0, 1.0, -0.23, 0.0, -1.0, 3.14]
    pre_a_pick4 = [1.0, 1.0, -0.2, 0.0, -1.0, 3.14]
    pre_a_pick5 = [1.0, 1.0, -0.18, 0.0, -1.0, 3.14]
    pre_a_pick6 = [1.0, 1.0, -0.15, 0.0, -1.0, 3.14]
    pre_a_pick7 = [1.0, 1.0, -0.13, 0.0, -1.0, 3.14]
    pre_a_pick8 = [1.0, 1.0, -0.1, 0.0, -1.0, 3.14]
    pre_a_pick9 = [1.0, 1.0, -0.08, 0.0, -1.0, 3.14]
    pre_a_pick10 = [1.0, 1.0, -0.05, 0.0, -1.0, 3.14]
    pre_a_pick11 = [1.0, 1.0, -0.03, 0.0, -1.0, 3.14]
    # Posición para recoger (con gripper abierto)
    pick = [1.0, 1.0, 0.0, 0.0, -1.0, 3.14]
    pick_a_post1 = [1.0, 1.0, -0.03, 0.0, -1.0, 3.14]
    pick_a_post2 = [1.0, 1.0, -0.05, 0.0, -1.0, 3.14]
    pick_a_post3 = [1.0, 1.0, -0.08, 0.0, -1.0, 3.14]
    pick_a_post4 = [1.0, 1.0, -0.1, 0.0, -1.0, 3.14]
    pick_a_post5 = [1.0, 1.0, -0.13, 0.0, -1.0, 3.14]
    pick_a_post6 = [1.0, 1.0, -0.15, 0.0, -1.0, 3.14]
    pick_a_post7 = [1.0, 1.0, -0.18, 0.0, -1.0, 3.14]
    pick_a_post8 = [1.0, 1.0, -0.2, 0.0, -1.0, 3.14]
    pick_a_post9 = [1.0, 1.0, -0.23, 0.0, -1.0, 3.14]
    pick_a_post10 = [1.0, 1.0, -0.25, 0.0, -1.0, 3.14]
    pick_a_post11 = [1.0, 1.0, -0.28, 0.0, -1.0, 3.14]
    # Posición después de recoger (con gripper cerrado)
    post_pick = [1.0, 1.0, -0.3, 0.0, -1.0, 3.14]
    post_a_pre1 = [0.9, 1.0, -0.29, 0.0, -1.0, 3.14]
    post_a_pre2 = [0.8, 1.0, -0.27, 0.0, -1.0, 3.14]
    post_a_pre3 = [0.7, 1.0, -0.25, 0.0, -1.0, 3.14]
    post_a_pre4 = [0.6, 1.0, -0.23, 0.0, -1.0, 3.14]
    post_a_pre5 = [0.5, 1.0, -0.22, 0.0, -1.0, 3.14]
    post_a_pre6 = [0.4, 1.0, -0.2, 0.0, -1.0, 3.14]
    post_a_pre7 = [0.3, 1.0, -0.19, 0.0, -1.0, 3.14]
    post_a_pre8 = [0.2, 1.0, -0.17, 0.0, -1.0, 3.14]
    post_a_pre9 = [0.0, 1.0, -0.15, 0.0, -1.0, 3.14]
    post_a_pre10 = [-0.1, 1.0, -0.13, 0.0, -1.0, 3.14]
    post_a_pre11 = [-0.2, 1.0, -0.12, 0.0, -1.0, 3.14]
    post_a_pre12 = [-0.3, 1.0, -0.1, 0.0, -1.0, 3.14]
    post_a_pre13 = [-0.4, 1.0, -0.09, 0.0, -1.0, 3.14]
    post_a_pre14 = [-0.5, 1.0, -0.07, 0.0, -1.0, 3.14]
    post_a_pre15 = [-0.6, 1.0, -0.05, 0.0, -1.0, 3.14]
    post_a_pre16 = [-0.7, 1.0, -0.04, 0.0, -1.0, 3.14]
    post_a_pre17 = [-0.8, 1.0, -0.03, 0.0, -1.0, 3.14]
    post_a_pre18 = [-0.9, 1.0, -0.02, 0.0, -1.0, 3.14]
    # Posición sobre el lugar donde soltar
    pre_place = [-1.0, 1.0, 0.0, 0.0, -1.0, 3.14]
    pre_a_place = [-1.0, 1.0, 0.03, 0.0, -1.0, 3.14]
    pre_a_place2 = [-1.0, 1.0, 0.05, 0.0, -1.0, 3.14]
    pre_a_place3 = [-1.0, 1.0, 0.08, 0.0, -1.0, 3.14]
    pre_a_place4 = [-1.0, 1.0, 0.1, 0.0, -1.0, 3.14]
    pre_a_place5 = [-1.0, 1.0, 0.13, 0.0, -1.0, 3.14]
    pre_a_place6 = [-1.0, 1.0, 0.15, 0.0, -1.0, 3.14]
    pre_a_place7 = [-1.0, 1.0, 0.18, 0.0, -1.0, 3.14]
    pre_a_place8 = [-1.0, 1.0, 0.2, 0.0, -1.0, 3.14]
    pre_a_place9 = [-1.0, 1.0, 0.23, 0.0, -1.0, 3.14]
    pre_a_place10 = [-1.0, 1.0, 0.25, 0.0, -1.0, 3.14]
    pre_a_place11 = [-1.0, 1.0, 0.28, 0.0, -1.0, 3.14]
    # Posición para soltar (con gripper abierto)
    place = [-1.0, 1.0, 0.3, 0.0, -1.0, 3.14]
    place_a_post1 = [-1.0, 0.95, 0.28, 0.0, -1.0, 3.14]
    place_a_post2 = [-1.0, 0.9, 0.24, 0.0, -1.0, 3.14]
    place_a_post3 = [-1.0, 0.85, 0.2, 0.0, -1.0, 3.14]
    place_a_post4 = [-1.0, 0.8, 0.18, 0.0, -1.0, 3.14]
    place_a_post5 = [-1.0, 0.75, 0.14, 0.0, -1.0, 3.14]
    place_a_post6 = [-1.0, 0.7, 0.1, 0.0, -1.0, 3.14]
    place_a_post7 = [-1.0, 0.65, 0.09, 0.0, -1.0, 3.14]
    place_a_post8 = [-1.0, 0.6, 0.05, 0.0, -1.0, 3.14]
    place_a_post9 = [-1.0, 0.55, 0.03, 0.0, -1.0, 3.14]
    # Posición para subir poco después de soltar
    post_place = [-1.0, 0.5, 0.0, 0.0, -1.0, 3.14]
    post_home1 = [-1.0, 0.5, 0.0, 0.0, -1.0, 3.14]
    post_home2 =[-0.9, 0.5, 0.0, 0.0, -0.9, 3.14]
    post_home3 =[-0.82, 0.48, 0.0, 0.0, -0.9, 3.14]
    post_home4 =[-0.74, 0.45, 0.0, 0.0, -0.81, 3.14]
    post_home5 =[-0.67, 0.42, 0.0, 0.0, -0.73, 3.14]
    post_home6 =[-0.61, 0.39, 0.0, 0.0, -0.66, 3.14]
    post_home7 =[-0.55, 0.35, 0.0, 0.0, -0.59, 3.14]
    post_home8 =[-0.49, 0.32, 0.0, 0.0, -0.53, 3.14]
    post_home9 =[-0.44, 0.29, 0.0, 0.0, -0.47, 3.14]
    post_home10 =[-0.39, 0.26, 0.0, 0.0, -0.42, 3.14]
    post_home11 =[-0.35, 0.23, 0.0, 0.0, -0.38, 3.14]
    post_home12 =[-0.31, 0.20, 0.0, 0.0, -0.34, 3.14]
    post_home13 =[-0.27, 0.18, 0.0, 0.0, -0.30, 3.14]
    post_home14 =[-0.24, 0.15, 0.0, 0.0, -0.26, 3.14]
    post_home15 =[-0.21, 0.13, 0.0, 0.0, -0.23, 3.14]
    post_home16 =[-0.18, 0.11, 0.0, 0.0, -0.20, 3.14]
    post_home17 =[-0.15, 0.09, 0.0, 0.0, -0.17, 3.14]
    post_home18 =[-0.13, 0.07, 0.0, 0.0, -0.14, 3.14]
    post_home19 =[-0.11, 0.06, 0.0, 0.0, -0.12, 3.14]
    post_home20 =[-0.09, 0.04, 0.0, 0.0, -0.10, 3.14]
    post_home21 =[-0.07, 0.03, 0.0, 0.0, -0.08, 3.14]
    post_home22 =[-0.05, 0.02, 0.0, 0.0, -0.06, 3.14]
    post_home23 =[-0.03, 0.01, 0.0, 0.0, -0.04, 3.14]
    post_home24 =[-0.01, 0.00, 0.0, 0.0, -0.02, 3.14]
    post_home25 =[0.0, 0.0, 0.0, 0.0, 0.0, 3.14]
    # Secuencia de movimientos
    rospy.loginfo("Moviendo a posición HOME")
    move_robot(home)
    time.sleep(0.1)
    
    move_robot(home_a_pre1)
    time.sleep(0.1)
    
    move_robot(home_a_pre2)
    time.sleep(0.1)
    
    move_robot(home_a_pre3)
    time.sleep(0.1)
    
    move_robot(home_a_pre4)
    time.sleep(0.1)
    
    move_robot(home_a_pre5)
    time.sleep(0.1)
    
    move_robot(home_a_pre6)
    time.sleep(0.1)
    
    move_robot(home_a_pre7)
    time.sleep(0.1)
    
    move_robot(home_a_pre8)
    time.sleep(0.1)
    
    move_robot(home_a_pre9)
    time.sleep(0.1)
    
    move_robot(home_a_pre10)
    time.sleep(0.1)
    
    rospy.loginfo("Moviendo a posición PRE-PICK")
    move_robot(pre_pick)
    time.sleep(0.2)
    
    move_robot(pre_a_pick1)
    time.sleep(0.2)
    
    move_robot(pre_a_pick2)
    time.sleep(0.2)
    
    move_robot(pre_a_pick3)
    time.sleep(0.2)
    
    move_robot(pre_a_pick4)
    time.sleep(0.2)
    
    move_robot(pre_a_pick5)
    time.sleep(0.2)
    
    move_robot(pre_a_pick6)
    time.sleep(0.2)
    
    move_robot(pre_a_pick7)
    time.sleep(0.2)
    
    move_robot(pre_a_pick8)
    time.sleep(0.2)
    
    move_robot(pre_a_pick9)
    time.sleep(0.2)
    
    move_robot(pre_a_pick10)
    time.sleep(0.2)
    
    move_robot(pre_a_pick11)
    time.sleep(0.2)
    
    rospy.loginfo("Moviendo a posición PICK")
    move_robot(pick)
    time.sleep(0.1)
    
    # Aquí iría el comando para cerrar el gripper
    rospy.loginfo("Cerrando gripper (simulado)")
    time.sleep(0.1)
    
    move_robot(pick_a_post1)
    time.sleep(0.1)
    
    move_robot(pick_a_post2)
    time.sleep(0.1)
    
    move_robot(pick_a_post3)
    time.sleep(0.1)
    
    move_robot(pick_a_post4)
    time.sleep(0.1)
    
    move_robot(pick_a_post5)
    time.sleep(0.1)
    
    move_robot(pick_a_post6)
    time.sleep(0.1)
    
    move_robot(pick_a_post7)
    time.sleep(0.1)
    
    move_robot(pick_a_post8)
    time.sleep(0.1)
    
    move_robot(pick_a_post9)
    time.sleep(0.1)
    
    move_robot(pick_a_post10)
    time.sleep(0.1)
    
    move_robot(pick_a_post11)
    time.sleep(0.1)
    
    rospy.loginfo("Moviendo a posición POST-PICK")
    move_robot(post_pick)
    time.sleep(0.1)
    
    move_robot(post_a_pre1)
    time.sleep(0.1)
    
    move_robot(post_a_pre2)
    time.sleep(0.1)
    
    move_robot(post_a_pre3)
    time.sleep(0.1)
    
    move_robot(post_a_pre4)
    time.sleep(0.1)
    
    move_robot(post_a_pre5)
    time.sleep(0.1)
    
    move_robot(post_a_pre6)
    time.sleep(0.1)
    
    move_robot(post_a_pre7)
    time.sleep(0.1)
    
    move_robot(post_a_pre8)
    time.sleep(0.1)
    
    move_robot(post_a_pre9)
    time.sleep(0.1)
    
    move_robot(post_a_pre10)
    time.sleep(0.1)
    
    move_robot(post_a_pre11)
    time.sleep(0.1)
    
    move_robot(post_a_pre12)
    time.sleep(0.1)
    
    move_robot(post_a_pre13)
    time.sleep(0.1)
    
    move_robot(post_a_pre14)
    time.sleep(0.1)
    
    move_robot(post_a_pre15)
    time.sleep(0.1)
    
    move_robot(post_a_pre16)
    time.sleep(0.1)
    
    move_robot(post_a_pre17)
    time.sleep(0.1)
    
    move_robot(post_a_pre18)
    time.sleep(0.1)
    
    rospy.loginfo("Moviendo a posición PRE-PLACE")
    move_robot(pre_place)
    time.sleep(0.2)
    
    move_robot(pre_a_place)
    time.sleep(0.2)
    
    move_robot(pre_a_place2)
    time.sleep(0.2)
    
    move_robot(pre_a_place3)
    time.sleep(0.2)
    
    move_robot(pre_a_place4)
    time.sleep(0.2)
    
    move_robot(pre_a_place5)
    time.sleep(0.2)
    
    move_robot(pre_a_place6)
    time.sleep(0.2)
    
    move_robot(pre_a_place7)
    time.sleep(0.2)
    
    move_robot(pre_a_place8)
    time.sleep(0.2)
    
    move_robot(pre_a_place9)
    time.sleep(0.2)
    
    move_robot(pre_a_place10)
    time.sleep(0.2)
    
    move_robot(pre_a_place11)
    time.sleep(0.2)
    
    rospy.loginfo("Moviendo a posición PLACE")
    move_robot(place)
    time.sleep(0.1)
    
    move_robot(place_a_post1)
    time.sleep(0.1)
    
    move_robot(place_a_post2)
    time.sleep(0.1)
    
    move_robot(place_a_post3)
    time.sleep(0.1)
    
    move_robot(place_a_post4)
    time.sleep(0.1)
    
    move_robot(place_a_post5)
    time.sleep(0.1)
    
    move_robot(place_a_post6)
    time.sleep(0.1)
    
    move_robot(place_a_post7)
    time.sleep(0.1)
    
    move_robot(place_a_post8)
    time.sleep(0.1)
    
    move_robot(place_a_post9)
    time.sleep(0.1)
    
    # Aquí iría el comando para abrir el gripper
    rospy.loginfo("Abriendo gripper (simulado)")
    time.sleep(0.1)
    
    rospy.loginfo("Moviendo a posición POS_PLACE")
    move_robot(post_place)
    time.sleep(0.1)
    
    move_robot(post_home1)
    time.sleep(0.1)
    
    move_robot(post_home2)
    time.sleep(0.1)
    
    move_robot(post_home3)
    time.sleep(0.1)
    
    move_robot(post_home4)
    time.sleep(0.1)
    
    move_robot(post_home5)
    time.sleep(0.1)
    
    move_robot(post_home6)
    time.sleep(0.1)
    
    move_robot(post_home7)
    time.sleep(0.1)
    
    move_robot(post_home8)
    time.sleep(0.1)
    
    move_robot(post_home9)
    time.sleep(0.1)
    
    move_robot(post_home10)
    time.sleep(0.1)
    
    move_robot(post_home11)
    time.sleep(0.1)
    
    move_robot(post_home12)
    time.sleep(0.1)
    
    move_robot(post_home13)
    time.sleep(0.1)
    
    move_robot(post_home14)
    time.sleep(0.1)
    
    move_robot(post_home15)
    time.sleep(0.1)
    
    move_robot(post_home16)
    time.sleep(0.1)
    
    move_robot(post_home17)
    time.sleep(0.1)
    
    move_robot(post_home18)
    time.sleep(0.1)
    
    move_robot(post_home19)
    time.sleep(0.1)
    
    move_robot(post_home20)
    time.sleep(0.1)
    
    move_robot(post_home21)
    time.sleep(0.1)
    
    move_robot(post_home22)
    time.sleep(0.1)
    
    move_robot(post_home23)
    time.sleep(0.1)
    
    move_robot(post_home24)
    time.sleep(0.1)
    
    move_robot(post_home25)
    time.sleep(0.1)
    
    rospy.loginfo("Moviendo a posición HOME")
    move_robot(home)

if __name__ == '__main__':
    try:
        rospy.init_node('irb140_pick_and_place')
        pick_and_place_sequence()
    except rospy.ROSInterruptException:
        pass
```
Puede encontrarse de igual forma en *src/abb_irb140_support/scripts/mover_irb140.py*

---
## 🛠️ Descripción del Código de Pick and Place en Python para ROS

El script puede resumirse en dos funciones principales:

* pick_and_place_sequence():

```pyhton
def pick_and_place_sequence():
    # Home position
    home = [0.0, 0.0, 0.0, 0.0, 0.0, 3.14]
    home_a_pre1 = [0.1, 0.1, -0.03, 0.0, -0.1, 3.14]
    home_a_pre2 = [0.2, 0.2, -0.05, 0.0, -0.2, 3.14]
    home_a_pre3 = [0.3, 0.3, -0.08, 0.0, -0.3, 3.14]
    home_a_pre4 = [0.4, 0.4, -0.1, 0.0, -0.4, 3.14]
    home_a_pre5 = [0.5, 0.5, -0.13, 0.0, -0.5, 3.14]
    home_a_pre6 = [0.6, 0.6, -0.15, 0.0, -0.6, 3.14]
    home_a_pre7 = [0.7, 0.7, -0.18, 0.0, -0.7, 3.14]
    home_a_pre8 = [0.8, 0.8, -0.2, 0.0, -0.8, 3.14]
    home_a_pre9 = [0.9, 0.9, -0.25, 0.0, -0.9, 3.14]
    home_a_pre10 = [0.95, 0.95, -0.28, 0.0, -0.95, 3.14]
    # Posición sobre el objeto a recoger
    pre_pick = [1.0, 1.0, -0.3, 0.0, -1.0, 3.14]
    pre_a_pick1 = [1.0, 1.0, -0.28, 0.0, -1.0, 3.14]
    pre_a_pick2 = [1.0, 1.0, -0.25, 0.0, -1.0, 3.14]
    pre_a_pick3 = [1.0, 1.0, -0.23, 0.0, -1.0, 3.14]
    pre_a_pick4 = [1.0, 1.0, -0.2, 0.0, -1.0, 3.14]
    pre_a_pick5 = [1.0, 1.0, -0.18, 0.0, -1.0, 3.14]
    pre_a_pick6 = [1.0, 1.0, -0.15, 0.0, -1.0, 3.14]
    pre_a_pick7 = [1.0, 1.0, -0.13, 0.0, -1.0, 3.14]
    pre_a_pick8 = [1.0, 1.0, -0.1, 0.0, -1.0, 3.14]
    pre_a_pick9 = [1.0, 1.0, -0.08, 0.0, -1.0, 3.14]
    pre_a_pick10 = [1.0, 1.0, -0.05, 0.0, -1.0, 3.14]
    pre_a_pick11 = [1.0, 1.0, -0.03, 0.0, -1.0, 3.14]
    # Posición para recoger (con gripper abierto)
    ...
```

Esta función es la principal del código y arranca estableciendo los valores articulares de los motores en posiciones como *“home”, “pre_pick”, “pick”, “post_pick”, “pre_place”, “place”* y *“post_place”*. Estas posiciones de ancla fueron calculadas según nuestras necesidades, pero el usuario puede modificar las posiciones a su conveniencia alterando los valores de cada posición. Igualmente se incluyeron posiciones intermedias para trazar la trayectoria de movimiento. Estos valores pueden ser calculados en programas como *MATLAB* con la función *jtraj* del *Robotics Toolbox de Peter Corke*. Esto arroja matrices de transformación homogéneas entre una posición y la siguiente (por ejemplo, entre *home* y *pre_pick*) y se puede alterar la cantidad de matrices que se desean. Para cambiar los valores de la matriz de transformación homogénea a valores DH (los cuales son los que se usan como valores en las posiciones) se usa la función *ikine6s* (solamente para robots de 6 GDL, ya que para otro tipo de robot solo es *ikine*) igualmente del *Robotics Toolbox de Peter Corke*, el cual permite calcular la cinemática inversa y obtener estos valores.

**NOTA**: el *Robotics Toolbox de Peter Corke* te permite calcular la cinemática inversa y obtener los valores DH pero estos valores no siempre pueden coincidir con los valores establecidos en las posiciones, por lo que el usuario puede experimentar que el modelo tenga movimientos bruscos en las trayectorias. Es decir, que las articulaciones del robot se vean afectadas y muestren una configuración completamente distinta a la que se quiere, por lo que es recomendable modificar los valores o bien, calcular los propios valores DH. 

* move_robot(joint_positions):

```pyhton
# Secuencia de movimientos
    rospy.loginfo("Moviendo a posición HOME")
    move_robot(home)
    time.sleep(0.1)
    
    move_robot(home_a_pre1)
    time.sleep(0.1)
    
    move_robot(home_a_pre2)
    time.sleep(0.1)
    
    move_robot(home_a_pre3)
    time.sleep(0.1)
    
    move_robot(home_a_pre4)
    time.sleep(0.1)
    
    move_robot(home_a_pre5)
    time.sleep(0.1)
    
    move_robot(home_a_pre6)
    time.sleep(0.1)
    ...
```

Esta función dentro de *pick_and_place_sequence()* permite mover las articulaciones del robot y mostrarlas en la simulación. En la parte *a)* se explicó sobre cómo se establecieron los valores, por lo que en esta parte se mandan a llamar las posiciones para mostrarlas en la simulación. Hay que notar que después de cada función *move_robot()* se tiene un *time.sleep()* el cual puede ser modificado a gusto del usuario. Esta función solo hará que se espere un momento en que pase de una posición articular a la siguiente.

---
## 💾 Script Pick And Place en MATLAB
Este código permite el cálculo de las posiciones intermedias entre cada punto de ancla o *waypoints* y lo ejecuta en *MATLAB* para su visualización usando el *Robotics Toolbox de Peter Corke* anteriormente mencionado:

```matlab
%% Pick And Place de ABB IRB140 en MATLAB
mdl_irb140 % 6 GDL y tiene muñeca esférica
irb140.teach

%% Crear los waypoints
% Posición home
q_home= [0 0 0 0 0 0]
T_home = irb140.fkine(q_home)

% Posición Approach Pick
q_approach_pick = [1 1 -0.3 0 -1 0]
T_approach_pick = irb140.fkine(q_approach_pick)

% Posición Pick con Cinemática Inversa
T_pick = T_approach_pick.T
T_pick(3,4) = 0
q_pick = irb140.ikine6s(T_pick)

% Posición Approach Place
q_approach_place = [-1 1 0 0 -1 0]
T_approach_place = irb140.fkine(q_approach_place)

% Posición Place con Cinemática Inversa
T_place = T_approach_place.T
T_place(3,4) = 0
q_place = irb140.ikine6s(T_place)

%% Armar trayectorias
steps = 10

% Movimiento 1
M1 = jtraj(q_home, q_approach_pick, steps)

% Movimiento 2
T_M2 = ctraj(T_approach_pick.T, T_pick, steps)
M2 = irb140.ikine6s(T_M2)

% Movimiento 3
T_M3 = ctraj(T_pick, T_approach_pick.T, steps)
M3 = irb140.ikine6s(T_M3)

% Movimiento 4
M4 = jtraj(q_approach_pick, q_approach_place, steps)

% Movimiento 5
T_M5 = ctraj(T_approach_place.T, T_place, steps)
M5 = irb140.ikine6s(T_M5)

% Movimiento 6
T_M6 = ctraj(T_place, T_approach_place.T, steps)
M6 = irb140.ikine6s(T_M6)

% Movimiento Regreso
MR = jtraj(q_approach_place, q_approach_pick, steps)

% Movimiento Final
MF = jtraj(q_approach_place, q_home, steps)

%% Plotear las trayectorias
M = [M1; M2; M3; M4; M5; M6; MR; M2; M3; M4; M5; M6; MF]
figure
irb140.plot(M)
end
```

---
## 🛠️ Descripción del Código Pick And Place en MATLAB

El código se puede dividir en tres partes 

* Inicialización del robot:
```matlab
%% Pick And Place de ABB IRB140 en MATLAB
mdl_irb140 % 6 GDL y tiene muñeca esférica
irb140.teach
```

* Creación de waypoints:

```matlab
%% Crear los waypoints
% Posición home
q_home= [0 0 0 0 0 0]
T_home = irb140.fkine(q_home)

% Posición Approach Pick
q_approach_pick = [1 1 -0.3 0 -1 0]
T_approach_pick = irb140.fkine(q_approach_pick)

% Posición Pick con Cinemática Inversa
T_pick = T_approach_pick.T
T_pick(3,4) = 0
q_pick = irb140.ikine6s(T_pick)

% Posición Approach Place
q_approach_place = [-1 1 0 0 -1 0]
T_approach_place = irb140.fkine(q_approach_place)

% Posición Place con Cinemática Inversa
T_place = T_approach_place.T
T_place(3,4) = 0
q_place = irb140.ikine6s(T_place)
```

* Armar trayectorias

```matlab
%% Armar trayectorias
steps = 10

% Movimiento 1
M1 = jtraj(q_home, q_approach_pick, steps)

% Movimiento 2
T_M2 = ctraj(T_approach_pick.T, T_pick, steps)
M2 = irb140.ikine6s(T_M2)

% Movimiento 3
T_M3 = ctraj(T_pick, T_approach_pick.T, steps)
M3 = irb140.ikine6s(T_M3)

% Movimiento 4
M4 = jtraj(q_approach_pick, q_approach_place, steps)

% Movimiento 5
T_M5 = ctraj(T_approach_place.T, T_place, steps)
M5 = irb140.ikine6s(T_M5)

% Movimiento 6
T_M6 = ctraj(T_place, T_approach_place.T, steps)
M6 = irb140.ikine6s(T_M6)

% Movimiento Regreso
MR = jtraj(q_approach_place, q_approach_pick, steps)

% Movimiento Final
MF = jtraj(q_approach_place, q_home, steps)
```

* Gráfico de movimientos

```matlab
%% Plotear las trayectorias
M = [M1; M2; M3; M4; M5; M6; MR; M2; M3; M4; M5; M6; MF]
figure
irb140.plot(M)
end
```

Use el comando: *./mover_irb140.py* o *rosrun abb_irb140_support mover_irb140.py* si se quiere iniciar el **paquete de ROS**.

Observe cómo el robot ejecuta el movimiento predefinido.

---


Para terminar la simulación, en la primera terminal donde ejecutamos el archivo .launch, damos ctrl+c y termina la ejecución, esto cierra Gazebo. 

---
## ✅ Conclusión
En este tutorial aprendimos las distntas formas de mover el robot ABB IRB 140 desde la terminal, mediante un código en Phyton o desde la terminal. De igual forma aprendimos un poco sobre el uso de ROS, como clonar un repositorio y crear carpetas o archivos desde la terminal, además de utilizar otras herramientas externas como lo es MATLAB. 

Este proyecto tiene como principal proposito enseñar a simular un "pick and place" usando el robot ABB IRB140 en ROS y Gazebo, mostrando comando para poder llamar archivos y lazar el robot, además de algunos comandos extras para poder modificar errores que podría presentar Gazebo. 

⚙️ Mejoras o proyectos a futuro

- Por cuestiones de tiempo ya no se inetento mover la simulación con MoveIt y RViz, por lo que se espera mejorar este proyecto para poder también mover el robot físico. 
- Implementar una alternativa de vinular MATLAB con ROS, pasa poder calcular los puntos en MATLAB y mandarlos a ROS para poder mover la simulación.
- Encontrar el semejante de jtraj de MATLAB para Phyton3.

---

## 📚 Referencias y Recursos Adicionales

Los siguientes repositorios fueron utilizados para generar el workspace utilizado. 

[Alexic12/ABB_IRB140_PACKAGES_ROS](https://github.com/Alexic12/ABB_IRB140_PACKAGES_ROS)

[FreddyMartinez/abb_irb_support](https://github.com/FreddyMartinez/abb_irb140_support)

---

## 📬 Contacto

Para preguntas o sugerencias:

* Asesor encargado de la página: César Martínez Torres
  
   📧 Correo electrónico: cesar.martinez@udlap.mx
  
* Redactor del tutorial: Eva Andrea Itzcoatl Tepeyahuitl
  
   📧 Correo electrónico: itzcoatl2902@gmail.com
  
---
