# {Project: 1D VHDL Pong}

Hands-on **1D Pong** game development using **VHDL** and the **Basys 3** FPGA board, perfect for beginners in FPGA design.

![Basys 3 board with external player buttons](https://raw.githubusercontent.com/cesar-martinez-torres/UDLAP_Robotics/master/projects/1D_VHDL_Pong/media/images/showcase.jpg)

---

## 📖 Introduction

A brief manual to the introduction of game creation using FPGAs and self-learning of basic VHDL language. Very useful to understand how sequential and combinational logic works.

This 1D Pong game is played by **two players**, each controlling one push button. The game itself is played on the LEDs of the FPGA (Basys-3) board and the goal is to prevent the "LED ball" from reaching the end of your side.

> This document describes the functionality and structure of the design code compiled in this repository. Its purpose is to help developers understand key points of it and how they work together.

- Aimed at VHDL beginner programmers.
- Explanation by blocks, not at a high level.
- Helps explain hard-to-understand block codes or the logic behind them.

---

## 🎯 Project Objectives

- Implement a functional one-dimensional Pong game on an FPGA using VHDL.
- Integrate player inputs, LED movement, scoring, and seven-segment display control.
- Verify the design through simulation and operation on the selected development board.

---

## Disclaimer

This project is provided for educational purposes and is distributed under the terms of the included [MIT License](https://github.com/cesar-martinez-torres/UDLAP_Robotics/blob/master/projects/1D_VHDL_Pong/LICENSE). The hardware and software are provided **as is**, without warranty. Before programming or wiring the board, verify the Basys 3 revision, pin assignments, I/O voltage, and electrical connections. Disconnect power before changing external wiring.

The repository does not currently include testbenches, simulation reports, or a documented validation record for both button configurations. Review the constraints and test the design under controlled conditions before relying on it for demonstrations or further development.

> [!NOTE]
> **Button synchronization and debouncing:** Mechanical push buttons can generate several rapid transitions when pressed or released. The current VHDL design does not include an explicit input synchronizer or debounce filter. For more reliable operation, especially when using external buttons, add clock-domain synchronization and a debounce stage before the signals reach the game logic. Without them, behavior may vary because of contact bounce or asynchronous input timing.

---

## 🔧 Hardware

* FPGA Board (i.e. **Basys-3**)
* 2x Push Buttons and 2x Pull Down Resistors (Optional)

Depending on your specific FPGA board you need to adjust the constraints, as this project was developed using the Basys-3 Board.

### 🔹 Option 1: Using buttons on the board

You can test the game using the built-in buttons on the Basys 3 board, but note that it's less user-friendly because the buttons are not positioned on the respective player's side.

To use the left and right buttons on the Basys 3 board, keep the VHDL port names **btn_player1** and **btn_player2**. In **Basys3.xdc**, uncomment the internal-button constraints:

1. Uncomment the following:
```
set_property PACKAGE_PIN W19 [get_ports btn_player1]
	set_property IOSTANDARD LVCMOS33 [get_ports btn_player1]
set_property PACKAGE_PIN T17 [get_ports btn_player2]
	set_property IOSTANDARD LVCMOS33 [get_ports btn_player2]
```

2. Comment the following:
```
#set_property PACKAGE_PIN J3 [get_ports {btn_player2}]
	#set_property IOSTANDARD LVCMOS33 [get_ports {btn_player2}]

#set_property PACKAGE_PIN M2 [get_ports {btn_player1}]
	#set_property IOSTANDARD LVCMOS33 [get_ports {btn_player1}]
```

### 🔹 Option 2: Using external buttons

If you'd prefer to use external buttons, leave the constraints as they are in the example.
In this case you also have to connect the button circuits to power, ground, and the assigned GPIOs. Use the pull-down resistors shown so the inputs do not float when the buttons are released.

![External push-button circuit with pull-down resistor](https://raw.githubusercontent.com/cesar-martinez-torres/UDLAP_Robotics/master/projects/1D_VHDL_Pong/media/images/circuit.png)

---

## 🛠️ Setup

Using [Vivado](https://www.xilinx.com/support/download.html):

1. Code and Hardware preparation (listed above)
2. Create the Vivado project for your FPGA, import the sources and constraints (**.xdc**)
3. Generate the bitstream for your Board
4. Upload the Bitstream / Program the Device
5. Enjoy 🎮

---

## 🎮 Game Rules

1. One person controls one button.
2. By pressing the button the player can bounce the ball to the other side.
3. If a player presses too late the opponent gains a point and the ball restarts from the center.
4. The later a player presses, the stronger the speed of the bounced ball, making it harder to defend.
5. The first player to reach **9 points** wins. In the current implementation, the winning score remains displayed until the next missed return; that event resets both scores and starts a new match.

---

## 📂 Project Structure

It includes a general view of the structure of the files on the repository, with a brief explanation of its content.

```plaintext
├── src/  
│   ├── Basys3.xdc          # Constraints for Basys 3 Board  
│   ├── DisplayDecoder.vhd  # BCD to Seven segment decoder
│   ├── Game.vhd            # Top Entity of the design    
│   ├── GameLogicLED.vhd    # LEDs Logic, for ball movement  
│   ├── LED_Loop.vhd        # LEDs Loop from the Basys 3 Board
│   ├── ScoreDisplay.vhd    # Logic for shown score on seven segment
├── media/
│   └── images/             # Project images (showcase, circuit)
├── README.md               # General instructions and documentation
```

### 📝 Description of Files

- **LED_Loop**: Contains the logic to control the way of turning on the LEDs of the Basys3. It uses the signal of the clock and a divider to control the speed of the movement of the LEDs. Basically the logic of this file makes sure that the LEDs state changes according to the signal of the clock and the divider.

- **GameLogicLED**: Controls the states of the LEDs used for the movement of the players inside the game. Additionally, the score system that increases the score of each player when they reach certain values is contained here. It also allows establishing the speed of the LEDs and controlling the flow of the positions in the game.

- **Game**: This file is the **top entity** of the design. Here all the connections of the different parts of the game come together: from the buttons of the players, the control of the LEDs, and the visualization of the score. It also implements a reset to set the game to its initial state.

- **DisplayDecoder**: In charge of decoding the numbers that are in BCD format (decimal code coded in binary) to a compatible format for the 7-segment display of the Basys 3 by activating the correct segments according to what goes in.

- **ScoreDisplay**: Logic to handle the four-digit seven segment display, coordinating which digit lights up and what value is shown on it.

- **Basys3**: Contains the restrictions of the Basys 3, defines how the different connections of the FPGA to the external components like the buttons, LEDs and displays are routed. It also establishes the clock.

---

## 📁 Code

The complete VHDL source code and the Basys 3 constraints file are available in the project’s [src folder on GitHub](https://github.com/cesar-martinez-torres/UDLAP_Robotics/tree/master/projects/1D_VHDL_Pong/src).

---

## 💻 Code Explanation

### 🔸 LED Loop

Code for [LED_Loop](https://github.com/cesar-martinez-torres/UDLAP_Robotics/blob/master/projects/1D_VHDL_Pong/src/LED_Loop.vhd).

**Ports declaration**
```vhdl
entity LED_Loop is
    port(
        Clock : in std_logic;
        divider: in std_logic_vector(7 downto 0);
        CLK_out : out std_logic
    );
end LED_Loop;
```

This file uses the clock provided by the Basys Board. It gets the divider signal from an external signal in order to slow down the LEDs movement by a certain amount.

```vhdl
        CLK_out <= '0';
        if (counter >= divider) then
            if not (old_divider = divider) then
                old_divider <= divider;
            end if;
        end if;
```

Every time the counter is reset, the divider changes according to the stated value taken from the position.

```vhdl
            multiplicator_counter <= multiplicator_counter + 1;
            if (multiplicator_counter = divider_multiplicator) then
                CLK_out <= '1';
                multiplicator_counter <= "0000000000000000";
            end if;
        elsif (Clock'event and Clock = '1') then
            counter <= counter + 1;
```

The counter is adding every time there is a rising edge. Meaning it will be slowed down or sped up according to the divider.

---

### 🔸 LED Loop Logic

Code for [GameLogicLED](https://github.com/cesar-martinez-torres/UDLAP_Robotics/blob/master/projects/1D_VHDL_Pong/src/GameLogicLED.vhd).

**Ports declaration**
```vhdl
port(
        RST : in std_logic;
        Clock : in std_logic;
        dir: in std_logic;
        pos : out std_logic_vector(3 downto 0);
        player_1_point: out std_logic_vector(3 downto 0);
        player_2_point: out std_logic_vector(3 downto 0);
        reset_speed: out std_logic := '0'
    );
```

This block handles the logic for the loop of LEDs. It also handles the score system, adding and returning the score back to the main **Game.vhd** file.

```vhdl
        if (current_pos = length) then
            reset_speed <= '1';
                if score1 >= "1001" then
                    score1 <= "0000";
                    score2 <= "0000";
                else
                    score1 <= score1 + 1;
                end if;
                current_pos <= "1000"; 
```

Every time the ball reaches the end of player 2's side, player 1 gains a point. A score of 9 represents the winning score. If that player already has 9 points and scores again, the implementation resets both scores to zero and starts a new match.

```vhdl
        else
            current_pos <= current_pos + 1;
        end if;
```

If it has not reached the end, it keeps adding to the position. Same logic applies for the other player.

---

### 🔸 7-Segment Display Decoder

Code for [DisplayDecoder](https://github.com/cesar-martinez-torres/UDLAP_Robotics/blob/master/projects/1D_VHDL_Pong/src/DisplayDecoder.vhd).

**Ports declaration**
```vhdl
entity display_7seg is
    Port ( num : in STD_LOGIC_VECTOR(3 downto 0);
           seg : out STD_LOGIC_VECTOR(6 downto 0));
end display_7seg;  
```

The decoder gets a BCD number and sends a seven segment logic vector which is later connected to the Basys board.

```vhdl
            when "0000" => seg <= "1000000"; -- 0
            when "0001" => seg <= "1111001"; -- 1
            when "0010" => seg <= "0100100"; -- 2
            when "0011" => seg <= "0110000"; -- 3
            when "0100" => seg <= "0011001"; -- 4
            when "0101" => seg <= "0010010"; -- 5
            when "0110" => seg <= "0000010"; -- 6
            when "0111" => seg <= "1111000"; -- 7
            when "1000" => seg <= "0000000"; -- 8
            when "1001" => seg <= "0010000"; -- 9
```

Every 0 of the vector is an active LED of the seven segment, in this case we had common anode segments. It can be changed to the preference of the developer.

---

### 🔸 Display Logic

Code for [ScoreDisplay](https://github.com/cesar-martinez-torres/UDLAP_Robotics/blob/master/projects/1D_VHDL_Pong/src/ScoreDisplay.vhd).

**Ports declaration**
```vhdl
 Port (
        clk      : in STD_LOGIC;  
        display0 : in std_logic_vector(3 downto 0);
        display1 : in std_logic_vector(3 downto 0);
        display2 : in std_logic_vector(3 downto 0);
        display3 : in std_logic_vector(3 downto 0);
        segment  : out std_logic_vector(6 downto 0); 
        anode    : out std_logic_vector(3 downto 0) 
    );
```

The logic uses the internal clock of the Basys to coordinate the 4 digits for the display. Every display declaration is a digit.

```vhdl
         when "00" =>
            anode_temp <= "1110";
            display_value <= display0;
        when "01" =>
            anode_temp <= "1101";
            display_value <= display1;
        when "10" =>
            anode_temp <= "1011";
            display_value <= display2;
        when "11" =>
            anode_temp <= "0111";
            display_value <= display3;
```

A case is used to count and coordinate the anode with its corresponding digit. When it reaches 3, it goes back to 0.

```vhdl
display_a: display_7seg port map(
        num => display_value, 
        seg => segment
    );
    anode <= anode_temp;
```

The decoder from [DisplayDecoder](https://github.com/cesar-martinez-torres/UDLAP_Robotics/blob/master/projects/1D_VHDL_Pong/src/DisplayDecoder.vhd) is used to decode the BCD vector into seven segment logic. Later the anode signal is connected to the anode output.

---

### 🔸 Game Top Entity

Code for [Game](https://github.com/cesar-martinez-torres/UDLAP_Robotics/blob/master/projects/1D_VHDL_Pong/src/Game.vhd).

**Game** is the top entity of our design. It is intended to have all the connections from the Basys board and implements a hard reset which sets all to 0.

**Ports declaration**
```vhdl
    port(
        clk : in std_logic;
        btn_player1: in std_logic;
        btn_player2: in std_logic;
        RST: in std_logic;
        seg:out std_logic_vector(6 downto 0);
        an: out std_logic_vector(3 downto 0);
        led : out std_logic_vector(15 downto 0)
    );
```

As stated, buttons can either be the internal Basys ones or external ones for comfort.

```vhdl
      if clk'event and clk = '1' then
            if current_dir = '1' and btn_player2 = '1' and led_states >= "1000" then
                current_dir <= not current_dir;
                case led_states is
                    when "1111" => divider <= "00111111";
                    -----Other cases
                    when others => divider <= "11111111";
                end case;
```

Every time the player clicks, depending on the position of the ball, the bounce will have a different speed for the ball.

```vhdl
 case led_states is
            when "0000" => led <= "1000000000000000";
            ----- Other Cases
            when "1111" => led <= "0000000000000001";
            when others => led <= "1111111111111111";
        end case;
```

LED cases convert the position to a single LED that is turned on (Demultiplexer).

---

### 🔸 Constraints

Code for [Basys 3 constraints](https://github.com/cesar-martinez-torres/UDLAP_Robotics/blob/master/projects/1D_VHDL_Pong/src/Basys3.xdc).

```xdc
set_property PACKAGE_PIN W5 [get_ports clk]
	set_property IOSTANDARD LVCMOS33 [get_ports clk]
	create_clock -add -name sys_clk_pin -period 10.00 -waveform {0 5} [get_ports clk]
```

Clock from the Basys 3. The configured period is 10 ns, which corresponds to a frequency of 100 MHz.

```xdc
set_property PACKAGE_PIN R2 [get_ports {RST}]
	set_property IOSTANDARD LVCMOS33 [get_ports {RST}]
```

Reset is an input used to hard reset the game itself.

```xdc
set_property PACKAGE_PIN U16 [get_ports {led[0]}]
	set_property IOSTANDARD LVCMOS33 [get_ports {led[0]}]
#14 more constraints
set_property PACKAGE_PIN L1 [get_ports {led[15]}]
	set_property IOSTANDARD LVCMOS33 [get_ports {led[15]}]
```

All the board LEDs were used to show the game loop. As we worked with vectors, it is just necessary to change the index of the declared vector. Can be changed to single standard logic data.

```xdc
set_property PACKAGE_PIN W7 [get_ports {seg[0]}]
	set_property IOSTANDARD LVCMOS33 [get_ports {seg[0]}]
#5 more Constraints
set_property PACKAGE_PIN U7 [get_ports {seg[6]}]
	set_property IOSTANDARD LVCMOS33 [get_ports {seg[6]}]
	
set_property PACKAGE_PIN U2 [get_ports {an[0]}]
	set_property IOSTANDARD LVCMOS33 [get_ports {an[0]}]
#2 more Constraints
set_property PACKAGE_PIN W4 [get_ports {an[3]}]
	set_property IOSTANDARD LVCMOS33 [get_ports {an[3]}]
```

The seven segment gets the 7-bit vector which corresponds to a line of the seven segment display. If you are not using the same board it is necessary to check the board documentation also to know the common anode configuration.

```xdc
set_property PACKAGE_PIN J3 [get_ports {btn_player2}]
	set_property IOSTANDARD LVCMOS33 [get_ports {btn_player2}]
set_property PACKAGE_PIN M2 [get_ports {btn_player1}]
	set_property IOSTANDARD LVCMOS33 [get_ports {btn_player1}]
```

We used external buttons, so those were connected to inputs from the sides of the board. Using pull down resistors is recommended as well.

```xdc
## Configuration options
set_property CONFIG_VOLTAGE 3.3 [current_design]
set_property CFGBVS VCCO [current_design]
```

Used configuration. Not necessary to modify if working with the same board.

---

## 🔜 Future Work

- Consider configurable game speed, additional difficulty levels, automated testbenches, sound feedback, and a documented reset or restart sequence.

---

## ✅ Conclusion

The available project files document a modular VHDL implementation of one-dimensional Pong for the Basys 3 FPGA. The design separates clock division in **LED_Loop**, ball position and scoring in **GameLogicLED**, seven-segment encoding and multiplexing in **DisplayDecoder** and **ScoreDisplay**, and top-level integration in **Game**.

The constraints file maps the clock, reset input, 16 LEDs, seven-segment display, and two external player buttons to Basys 3 pins. The documentation also explains how the button constraints can be adapted to use buttons located on the board. Together, these materials describe how player input changes the ball direction and speed, how missed returns update the score, and how the score is presented on the display.

Based on the evidence currently stored in the repository, the project provides the source code, hardware constraints, circuit reference, and setup procedure required to study and reproduce the intended design. However, no testbench files, simulation reports, or recorded hardware test results are included. Therefore, complete verification of both input configurations and all game conditions remains pending.

<!--
## 🧪 Validation and Results

This section is intentionally hidden from the published page until verified evidence is available.

- Identify the exact Basys 3 board revision, Vivado version, and test procedure.
- Add testbench results or simulation reports for ball movement, button timing, scoring, reset behavior, speed changes, and seven-segment output.
- Add photographs or video of the implemented hardware.
- Confirm separately that the onboard-button and external-button configurations operate correctly.
- Record observed limitations, failed cases, and any differences between the documented rules and the implemented behavior.
-->

---

## 📚 References

- PensActius. (2018, February 23). *Juego PONG con tira de leds y arduino* [Video]. YouTube. [Pong Game Example by PensActius](https://www.youtube.com/watch?v=Q-6n0XncaWE)

- Ingeniería Electrónica Industrial Campus Jalpa. (2020, May 19). *Juego Pong IEI Juego Arduino Impresión 3D* [Video]. YouTube. [Pong Game Example by Ingeniería Electrónica Industrial Campus Jalpa](https://www.youtube.com/watch?app=desktop&v=adN6mfCjHu4)

- Robot UNO. (2020, July 9). *PING-PONG con ARDUINO || MINIJUEGO CON ARDUINO || PROYECTO para PRINCIPIANTES [explicado paso a paso]* [Video]. YouTube. [Pong Game Example by Robot UNO](https://www.youtube.com/watch?v=ttuo--XyvzM)

---

## 👥 Credits

This project was created by:

* **Adrián Rodríguez Godínez** — 179784
* **Ian Carlo Vicente Aburto** — 182598
* **Ana Paola Vargas González** — 180549  
  📧 ana.vargasgz@udlap.mx
* **Philip Dell** — 186247

### Academic Supervision and Repository Maintenance

The original project and its technical implementation were developed by the students listed above.

**Dr. César Martínez Torres** serves as the academic advisor and repository maintainer. His maintenance responsibilities may include:

- Reviewing and organizing documentation for publication.
- Answering questions about the published material when possible.
- Triaging reported documentation or repository issues.
- Coordinating corrections and future updates.
- Preserving the project as an educational reference.

Repository maintenance does not imply authorship of the original student work.

For questions, corrections, or suggestions:

- GitHub: [cesar-martinez-torres](https://github.com/cesar-martinez-torres)
- Email: cesar.martinez@udlap.mx

> [!NOTE]
> Maintenance and support are provided on a best-effort basis. Response times and future updates are not guaranteed.
