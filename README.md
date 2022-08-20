# Random Password Generator in JavaScript

This is a password generator that generates random passwords.
The resulting passwords don't make any sense, but they are random
(and thus, **very** secure).
You can specify a **lot** of different parameters to modify the
way the program generates passwords in the ```settings.json``` file.

The settings file should be located in the same directory as the program, and it can alter these parameters:

- **The characters to use in the password**: specify the ```chars``` key. The value of this key is a string of characters to use.
- **Booting to verbose mode or not**: specify the ```verboseMode``` key. The value of this key is a boolean; if it is true, then the program enters verbose mode, otherwise, well, it doesn't.
- **The password's length**: specify the ```passwordLength``` key. The value of this key is an integer; the length of the password.
- **Entering an infinite loop or not**: specify the ```infiniteLoop``` key. The value of this key is a boolean; if it is true, then the program enters an infinite loop, otherwise, well, it doesn't.

## Usage

Once you clone the repo, run the program by running ```node .``` from the command line in the directory where you cloned the repo. You can now specify these flags on the command line or set the proper keys in the ```settings.json``` file:

- ```-h``` or ```--help```: Show a help message.
- ```-a``` or ```--about```: Show about message.
- ```--verbose```: Enable verbose mode.
- ```-i``` or ```--infinite```: Enable infinite mode.
- ```-v``` or ```--version```: Show version.
