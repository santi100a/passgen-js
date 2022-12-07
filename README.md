# Random Password Generator in JavaScript

This is a password generator that generates random passwords.
The resulting passwords don't make any sense, but they are random
(and thus, **very** secure).
You can specify a **lot** of different parameters to modify the
way the program generates passwords in the ```pgconfig.json``` file.

The settings file should be located in the same directory as the program, and it can alter these parameters:

- **The characters to use in the password**: specify the ```chars``` key. The value of this key is a string of characters to use.
- **Booting to verbose mode or not**: specify the ```verboseMode``` key. The value of this key is a boolean; if it is true, then the program enters verbose mode, otherwise, well, it doesn't.
- **The password's length**: specify the ```passwordLength``` key. The value of this key is an integer; the length of the password.
- **Entering an infinite loop or not**: specify the ```infiniteLoop``` key. The value of this key is a boolean; if it is true, then the program enters an infinite loop, otherwise, well, it doesn't.
- **The amount of passwords to generate**: specify the ```passwordCount``` key. The value of this key is an integer; the amount of passwords to generate.

## Usage

To use this CLI, you have four methods:
### Through Source Control
- Clone this repo.
- Enter the directory where you cloned the repo.
- Run ```npm install``` to install dependencies.
- Run the CLI by running ```node .```.

### Through Source Distributables
- Enter the ```dist``` directory. 
- Download the corresponding executable for your platform.
- Run the CLI by running this file.

### Through Distributable Releases
- Enter our latest release.
- Download the corresponding executable for your platform.
- Run the CLI by running this file.

### Through Global Install Via NPM
- Run ```npm install -g @santi100/passgen@latest```.
- Run the CLI by running ```npx @santi100/passgen```.

You can now specify these flags on the command line or set the proper keys in the ```pgconfig.json``` file:

- ```-h``` or ```--help```: Show a help message.
- ```-a``` or ```--about```: Show about message.
- ```-v or --verbose```: Enable verbose mode.
- ```-i``` or ```--infinite```: Enable infinite mode.
- ```-c``` or ```--create```: Scaffold a basic settings file.
- ```-p``` or ```--prompt```: Override flags and prompt the user directly.
- ```-V``` or ```--version```: Show version.
Since none of the flags require any parameters, you can actually join them, like this: ```-vi```.