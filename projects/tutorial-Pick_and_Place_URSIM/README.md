# {Tutorial: Pick and place con URSim}
Publicado. 11-junio-2025 

El siguiente tutorial tiene como objetivo desarrollar un movimiento de "Pick and place" para el brazo róbotico colaborativo "UR5", el programa se desarrollará utilizando Polyscope (Interfaz gráfica de UR) y URSim, programa que permite simular el robot e importar el código al robot físico si fuera necesario.

A lo largo de este tutorial estudiaremos los distintos tipos de movimiento que el robot puede realizar, además, aprenderemos a configurar el entorno virtual, programar los movimientos del robot a realizar y ejecutar una sencilla tarea de recogida y colocación de objetos (Pick and Place).

---

## 📋 Requisitos Previos

- Instalación de URSim ([Guía de instalación de URSim](https://drive.google.com/file/d/1XBEqzTVAYYV9bFNBp0DkKGqSmh7_G8Jh/view?usp=sharing))
- Computadora con 2 nucleos mínimo
- 4Gb RAM mínimo
- Recomendado tener tarjeta gráfica 

---

## 📖  Introducción

Universal Robots (o mejor conocido como "UR") es una empresa danesa fundada en 2005, líder mundial en el desarrollo de robots colaborativos, robots los cuales, a diferencia de los robots industriales, están diseñados para trabajar junto con personas a su alrededor, esto al tener implementado protocolos y sistemas de seguridad en su programación, quitando la necesidad de implementar barreras físicas en el espacio de trabajo.

![UR5](https://github.com/cesar-martinez-torres/UDLAP_Robotics/blob/master/projects/tutorial-Pick_and_Place_URSIM/media/images/UR5.png)

El tema que abordaremos en este tutorial es el diseño y programación de una rutina "Pick and Place" en el entorno de simulación URSim. Para ello, primero debemos saber que es un "Pick and Place", el cual se refiere a una tarea fundamental y ampliamente utilizada dentro de la robótica industrial, la cual consiste, de manera general en tomar un objeto de un punto A y colocarlo en un punto B de forma automática, precisa y repetitiva, esto a través de distintos tipos de movimientos programados:
- MoveL: consiste en un movimiento en línea recta del punto central de la herramienta a un punto deseado.
- MoveJ: consiste en un movimiento a través de la rotación de las juntas del robot, se utiliza principalmente para mover el robot de la forma más rápida y efectiva posible.
- MoveP: consiste en un movimiento circular del punto central de la herramienta a través de un arco deseado. (En este tutorial no será utilizado)

La herramienta que nosotros utilizaremos para el "Pick and Place" serán unas pinzas de agarre, URSim no tiene la capacidad de simularla, por lo que sólo se modificará el TCP (Tool Center Point). 

---

## 🛠️ Configuración del Entorno

Una vez realizada la instalación de URSim.

* Inicializar la máquina virtual 

* Damos click en el simulador para "UR5"

* Seleccionamos la opción "program robot"
  
* Seleccionamos la opción "empty program"
  
---
## 🏗️ Instrucciones

Como se mencionó anteriormente, se realizará un movimiento de "Pick and Place", el movimiento consistirá de cuatro puntos de paso (Waypoints) unidos a través de movimientos de tipo lineal y libre.

**Paso 1:** Enviar el "UR" a su posición "home"

Antes de comenzar a programar movimientos en el brazo robótico debemos moverlo en su posición "Home", para ello damos click en la pestaña "Move" y después damos click en la opción "Home":

![Home](https://github.com/cesar-martinez-torres/UDLAP_Robotics/blob/master/projects/tutorial-Pick_and_Place_URSIM/media/images/home.png)

**Paso 2:** Enviar al robot a "Home" de manera automatica

Despues de dar click a la opción "Home", mandaremos al robot a esa posición de manera automática, para ello, le daremos click y mantendremos presionado en la sección que dice "Auto", cabe mencionar que la sección "Manual" es para mandar al robot a su posición "Home" moviendolo mediante el uso del teach pendant:

![Auto](https://github.com/cesar-martinez-torres/UDLAP_Robotics/blob/master/projects/tutorial-Pick_and_Place_URSIM/media/images/Auto.png)

**Paso 3:** Configurar el primer movimiento

Una vez posicionado el robot en "Home" podemos empezar a programar el primer movimiento, para ello daremos click en la sección "Program" y despues en "Structure":

![Movimiento](https://github.com/cesar-martinez-torres/UDLAP_Robotics/blob/master/projects/tutorial-Pick_and_Place_URSIM/media/images/Movimiento.png)

En esta sección encontraremos todas las funciones que puede realizar el robot dentro de la rutina. Por el momento, nosotros estamos interesados en el movimiento del robot, por lo tanto le damos click en la opción "Move". Después, nos aparecerá nuevas opciones en el arbol de programación, lo que nos indicará que se agregó el comando "Move" de manera correcta:

![MoveJ](https://github.com/cesar-martinez-torres/UDLAP_Robotics/blob/master/projects/tutorial-Pick_and_Place_URSIM/media/images/MoveJ.png)
  
Cómo podemos ver, ahora podemos ver dos opciones: "MoveJ" y "Waypoint 1", comenzaremos a abordar el primer comando "MoveJ". Así pues, si damos click sobre el comando "MoveJ" y después damos click en la sección "Command", nos desplegará un menú donde podrás configurar el movimiento a realizar:

![MoveJP](https://github.com/cesar-martinez-torres/UDLAP_Robotics/blob/master/projects/tutorial-Pick_and_Place_URSIM/media/images/MoveJP.png)

![Command](https://github.com/cesar-martinez-torres/UDLAP_Robotics/blob/master/projects/tutorial-Pick_and_Place_URSIM/media/images/Command.png)
 
En esta sección puedes configurar tanto el tipo de movimiento (MoveJ, MoveL y MoveP), así como la velocidad y la acelareación de la articulación. En nuestro caso, dejaremos la misma configuración, con la velocidad, aceleración y el movimeinto ya establecidos.

Una vez configurado el tipo de movimiento, continuamos con la sección "Waypoint 1", para ello, damos click en "Waypoint 1" y de la misma forma le damos click en la sección "Command":

![Waypoint](https://github.com/cesar-martinez-torres/UDLAP_Robotics/blob/master/projects/tutorial-Pick_and_Place_URSIM/media/images/Waypoint.png)

En esta sección podremos configurar los punto de paso, es decir, podemos mover el robot para configurar el primer punto por el cual pasará el brazo, para ello le damos click en "Set Waypoint":

![1Move](https://github.com/cesar-martinez-torres/UDLAP_Robotics/blob/master/projects/tutorial-Pick_and_Place_URSIM/media/images/1Move.png)
  
Aquí podremos mover el robot con las flechas que están disponibles o podremos directamente dar un ángulo especifico a cada articulación. Así pues y como lo habiamos mencionado anteriormente, ubicaremos el robot encima del objeto a tomar, para ello, se utilizó la siguiente configuración para cada articulación:

![P1](https://github.com/cesar-martinez-torres/UDLAP_Robotics/blob/master/projects/tutorial-Pick_and_Place_URSIM/media/images/P1.png)

Hacemos click en "OK" y tendremos listo el primer movimiento.

**Paso 4:** Configurar el segundo movimiento

Una vez programado el primer movimiento, el resto se basa en el mismo procedimiento. Para el segundo movimiento ahora utilizaremos un "MoveL", ya que ahora con acercaremos al objeto de manera lineal, entonces, de la misma forma agregamos otro comando "Move" y lo configuramos como "MoveL":

![MoveL](https://github.com/cesar-martinez-torres/UDLAP_Robotics/blob/master/projects/tutorial-Pick_and_Place_URSIM/media/images/MoveL.png)

Del mismo modo, en el arbol de programación se verá reflejado el cambio.Seguimos el mismo procedimiento presentado anteriormente, configuramos el segundo punto de paso, por lo tanto, seleccionamos "Waypoint_2" y le damos click en "Set Waypoint". Dentro de esa pestaña yo configuramos un movimiento el cual se acerque al punto donde agarraría el objeto:

![MoveLP](https://github.com/cesar-martinez-torres/UDLAP_Robotics/blob/master/projects/tutorial-Pick_and_Place_URSIM/media/images/MoveLP.png)

Le damos click en "OK" y tenemos el segundo movimiento listo

Cabe mencionar que en la simulación no poseemos comandos para simular una pinza, no obstante, en el robot físico podremos tener esa configuración y, del mismo modo que agregamos movimientos, podemos agregar un comando que haga cerrar la pinza.

**Paso 5:** Configurar el tercer movimiento

Una vez programado el segundo movimiento, ahora programaremos el tercer movimiento, para ello, seguiremos el recorrido normal de un "Pick and Place", es decir, despues de bajar y tomar el objeto necesitamos de una salida para asegurarnos de que el robot no choque con ningún objeto del entorno, para ello solo moveremos el brazo hacia arriba a través de un "MoveL":

![MoveL2](https://github.com/cesar-martinez-torres/UDLAP_Robotics/blob/master/projects/tutorial-Pick_and_Place_URSIM/media/images/MoveL2.png)

![MoveLP2](https://github.com/cesar-martinez-torres/UDLAP_Robotics/blob/master/projects/tutorial-Pick_and_Place_URSIM/media/images/MoveLP2.png)

**Paso 6:** Configurar el cuarto movimiento

Para el cuarto movimiento ahora mandaremos al brazo al lugar donde dejaremos el "objeto tomado", para ello utilizaremos un "MoveJ" y, moveremos la base del robot 180°, así pues, agregamos un nuevo movimiento y configuramos el punto de paso:

![MoveJ2](https://github.com/cesar-martinez-torres/UDLAP_Robotics/blob/master/projects/tutorial-Pick_and_Place_URSIM/media/images/MoveJ2.png)

![MoveJP2](https://github.com/cesar-martinez-torres/UDLAP_Robotics/blob/master/projects/tutorial-Pick_and_Place_URSIM/media/images/MoveJP2.png)

**Paso 7:** Configurar el quinto movimiento

Para el quinto movimiento y del mismo modo que lo hicimos anteriormente, bajaremos el brazo para dejarlo en el lugar deseado, todo esto a través de un "MoveL":

![MoveL3](https://github.com/cesar-martinez-torres/UDLAP_Robotics/blob/master/projects/tutorial-Pick_and_Place_URSIM/media/images/MoveL3.png)

![MoveLP3](https://github.com/cesar-martinez-torres/UDLAP_Robotics/blob/master/projects/tutorial-Pick_and_Place_URSIM/media/images/MoveLP3.png)

Aquí, fisicamente, podremos configurar la pinza para que abra.

**Paso 8:** Configurar el sexto y último movimiento

Para el sexto movimiento ahora necesitamos la salida para que el brazo no choque con el entorno, para ello agregamos un "MoveL" y configuramos el punto del paso arriba de donde dejamos el objeto:

![MoveL4](https://github.com/cesar-martinez-torres/UDLAP_Robotics/blob/master/projects/tutorial-Pick_and_Place_URSIM/media/images/MoveL4.png)

![MoveLP4](https://github.com/cesar-martinez-torres/UDLAP_Robotics/blob/master/projects/tutorial-Pick_and_Place_URSIM/media/images/MoveLP4.png)

**Paso 9:** Simulación

Ya tendremos nuestro programa completo, el cual ahora podremos simular. Para ello, nos vamos al apartado de "Graphics", le damos click en "Simulation" y la damos click en el boton de play:

![Simulacion](https://github.com/cesar-martinez-torres/UDLAP_Robotics/blob/master/projects/tutorial-Pick_and_Place_URSIM/media/images/Simulacion.png)

Con esto habremos finalizado con nuestra programación del "UR5" para un programa "Pick and Place"

Nota: Es importante mencionar que es posible modificar el nombre de los puntos de paso para su mejor identificación.
---
## ✅ Conclusión

En este tutorial aprendimos dos distintos tipos de movimientos que realiza un robot industrial, además aprendimos sobre la interfaz de simulación del "URSim" a través de la programación de una operación "Pick and Place", mostrando paso a paso todos los movimientos que tiene que realizar el brazo "UR5" para poder realizar el programa.

Este tutorial tuvo como objetivo principal introducir al lector en la programación del robot colaborativo UR5, presentando los conceptos y comandos básicos necesarios para dar los primeros pasos en este campo. A partir de esta base, se espera que el lector se sienta motivado a profundizar en las capacidades del UR5, explorando funciones más avanzadas como la integración de sensores, la automatización de tareas mediante el comando "Palet" o la creación de estructuras lógicas complejas utilizando sentencias condicionales como "If" y bucles "While".
---

## 📚 Referencias y Recursos Adicionales

[Sitio Oficial para descargar URSim](https://www.universal-robots.com/download/software-cb-series/simulator-non-linux/offline-simulator-cb-series-non-linux-ursim-3158/)

[Guía de instalación de URSim](https://drive.google.com/file/d/1XBEqzTVAYYV9bFNBp0DkKGqSmh7_G8Jh/view?usp=sharing)

---

## 📬 Contacto

Para preguntas o sugerencias:

* Redactor del tutorial: Einar Córdova Reyes
  
   📧 Correo electrónico: einar.cor.rey@gmail.com

* Asesor encargado de la página: Dr. César Martínez Torres
  
   📧 Correo electrónico: cesar.martinez@udlap.mx
  
---
