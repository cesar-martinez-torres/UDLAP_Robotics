# {Kinectronics}

## Introduction (edited)

**Kinectronics** is an **API** (Application Programming Interface) and an **extensible application** (for graphic joint tracking) written in **C#** for **standard .NET framework**. It is inttended to be an easier and practical way to control (by programming) several devices such as **drones**, **mobile robots**, **robotic arms** and many more through **gesture recognition** by using **Microsoft's Kinect v2**.

**Disclaimer:** this is a work in progress, the software, and its documentation are constantly changing. Please keep this in mind while using it, some information could be incomplete. If you strongly consider it necessary, you can make **new issues**. Please, do so only if you find extremely dangerous bugs or vulnerabilities or if you find missing documentation. I'll do my best to fix it as soon as I can. You can also make **pull requests** if you already made important improvements to the project. For further contact, comments or questions you can join to the [**Official Discord Server**](https://discord.gg/fzERgZa).

## Features

- Predefined working gesture databases
- Support for creation of custom gesture databases
- Joint tracking data graphic interface
- Sensor status message
- Skeleton drawing in GUI
- Support for official and popular mechatronic and robotic devices
- Modular programming
- Good performance
- Basic support for [**Webots Robot Simulator**](https://www.cyberbotics.com/) (currently through TCP socket).

## Requirements

- Windows (any version compatible with Kinect v2 SDK)
- 64 Bit architecture
- Visual Studio IDE (any version compatible with .NET framework 4.8). You can find the **free** Community version in [**here**](https://visualstudio.microsoft.com/es/vs/community/)
- **Kinect v2**
- Kinect v2 adapter for PC
- [Kinect v2 official SDK](https://www.microsoft.com/en-us/download/details.aspx?id=44561)

## Installation

Just Git Clone this repository in your favourite folder and build the solution with Visual Studio.

## Warning

As stated in the MIT license, this software is provided with no warranty of any kind. Therefore, me or the contributors are not responsible for any damage to your real hardware, like drones, robots and so. Please, before trying this software in your real hardware, do some tests in the recommended simulations and consult the bug state of the support for your device.

## Usage

Just create a new **device** object in **GestureDetector** Class, make reference to an existing **Gesture Data Base** and define your own controller method in **GestureDetector**.

## Future Releases

It is intendded to add a lot of features to the software. In mid-term, I'm planning to:

- Add support for **Kinect V1**
- Add support for **Azure Kinect**
- Release C++ version of the software
- Release a Linux compatible version of the software
- Add support for ROS

## Bibliography

- [Vangos Pterneas](https://github.com/Vangos) His work was a great inspiration for this project. You can visit his [site](https://pterneas.com/).

## Media

![joints](https://github.com/JMRMEDEV/readme-fetch-test/blob/main/projects/kinectronics/media/images/joints.png)
![joints](https://github.com/cesar-martinez-torres/UDLAP_Robotics/blob/master/projects/kinectronics/media/images/joints.png)
![joints](https://github.com/cesar-martinez-torres/UDLAP_Robotics/blob/master/projects/kinectronics/media/images/any text_ you like.svg)
![Amazon Alexa](https://img.shields.io/badge/amazon%20alexa-52b5f7?style=for-the-badge&logo=amazon%20alexa&logoColor=white)![ChatGPT](https://img.shields.io/badge/chatGPT-74aa9c?style=for-the-badge&logo=openai&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![MIT License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)
![ROS](https://img.shields.io/badge/ROS-22314E?style=for-the-badge&logo=ros&logoColor=white)
![Arduino](https://img.shields.io/badge/Arduino-00979D?style=for-the-badge&logo=arduino&logoColor=white)
![Banner UDLAP Robotics](https://github.com/cesar-martinez-torres/UDLAP_Robotics/blob/master/projects/kinectronics/media/images/banner_1280x640.png)
![test](https://github.com/cesar-martinez-torres/UDLAP_Robotics/blob/master/projects/kinectronics/media/images/test.png)![ROS](https://img.shields.io/badge/ROS-22314E?style=for-the-badge&logo=ros&logoColor=white)
![Arduino](https://img.shields.io/badge/Arduino-00979D?style=for-the-badge&logo=arduino&logoColor=white)
![video prueba](https://github.com/cesar-martinez-torres/UDLAP_Robotics/tree/master/projects/proyecto-ping_pong_LED/media/videos)

| Header | Another header | Yet another header |
|--- |--- |--- |
| row 1 | column 2 | column 3 |
| row 2 | row 2 column 2 | row 2 column 3 |


**Note**: Above is a media test.
